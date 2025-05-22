import { useEffect } from 'react'
import "./index.css";
import Navbar from "./components/navbar";
import PlaceholderHomePage from './components/PlaceholderHomePage'
import seedService from './services/seedService'

function App() {
  // Initialize database with seed data if needed
  useEffect(() => {
    seedService.initialize()
      .then(() => console.log('Database initialization complete'))
      .catch(error => console.error('Failed to initialize database:', error))
  }, [])

  return (
    <>
      <Navbar />
      <div className="app">
        <main className="main-content">
          <PlaceholderHomePage />
          <div className="bg-blue-500 text-white p-4 rounded">Tailwind Works!</div>
          <div className="bg-green-500 text-white p-4 text-2xl rounded">
            ✅ Tailwind is working now!
          </div>
        </main>
      </div>
    </>
  );
}
export default App;
