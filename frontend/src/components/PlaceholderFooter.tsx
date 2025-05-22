import React from 'react';

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
              <li><a href="/">Home</a></li>
              <li><a href="/items">Browse Items</a></li>
              <li><a href="/user">My Account</a></li>
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
