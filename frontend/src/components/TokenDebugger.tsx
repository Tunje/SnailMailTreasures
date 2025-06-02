import React, { useState, useEffect } from 'react';

const TokenDebugger: React.FC = () => {
  const [tokenData, setTokenData] = useState<any>(null);
  const [showDebugger, setShowDebugger] = useState(false);

  useEffect(() => {
    // Parse JWT token
    const parseJwt = (token: string) => {
      try {
        return JSON.parse(atob(token.split('.')[1]));
      } catch (e) {
        return null;
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      const decoded = parseJwt(token);
      setTokenData(decoded);
    }
  }, []);

  if (!tokenData) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button 
        className="bg-gray-800 text-white px-3 py-1 rounded-md text-sm"
        onClick={() => setShowDebugger(!showDebugger)}
      >
        {showDebugger ? 'Hide' : 'Show'} Token Debug
      </button>
      
      {showDebugger && (
        <div className="mt-2 p-4 bg-white border border-gray-300 rounded-md shadow-lg max-w-md overflow-auto max-h-80">
          <h3 className="font-bold mb-2">Token Data:</h3>
          <pre className="text-xs bg-gray-100 p-2 rounded">
            {JSON.stringify(tokenData, null, 2)}
          </pre>
          
          <div className="mt-4">
            <h3 className="font-bold mb-2">User ID:</h3>
            <code className="bg-yellow-100 p-1 rounded text-sm">
              {tokenData.id || tokenData.userId || 'Not found'}
            </code>
          </div>
          
          <div className="mt-4">
            <button 
              className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
              onClick={() => {
                const item = JSON.parse(localStorage.getItem('lastViewedItem') || '{}');
                console.log('Current item:', item);
                console.log('Item user ID:', item.userId);
                console.log('Your user ID:', tokenData.id);
                console.log('Match?', item.userId === tokenData.id);
                alert(`Your ID: ${tokenData.id}\nItem owner ID: ${item.userId}\nMatch: ${item.userId === tokenData.id}`);
              }}
            >
              Compare with Current Item
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenDebugger;
