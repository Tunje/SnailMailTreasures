import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { isTokenExpired } from '../utils/tokenUtils';

/**
 * Component that checks for token expiration when navigating between pages
 * and shows a notification if the token is expired
 */
const TokenExpirationChecker: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showingAlert, setShowingAlert] = useState(false);

  useEffect(() => {
    // Check token on route change
    const token = localStorage.getItem('token');
    
    // Skip check on login and registration pages
    if (location.pathname === '/login' || location.pathname === '/register') {
      return;
    }
    
    // Check if token exists and is not expired
    if (!token || isTokenExpired(token)) {
      // Only show alert if we haven't shown it yet
      if (!showingAlert) {
        setShowingAlert(true);
        alert('Your session has expired. Please log in again.');
        
        // Clear token and user data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Redirect to login page
        navigate('/login', { 
          state: { 
            from: location.pathname,
            expired: true
          } 
        });
      }
    }
  }, [location.pathname, navigate, showingAlert]);

  // This component doesn't render anything
  return null;
};

export default TokenExpirationChecker;
