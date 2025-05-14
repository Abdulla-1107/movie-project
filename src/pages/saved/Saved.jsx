import Card from '@/components/movie-view/Card';
import React, { useState, useEffect } from 'react';

const Saved = () => {
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem('savedMovies')) || [];
    setSavedMovies(movies);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen text-white">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Saved Movies</h1>
      {savedMovies.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">No saved movies yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {savedMovies.map((movie) => (
            <div key={movie.id} className="w-[220px] mx-auto">
              <Card item={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Saved;