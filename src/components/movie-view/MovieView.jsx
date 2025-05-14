import React from 'react';
import CardCarousel from './CardCarousel';
import Slider from '../slider/Slider';
import { useLocation } from 'react-router-dom'; // Import useLocation

const MovieView = ({ movies }) => {
  const location = useLocation(); // Get current location

  return (
    <div className="container mx-auto px-4">
      {location.pathname === '/' && <Slider />} {/* Render Slider only on home page */}
      <CardCarousel items={movies} />
    </div>
  );
};

export default React.memo(MovieView);