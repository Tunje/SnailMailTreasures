import React from 'react';

interface PlaceholderNavbarProps {
  onNavigate?: (page: 'home' | 'user' | 'items' | 'console') => void;
}

const PlaceholderNavbar: React.FC<PlaceholderNavbarProps> = ({ onNavigate }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h1>SnailMail Treasures</h1>
        </div>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <a 
              href="#" 
              className="navbar-link" 
              onClick={(e) => {
                e.preventDefault();
                onNavigate && onNavigate('home');
              }}
            >
              Home
            </a>
          </li>
          <li className="navbar-item">
            <a 
              href="#" 
              className="navbar-link" 
              onClick={(e) => {
                e.preventDefault();
                onNavigate && onNavigate('items');
              }}
            >
              Items
            </a>
          </li>
          <li className="navbar-item">
            <a 
              href="#" 
              className="navbar-link" 
              onClick={(e) => {
                e.preventDefault();
                onNavigate && onNavigate('user');
              }}
            >
              My Account
            </a>
          </li>
          <li className="navbar-item">
            <a 
              href="#" 
              className="navbar-link" 
              onClick={(e) => {
                e.preventDefault();
                onNavigate && onNavigate('console');
              }}
            >
              Console
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default PlaceholderNavbar;
