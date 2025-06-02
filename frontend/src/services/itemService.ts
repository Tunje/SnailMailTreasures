import api from './api';

// Re-export the Item interface to avoid circular dependencies
export interface Item {
  _id: string;
  name: string;      // Frontend uses name, backend uses itemName
  itemName?: string; // Backend field
  description: string;
  image: string;      // Frontend uses image, backend uses imageUrl
  imageUrl?: string;  // Backend field
  price: number;
  userId: string;
  createdAt: string;
  category?: string;  // Optional category field
}

// Get all items
export const getAllItems = async (): Promise<Item[]> => {
  const response = await api.get('/items/allitems');
  // Map backend field names to frontend field names
  return response.data.map((item: any) => ({
    ...item,
    name: item.name || item.itemName,
    image: item.image || item.imageUrl
  }));
};

// Get item by ID (client-side filtering to avoid CORS issues)
export const getItemById = async (id: string): Promise<Item> => {
  try {
    console.log('itemService: Starting to fetch all items');
    const startTime = Date.now();
    
    // Try to use a cached version of allItems if we've fetched them recently
    let response;
    try {
      console.log('itemService: Fetching all items from API');
      response = await api.get('/items/allitems');
      console.log(`itemService: All items fetched in ${Date.now() - startTime}ms`);
    } catch (apiError) {
      console.error('itemService: API error fetching all items:', apiError);
      throw new Error('Failed to fetch items from server');
    }
    
    if (!response.data) {
      console.error('itemService: No data returned from API');
      throw new Error('No data returned from server');
    }
    
    console.log(`itemService: Searching for item with ID ${id} among ${response.data.length} items`);
    const allItems = response.data;
    const item = allItems.find((item: any) => item._id === id);
    
    if (!item) {
      console.error(`itemService: Item with ID ${id} not found in ${allItems.length} items`);
      throw new Error(`Item with ID ${id} not found`);
    }
    
    console.log('itemService: Item found:', item);
    
    // Map backend field names to frontend field names
    const mappedItem = {
      ...item,
      name: item.name || item.itemName,
      image: item.image || item.imageUrl
    };
    
    console.log('itemService: Returning mapped item:', mappedItem);
    return mappedItem;
  } catch (error) {
    console.error('itemService: Error in getItemById:', error);
    throw error;
  }
};

// Get items by user ID
export const getItemsByUserId = async (userId: string): Promise<Item[]> => {
  const response = await api.get('/items/allitems');
  // Filter items by userId on the client side since the API doesn't have a direct endpoint
  return response.data.filter((item: Item) => item.userId === userId);
};

// Create a new item
export const createItem = async (itemData: Omit<Item, '_id' | 'createdAt'>): Promise<Item> => {
  const response = await api.post('/items/createitem', itemData);
  return response.data;
};

// Update item
export const updateItem = async (id: string, itemData: Partial<Item>): Promise<Item> => {
  const response = await api.put(`/items/updateitem/${id}`, itemData);
  return response.data;
};

// Delete item
export const deleteItem = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete(`/items/deleteitem/${id}`);
  return response.data;
};

// Search items
export const searchItems = async (query: string): Promise<Item[]> => {
  try {
    console.log('Searching with query:', query);
    
    // Since the search endpoint doesn't exist on the production server,
    // we'll get all items and filter them client-side
    const response = await api.get('/items/allitems');
    console.log('All items response:', response.data);
    
    // If no data or empty array, return empty array
    if (!response.data || response.data.length === 0) {
      return [];
    }
    
    // Filter items by name or description containing the query (case-insensitive)
    const lowercaseQuery = query.toLowerCase();
    const filteredItems = response.data.filter((item: any) => {
      const itemName = (item.itemName || item.name || '').toLowerCase();
      const description = (item.description || '').toLowerCase();
      return itemName.includes(lowercaseQuery) || description.includes(lowercaseQuery);
    });
    
    console.log('Filtered items:', filteredItems);
    
    // Map backend field names to frontend field names
    return filteredItems.map((item: any) => ({
      ...item,
      name: item.itemName || item.name,
      image: item.imageUrl || item.image
    }));
  } catch (error) {
    console.error('Error searching items:', error);
    return [];
  }
};
