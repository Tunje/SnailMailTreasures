import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#FDF4DF] pt-2 pb-4">
      <div className="px-4 flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <img
            src="/snailmail-logo.png"
            alt="Snailmail Treasures Logo"
            className="w-[102px] h-[100px] cursor-pointer hover:scale-105 transition"
            onClick={() => {
              console.log("Logo clicked");
              navigate("/");
            }}
          />
        </div>

        {/* Search */}
        <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-md w-full md:w-[500px]">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none px-2 text-sm flex-grow"
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
            <button
              className={`rounded-full font-grover px-4 py-3 text-lg transition
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

      {/* Banner */}
      <div className="clip-banner bg-[#CB8427] text-center py-6 md:py-8 mt-4 mb-2 md:mt-2 md:mb-1 w-full">
        <h1 className="text-5xl font-grover">Snail Mail</h1>
      </div>

      {/* Circles */}
      <div className="flex justify-around mt-[-4px] mb-8">
        {["shop", "home", "deals", "favorites"].map((label) => (
          <div
            key={label}
            className={`w-[80px] h-[75px] flex items-center justify-center rounded-full shadow-md font-grover text-lg font-bold
                cursor-pointer transition
                ${
                  activeNav === label
                    ? "bg-blue-400  text-white"
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
    </nav>
  );
}
