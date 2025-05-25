## Week 3 reflections

Updated Search results to fetches data from SeedData.son instead of the backend API and filters the items dynamically as the user types.
and its show the results in a dropdown below the search bar.

### I updated Item type : to match with seedData.json

-  In navbar.tsx : This is before updated
 <code>
    type Item = {
  _id: string;
  itemName: string;
  description: string;
  imageUrl: string;
  price: number;
};
</code>

- In seedData.json: 
  <code>
    {
  "name": "Vintage Postcard",
  "description": "A lovely vintage postcard...",
  "image": "https://example.com/image.jpg",
  "price": 5.99,
  "userId": "..."
}
</code>

- in navbar.tsx : after updated Item type
<code>
  type Item = {
  name: string;
  description: string;
  image: string;
  price: number;
  userId: string;
};
</code>

## Summary

### Using Local Data: No backend Call
  Fetching static data from SeedData.json

- It extracts the search term from the URL (/search?q=term).

- It filters the local SeedData.json for items that match the search term.

- Displays items in a responsive grid layout with image, name , description and price.
