import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';

const Card = ({ item }) => {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_IMAGE_URL;
  const [isSaved, setIsSaved] = useState(false);
  const [showPulse, setShowPulse] = useState(false);

  // Check if the movie is already saved in localStorage on mount
  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
    setIsSaved(savedMovies.some((movie) => movie.id === item.id));
  }, [item.id]);

  // Toggle save state and update localStorage with pulse effect
  const toggleSave = (e) => {
    e.stopPropagation(); // Prevent navigating when clicking the save button
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
    let updatedMovies;

    if (isSaved) {
      // Remove from saved
      updatedMovies = savedMovies.filter((movie) => movie.id !== item.id);
      setIsSaved(false);
    } else {
      // Add to saved
      updatedMovies = [...savedMovies, item];
      setIsSaved(true);
      setShowPulse(true); // Trigger pulse animation
      setTimeout(() => setShowPulse(false), 1000); // Remove pulse after 1 second
    }

    localStorage.setItem('savedMovies', JSON.stringify(updatedMovies));
  };

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
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={toggleSave}
          className="relative text-white font-bold p-2.5 rounded-full bg-gradient-to-br from-red-600 to-red-800 shadow-md hover:shadow-red-500/70 hover:scale-110 transition-all duration-300 focus:outline-none opacity-0 group-hover:opacity-100"
          aria-label={isSaved ? 'Unsave movie' : 'Save movie'}
        >
          {isSaved ? <FaBookmark className="text-white text-lg" /> : <FaRegBookmark className="text-white text-lg" />}
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-max px-2 py-1 text-xs bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {isSaved ? 'Unsave' : 'Save'}
          </span>
          {showPulse && (
            <span className="absolute inset-0 rounded-full bg-red-500/50 animate-ping"></span>
          )}
        </button>
        <div className="bg-red-600 text-white text-xs sm:text-sm font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Watch Now
        </div>
      </div>
    </div>
  );
};

export default React.memo(Card);