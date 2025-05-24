import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import "./index.css";
import Navbar from "./components/navbar";
import PlaceholderHomePage from './components/PlaceholderHomePage'
import Login from './components/Login'
import Registration from './components/Registration'
import SearchResultsPage from './pages/SearchResultsPage'
import UserPage from './components/UserPage'
import seedService from './services/seedService'

function App() {
  // Initialize database with seed data if needed
  useEffect(() => {
    seedService.initialize()
      .then(() => console.log('Database initialization complete'))
      .catch(error => console.error('Failed to initialize database:', error))
  }, [])

  return (
    <Router>
      <Navbar />
      <div className="flex flex-col min-h-screen w-full max-w-7xl mx-auto">
        <main className="flex-1 py-8 px-4">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<PlaceholderHomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/search" element={<SearchResultsPage query={''} />} />
            <Route path="/shop" element={<SearchResultsPage query={''} />} />
            <Route path="/deals" element={<PlaceholderHomePage />} />
            <Route path="/favorites" element={<PlaceholderHomePage />} />
            <Route path="/cart" element={<PlaceholderHomePage />} />
            <Route path="/user" element={<UserPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
export default App;
