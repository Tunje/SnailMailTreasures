import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';


export default function Navbar() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [cartCount] = useState(0);

  return (
    <>
      <nav className="fixed-auto top-0 left-10 right-10 w-full z-50 bg-[#FDF4DF] pt-2 pb-4 ">
        <div className="justify-between flex items-center w-full max-w-[1350px] mx-auto">
          {/* Logo */}
          <img
            src="/snailmail-logo.png"
            alt="Snailmail Logo"
            className="w-[102px] h-[100px] cursor-pointer hover:scale-105 transition"
            onClick={() => {
              navigate('/');
              setActiveNav(null);
            }}
          />

          <SearchBar />

          {/* Login and Cart */}
          <div className="flex items-center gap-4">
            {/* Login */}

            <button
              className="bg-[#7A7C56] rounded-full px-[14px] py-[9px]  hover:bg-[#D89C6A] transition p-[8px] mr-[10px] "
              onClick={() => {
                navigate('/login');
                setActiveNav('login');
              }}
            >
              LOGIN
            </button>

            {/* Cart */}
            <div className="relative ">
              <button
                className={`bg-[#7A7C56] rounded-full p-[8px] px-[14px] py-[9px] transition
        ${
          activeNav === 'cart'
            ? 'scale-105'
            : 'hover:bg-[#D89C6A] hover:scale-105 active:scale-95 '
        }`}
                onClick={() => {
                  setActiveNav('cart');
                  navigate('/cart');
                  setTimeout(() => setActiveNav(null), 500);
                }}
              >
                CART
              </button>
              <div className="absolute top-[-12px] right-[-5px]  font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </div>
            </div>
          </div>
        </div>

        {/* Banner */}
        <div className="clip-banner bg-[#CB8427] text-center py-4 max-w-[350px] mx-auto p-[8px]">
          <h1 className="text-8xl font-grover">Snail Mail</h1>
        </div>

        {/* Circles */}
        <div className="flex justify-around mt-[-4px] mb-8">
          {[
            { label: 'shop', path: '/shop' },
            { label: 'home', path: '/' },
            { label: 'deals', path: '/deals' },
            { label: 'favorites', path: '/favorites' },
          ].map(({ label, path }) => (
            <div
              key={label}
              className={`w-[80px] h-[75px] flex items-center justify-center rounded-full shadow-md font-grover text-sm font-bold
        cursor-pointer transition ${
          activeNav === label
            ? 'bg-blue-400 text-white'
            : 'bg-[#D89C6A] hover:scale-105 active:scale-95'
        }`}
              onClick={() => {
                setActiveNav(label);
                navigate(path);
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
    </>
  );
}
