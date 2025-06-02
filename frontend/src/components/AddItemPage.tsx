import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createItem as createItemAPI, getItemById, updateItem } from '../services/itemService';

// Convert gs:// Firebase Storage URL to public HTTP URL
function firebaseGsToHttpUrl(gsUrl: string): string {
  if (!gsUrl || !gsUrl.startsWith('gs://')) return gsUrl;
  const bucket = gsUrl.split('/')[2];
  const objectPath = gsUrl.split('/').slice(3).join('/');
  return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(objectPath)}?alt=media`;
}

const AddItemPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    imageFile: null as File | null,
    imageUrl: '',
    category: '',
    price: ''
  });
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(isEditMode);
  const navigate = useNavigate();
  
  // Fetch item data if in edit mode
  useEffect(() => {
    const fetchItemData = async () => {
      if (isEditMode && id) {
        try {
          setLoading(true);
          const itemData = await getItemById(id);
          console.log('Fetched item for editing:', itemData);
          
          // Handle different field names between frontend and backend
          setNewItem({
            name: itemData.name || itemData.itemName || '',
            description: itemData.description || '',
            imageFile: null,
            imageUrl: itemData.imageUrl || itemData.image || '',
            category: itemData.category || '',
            price: itemData.price ? String(itemData.price) : ''
          });
        } catch (error) {
          console.error('Error fetching item data:', error);
          setFormError('Failed to load item data for editing.');
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchItemData();
  }, [id, isEditMode]);

  // Get user from JWT
  function parseJwt(token: string) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }
  const token = localStorage.getItem('token');
  let userId = '';
  if (token) {
    const payload = parseJwt(token);
    if (payload && payload.id) userId = payload.id;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);
    let imageUrl = '';
    try {
      // Upload image to Firebase Storage if a file is selected
      if (newItem.imageFile) {
        setUploading(true);
        const file = newItem.imageFile;
        const fileName = `${Date.now()}_${file.name}`;
        const firebaseUrl = `https://firebasestorage.googleapis.com/v0/b/snailmailtreasures.firebasestorage.app/o/${encodeURIComponent(fileName)}?uploadType=media`;
        const uploadRes = await fetch(firebaseUrl, {
          method: 'POST',
          headers: {
            'Content-Type': file.type
          },
          body: file
        });
        if (!uploadRes.ok) {
          throw new Error('Failed to upload image to Firebase');
        }
        // We don't need the upload data response
        await uploadRes.json();
        imageUrl = `gs://snailmailtreasures.firebasestorage.app/${fileName}`;
      } else {
        imageUrl = newItem.imageUrl;
      }
      setUploading(false);
      
      const itemToSend = {
        itemName: newItem.name,
        description: newItem.description,
        imageUrl: imageUrl,
        category: newItem.category,
        price: parseFloat(newItem.price),
        userId: userId
      };
      
      if (isEditMode && id) {
        // Update existing item
        await updateItem(id, itemToSend as any);
        console.log('Item updated successfully');
      } else {
        // Create new item
        await createItemAPI(itemToSend as any);
        console.log('Item created successfully');
      }
      
      navigate('/user');
    } catch (err: any) {
      console.error('Error saving item:', err);
      setFormError(`Failed to ${isEditMode ? 'update' : 'create'} item. Please try again.`);
    } finally {
      setSubmitting(false);
      setUploading(false);
      setUploadProgress(null);
    }
  };

  if (!userId) {
    return <div className="pt-32 text-center text-red-500">You must be logged in to {isEditMode ? 'edit' : 'add'} an item.</div>;
  }
  
  if (loading) {
    return <div className="pt-32 text-center">Loading item data...</div>;
  }

  return (
    <div className="pt-32 w-full max-w-2xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">{isEditMode ? 'Edit Item' : 'Add New Item'}</h1>
      {formError && <div className="text-red-500 mb-4 text-center">{formError}</div>}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded-lg p-8">
        <input className="w-full border px-3 py-2 rounded" placeholder="Name" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} required />
        <textarea className="w-full border px-3 py-2 rounded" placeholder="Description" value={newItem.description} onChange={e => setNewItem({ ...newItem, description: e.target.value })} required />
        {/* Current image preview (if in edit mode and has an image) */}
        {isEditMode && newItem.imageUrl && !newItem.imageFile && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Current Image:</p>
            <div className="relative inline-block">
              <img 
                src={newItem.imageUrl.startsWith('gs://') ? firebaseGsToHttpUrl(newItem.imageUrl) : newItem.imageUrl} 
                alt="Current item" 
                className="h-40 w-auto object-cover rounded border" 
              />
              <button
                type="button"
                onClick={() => setNewItem({ ...newItem, imageUrl: '' })}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                title="Remove image"
              >
                ×
              </button>
            </div>
          </div>
        )}
        
        {/* Image upload field */}
        <div className="space-y-2">
          <label className="block text-sm text-gray-600">{newItem.imageUrl ? 'Replace image:' : 'Upload image:'}</label>
          <input
            className="w-full border px-3 py-2 rounded"
            type="file"
            accept="image/*"
            onChange={e => {
              const file = e.target.files && e.target.files[0];
              setNewItem({ ...newItem, imageFile: file || null });
            }}
          />
          {uploading && <div className="text-blue-500">Uploading image...</div>}
          {uploadProgress !== null && <div className="text-blue-400">Upload progress: {uploadProgress}%</div>}
        </div>
        <input className="w-full border px-3 py-2 rounded" placeholder="Category" value={newItem.category} onChange={e => setNewItem({ ...newItem, category: e.target.value })} />
        <input type="number" min="0" step="0.01" className="w-full border px-3 py-2 rounded" placeholder="Price (USD)" value={newItem.price} onChange={e => setNewItem({ ...newItem, price: e.target.value })} required />
        <button 
          type="submit" 
          className="btn-primary w-full" 
          disabled={submitting}
        >
          {submitting ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Item' : 'Create Item')}
        </button>
      </form>
    </div>
  );
};

export default AddItemPage;
