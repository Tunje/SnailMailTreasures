// src/pages/DealsPage.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllItems, Item } from '../services/itemService';

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

export default function DealsPage() {
  const [dealItems, setDealItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageLoadStatus, setImageLoadStatus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchDealItems = async () => {
      setLoading(true);
      try {
        // Get all items
        const allItems = await getAllItems();
        
        // Filter for items with active deals
        const itemsWithDeals = allItems.filter(item => 
          item.deal?.isOnDeal === true && 
          (!item.deal.dealExpires || new Date(item.deal.dealExpires) > new Date())
        );
        
        setDealItems(itemsWithDeals);
      } catch (err) {
        console.error('Error fetching deal items:', err);
        setDealItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDealItems();
  }, []);

  // Calculate savings percentage
  const calculateSavings = (originalPrice: number, dealPrice: number): number => {
    return Math.round(((originalPrice - dealPrice) / originalPrice) * 100);
  };

  return (
    <div className="pt-32 px-8 min-h-screen bg-[#FDF4DF]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[var(--color-primary)] mb-4">Special Deals</h1>
          <p className="text-xl text-gray-700">Limited time offers on unique collectibles!</p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-gray-500">Loading deals...</p>
          </div>
        ) : dealItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500 mb-4">No active deals at the moment.</p>
            <p className="text-gray-600">Check back soon for special offers!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {dealItems.map((item) => (
              <Link to={`/item/${item._id}`} key={item._id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div
                  className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition deal-item"
                >
                  {/* Savings badge */}
                  {item.deal?.dealPrice && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                      Save {calculateSavings(item.price, item.deal.dealPrice)}%
                    </div>
                  )}
                  
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
                  
                  <div className="flex flex-col mt-1 w-24">
                    <span className="text-sm line-through text-gray-500">${item.price.toFixed(2)}</span>
                    <div className="deal-price-animation">
                      <span className="text-xl font-bold text-red-600">
                        ${item.deal?.dealPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Deal expiration if available */}
                  {item.deal?.dealExpires && (
                    <p className="text-xs text-gray-500 mt-2">
                      Deal ends: {new Date(item.deal.dealExpires).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
