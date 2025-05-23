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
        // Add a delay between user creation attempts to prevent database conflicts
        await this.delay(1000); // 1 second delay
        try {
          // Try to create the user with original username
          const user = await createUser(userData);
          createdUsers.push(user);
          console.log(`Created user: ${user.username}`);
        } catch (error) {
          console.error(`Error creating user ${userData.username}, trying with a unique username:`, error);
          
          // Try again with a unique username
          try {
            const uniqueUserData = {
              username: `${userData.username}_${Date.now()}`,
              email: `${userData.username}_${Date.now()}@example.com`
            };
            
            const user = await createUser(uniqueUserData);
            createdUsers.push(user);
            console.log(`Created user with unique name: ${user.username  || user.username}`);
          } catch (retryError) {
            console.error(`Failed to create user even with unique username:`, retryError);
          }
        }
      }
      
      // Create items with a hardcoded user ID
      for (let i = 0; i < seedData.items.length; i++) {
        const item = seedData.items[i];
        
        try {
          // Use a hardcoded user ID that exists in your database
          const hardcodedUserId = '646fa2a4c7ef5a8f144a5eff'; // Replace with a valid MongoDB ObjectId from your database
          
          // Add hardcoded userId to the item data and ensure all required fields are present
          const itemData = {
            itemName: item.name,
            description: item.description || 'No description provided',
            imageUrl: item.image || 'https://via.placeholder.com/150', // Fallback image URL
            category: 'Miscellaneous', // Default category since it's required
            price: item.price ? parseFloat(item.price.toString()) : 0, // Ensure price is a number
            userId: hardcodedUserId
          };
          
          // Log the data being sent to help debug
          console.log('Creating item with data:', JSON.stringify(itemData, null, 2));
          
          await createItem(itemData);
          console.log(`Created item: ${item.name} with hardcoded user ID`);
        } catch (error) {
          console.error(`Error creating item ${item.name}:`, error);
        }
      }
      
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