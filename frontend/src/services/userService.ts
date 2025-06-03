import api from './api';

export interface User {
  _id: string;
  username: string;
  email: string;
}

// We don't need to import Item here as it's not used in this file

// Get all users
export const getAllUsers = async (): Promise<User[]> => {
  const response = await api.get('/users/allusers');
  return response.data;
};

// Get user by ID
export const getUserById = async (id: string): Promise<User> => {
  const response = await api.get(`/users/user/${id}`);
  return response.data;
};

// Get user by username
export const getUserByUsername = async (username: string): Promise<User> => {
  const response = await api.get(`/users/user/${username}`);
  return response.data;
};

// Create a new user
export const createUser = async (userData: { username: string; email: string }): Promise<User> => {
  const response = await api.post('/users/adduser', userData);
  return response.data;
};

// Update user
export const updateUser = async (id: string, userData: Partial<User>): Promise<User> => {
  const response = await api.put(`/users/updateuser/${id}`, userData);
  return response.data;
};

// Delete user
export const deleteUser = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete(`/users/deleteuser/${id}`);
  return response.data;
};
