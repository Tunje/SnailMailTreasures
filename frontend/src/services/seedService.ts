import seedData from '../data/seedData.json';
import { getAllUsers, createUser } from './userService';
import { createItem, Item } from './itemService';

/**
 * Service to handle database seeding operations
 */
export const seedService = {
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
      
      // Create users
      for (const userData of seedData.users) {
        try {
          const user = await createUser(userData);
          createdUsers.push(user);
          console.log(`Created user: ${user.username}`);
        } catch (error) {
          console.error(`Error creating user ${userData.username}:`, error);
        }
      }
      
      // Create items for each user
      for (let i = 0; i < seedData.items.length; i++) {
        const item = seedData.items[i];
        
        // Extract user index from the userId (e.g., "user1" -> 0)
        const userIndex = parseInt(item.userId.replace('user', '')) - 1;
        
        // Skip if user wasn't created successfully
        if (!createdUsers[userIndex]) {
          console.warn(`Skipping item ${item.name} as user index ${userIndex} was not created`);
          continue;
        }
        
        try {
          // Add real userId to the item data
          const itemData = {
            name: item.name,
            description: item.description,
            image: item.image,
            price: item.price,
            userId: createdUsers[userIndex]._id
          };
          
          const createdItem = await createItem(itemData);
          console.log(`Created item: ${createdItem.name} for user: ${createdUsers[userIndex].username}`);
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