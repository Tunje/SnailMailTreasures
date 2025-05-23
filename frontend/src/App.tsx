import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import SearchResultsPage from './pages/SearchResultsPage';
import Footer from './components/Footer';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Shop from './pages/Shop';
import Favorites from './pages/Favorites';
import Deals from './pages/Deals';
import Register from './pages/Register';

function App() {
  return (
    <>
      <Navbar /> {/* Always rendered */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/search" element={<SearchResultsPage query="example-query" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/register" element={<Register />} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer /> {/* Always rendered */}
    </>
  );
}

export default App;
