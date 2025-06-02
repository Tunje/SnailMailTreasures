import { Item } from './itemService';

// Define the cart item interface
export interface CartItem extends Item {
  quantity: number;
}

// Local storage key for cart
const CART_STORAGE_KEY = 'snailmail_cart';

// Get cart from localStorage
export const getCart = (): CartItem[] => {
  const cartJson = localStorage.getItem(CART_STORAGE_KEY);
  return cartJson ? JSON.parse(cartJson) : [];
};

// Save cart to localStorage
export const saveCart = (cart: CartItem[]): void => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};

// Add item to cart
export const addToCart = (item: Item, quantity: number = 1): CartItem[] => {
  const cart = getCart();
  
  // Check if item is already in cart
  const existingItemIndex = cart.findIndex(cartItem => cartItem._id === item._id);
  
  if (existingItemIndex >= 0) {
    // Update quantity if item exists
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Add new item to cart
    cart.push({ ...item, quantity });
  }
  
  saveCart(cart);
  return cart;
};

// Remove item from cart
export const removeFromCart = (itemId: string): CartItem[] => {
  let cart = getCart();
  cart = cart.filter(item => item._id !== itemId);
  saveCart(cart);
  return cart;
};

// Update item quantity in cart
export const updateCartItemQuantity = (itemId: string, quantity: number): CartItem[] => {
  const cart = getCart();
  const itemIndex = cart.findIndex(item => item._id === itemId);
  
  if (itemIndex >= 0) {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      return removeFromCart(itemId);
    } else {
      // Update quantity
      cart[itemIndex].quantity = quantity;
      saveCart(cart);
    }
  }
  
  return cart;
};

// Clear the entire cart
export const clearCart = (): CartItem[] => {
  const emptyCart: CartItem[] = [];
  saveCart(emptyCart);
  return emptyCart;
};

// Calculate cart total
export const getCartTotal = (): number => {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Get cart item count
export const getCartItemCount = (): number => {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
};
