import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import seedData from '../data/seedData.json'; // Adjust path as needed

type Item = {
  name: string;
  description: string;
  image: string;
  price: number;
  userId: string;
};

export default function SearchResultsPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q') || '';

  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setFilteredItems([]);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      // Access the items array in the JSON
      const results = seedData.items.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredItems(results);
      setLoading(false);
    }, 300);
  }, [query]);

  return (
    <div className="pt-6">
      <h1 className="text-3xl font-bold mb-6">Search results for: "{query}"</h1>
      {loading ? (
        <p>Loading...</p>
      ) : filteredItems.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-md mb-2"
              />
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
