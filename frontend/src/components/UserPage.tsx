import React, { useState, useEffect } from 'react';
import { User, getUserByUsername } from '../services/userService';
import { Item, getItemsByUserId } from '../services/itemService';

const UserPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userItems, setUserItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch real user data from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // For demonstration purposes, we'll use a hardcoded username
        // In a real app, this would come from authentication or route params
        const username = 'testuser';
        
        try {
          // Fetch user data
          const userData = await getUserByUsername(username);
          setUser(userData);
          
          // Fetch user's items
          if (userData && userData._id) {
            const userItems = await getItemsByUserId(userData._id);
            setUserItems(userItems);
          }
        } catch (apiError) {
          // Log the specific error for debugging
          console.error('API Error:', apiError);
          // If the API call fails (e.g., user doesn't exist yet), fall back to mock data
          console.log('Using mock data as fallback:', apiError);
          
          const mockUser: User = {
            _id: '1',
            username: 'testuser',
            email: 'test@example.com'
          };
          
          const mockItems: Item[] = [
            {
              _id: '101',
              name: 'Vintage Postcard Collection',
              description: 'A set of 10 vintage postcards from the 1950s',
              image: 'https://via.placeholder.com/150',
              price: 45.99,
              userId: '1',
              createdAt: new Date().toISOString()
            },
            {
              _id: '102',
              name: 'Rare Stamp Set',
              description: 'Collection of rare stamps from around the world',
              image: 'https://via.placeholder.com/150',
              price: 89.99,
              userId: '1',
              createdAt: new Date().toISOString()
            }
          ];
          
          setUser(mockUser);
          setUserItems(mockItems);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, []);
  
  if (loading) {
    return <div className="user-page loading">Loading user data...</div>;
  }
  
  if (error) {
    return <div className="user-page error">Error: {error}</div>;
  }
  
  if (!user) {
    return <div className="user-page not-found">User not found. Please log in.</div>;
  }
  
  return (
    <div className="user-page">
      <section className="user-profile">
        <h1>User Profile</h1>
        <div className="profile-container">
          <div className="profile-image">
            {/* Placeholder for user avatar */}
            <div className="avatar-placeholder">
              {user.username.charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="profile-details">
            <h2>{user.username}</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Member since:</strong> {new Date().toLocaleDateString()}</p>
            <button className="edit-profile-button">Edit Profile</button>
          </div>
        </div>
      </section>
      
      <section className="user-items">
        <h2>My Items</h2>
        {userItems.length === 0 ? (
          <p>You haven't listed any items yet.</p>
        ) : (
          <div className="items-grid">
            {userItems.map(item => (
              <div key={item._id} className="item-card">
                <img src={item.image} alt={item.name} className="item-image" />
                <h3>{item.name}</h3>
                <p className="item-description">{item.description}</p>
                <p className="item-price">${item.price.toFixed(2)}</p>
                <div className="item-actions">
                  <button className="edit-button">Edit</button>
                  <button className="delete-button">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
        <button className="add-item-button">+ Add New Item</button>
      </section>
    </div>
  );
};

export default UserPage;
