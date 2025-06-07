import React from 'react';
import { Search } from 'lucide-react';

function SearchBar({ value, onChange }) {
  return (
    <div className="w-full max-w-md mx-auto flex items-center gap-3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus-within:ring-2 focus-within:ring-cyan-500 transition">
      <Search className="text-gray-500" size={20} />

      <input
        type="text"
        placeholder="Search notes..."
        value={value}
        onChange={onChange}
        className="flex-1 text-gray-700 placeholder-gray-400 bg-transparent outline-none text-sm"
      />
    </div>
  );
}

export default SearchBar;
