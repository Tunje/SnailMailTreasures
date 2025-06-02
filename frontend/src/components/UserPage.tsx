import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../services/userService';
import { Item, deleteItem } from '../services/itemService';

// Convert gs:// Firebase Storage URL to public HTTP URL
function firebaseGsToHttpUrl(gsUrl: string): string {
  // gs://snailmailtreasures.firebasestorage.app/filename.jpg
  const match = gsUrl.match(/^gs:\/\/snailmailtreasures\.firebasestorage\.app\/(.+)$/);
  if (!match) return gsUrl;
  const filename = encodeURIComponent(match[1]);
  return `https://firebasestorage.googleapis.com/v0/b/snailmailtreasures.firebasestorage.app/o/${filename}?alt=media`;
}


const UserPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [userItems, setUserItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);

  
  // Fetch real user data from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // Get JWT token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please log in.');
          setLoading(false);
          return;
        }
        
        // Decode JWT to get user id
        function parseJwt (token: string) {
          try {
            return JSON.parse(atob(token.split('.')[1]));
          } catch (e) {
            return null;
          }
        }
        
        const payload = parseJwt(token);
        if (!payload || !payload.id) {
          setError('Invalid token. Please log in again.');
          setLoading(false);
          return;
        }
        
        const userId = payload.id;
        console.log('User ID from token:', userId);
        
        let userData: User | null = null;
        let fetchSuccess = false;
        
        // Try method 1: Get user by ID directly
        try {
          const { getUserById } = await import('../services/userService');
          userData = await getUserById(userId);
          console.log('User data from getUserById:', userData);
          if (userData && userData._id) {
            fetchSuccess = true;
          }
        } catch (error) {
          console.log('getUserById failed, trying alternative method:', error);
        }
        
        // Try method 2: Get all users and find by ID
        if (!fetchSuccess) {
          try {
            const { getAllUsers } = await import('../services/userService');
            const allUsers = await getAllUsers();
            const foundUser = allUsers.find(u => String(u._id) === String(userId));
            if (foundUser) {
              userData = foundUser;
            }
            console.log('User data from getAllUsers:', userData);
            if (userData && userData._id) {
              fetchSuccess = true;
            }
          } catch (error) {
            console.log('getAllUsers failed:', error);
          }
        }
        
        // If both methods failed, use N/A fallback
        if (!fetchSuccess) {
          console.log('All user data fetch methods failed, using N/A fallback');
          userData = {
            _id: userId || 'N/A',
            userName: 'N/A',
            email: 'N/A'
          };
        }
        
        setUser(userData);
        
        // Try to fetch user's items
        try {
          // Get all items and filter client-side to handle different userId formats
          const { getAllItems } = await import('../services/itemService');
          const allItems = await getAllItems();
          console.log('All items:', allItems);
          
          // Filter items that match the user ID, handling different formats
          const userItems = allItems.filter(item => {
            // Get the item's userId, which could be a string or an object
            let itemUserId = item.userId;
            
            // Handle case where userId is an object with _id or id property
            if (itemUserId && typeof itemUserId === 'object') {
              itemUserId = (itemUserId as any)._id || (itemUserId as any).id;
            }
            
            // Compare as strings to handle different formats
            const isMatch = String(itemUserId) === String(userId);
            console.log(`Item ${item._id} (${item.name || item.itemName}): userId=${itemUserId}, comparing with ${userId}, match=${isMatch}`);
            return isMatch;
          });
          
          console.log(`Found ${userItems.length} items for user ${userId}:`, userItems);
          setUserItems(userItems);
        } catch (itemError) {
          console.error('Error fetching user items:', itemError);
          setUserItems([]);
        }
      } catch (err) {
        console.error('Error in user data fetch process:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, []);
  
  if (loading) {
    return <div className="pt-32 w-full max-w-7xl mx-auto px-4 text-center py-12 text-gray-500">Loading user data...</div>;
  }
  
  if (error) {
    return (
      <div className="pt-32 w-full max-w-7xl mx-auto px-4 text-center py-12">
        <p className="text-red-500 mb-2">Error: {error}</p>
        <p className="text-gray-500">Please make sure MongoDB is running and the backend server is started.</p>
      </div>
    );
  }
  
  if (!user) {
    return <div className="pt-32 w-full max-w-7xl mx-auto px-4 text-center py-12 text-gray-500">User not found. Please log in.</div>;
  }
  
  return (
    <div className="pt-32 w-full max-w-7xl mx-auto px-4">
      <section className="bg-[var(--color-background)] rounded-lg p-8 mb-8">
        <h1 className="section-title">User Profile</h1>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 p-4">
          <div className="w-24 h-24 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-4xl font-bold">
            {user.userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-2">{user.userName}</h2>
            <p className="text-gray-700 mb-1"><span className="font-semibold">Email:</span> {user.email}</p>
            <p className="text-gray-700 mb-4"><span className="font-semibold">Member since:</span> {new Date().toLocaleDateString()}</p>
            <button className="btn-secondary">Edit Profile</button>
          </div>
        </div>
      </section>
      
      <section className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="section-title">My Items</h2>
        {userItems.length === 0 ? (
          <p className="text-center text-gray-500 py-8">You haven't listed any items yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {userItems.map(item => (
              <div key={item._id} className="card relative">
                {/* Image and basic info are clickable to view item */}
                <Link to={`/item/${item._id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <div 
                    className="h-48 bg-cover bg-center" 
                    style={{ 
                      backgroundImage: `url(${item.imageUrl 
                        ? (item.imageUrl.startsWith('gs://') ? firebaseGsToHttpUrl(item.imageUrl) : item.imageUrl) 
                        : (item.image || '/placeholder-image.png')})` 
                    }}
                  ></div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2 text-[var(--color-primary)]">{item.name || item.itemName}</h3>
                    <p className="text-gray-600 mb-3 text-sm line-clamp-2">{item.description}</p>
                    <p className="text-xl font-bold text-[var(--color-primary)] mb-4">
                      ${typeof item.price === 'number' ? item.price.toFixed(2) : '0.00'}
                    </p>
                  </div>
                </Link>
                
                {/* Buttons are outside the Link to prevent navigation when clicked */}
                <div className="p-4 pt-0 flex justify-between">
                  <button 
                    className="btn-secondary py-1 px-4"
                    onClick={() => navigate(`/edit-item/${item._id}`)}
                  >
                    Edit
                  </button>
                  <button 
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded-lg transition duration-300"
                    onClick={() => {
                      setDeletingItemId(item._id);
                      setShowDeleteConfirm(true);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Delete confirmation modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
              <p className="mb-6">Are you sure you want to delete this item? This action cannot be undone.</p>
              <div className="flex justify-end gap-4">
                <button 
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeletingItemId(null);
                  }}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  onClick={async () => {
                    if (deletingItemId) {
                      try {
                        await deleteItem(deletingItemId);
                        // Remove the deleted item from the list
                        setUserItems(userItems.filter(item => item._id !== deletingItemId));
                      } catch (err) {
                        console.error('Error deleting item:', err);
                        alert('Failed to delete item. Please try again.');
                      }
                      setShowDeleteConfirm(false);
                      setDeletingItemId(null);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="mt-8 text-center">
          <Link className="btn-primary" to="/add-item">+ Add New Item</Link>
        </div>

      </section>
    </div>
  );
};

export default UserPage;
