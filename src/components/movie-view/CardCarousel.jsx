import React, { useRef } from 'react';
import Card from './Card'; 

const CardCarousel = ({ items }) => {
  const scrollRef = useRef(null);

  if (!items || items.length === 0) {
    return <p className="text-center text-white">Loading...</p>;
  }

  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = 220; // Card width (220px)
      const margin = 16; // Total margin between cards (mx-4 = 8px left + 8px right)
      const totalCardWidth = cardWidth + margin; // Total width per card including margin
      const visibleCards = window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 2 : 1;
      const scrollAmount = totalCardWidth * visibleCards; // Scroll by the exact width of visible cards
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 relative">
      <div className="flex items-center">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 z-10 bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition-colors focus:outline-none md:block"
          aria-label="Scroll left"
        >
          &lt;
        </button>
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-none snap-x snap-mandatory py-4 scroll-smooth w-full"
        >
          {items.map((item) => (
            <div key={item.id} className="snap-start flex-shrink-0">
              <Card item={item} />
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 z-10 bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition-colors focus:outline-none md:block"
          aria-label="Scroll right"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default CardCarousel;