// Utility functions for handling JWT tokens

/**
 * Checks if the JWT token is expired
 * @param token The JWT token to check
 * @returns true if the token is expired or invalid, false otherwise
 */
export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  
  try {
    // Get the payload part of the JWT (second part)
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));
    
    // Check if the exp field exists and is in the past
    const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
    return !payload.exp || payload.exp < currentTime;
  } catch (error) {
    // If there's any error parsing the token, consider it expired
    console.error('Error parsing token:', error);
    return true;
  }
};

/**
 * Gets the remaining time in seconds before the token expires
 * @param token The JWT token
 * @returns Seconds until expiration, or 0 if expired or invalid
 */
export const getTokenRemainingTime = (token: string | null): number => {
  if (!token) return 0;
  
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));
    
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp > currentTime ? payload.exp - currentTime : 0;
  } catch (error) {
    return 0;
  }
};
