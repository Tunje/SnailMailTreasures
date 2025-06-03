import api from './api';

// Re-export the Item interface to avoid circular dependencies
export interface Item {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  userId: string;
  createdAt: string;
}

// Get all items
export const getAllItems = async (): Promise<Item[]> => {
  const response = await api.get('/items/allitems');
  return response.data;
};

// Get item by ID
export const getItemById = async (id: string): Promise<Item> => {
  const response = await api.get(`/items/${id}`);
  return response.data;
};

// Get items by user ID
export const getItemsByUserId = async (userId: string): Promise<Item[]> => {
  const response = await api.get('/items/allitems');
  // Filter items by userId on the client side since the API doesn't have a direct endpoint
  return response.data.filter((item: Item) => item.userId === userId);
};

// Create a new item
export const createItem = async (itemData: Omit<Item, '_id' | 'createdAt'>): Promise<Item> => {
  const response = await api.post('/items', itemData);
  return response.data;
};

// Update item
export const updateItem = async (id: string, itemData: Partial<Item>): Promise<Item> => {
  const response = await api.put(`/items/${id}`, itemData);
  return response.data;
};

// Delete item
export const deleteItem = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete(`/items/${id}`);
  return response.data;
};
