// src/pages/SearchResultsPage.tsx
import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { getAllItems, searchItems, Item } from '../services/itemService';

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

// Using Item type imported from itemService

// Placeholder image URL - defined once to avoid recreating on each render
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/300x200?text=SnailMail+Treasures';

// Preload the placeholder image
const preloadImage = new Image();
preloadImage.src = PLACEHOLDER_IMAGE;

export default function SearchResultsPage({ query }: { query: string }) {
  // Also get query from URL parameters
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const urlQuery = searchParams.get('q') || query;
  const [results, setResults] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [imageLoadStatus, setImageLoadStatus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        // If query is empty, get all items (for shop page)
        let items;
        if (!urlQuery || !urlQuery.trim()) {
          items = await getAllItems();
        } else {
          items = await searchItems(urlQuery);
        }
        
        setResults(items);
      } catch (err) {
        console.error('Error fetching search results:', err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [urlQuery]);

  return (
    <div className="pt-32 px-8 min-h-screen bg-[#FDF4DF]">
      <h1 className="text-3xl font-bold mb-6">
        {!urlQuery || !urlQuery.trim() ? "All Items" : `Search results for: "${urlQuery}"`}
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : results.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No items found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {results.map((item) => (
  <Link to={`/item/${item._id}`} key={item._id} style={{ textDecoration: 'none', color: 'inherit' }}>
    <div
      className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition"
    >
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
