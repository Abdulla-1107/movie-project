import React from 'react';
import CardCarousel from './CardCarousel';

const MovieView = ({ movies }) => {
  return (
    <div className="container mx-auto px-4">
      <CardCarousel items={movies} />
    </div>
  );
};

export default React.memo(MovieView);