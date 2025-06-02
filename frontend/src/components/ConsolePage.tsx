import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../services/userService';
import { getAllItems } from '../services/itemService';

// Convert gs:// Firebase Storage URL to public HTTP URL
function firebaseGsToHttpUrl(gsUrl: string): string {
  // gs://snailmailtreasures.firebasestorage.app/filename.jpg
  const match = gsUrl.match(/^gs:\/\/snailmailtreasures\.firebasestorage\.app\/(.+)$/);
  if (!match) return gsUrl;
  const filename = encodeURIComponent(match[1]);
  return `https://firebasestorage.googleapis.com/v0/b/snailmailtreasures.firebasestorage.app/o/${filename}?alt=media`;
}


interface ConsoleData {
  users: any[];
  items: any[];
}

const ConsolePage: React.FC = () => {
  const [data, setData] = useState<ConsoleData>({ users: [], items: [] });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'users' | 'items'>('users');

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const [users, items] = await Promise.all([
          getAllUsers(),
          getAllItems()
        ]);
        setData({ users, items });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data for console:', err);
        setError('Failed to load data. Please try again later.');
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="console-page">
        <div className="loading">Loading data from backend...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="console-page">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="console-page">
      <h1>Admin Console</h1>
      <div className="console-tabs">
        <button 
          className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Users ({data.users.length})
        </button>
        <button 
          className={`tab-button ${activeTab === 'items' ? 'active' : ''}`}
          onClick={() => setActiveTab('items')}
        >
          Items ({data.items.length})
        </button>
      </div>

      <div className="console-content">
        {activeTab === 'users' && (
          <div className="users-table">
            <h2>Users</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Items Count</th>
                </tr>
              </thead>
              <tbody>
                {data.users.map(user => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{data.items.filter(item => item.userId === user._id).length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'items' && (
          <div className="items-table">
            <h2>Items</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Owner</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map(item => {
                  const owner = data.users.find(user => user._id === item.userId);
                  return (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>{item.imageUrl ? (
                        <img src={firebaseGsToHttpUrl(item.imageUrl)} alt={item.name} style={{width:'60px',height:'60px',objectFit:'cover',borderRadius:'8px'}} />
                      ) : (
                        item.image ? <img src={item.image} alt={item.name} style={{width:'60px',height:'60px',objectFit:'cover',borderRadius:'8px'}} /> : <span>No Image</span>
                      )}</td>
                      <td>{item.name}</td>
                      <td className="description-cell">{item.description.substring(0, 50)}...</td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>{owner ? owner.username : 'Unknown'}</td>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsolePage;
