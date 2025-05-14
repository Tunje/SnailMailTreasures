import React from 'react';

export default function Navbar() {
  return (
    <nav className="bg-yellow-100 p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src="/snailmail-logo.png"
            alt="Snailmail Treasures Logo"
            className="w-2 h-4" // 16x16px
          />
          <span className="font-bold text-green-800 text-sm">
            Snailmail Treasures
          </span>
        </div>

        {/* Search bar */}
        <div className="flex items-center bg-white px-2 py-1 rounded-full shadow">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none px-2 text-sm"
          />
          <button className="bg-green-700 text-white px-3 py-1 rounded-lg text-sm">
            SEARCH
          </button>
        </div>

        {/* Login + Cart */}
        <div className="flex gap-2">
          <button className="rounded-full bg-gray-200 px-3 py-1 text-sm">login</button>
          <button className="rounded-full bg-gray-200 px-3 py-1 text-sm">cart</button>
        </div>
      </div>

      {/* Main title */}
      <h1 className="text-center text-3xl font-bold font-serif text-rose-700 my-4">
        Snail Mail
      </h1>

      {/* Nav links */}
      <div className="flex justify-around bg-yellow-600 py-4 rounded-b-3xl">
        {['shop', 'home', 'deals', 'favorites'].map((label) => (
          <button
            key={label}
            className="rounded-full bg-orange-200 px-4 py-2 shadow text-sm font-bold"
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
