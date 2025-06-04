import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getItemById, deleteItem, Item, setItemDeal, removeItemDeal } from '../services/itemService';
import { addToCart } from '../services/cartService';
import { addToFavorite } from '../services/userService';

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
  
  // Deal states
  const [showDealForm, setShowDealForm] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(10);
  const [expirationDays, setExpirationDays] = useState(7);
  const [settingDeal, setSettingDeal] = useState(false);
  const [removingDeal, setRemovingDeal] = useState(false);

  // Get current user ID from token
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Parse JWT token to get user ID
  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  // Check if current user is the owner of the item and get user ID
  useEffect(() => {
    const checkOwnership = () => {
      try {
        if (!item || !item._id) return;
        
        // Get JWT token from localStorage
        const token = localStorage.getItem('token');
        if (!token) return;
        
        const payload = parseJwt(token);
        if (!payload || !payload.id) return;
        
        const userId = payload.id;
        setCurrentUserId(userId);
        
        // Get the item's user ID, handling different formats
        let itemUserId = item.userId;
        
        // If userId is an object, try to get its _id or id property
        if (itemUserId && typeof itemUserId === 'object') {
          itemUserId = (itemUserId as any)._id || (itemUserId as any).id;
        }
        
        console.log('Ownership check:', { 
          userIdFromToken: userId, 
          itemUserId: itemUserId,
          rawUserId: item.userId
        });
        
        // Compare user ID from token with item's user ID
        const isOwner = Boolean(itemUserId && String(userId) === String(itemUserId));
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
        
        // Check if the item is in the user's favorites
        const token = localStorage.getItem('token');
        if (token) {
          const payload = parseJwt(token);
          if (payload && payload.id) {
            const userId = payload.id;
            setCurrentUserId(userId);
            
            // Check if this item is in the user's favorites
            // This would ideally call an API to get the user's favorites
            // For now, we'll just check the localStorage or assume not favorite
            setIsFavorite(false); // Default to not favorite until we implement the check
          }
        }
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
    if (!item || !item._id) return;
    
    try {
      setDeleting(true);
      await deleteItem(item._id);
      console.log('Item deleted successfully');
      navigate('/shop');
    } catch (err) {
      console.error('Error deleting item:', err);
      setDeleting(false);
      setShowDeleteConfirm(false);
      // Show error message to user
      alert('Failed to delete item. Please try again.');
    }
  };

  // Handle setting a deal on the item
  const handleSetDeal = async () => {
    if (!item || !item._id) return;
    
    // Get JWT token from localStorage and decode it
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to set deals on items');
      return;
    }
    
    // Decode the token to get the user ID
    const payload = parseJwt(token);
    if (!payload || !payload.id) {
      alert('Invalid login session. Please log in again.');
      return;
    }
    
    // Get the user ID from the decoded token
    const userId = payload.id;
    
    // Check if the user is the owner of the item
    let itemUserId = item.userId;
    if (itemUserId && typeof itemUserId === 'object') {
      itemUserId = (itemUserId as any)._id || (itemUserId as any).id;
    }
    
    // Verify ownership
    if (String(userId) !== String(itemUserId)) {
      alert('You can only set deals on items you own.');
      return;
    }
    
    try {
      setSettingDeal(true);
      
      // Validate inputs
      if (discountPercentage <= 0 || discountPercentage >= 100) {
        alert('Discount percentage must be between 1 and 99');
        setSettingDeal(false);
        return;
      }
      
      // Call the API to set the deal
      await setItemDeal(item._id, discountPercentage, expirationDays);
      
      // Refresh the item data
      const updatedItem = await getItemById(item._id);
      setItem(updatedItem);
      
      // Reset UI state
      setShowDealForm(false);
      setSettingDeal(false);
      
      console.log('Deal set successfully');
    } catch (err) {
      console.error('Error setting deal:', err);
      setSettingDeal(false);
      // Show error message to user
      alert('Failed to set deal. Please try again.');
    }
  };

  // Handle removing a deal from the item
  const handleRemoveDeal = async () => {
    if (!item || !item._id) return;
    
    // Get JWT token from localStorage and decode it
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to remove deals from items');
      return;
    }
    
    // Decode the token to get the user ID
    const payload = parseJwt(token);
    if (!payload || !payload.id) {
      alert('Invalid login session. Please log in again.');
      return;
    }
    
    // Get the user ID from the decoded token
    const userId = payload.id;
    
    // Check if the user is the owner of the item
    let itemUserId = item.userId;
    if (itemUserId && typeof itemUserId === 'object') {
      itemUserId = (itemUserId as any)._id || (itemUserId as any).id;
    }
    
    // Verify ownership
    if (String(userId) !== String(itemUserId)) {
      alert('You can only remove deals from items you own.');
      return;
    }
    
    try {
      setRemovingDeal(true);
      
      // Call the API to remove the deal
      await removeItemDeal(item._id);
      
      // Refresh the item data
      const updatedItem = await getItemById(item._id);
      setItem(updatedItem);
      
      // Reset UI state
      setRemovingDeal(false);
      
      console.log('Deal removed successfully');
    } catch (err) {
      console.error('Error removing deal:', err);
      setRemovingDeal(false);
      // Show error message to user
      alert('Failed to remove deal. Please try again.');
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
              onClick={async () => {
                // Get JWT token from localStorage and decode it
                const token = localStorage.getItem('token');
                if (!token) {
                  alert('Please log in to add items to favorites');
                  return;
                }
                
                // Decode the token to get the user ID
                const payload = parseJwt(token);
                if (!payload || !payload.id) {
                  alert('Invalid login session. Please log in again.');
                  return;
                }
                
                const userId = payload.id;
                setCurrentUserId(userId);
                
                try {
                  if (!isFavorite) {
                    // Add to favorites
                    await addToFavorite(userId, item._id);
                    setIsFavorite(true);
                    console.log(`Added to favorites: ${item.name}`);
                  } else {
                    // For now, just toggle the UI state since we don't have a remove function
                    // In a real app, you would call a removeFromFavorite function
                    setIsFavorite(false);
                    console.log(`Removed from favorites: ${item.name}`);
                  }
                } catch (error) {
                  console.error('Error updating favorites:', error);
                  alert('Failed to update favorites. Please try again.');
                }
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
            
            {/* Price display with deal info if applicable */}
            {item.deal && item.deal.isOnDeal ? (
              <div className="mb-4">
                <p className="text-xl font-bold text-green-600">
                  ${item.deal.dealPrice.toFixed(2)}
                  <span className="text-sm text-gray-500 line-through ml-2">
                    ${item.price.toFixed(2)}
                  </span>
                </p>
                <p className="text-sm text-green-600">
                  {Math.round((1 - item.deal.dealPrice / item.price) * 100)}% off
                  {item.deal.dealExpires && (
                    <span className="ml-2">
                      • Expires {new Date(item.deal.dealExpires).toLocaleDateString()}
                    </span>
                  )}
                </p>
              </div>
            ) : (
              <p className="text-xl font-bold text-[var(--color-primary)] mb-4">
                ${item.price.toFixed(2)}
              </p>
            )}
            
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
            
            {/* Owner-only actions: Deal management and Delete */}
            {isOwner && (
              <div className="mt-4 space-y-4">
                {/* Deal management */}
                {!showDealForm ? (
                  <div>
                    {item.deal && item.deal.isOnDeal ? (
                      <button 
                        className="w-full text-orange-600 border border-orange-600 py-2 px-4 rounded hover:bg-orange-50 transition-colors mb-2"
                        onClick={() => handleRemoveDeal()}
                        disabled={removingDeal}
                      >
                        {removingDeal ? 'Removing Deal...' : 'Remove Deal'}
                      </button>
                    ) : (
                      <button 
                        className="w-full text-green-600 border border-green-600 py-2 px-4 rounded hover:bg-green-50 transition-colors mb-2"
                        onClick={() => setShowDealForm(true)}
                      >
                        Set Deal
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="border border-green-200 rounded p-3 bg-green-50">
                    <h3 className="font-medium text-green-800 mb-2">Set a Deal</h3>
                    
                    <div className="mb-3">
                      <label htmlFor="discountPercentage" className="block text-sm text-gray-700 mb-1">
                        Discount Percentage:
                      </label>
                      <div className="flex items-center">
                        <input 
                          type="number" 
                          id="discountPercentage" 
                          value={discountPercentage} 
                          onChange={(e) => setDiscountPercentage(Math.min(99, Math.max(1, parseInt(e.target.value) || 0)))}
                          className="flex-1 border border-gray-300 rounded-md px-3 py-1 focus:ring-green-500 focus:border-green-500"
                          min="1"
                          max="99"
                        />
                        <span className="ml-2">%</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Deal price: ${(item.price * (1 - discountPercentage / 100)).toFixed(2)}
                      </p>
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="expirationDays" className="block text-sm text-gray-700 mb-1">
                        Expires in (days):
                      </label>
                      <input 
                        type="number" 
                        id="expirationDays" 
                        value={expirationDays} 
                        onChange={(e) => setExpirationDays(Math.max(1, parseInt(e.target.value) || 0))}
                        className="w-full border border-gray-300 rounded-md px-3 py-1 focus:ring-green-500 focus:border-green-500"
                        min="1"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Expires on: {new Date(Date.now() + expirationDays * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        className="flex-1 bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700 transition-colors"
                        onClick={handleSetDeal}
                        disabled={settingDeal}
                      >
                        {settingDeal ? 'Setting Deal...' : 'Apply Deal'}
                      </button>
                      <button 
                        className="flex-1 bg-gray-200 text-gray-800 py-1 px-3 rounded hover:bg-gray-300 transition-colors"
                        onClick={() => setShowDealForm(false)}
                        disabled={settingDeal}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Delete button */}
                <div>
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
