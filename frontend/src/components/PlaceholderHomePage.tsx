import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllItems } from '../services/itemService';
import { Item } from '../services/itemService';

const PlaceholderHomePage: React.FC = () => {
  const navigate = useNavigate();
  const [featuredItems, setFeaturedItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFeaturedItems = async () => {
      try {
        setLoading(true);
        const items = await getAllItems();
        // Get random items to feature (up to 3)
        const randomItems = items.sort(() => 0.5 - Math.random()).slice(0, 3);
        setFeaturedItems(randomItems);
      } catch (err) {
        console.error('Error fetching featured items:', err);
        setFeaturedItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedItems();
  }, []);
  return (
    <div className="pt-32 w-full max-w-7xl mx-auto px-4">
      <section className="py-16 bg-[var(--color-background)] rounded-lg mb-12 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-4">Welcome to SnailMail Treasures</h1>
          <p className="text-xl text-gray-700 mb-8">Discover unique collectibles and treasures from around the world</p>
          <button 
            className="btn-primary rounded-full py-3 px-8 transform hover:scale-105"
            onClick={() => navigate('/shop')}
          >
            Browse Items
          </button>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="section-title mb-8">Featured Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full text-center py-12 text-gray-500">Loading featured items...</div>
          ) : featuredItems.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-red-500 mb-2">Unable to connect to the backend server.</p>
              <p className="text-gray-500">Please make sure MongoDB is running and the backend server is started.</p>
            </div>
          ) : (
            featuredItems.map((item) => (
              <div className="card" key={item._id}>
                <div 
                  className="h-48 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${item.image})` }}
                ></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-[var(--color-primary)]">{item.name}</h3>
                  <p className="text-gray-600 mb-4">{item.description.length > 100 ? `${item.description.substring(0, 100)}...` : item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-[var(--color-primary)]">${item.price.toFixed(2)}</span>
                    <button className="btn-primary">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="bg-[var(--color-background)] rounded-lg p-8 mb-16">
        <h2 className="section-title">About SnailMail Treasures</h2>
        <div className="max-w-3xl mx-auto">
          <div className="text-gray-700 space-y-4">
            <p className="text-lg">SnailMail Treasures is your destination for unique collectibles and treasures delivered right to your mailbox. We connect collectors and enthusiasts with rare and interesting items from around the world.</p>
            <p className="text-lg">Whether you're looking for vintage postcards, rare stamps, or unique handcrafted items, our platform has something for everyone.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlaceholderHomePage;
