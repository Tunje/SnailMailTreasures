import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartItem, getCart, updateCartItemQuantity, removeFromCart, clearCart, getCartTotal } from '../services/cartService';

// Convert gs:// Firebase Storage URL to public HTTP URL
function firebaseGsToHttpUrl(gsUrl: string): string {
  if (!gsUrl || !gsUrl.startsWith('gs://')) return gsUrl;
  const bucket = gsUrl.split('/')[2];
  const objectPath = gsUrl.split('/').slice(3).join('/');
  return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(objectPath)}?alt=media`;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingOut, setCheckingOut] = useState(false);
  const navigate = useNavigate();

  // Load cart items on component mount
  useEffect(() => {
    setCartItems(getCart());
    setLoading(false);
  }, []);

  // Handle quantity change
  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      const updatedCart = updateCartItemQuantity(itemId, newQuantity);
      setCartItems(updatedCart);
    }
  };

  // Handle item removal
  const handleRemoveItem = (itemId: string) => {
    const updatedCart = removeFromCart(itemId);
    setCartItems(updatedCart);
  };

  // Handle checkout
  const handleCheckout = () => {
    setCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      clearCart();
      setCartItems([]);
      setCheckingOut(false);
      
      // Show success message and redirect
      alert('Checkout successful! Thank you for your purchase.');
      navigate('/');
    }, 1500);
  };

  // Calculate cart total
  const cartTotal = getCartTotal();

  if (loading) {
    return <div className="pt-32 w-full max-w-7xl mx-auto px-4 text-center">Loading cart...</div>;
  }

  return (
    <div className="pt-32 w-full max-w-7xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-500 mb-6">Your cart is empty.</p>
          <Link to="/shop" className="btn-primary">Browse Items</Link>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {cartItems.map(item => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-16 w-16 flex-shrink-0 mr-4">
                          <img 
                            className="h-16 w-16 object-cover rounded" 
                            src={item.imageUrl ? 
                              (item.imageUrl.startsWith('gs://') ? firebaseGsToHttpUrl(item.imageUrl) : item.imageUrl) 
                              : (item.image || '/placeholder-image.png')} 
                            alt={item.name || item.itemName || 'Item'} 
                          />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {item.name || item.itemName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <button 
                          onClick={() => handleQuantityChange(item._id, Math.max(1, item.quantity - 1))}
                          className="px-2 py-1 border rounded-l bg-gray-100 hover:bg-gray-200"
                        >
                          -
                        </button>
                        <input 
                          type="number" 
                          min="1" 
                          value={item.quantity} 
                          onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value) || 1)}
                          className="w-12 text-center border-t border-b"
                        />
                        <button 
                          onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                          className="px-2 py-1 border rounded-r bg-gray-100 hover:bg-gray-200"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => handleRemoveItem(item._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-right font-bold">Total:</td>
                  <td className="px-6 py-4 text-gray-900 font-bold">${cartTotal.toFixed(2)}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
          
          <div className="flex justify-between items-center">
            <button 
              onClick={() => {
                if (window.confirm('Are you sure you want to clear your cart?')) {
                  clearCart();
                  setCartItems([]);
                }
              }}
              className="btn-secondary"
            >
              Clear Cart
            </button>
            
            <button 
              onClick={handleCheckout}
              disabled={checkingOut}
              className="btn-primary"
            >
              {checkingOut ? 'Processing...' : 'Proceed to Checkout'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
