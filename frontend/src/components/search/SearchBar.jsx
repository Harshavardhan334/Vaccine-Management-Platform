import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ setVaccines }) => {
  const [search, setSearch] = useState('');

  const handleSearch = async () => {
    if (search.trim() === '') return;

    try {
      const response = await axios.get(`http://localhost:4000/api/resident/vaccines/location/${encodeURIComponent(search)}`, { withCredentials: true });
      console.log("Fetched Data:", response.data);

      setVaccines(Array.isArray(response.data) ? response.data : [response.data]);
    } catch (error) {
      console.error("Error fetching vaccines:", error);
      setVaccines([]);
    }
  };

  return (
    <div className="p-4 flex space-x-2">
      <input
        type="text"
        placeholder="Enter location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 text-black border rounded w-full"
      />
      <button onClick={handleSearch} className="bg-white text-black hover:bg-slate-100 px-4 py-2 rounded">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
