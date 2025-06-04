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
  deal?: {
    isOnDeal: boolean;   // Indicates if the item is on deal
    dealPrice: number;   // Price during the deal
    dealExpires: Date | null; // Expiration date of the deal
  };
}

// Get all items
export const getAllItems = async (): Promise<Item[]> => {
  try {
    console.log('Fetching all items from:', `${api.defaults.baseURL}/items/allItems`);
    const response = await api.get('/items/allItems');
    console.log('Items response:', response.data);
    
    // Map backend field names to frontend field names
    return response.data.map((item: any) => ({
      ...item,
      name: item.itemName || item.name, // Prioritize backend field name
      image: item.imageUrl || item.image // Prioritize backend field name
    }));
  } catch (error) {
    console.error('Error fetching all items:', error);
    return [];
  }
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
      response = await api.get('/items/allItems');
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
    
    // Map backend field names to frontend field names
    const mappedItem = {
      ...item,
      name: item.itemName || item.name, // Prioritize backend field name
      image: item.imageUrl || item.image // Prioritize backend field name
    };
    
    console.log('itemService: Item found:', item);
    console.log('itemService: Returning mapped item:', mappedItem);
    return mappedItem;
  } catch (error) {
    console.error('itemService: Error in getItemById:', error);
    throw error;
  }
};

// Get items by user ID
export const getItemsByUserId = async (userId: string): Promise<Item[]> => {
  const response = await api.get('/items/allItems');
  // Filter items by userId on the client side since the API doesn't have a direct endpoint
  return response.data.filter((item: Item) => item.userId === userId);
};

// Create a new item
export const createItem = async (itemData: Omit<Item, '_id' | 'createdAt'>): Promise<Item> => {
  const response = await api.post('/items/createItem', itemData);
  return response.data;
};

// Update item
export const updateItem = async (id: string, itemData: Partial<Item>): Promise<Item> => {
  const response = await api.put(`/items/updateItem/${id}`, itemData);
  return response.data;
};

// Delete item
export const deleteItem = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete(`/items/${id}`);
  return response.data;
};

// Search items
export const searchItems = async (query: string): Promise<Item[]> => {
  try {
    console.log('Searching with query:', query);
    
    // Since the search endpoint doesn't exist on the production server,
    // we'll get all items and filter them client-side
    const response = await api.get('/items/allItems');
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

// Set a deal on an item
export const setItemDeal = async (
  id: string, 
  discountPercentage: number, 
  expirationDays?: number
): Promise<Item> => {
  try {
    // Get the current item to access its price
    const item = await getItemById(id);
    
    // Calculate the deal price based on the discount percentage
    const originalPrice = item.price;
    const dealPrice = originalPrice * (1 - discountPercentage / 100);
    
    // Set expiration date if provided, otherwise null
    let dealExpires = null;
    if (expirationDays) {
      dealExpires = new Date();
      dealExpires.setDate(dealExpires.getDate() + expirationDays);
    }
    
    // Create the deal object
    const dealData = {
      deal: {
        isOnDeal: true,
        dealPrice: parseFloat(dealPrice.toFixed(2)), // Round to 2 decimal places
        dealExpires: dealExpires
      }
    };
    
    // Update the item with the deal information
    const response = await api.put(`/items/updateItem/${id}`, dealData);
    return response.data;
  } catch (error) {
    console.error('Error setting item deal:', error);
    throw error;
  }
};

// Remove a deal from an item
export const removeItemDeal = async (id: string): Promise<Item> => {
  try {
    // Create the deal object with isOnDeal set to false
    const dealData = {
      deal: {
        isOnDeal: false,
        dealPrice: 0,
        dealExpires: null
      }
    };
    
    // Update the item to remove the deal
    const response = await api.put(`/items/updateItem/${id}`, dealData);
    return response.data;
  } catch (error) {
    console.error('Error removing item deal:', error);
    throw error;
  }
};
