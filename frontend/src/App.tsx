import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ItemDetailPage from './components/ItemDetailPage';
import "./index.css";
import "./styles/dealAnimations.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import PlaceholderHomePage from './components/PlaceholderHomePage'
import Login from './components/Login'
import Registration from './components/Registration'
import SearchResultsPage from './pages/SearchResultsPage'
import FavoritesPage from './pages/FavoritesPage'
import DealsPage from './pages/DealsPage'
import UserPage from './components/UserPage'
import AddItemPage from './components/AddItemPage'
import CartPage from './components/CartPage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import TokenExpirationChecker from './components/TokenExpirationChecker';

function App() {

  return (
    <Router>
      <TokenExpirationChecker />
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
            <Route path="/deals" element={<DealsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/item/:id" element={<ItemDetailPage />} />
            <Route path="/add-item" element={<AddItemPage />} />
            <Route path="/edit-item/:id" element={<AddItemPage />} />
          </Routes>
        </main>

        {/* Optional spacing above the footer */}
        <div className="pt-[400px]" />

        {/* Footer component from the footer-layout branch */}
        <Footer />
      </div>
    </Router>
  );
}
export default App;
