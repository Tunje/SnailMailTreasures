import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createItem } from '../services/itemService';

// Categories for the dropdown
const CATEGORIES = [
  'Collectibles',
  'Vintage',
  'Handmade',
  'Stamps',
  'Postcards',
  'Antiques',
  'Art',
  'Jewelry',
  'Miscellaneous'
];

const AddItemPage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  // Hardcoded user ID - in a real app, this would come from authentication
  const userId = '646fa2a4c7ef5a8f144a5eff';
  
  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // In a real app, you would upload the file to a server/cloud storage
      // and get back a URL. For now, we'll just use a placeholder URL
      // and show the preview locally
      setImageUrl(`https://via.placeholder.com/150?text=${encodeURIComponent(file.name)}`);
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      // Validate form
      if (!name.trim()) {
        throw new Error('Item name is required');
      }
      
      if (!description.trim()) {
        throw new Error('Description is required');
      }
      
      if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
        throw new Error('Please enter a valid price');
      }
      
      // User ID is hardcoded for demo purposes
      
      // Create item data object
      const itemData = {
        name,
        description,
        image: previewImage || imageUrl || 'https://via.placeholder.com/150?text=No+Image', // Default placeholder if no image
        price: parseFloat(price),
        category,
        userId
      };
      
      // Send to API
      await createItem(itemData);
      
      // Redirect to user page on success
      navigate('/user');
      
    } catch (err) {
      console.error('Error creating item:', err);
      setError(err instanceof Error ? err.message : 'Failed to create item');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="pt-24 w-full max-w-3xl mx-auto px-4">
      <section className="bg-[var(--color-background)] rounded-lg p-6 mb-8">
        <h1 className="text-2xl font-bold text-[var(--color-primary)] mb-6">Add New Item</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Item Name */}
          <div>
            <label htmlFor="name" className="block text-[var(--color-text)] font-medium mb-1">
              Item Name*
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              placeholder="Vintage Postcard Collection"
              required
            />
          </div>
          
          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-[var(--color-text)] font-medium mb-1">
              Description*
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] min-h-[100px]"
              placeholder="Describe your item in detail..."
              required
            />
          </div>
          
          {/* Image Upload (Optional) */}
          <div>
            <label htmlFor="image" className="block text-[var(--color-text)] font-medium mb-1">
              Item Image <span className="text-gray-500 text-sm">(Optional)</span>
            </label>
            <div className="flex items-start space-x-4">
              <div className="flex-1">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="file"
                    id="image"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                  />
                  <p className="text-gray-500">Click to upload an image</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</p>
                </div>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  placeholder="Or enter an image URL"
                />
              </div>
              
              {/* Image Preview */}
              <div className="w-24 h-24 relative">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-md"
                    onError={() => setError('Invalid image URL')}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-700 rounded-md">
                    <div className="text-white text-2xl">📷</div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-[var(--color-text)] font-medium mb-1">
              Category*
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              required
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          
          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-[var(--color-text)] font-medium mb-1">
              Price ($)*
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              placeholder="29.99"
              min="0.01"
              step="0.01"
              required
            />
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/user')}
              className="px-6 py-2 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-md hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[#b67522] disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Item'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddItemPage;
