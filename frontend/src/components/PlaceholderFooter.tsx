import React from 'react';
import { Link } from 'react-router-dom';

const PlaceholderFooter: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>SnailMail Treasures</h3>
            <p>Discover unique collectibles and treasures delivered right to your mailbox.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/home" className="hover:text-[#CB8427] transition-colors">Home</Link></li>
              <li><Link to="/shop" className="hover:text-[#CB8427] transition-colors">Shop</Link></li>
              <li><Link to="/deals" className="hover:text-[#CB8427] transition-colors">Deals</Link></li>
              <li><Link to="/favorites" className="hover:text-[#CB8427] transition-colors">Favorites</Link></li>
              <li><Link to="/login" className="hover:text-[#CB8427] transition-colors">Login</Link></li>
              <li><Link to="/cart" className="hover:text-[#CB8427] transition-colors">Cart</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <p>Email: info@snailmailtreasures.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} SnailMail Treasures. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default PlaceholderFooter;
