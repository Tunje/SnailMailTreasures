// src/pages/SearchResultsPage.tsx
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

type Item = {
  _id: string;
  name: string; // Backend uses 'name' instead of 'itemName'
  description: string;
  image: string; // Backend uses 'image' instead of 'imageUrl'
  price: number;
};

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
        const endpoint = !urlQuery || !urlQuery.trim() 
          ? 'http://localhost:3000/api/items/allitems' 
          : `http://localhost:3000/api/items/search?q=${encodeURIComponent(urlQuery)}`;
          
        const res = await axios.get<Item[]>(endpoint);
        setResults(res.data);
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
          <p className="text-red-500 mb-2">Unable to connect to the backend server.</p>
          <p className="text-gray-500">Please make sure MongoDB is running and the backend server is started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {results.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition"
            >
              <div className="relative w-full h-48 mb-2 rounded-md overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
                    <div className="text-white text-4xl">📷</div>
                  </div>
                )}
              </div>
              <h2 className="text-xl font-semibold">{item.name}</h2>
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
