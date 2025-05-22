// src/pages/SearchResultsPage.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';

type Item = {
  _id: string;
  itemName: string;
  description: string;
  imageUrl: string;
  price: number;
};

export default function SearchResultsPage({ query }: { query: string }) {
  const [results, setResults] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) return;
      setLoading(true);
      try {
        const res = await axios.get<Item[]>(
          `http://localhost:3000/api/search?q=${encodeURIComponent(query)}`
        );
        setResults(res.data);
      } catch (err) {
        console.error('Error fetching search results:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="pt-32 px-8 min-h-screen bg-[#FDF4DF]">
      <h1 className="text-3xl font-bold mb-6">Search results for: "{query}"</h1>
      {loading ? (
        <p>Loading...</p>
      ) : results.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {results.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition"
            >
              <img
                src={item.imageUrl}
                alt={item.itemName}
                className="w-full h-48 object-cover rounded-md mb-2"
              />
              <h2 className="text-xl font-semibold">{item.itemName}</h2>
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
