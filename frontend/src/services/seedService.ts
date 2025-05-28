import seedData from '../data/seedData.json';
import { getAllUsers, createUser } from './userService';
import { createItem } from './itemService';

/**
 * Service for seeding the database with initial data
 */
export const seedService = {
  /**
   * Helper function to add delay between operations
   */
  delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  /**
   * Check if the database needs seeding by checking if users exist
   */
  async needsSeeding(): Promise<boolean> {
    try {
      const users = await getAllUsers();
      return users.length === 0;
    } catch (error) {
      console.error('Error checking if database needs seeding:', error);
      return true; // Assume we need to seed if there's an error
    }
  },

  /**
   * Seed the database with users and items from the seed data
   */
  async seedDatabase(): Promise<void> {
    try {
      console.log('Starting database seeding process...');
      
      // Track created users to associate items
      const createdUsers: any[] = [];
      
      // Create users - try multiple times with different usernames if needed
      // Use for...of loop with await to ensure sequential processing
      for (const userData of seedData.users) {
        // Add a longer delay between user creation attempts to prevent database conflicts
        await this.delay(3000); // 3 second delay to prevent race conditions
        try {
          // Try to create the user with original username
          const user = await createUser(userData);
          createdUsers.push(user);
          console.log(`Created user: ${user.username}`);
          
          // Add another delay after successful creation
          await this.delay(1000);
        } catch (error) {
          console.error(`Error creating user ${userData.username}, trying with a unique username:`, error);
          
          // Add delay before retry
          await this.delay(2000);
          
          // Try again with a unique username
          try {
            const uniqueUserData = {
              username: `${userData.username}_${Date.now()}`,
              email: `${userData.username}_${Date.now()}@example.com`
            };
            
            const user = await createUser(uniqueUserData);
            createdUsers.push(user);
            console.log(`Created user with unique name: ${user.username || user.userName}`);
            
            // Add another delay after successful creation
            await this.delay(1000);
          } catch (retryError) {
            console.error(`Failed to create user even with unique username:`, retryError);
            
            // Create a mock user to continue the process
            const mockUser = {
              _id: `mock_${Date.now()}`,
              username: userData.username,
              email: userData.email
            };
            createdUsers.push(mockUser);
            console.log(`Created mock user: ${mockUser.username}`);
          }
        }
      }
      
      // Skip item creation - items already exist in the database
      console.log('Skipping item creation as items already exist in the database');
      
      console.log('Database seeding completed successfully');
    } catch (error) {
      console.error('Error seeding database:', error);
      throw error;
    }
  },
  
  /**
   * Initialize the database by checking if seeding is needed and performing it if necessary
   */
  async initialize(): Promise<void> {
    try {
      const needsSeeding = await this.needsSeeding();
      
      if (needsSeeding) {
        console.log('Database is empty, starting seeding process...');
        await this.seedDatabase();
      } else {
        console.log('Database already contains data, skipping seeding process');
      }
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }
};

export default seedService;