// src/components/SearchBar.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="flex items-center  rounded-full shadow-md w-[500px] pl-2">
      <input
        type="text"
        placeholder="Search..."
        className="bg-[#FFFFFF] outline-none text-sm flex-grow h-12 py-2 px-6 rounded-l-full p-[8px]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearch();
        }}
      />
      <button
        className="bg-[#7A7C56] px-4 py-1 rounded-r-full p-[8px] text-sm hover:scale-105 active:scale-95"
        onClick={handleSearch}
      >
        SEARCH
      </button>
    </div>
  );
}
