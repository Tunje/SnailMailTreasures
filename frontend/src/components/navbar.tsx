import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  // Search state is managed by the SearchResultsPage component
  const navigate = useNavigate();

  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [cartCount] = useState(0);

  // We don't need to fetch search results here as we're navigating to the search page

  return (
    <>
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#FDF4DF] pt-1 pb-2">
      {/* Main content area with logo, search, login/cart - Positioned in front of banner */}
      <div className="px-4 flex flex-col gap-2 md:flex-row md:justify-between md:items-center relative z-10 pb-1">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <img
            src="/snailmail-logo.png"
            alt="Snailmail Treasures Logo"
            className="w-[70px] h-[70px] cursor-pointer hover:scale-105 transition"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>

        {/* Search */}
        <div className="flex items-center bg-white px-3 py-1 rounded-full shadow-md w-full md:w-[400px]">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none px-2 text-sm flex-grow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className={`px-3 py-1 rounded-lg text-sm transition
    ${
      activeNav === "search"
        ? "bg-blue-400 text-white scale-105"
        : "bg-[#7A7C56] text-white hover:scale-105 active:scale-95"
    }`}
            onClick={() => {
              setActiveNav("search");
              navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
              setTimeout(() => setActiveNav(null), 500);
            }}
          >
            SEARCH
          </button>
        </div>

        {/* Login/Cart */}
        <div className="flex gap-3 flex-wrap justify-center md:justify-end">
          <button
            className={`rounded-full font-grover px-3 py-2 text-base transition
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

          <button
            className={`rounded-full font-grover px-3 py-2 text-base transition
            ${
              activeNav === "user"
                ? "bg-blue-400 text-white scale-105"
                : "bg-gray-200 hover:bg-gray-300 hover:scale-105 active:scale-95"
            }`}
            onClick={() => {
              setActiveNav("user");
              navigate("/user");
              setTimeout(() => setActiveNav(null), 500);
            }}
          >
            user
          </button>

          <div className="relative">
            <button
              className={`rounded-full font-grover px-3 py-2 text-base transition
            ${
              activeNav === "cart"
                ? "bg-blue-400 text-white scale-105"
                : "bg-gray-200 hover:bg-gray-300 hover:scale-105 active:scale-95"
            }`}
              onClick={() => {
                setActiveNav("cart");
                navigate("/cart");
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
      
      {/* Banner - In the middle with z-index to keep it behind buttons */}
      <div className="clip-banner bg-[#CB8427] text-center py-3 w-full relative z-0">
        <h1 className="text-4xl font-grover">Snail Mail</h1>
      </div>
      
      {/* Circles - In front of the banner, halfway below, rearranged with 2 on each side */}
      <div className="flex justify-between px-8 -mt-8 mb-1 relative z-10">
        <div className="flex gap-4">
          {["shop", "home"].map((label) => (
            <div
              key={label}
              className={`w-[60px] h-[55px] flex items-center justify-center rounded-full shadow-md font-grover text-sm font-bold
                  cursor-pointer transition
                  ${
                    activeNav === label
                      ? "bg-blue-400 text-white"
                      : "bg-[#D89C6A] hover:scale-105 active:scale-95"
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
        
        <div className="flex gap-4">
          {["deals", "favorites"].map((label) => (
            <div
              key={label}
              className={`w-[60px] h-[55px] flex items-center justify-center rounded-full shadow-md font-grover text-sm font-bold
                  cursor-pointer transition
                  ${
                    activeNav === label
                      ? "bg-blue-400 text-white"
                      : "bg-[#D89C6A] hover:scale-105 active:scale-95"
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
      </div>
    </nav>
    {/* Spacer element to push content down - height matches navbar height */}
    <div className="h-[130px] w-full"></div>
    </>
  );
}
