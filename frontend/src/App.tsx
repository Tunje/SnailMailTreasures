import { useEffect } from 'react'
import './scss/index.scss'
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
    <div className="app">
      <main className="main-content">
        <PlaceholderHomePage />
      </main>
    </div>
  )
}

export default App
