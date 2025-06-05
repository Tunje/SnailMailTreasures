// src/pages/FavoritesPage.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getItemById, Item } from '../services/itemService';
import { getUserById } from '../services/userService';

// Convert gs:// Firebase Storage URL to public HTTP URL
function firebaseGsToHttpUrl(gsUrl: string): string {
  if (!gsUrl) return '';
  
  // Return placeholder for example.com links
  if (gsUrl.includes('example.com')) {
    return 'https://via.placeholder.com/300x200?text=Placeholder+Image';
  }
  
  const match = gsUrl.match(/^gs:\/\/snailmailtreasures\.firebasestorage\.app\/(.+)$/);
  if (!match) return gsUrl;
  const filename = encodeURIComponent(match[1]);
  return `https://firebasestorage.googleapis.com/v0/b/snailmailtreasures.firebasestorage.app/o/${filename}?alt=media`;
}

// Placeholder image URL - defined once to avoid recreating on each render
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/300x200?text=SnailMail+Treasures';

export default function FavoritesPage() {
  const [favoriteItems, setFavoriteItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageLoadStatus, setImageLoadStatus] = useState<Record<string, boolean>>({});

  // Parse JWT token to get user ID
  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Get JWT token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please log in to view your favorites');
          setLoading(false);
          return;
        }
        
        // Get user ID from token
        const payload = parseJwt(token);
        if (!payload || !payload.id) {
          setError('Invalid authentication. Please log in again.');
          setLoading(false);
          return;
        }
        
        const userId = payload.id;
        
        // Get user data to access favorites list
        const userData = await getUserById(userId);
        
        if (!userData.favourites || userData.favourites.length === 0) {
          setFavoriteItems([]);
          setLoading(false);
          return;
        }
        
        // Fetch each favorite item by ID
        const itemPromises = userData.favourites.map((itemId: string) => getItemById(itemId));
        const items = await Promise.all(itemPromises);
        
        setFavoriteItems(items);
      } catch (err) {
        console.error('Error fetching favorites:', err);
        setError('Failed to load favorite items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="pt-32 px-8 min-h-screen bg-[#FDF4DF]">
      <h1 className="text-3xl font-bold mb-6">My Favorite Items</h1>
      
      {loading ? (
        <p className="text-center py-12">Loading your favorites...</p>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500">{error}</p>
        </div>
      ) : favoriteItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">You haven't added any items to your favorites yet.</p>
          <Link to="/shop" className="mt-4 inline-block text-[var(--color-primary)] hover:underline">
            Browse items to add to your favorites
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favoriteItems.map((item) => (
            <Link to={`/item/${item._id}`} key={item._id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition">
                <div className="h-48 flex items-center justify-center overflow-hidden bg-gray-100 relative">
                  {/* Always show placeholder as background */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200 border border-amber-200 rounded">
                    <span className="text-center px-4 text-gray-500">SnailMail Treasures</span>
                  </div>
                  
                  {/* Only show actual image if URL exists */}
                  {(item.imageUrl || item.image) && (
                    <img 
                      src={firebaseGsToHttpUrl(item.imageUrl || item.image)} 
                      alt={item.itemName || item.name} 
                      className="relative z-10 h-full w-full object-contain transition-opacity duration-300"
                      style={{ 
                        opacity: imageLoadStatus[item._id] ? 1 : 0 
                      }}
                      onLoad={() => {
                        // Mark this image as loaded
                        setImageLoadStatus(prev => ({ ...prev, [item._id]: true }));
                      }}
                      onError={(e) => {
                        console.log('Image failed to load:', item.imageUrl || item.image);
                        // Hide the broken image
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                </div>
                <h2 className="text-xl font-semibold text-[var(--color-primary)] mt-2">{item.itemName || item.name}</h2>
                <p className="text-gray-600 truncate">{item.description}</p>
                <p className="text-[#CB8427] font-bold mt-1">
                  ${item.price.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
