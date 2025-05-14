import React, { useState } from 'react';
import { useFetch } from '@/hooks/useFetch';

const Genres = ({ setGenre }) => {
  const { data } = useFetch("/genre/movie/list");
  const [activeGenre, setActiveGenre] = useState(null); // Track active genre

  return (
    <div className='container mx-auto py-6 px-4 bg-dark/50 backdrop-blur-md rounded-lg shadow-lg'>
      <div className='flex items-center gap-3 overflow-x-auto scrollbar-none'>
        {data?.genres.map((item) => (
          <span
            onClick={() => {
              setGenre(item.id.toString()); // Update parent state
              setActiveGenre(item.id); // Set active genre
            }}
            key={item.id}
            className={`px-4 py-2 bg-gray-800/80 text-white rounded-[14px] text-sm sm:text-base font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap
              ${activeGenre === item.id 
                ? 'bg-red-600 shadow-[0_4px_15px_rgba(239,68,68,0.4)] scale-105' 
                : 'hover:bg-red-600 hover:shadow-[0_4px_15px_rgba(239,68,68,0.4)] hover:scale-105'}`}
          >
            {item.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Genres;