import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type Item = {
  _id: string;
  itemName: string;
  description: string;
  imageUrl: string;
  price: number;
};

interface NavbarProps {
  onSearch: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Item[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [cartCount] = useState(0);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await axios.get<Item[]>(
          `http://localhost:3000/api/items/search?q=${encodeURIComponent(
            searchTerm
          )}`
        );
        setSearchResults(res.data);
        setShowResults(true);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#FDF4DF] pt-2 pb-4">
      <div className="px-4 flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <img
            src="/snailmail-logo.png"
            alt="Snailmail Logo"
            className="w-[102px] h-[100px] cursor-pointer hover:scale-105 transition"
            onClick={() => {
              navigate('/');
              setActiveNav(null);
              setShowResults(false);
              setSearchTerm('');
            }}
          />
<nav className="fixed top-0 left-0 w-full z-50 bg-[#FDF4DF] pt-2 pb-4">
  <div className="px-4 flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
    {/* Logo */}
    <div className="flex items-center gap-6">
      {/* Logo content from master branch would go here */}
    </div>

    {/* Search */}
    <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-md w-full md:w-[500px]">
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent outline-none px-2 text-sm flex-grow"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        className={`px-4 py-1 rounded-lg text-sm transition
          ${
            activeNav === "search"
              ? "bg-blue-400 text-white scale-105"
              : "bg-[#7A7C56] text-white hover:scale-105 active:scale-95"
          }`}
        onClick={() => {
          setActiveNav("search");
          // Here you could add code to trigger the search
          // For example: handleSearch(searchTerm);
          setTimeout(() => setActiveNav(null), 500);
        }}
      >
        SEARCH
      </button>
    </div>

    {/* Login/Cart */}
    <div className="flex gap-4 flex-wrap justify-center md:justify-end">
      <button
        className={`rounded-full font-grover px-4 py-3 text-lg transition
        ${
          activeNav === "login"
            ? "bg-blue-400 text-white scale-105"
            : "bg-gray-200 hover:bg-gray-300 hover:scale-105 active:scale-95"
        }`}
        onClick={() => {
          setActiveNav("login");
          navigate("/login");
          setTimeout(() => setActiveNav(null), 500);
        }}
      >
        login
      </button>

      <div className="relative">
        {/* Cart content from master branch would go here */}
      </div>
    </div>
  </div>
</nav>
            <button
              className={`px-4 py-1 rounded-lg text-sm transition ${
              }`}
            onClick={() => {
              setActiveNav('search');
              navigate('/search');
              onSearch(searchTerm);
              setSearchResults([]);
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
              }, 1000);
            }}
          >
            SEARCH
          </button>
        </div>
            >
              SEARCH
            </button>
          </div>

          {/* Login/Cart */}
          <div className="flex gap-4">
            <button
              className="bg-gray-200 rounded-full px-4 py-3 text-lg hover:bg-gray-300"
              onClick={() => {
                navigate('/login');
                setActiveNav('login');
                setShowResults(false);
                setSearchTerm('');
              }}
            >
              login
            </button>
            <div className="relative">
              <button
                className={`rounded-full font-grover px-4 py-3 text-lg transition
            ${
              activeNav === 'cart'
                ? 'bg-blue-400 text-white scale-105'
                : 'bg-gray-200 hover:bg-gray-300 hover:scale-105 active:scale-95'
            }`}
                onClick={() => {
                  setActiveNav('cart');
                  navigate('/cart');
                  setTimeout(() => setActiveNav(null), 500);
                }}
              >
                cart
              </button>
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </div>
            </div>
          </div>
        </div>
      
      {/* Banner */}
      <div className="clip-banner bg-[#CB8427] text-center py-6 md:py-8 mt-4 mb-2 md:mt-2 md:mb-1 w-full">
        <h1 className="text-5xl font-grover">Snail Mail</h1>
      </div>

        {/* Circles */}
        <div className="flex justify-around mt-[-4px] mb-8">
          {['shop', 'home', 'deals', 'favorites'].map((label) => (
            <div
              key={label}
              className={`w-[80px] h-[75px] flex items-center justify-center rounded-full shadow-md font-grover text-lg font-bold
              cursor-pointer transition ${
                activeNav === label
                  ? 'bg-blue-400 text-white'
                  : 'bg-[#D89C6A] hover:scale-105 active:scale-95'
              }`}
              onClick={() => {
                setActiveNav(label);
                navigate(`/${label}`);
              setTimeout(() => {
                setActiveNav(null);
              }, 500);
            }}
            >
              {label}
            </div>
          ))}
        </div>
      </nav>

      {/* ⬇️ Search Results */}
      <div className="pt-[300px] px-8 bg-[#FDF4DF] min-h-screen">
        {showResults && (
          <>
            <h1 className="text-3xl font-bold mb-6">
              Search results for: "{searchTerm}"
            </h1>
            {loading ? (
              <p>Loading...</p>
            ) : searchResults.length === 0 ? (
              <p>No items found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {searchResults.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.itemName}
                      className="w-full h-48 object-cover rounded-md mb-2"
                    />
                    <h2 className="text-xl font-semibold">{item.itemName}</h2>
                    <p className="text-gray-600 truncate">{item.description}</p>
                    <p className="text-[#CB8427] font-bold mt-1">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
