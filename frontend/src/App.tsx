import { useState, useEffect } from 'react'
import './scss/index.scss'
import PlaceholderNavbar from './components/PlaceholderNavbar'
import PlaceholderFooter from './components/PlaceholderFooter'
import PlaceholderHomePage from './components/PlaceholderHomePage'
import UserPage from './components/UserPage'
import ConsolePage from './components/ConsolePage'
import seedService from './services/seedService'

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'user' | 'items' | 'console'>('home')
  
  // Initialize database with seed data if needed
  useEffect(() => {
    seedService.initialize()
      .then(() => console.log('Database initialization complete'))
      .catch(error => console.error('Failed to initialize database:', error))
  }, [])

  // Handle navigation between pages
  const handleNavigation = (page: 'home' | 'user' | 'items' | 'console') => {
    setCurrentPage(page)
  }

  return (
    <div className="app">
      <PlaceholderNavbar onNavigate={handleNavigation} />
      <main className="main-content">
        {currentPage === 'home' && <PlaceholderHomePage />}
        {currentPage === 'user' && <UserPage />}
        {currentPage === 'items' && (
          <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>
            <h2>Items Page</h2>
            <p>This is a placeholder for the Items page. It will display all available items.</p>
          </div>
        )}
        {currentPage === 'console' && <ConsolePage />}
      </main>
      <PlaceholderFooter />
    </div>
  )
}

export default App
