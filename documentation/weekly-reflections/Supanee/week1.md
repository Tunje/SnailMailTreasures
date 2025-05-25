Week 1 reflections
I created Searchbar component, to fetch data from MongoDB using Schemas : backend/server/models/itemModel.ts and added searchRoute.ts : routes/searchRoute.ts

I updated Navbar.ts with Autocomplete so frontend can reach the backend.

Created a type for the items returned by the backend:


    type Item = {
  _id: string;
  itemName: string;
  description: string;
  category: string;
  imageUrl: string;
  price: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
};
Updated API Call insinde useEffect using axios : const res = await axios.get<Item[]>(http://localhost:3000/api/items/search?q=${encodeURIComponent(searchTerm)});

I changed CORS middleware to allow the actual frontend origin: app.use(cors({ origin: 'http://localhost:5173' }));

Summary
Docker was runing and I added items on mongo-express for test searchbar. Searchbar can not fetch data from MongoDB.
