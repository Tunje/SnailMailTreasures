import React, { useState, useEffect } from 'react';
import { getAllItems } from '../services/itemService';
import { Item } from '../services/itemService';

const PlaceholderHomePage: React.FC = () => {
  const [featuredItems, setFeaturedItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedItems = async () => {
      try {
        setLoading(true);
        const items = await getAllItems();
        // Get random items to feature (up to 3)
        const randomItems = items.sort(() => 0.5 - Math.random()).slice(0, 3);
        setFeaturedItems(randomItems);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching featured items:', err);
        setError('Failed to load featured items. Please try again later.');
        setLoading(false);
      }
    };

    fetchFeaturedItems();
  }, []);
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to SnailMail Treasures</h1>
          <p>Discover unique collectibles and treasures from around the world</p>
          <button className="cta-button">Browse Items</button>
        </div>
      </section>

      <section className="featured-section">
        <h2>Featured Items</h2>
        <div className="featured-items">
          {loading ? (
            <div className="loading">Loading featured items...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : featuredItems.length === 0 ? (
            <div className="no-items">No featured items available at this time.</div>
          ) : (
            featuredItems.map((item) => (
              <div className="item-card" key={item._id}>
                <div 
                  className="item-image" 
                  style={{ backgroundImage: `url(${item.image})` }}
                ></div>
                <h3>{item.name}</h3>
                <p>{item.description.length > 100 ? `${item.description.substring(0, 100)}...` : item.description}</p>
                <span className="item-price">${item.price.toFixed(2)}</span>
                <button className="view-button">View Details</button>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="about-section">
        <h2>About SnailMail Treasures</h2>
        <div className="about-content">
          <div className="about-text">
            <p>SnailMail Treasures is your destination for unique collectibles and treasures delivered right to your mailbox. We connect collectors and enthusiasts with rare and interesting items from around the world.</p>
            <p>Whether you're looking for vintage postcards, rare stamps, or unique handcrafted items, our platform has something for everyone.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlaceholderHomePage;
