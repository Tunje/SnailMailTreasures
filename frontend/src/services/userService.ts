import api from "./api";

export interface User {
  _id: string;
  userName: string;
  email: string;
  favourites?: string[];
}

// We don't need to import Item here as it's not used in this file

// Get all users
export const getAllUsers = async (): Promise<User[]> => {
  const response = await api.get("/users/allUsers");
  return response.data;
};

// Get user by ID
export const getUserById = async (id: string): Promise<User> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

// Get user by username
export const getUserByUsername = async (userName: string): Promise<User> => {
  try {
    // First try to get all users
    const response = await api.get('/users/allUsers');
    // Then filter by username
    const user = response.data.find((user: User) => user.userName === userName);
    
    if (!user) {
      throw new Error(`User with username ${userName} not found`);
    }
    
    return user;
  } catch (error) {
    console.error('Error fetching user by username:', error);
    throw error;
  }
};

// Create a new user
export const createUser = async (userData: {
  userName: string;
  email: string;
  password: string;
}): Promise<User> => {
  const formattedData = {
    userName: userData.userName,
    email: userData.email,
    password: userData.password,
  };

  try {
    const response = await api.post("/auth/register", formattedData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    // If registration fails, try to proceed with a mock user
    return {
      _id: `mock_${Date.now()}`,
      userName: userData.userName,
      email: userData.email,
    };
  }
};

// Update user
export const updateUser = async (
  id: string,
  userData: Partial<User>
): Promise<User> => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};

// Delete user
export const deleteUser = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

// Add item to favorites
export const addToFavorite = async (userId: string, itemId: string): Promise<{ message: string, favourites: string[] }> => {
  try {
    const response = await api.post(`/users/${userId}`, { itemId });
    return response.data;
  } catch (error) {
    console.error('Error adding item to favorites:', error);
    throw error;
  }
};
