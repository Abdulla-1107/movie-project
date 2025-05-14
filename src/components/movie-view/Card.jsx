import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ item }) => {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_IMAGE_URL;

  return (
    <div
      className="card relative group bg-dark rounded-xl overflow-hidden shadow-md hover:shadow-red-500/60 transition-all duration-300 ease-in-out cursor-pointer w-[220px] mx-2 sm:mx-3 md:mx-4"
      onClick={() => navigate(`/movie/${item.id}`)}
    >
      <div className="relative h-[380px] sm:h-[400px] md:h-[420px]">
        <img
          className="w-full h-full object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          src={url + item.poster_path}
          alt={item.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl"></div>
      </div>
      <div className="p-2 sm:p-3 text-center">
        <h3 className="text-white text-sm sm:text-base md:text-lg font-semibold truncate">{item.title}</h3>
        <p className="text-red-500 text-xs sm:text-sm md:text-base font-medium mt-1 flex items-center justify-center">
          <span className="mr-1">★</span>
          {item.vote_average.toFixed(1)} / 10
        </p>
      </div>
      <div className="absolute top-2 right-2 bg-red-600 text-white text-xs sm:text-sm font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Watch Now
      </div>
    </div>
  );
};

export default React.memo(Card);