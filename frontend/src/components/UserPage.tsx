import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, getUserByUsername } from '../services/userService';
import { Item, getItemsByUserId } from '../services/itemService';

const UserPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [userItems, setUserItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch real user data from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // For demonstration purposes, we'll use a hardcoded username from our seed data
        // In a real app, this would come from authentication or route params
        const username = 'vintage_lover';
        
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
          
          const naUser: User = {
            _id: 'N/A',
            username: 'N/A',
            email: 'N/A'
          };
          
          // Set empty items array - no mock data
          const naItems: Item[] = [];
          
          setUser(naUser);
          setUserItems(naItems);
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
    return <div className="pt-24 w-full max-w-7xl mx-auto px-4 text-center py-6 text-gray-500">Loading user data...</div>;
  }
  
  if (error) {
    return (
      <div className="pt-24 w-full max-w-7xl mx-auto px-4 text-center py-6">
        <p className="text-red-500 mb-2">Error: {error}</p>
        <p className="text-gray-500">Please make sure MongoDB is running and the backend server is started.</p>
      </div>
    );
  }
  
  if (!user) {
    return <div className="pt-24 w-full max-w-7xl mx-auto px-4 text-center py-6 text-gray-500">User not found. Please log in.</div>;
  }
  
  return (
    <div className="pt-24 w-full max-w-7xl mx-auto px-4">
      <section className="bg-[var(--color-background)] rounded-lg p-4 mb-8">
        <h1 className="section-title">User Profile</h1>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 p-4">
          <div className="w-24 h-24 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-4xl font-bold">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-2">{user.username}</h2>
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
              <div key={item._id} className="card">
                <div 
                  className="h-48 bg-cover bg-center relative" 
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  {!item.image && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
                      <div className="text-white text-4xl">📷</div>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 text-[var(--color-primary)]">{item.name}</h3>
                  <p className="text-gray-600 mb-3 text-sm">{item.description}</p>
                  <p className="text-xl font-bold text-[var(--color-primary)] mb-4">${item.price.toFixed(2)}</p>
                  <div className="flex justify-between">
                    <button className="btn-secondary py-1 px-4">Edit</button>
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded-lg transition duration-300">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-8 text-center">
          <button 
            className="btn-primary"
            onClick={() => navigate('/add-item')}
          >
            + Add New Item
          </button>
        </div>
      </section>
    </div>
  );
};

export default UserPage;
