// src/pages/SearchResultsPage.tsx
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllItems, searchItems, Item } from '../services/itemService';

// Using Item type imported from itemService

export default function SearchResultsPage({ query }: { query: string }) {
  // Also get query from URL parameters
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const urlQuery = searchParams.get('q') || query;
  const [results, setResults] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

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
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition"
            >
              <div 
                className="h-48 bg-cover bg-center" 
                style={{ backgroundImage: `url(${item.imageUrl || item.image})` }}
              ></div>
              <h2 className="text-xl font-semibold text-[var(--color-primary)] mt-2">{item.itemName || item.name}</h2>
              <p className="text-gray-600 truncate">{item.description}</p>
              <p className="text-[#CB8427] font-bold mt-1">
                ${item.price.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
