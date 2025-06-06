import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCartTotal, clearCart } from '../services/cartService';

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingInfo, setShippingInfo] = useState<any>(null);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    // Get cart total
    const total = getCartTotal();
    setCartTotal(total);
    
    // Redirect if cart is empty
    if (total === 0) {
      navigate('/cart');
      return;
    }
    
    // Get shipping info from session storage
    const storedShippingInfo = sessionStorage.getItem('shippingInfo');
    if (!storedShippingInfo) {
      // If no shipping info, redirect to shipping page
      navigate('/shipping');
      return;
    }
    
    setShippingInfo(JSON.parse(storedShippingInfo));
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Add space after every 4 digits
    let formatted = '';
    for (let i = 0; i < digits.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += ' ';
      }
      formatted += digits[i];
    }
    
    return formatted.substring(0, 19); // Limit to 16 digits + 3 spaces
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData(prev => ({
      ...prev,
      cardNumber: formatted
    }));
    
    if (errors.cardNumber) {
      setErrors(prev => ({
        ...prev,
        cardNumber: ''
      }));
    }
  };

  const formatExpiryDate = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Format as MM/YY
    if (digits.length <= 2) {
      return digits;
    }
    
    return `${digits.substring(0, 2)}/${digits.substring(2, 4)}`;
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setFormData(prev => ({
      ...prev,
      expiryDate: formatted
    }));
    
    if (errors.expiryDate) {
      setErrors(prev => ({
        ...prev,
        expiryDate: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Validate card number (should be 16 digits)
    const cardDigits = formData.cardNumber.replace(/\D/g, '');
    if (!cardDigits) {
      newErrors.cardNumber = 'Card number is required';
    } else if (cardDigits.length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    
    // Validate card name
    if (!formData.cardName.trim()) {
      newErrors.cardName = 'Name on card is required';
    }
    
    // Validate expiry date
    const expiryDigits = formData.expiryDate.replace(/\D/g, '');
    if (!expiryDigits) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (expiryDigits.length !== 4) {
      newErrors.expiryDate = 'Expiry date must be in MM/YY format';
    } else {
      const month = parseInt(expiryDigits.substring(0, 2));
      const year = parseInt(expiryDigits.substring(2, 4));
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits of year
      const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11
      
      if (month < 1 || month > 12) {
        newErrors.expiryDate = 'Invalid month';
      } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
        newErrors.expiryDate = 'Card has expired';
      }
    }
    
    // Validate CVV
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV must be 3 or 4 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsProcessing(true);
      
      // Simulate payment processing
      setTimeout(() => {
        // Clear cart and shipping info
        clearCart();
        sessionStorage.removeItem('shippingInfo');
        
        // Show success message and redirect
        alert('Payment successful! Thank you for your order.');
        navigate('/');
      }, 2000);
    }
  };

  const getShippingCost = () => {
    if (!shippingInfo) return 0;
    
    const shippingMethods = {
      standard: 4.99,
      express: 9.99,
      overnight: 19.99
    };
    
    return shippingMethods[shippingInfo.shippingMethod as keyof typeof shippingMethods] || 0;
  };

  const getOrderTotal = () => {
    return cartTotal + getShippingCost();
  };

  if (!shippingInfo) {
    return <div className="pt-32 w-full max-w-7xl mx-auto px-4 text-center">Loading...</div>;
  }

  return (
    <div className="pt-32 w-full max-w-7xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Payment Information</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Credit Card Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number*
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleCardNumberChange}
                    className={`w-full p-2 border rounded-md ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                    maxLength={19}
                  />
                  {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                </div>
                
                <div>
                  <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                    Name on Card*
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md ${errors.cardName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date (MM/YY)*
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleExpiryDateChange}
                      className={`w-full p-2 border rounded-md ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'}`}
                      maxLength={5}
                    />
                    {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                      CVV*
                    </label>
                    <input
                      type="password"
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
                      maxLength={4}
                    />
                    {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="saveCard"
                    name="saveCard"
                    checked={formData.saveCard}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor="saveCard" className="ml-2 block text-sm text-gray-700">
                    Save card for future purchases
                  </label>
                </div>
                
                <div className="text-xs text-gray-500 mt-2">
                  <p>This is a demo payment form. No actual payment will be processed.</p>
                  <p>Your card information will not be saved or transmitted anywhere.</p>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Billing Address</h3>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-700">
                  {shippingInfo.firstName} {shippingInfo.lastName}<br />
                  {shippingInfo.address}<br />
                  {shippingInfo.city}, {shippingInfo.postalCode}<br />
                  {shippingInfo.country}<br />
                  {shippingInfo.phone}<br />
                  {shippingInfo.email}
                </p>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={() => navigate('/shipping')}
                className="btn-secondary"
              >
                Back to Shipping
              </button>
              
              <button
                type="submit"
                disabled={isProcessing}
                className="btn-primary"
              >
                {isProcessing ? 'Processing Payment...' : `Pay $${getOrderTotal().toFixed(2)}`}
              </button>
            </div>
          </form>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-32">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping ({shippingInfo.shippingMethod})</span>
                <span className="font-medium">${getShippingCost().toFixed(2)}</span>
              </div>
              
              <div className="border-t border-gray-200 my-2 pt-2 flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold">${getOrderTotal().toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mt-4 text-xs text-gray-500">
              <p>Shipping to:</p>
              <p className="mt-1">
                {shippingInfo.firstName} {shippingInfo.lastName}<br />
                {shippingInfo.address}<br />
                {shippingInfo.city}, {shippingInfo.postalCode}<br />
                {shippingInfo.country}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
