# SnailMailTreasures Startup Guide

## Prerequisites

### Starting MongoDB
The application requires MongoDB to be running:

```bash
# On Windows, start MongoDB service (if installed as a service)
net start MongoDB

# OR using the mongod command
mongod --dbpath="C:\data\db"
```

Make sure MongoDB is running on the default port (27017) before starting the backend.

## Quick Start

### Starting the Backend
```bash
cd backend
npm start
```

### Starting the Frontend
```bash
cd frontend
npm run dev
```
Access the application at: http://localhost:5173

## Seed Mechanism

The application automatically seeds the database on first startup:

1. When the frontend loads, `seedService.initialize()` is called in `App.tsx`
2. The service checks if users exist in the database
3. If no users exist, it creates:
   - 8 users (vintage_lover, stamp_collector, etc.)
   - 50+ items associated with these users
4. Seed data is defined in `frontend/src/data/seedData.json`

This ensures the application has sample data for demonstration purposes without manual setup.
