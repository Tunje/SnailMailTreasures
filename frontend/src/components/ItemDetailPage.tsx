import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getItemById, deleteItem, Item } from '../services/itemService';
import { addToCart } from '../services/cartService';

// Extended Item interface to handle backend field variations
interface ItemWithBackendFields extends Item {
  userName?: string;
  category?: string;
}

// Convert gs:// Firebase Storage URL to public HTTP URL
function firebaseGsToHttpUrl(gsUrl: string): string {
  const match = gsUrl.match(/^gs:\/\/snailmailtreasures\.firebasestorage\.app\/(.+)$/);
  if (!match) return gsUrl;
  const filename = encodeURIComponent(match[1]);
  return `https://firebasestorage.googleapis.com/v0/b/snailmailtreasures.firebasestorage.app/o/${filename}?alt=media`;
}

const ItemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<ItemWithBackendFields | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Check if current user is the owner of the item using just the token
  useEffect(() => {
    const checkOwnership = () => {
      try {
        if (!item || !item._id) return;
        
        // Get JWT token from localStorage
        const token = localStorage.getItem('token');
        if (!token) return;
        
        // Decode JWT to get user id
        function parseJwt(token: string) {
          try {
            return JSON.parse(atob(token.split('.')[1]));
          } catch (e) {
            return null;
          }
        }
        
        const payload = parseJwt(token);
        if (!payload || !payload.id) return;
        
        const currentUserId = payload.id;
        
        // Get the item's user ID, handling different formats
        let itemUserId = item.userId;
        
        // If userId is an object, try to get its _id or id property
        if (itemUserId && typeof itemUserId === 'object') {
          itemUserId = (itemUserId as any)._id || (itemUserId as any).id;
        }
        
        console.log('Ownership check:', { 
          userIdFromToken: currentUserId, 
          itemUserId: itemUserId,
          rawUserId: item.userId
        });
        
        // Compare user ID from token with item's user ID
        const isOwner = Boolean(itemUserId && String(currentUserId) === String(itemUserId));
        console.log('Is owner:', isOwner);
        
        setIsOwner(isOwner);
      } catch (err) {
        console.error('Error checking item ownership:', err);
        setIsOwner(false);
      }
    };
    
    if (item) {
      checkOwnership();
    }
  }, [item]);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        console.log('ItemDetailPage: Starting to fetch item with ID:', id);
        
        if (!id) {
          console.error('ItemDetailPage: No item ID provided');
          setError('No item ID provided.');
          setLoading(false);
          return;
        }
        
        const startTime = Date.now();
        const itemData = await getItemById(id);
        const endTime = Date.now();
        console.log(`ItemDetailPage: Item fetch completed in ${endTime - startTime}ms`);
        
        setItem(itemData);
      } catch (err) {
        console.error('ItemDetailPage: Error fetching item:', err);
        setError('Failed to load item details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);
  
  // Handle item deletion
  const handleDeleteItem = async () => {
    if (!id) return;
    
    try {
      setDeleting(true);
      console.log('Attempting to delete item with ID:', id);
      
      const response = await deleteItem(id);
      console.log('Delete response:', response);
      
      // Redirect to home page after successful deletion
      navigate('/');
    } catch (err) {
      console.error('Error deleting item:', err);
      setError('Failed to delete item. Please try again later.');
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  if (loading) {
    return <div className="pt-32 w-full max-w-3xl mx-auto text-center text-gray-500">Loading item...</div>;
  }
  if (error || !item) {
    return <div className="pt-32 w-full max-w-3xl mx-auto text-center text-red-500">{error || 'Item not found.'}</div>;
  }

  // Prefer imageUrl, fallback to image
  const imageUrl = item.imageUrl
    ? item.imageUrl.startsWith('gs://')
      ? firebaseGsToHttpUrl(item.imageUrl)
      : item.imageUrl
    : item.image;

  return (
    <div className="pt-32 w-full max-w-3xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-md p-8 flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0 w-full md:w-1/2 flex flex-col items-center justify-center relative">
          <div className="self-end mb-2">
            <button 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => {
                setIsFavorite(!isFavorite);
                console.log(`${isFavorite ? 'Removed from' : 'Added to'} favorites: ${item.name}`);
              }}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500">
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-5.201-3.355 8.346 8.346 0 01-1.756-2.296 6.592 6.592 0 01-.62-2.657c0-3.015 2.387-5.48 5.328-5.48a5.394 5.394 0 013.667 1.427 5.394 5.394 0 013.667-1.427c2.941 0 5.328 2.465 5.328 5.48a6.615 6.615 0 01-.617 2.656 8.345 8.345 0 01-1.76 2.298 15.244 15.244 0 01-5.201 3.355l-.021.011-.007.004-.001.001a.752.752 0 01-.704 0l-.001-.001z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500 hover:text-red-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              )}
            </button>
          </div>
          
          {imageUrl ? (
            <img src={imageUrl} alt={item.name} className="rounded-lg max-h-96 w-full object-contain border" />
          ) : (
            <div className="w-full h-64 flex items-center justify-center bg-gray-200 rounded-lg">No Image</div>
          )}
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-2">{item.name}</h1>
            <p className="text-gray-700 mb-4">{item.description}</p>
            <p className="text-xl font-bold text-[var(--color-primary)] mb-4">${item.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mb-2">Category: {item.category || 'N/A'}</p>
            <p className="text-sm text-gray-500">Listed: {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}</p>
          </div>
          <div className="mt-8">
            <div className="flex items-center mb-4">
              <label htmlFor="quantity" className="mr-2 text-gray-700">Quantity:</label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button 
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-l-md" 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                >
                  -
                </button>
                <input 
                  type="number" 
                  id="quantity" 
                  min="1" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-12 text-center border-0 focus:ring-0"
                />
                <button 
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-r-md" 
                  onClick={() => setQuantity(prev => prev + 1)}
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button 
                className="btn-primary flex-1"
                onClick={() => {
                  // Add to cart using the cart service
                  addToCart(item, quantity);
                  console.log(`Added ${quantity} of ${item?.name} to cart`);
                  setAddedToCart(true);
                  setTimeout(() => setAddedToCart(false), 2000);
                }}
              >
                {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
              </button>
              <Link to="/shop" className="btn-secondary">
                Back to Search
              </Link>
            </div>
            
            {/* Delete button - only visible to item owner */}
            {isOwner && (
              <div className="mt-4">
                {!showDeleteConfirm ? (
                  <button 
                    className="w-full text-red-600 border border-red-600 py-2 px-4 rounded hover:bg-red-50 transition-colors"
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    Delete Item
                  </button>
                ) : (
                  <div className="border border-red-200 rounded p-3 bg-red-50">
                    <p className="text-red-700 mb-2">Are you sure you want to delete this item?</p>
                    <div className="flex gap-2">
                      <button 
                        className="flex-1 bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition-colors"
                        onClick={handleDeleteItem}
                        disabled={deleting}
                      >
                        {deleting ? 'Deleting...' : 'Yes, Delete'}
                      </button>
                      <button 
                        className="flex-1 bg-gray-200 text-gray-800 py-1 px-3 rounded hover:bg-gray-300 transition-colors"
                        onClick={() => setShowDeleteConfirm(false)}
                        disabled={deleting}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {addedToCart && (
              <div className="mt-2 text-green-600 text-sm">
                ✓ Added to cart!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;
