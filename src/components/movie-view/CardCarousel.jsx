import React, { useRef } from 'react';
import Card from './Card';
import { useLocation } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; 

const CardCarousel = ({ items }) => {
  const scrollRef = useRef(null);
  const location = useLocation();

  if (!items || items.length === 0) {
    return <p className="text-center text-white">Loading...</p>;
  }

  const scroll = (direction) => {
    if (scrollRef.current && location.pathname === '/') {
      const cardWidth = 220;
      const margin = 16;
      const totalCardWidth = cardWidth + margin;
      const visibleCards = window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 2 : 1;
      const scrollAmount = totalCardWidth * visibleCards;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return location.pathname === '/' ? (
    <div className="container mx-auto px-4 py-6 relative">
      <div className="flex items-center">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 z-10 bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition-colors focus:outline-none md:block"
          aria-label="Scroll left"
        >
          <FaArrowLeft className="text-lg" />
        </button>
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-none snap-x snap-mandatory py-4 scroll-smooth w-full gap-0"
        >
          {items.map((item) => (
            <div key={item.id} className="snap-start flex-shrink-0">
              <Card item={item} style={{ margin: 0 }} />
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 z-10 bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition-colors focus:outline-none md:block"
          aria-label="Scroll right"
        >
          <FaArrowRight className="text-lg" />
        </button>
      </div>
    </div>
  ) : (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="w-[220px] mx-auto">
            <Card item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardCarousel;