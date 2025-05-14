import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "@/hooks/useFetch";
import MovieView from "@/components/movie-view/MovieView";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Import icons

const url = import.meta.env.VITE_IMAGE_URL;

const Singlemovie = () => {
  const { id } = useParams();
  const { data, error, loading } = useFetch(`/movie/${id}`);
  const { data: images } = useFetch(`/movie/${id}/images`);
  const { data: similar } = useFetch(`/movie/${id}/similar`);
  const galleryRef = useRef(null);

  if (loading) return <div className="text-center text-white text-xl py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 text-xl py-10">Error: {error.message}</div>;

  const scrollGallery = (direction) => {
    if (galleryRef.current) {
      const imageWidth = 200;
      const visibleImages = window.innerWidth >= 1024 ? 5 : window.innerWidth >= 768 ? 3 : 2;
      const scrollAmount = imageWidth * visibleImages;
      galleryRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen text-white">
      {/* Backdrop Image with Overlay */}
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-lg">
        <img
          src={url + data?.backdrop_path}
          alt={data?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-xl"></div>
        <h1 className="absolute bottom-6 left-6 text-2xl sm:text-3xl md:text-4xl font-bold">
          {data?.title}
        </h1>
      </div>

      {/* Movie Details */}
      <div className="mt-6 space-y-4">
        <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
          {data?.overview}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-red-500 text-sm sm:text-base font-semibold flex items-center gap-1">
            <span>★</span>
            {data?.vote_average?.toFixed(1)} / 10
          </span>
        </div>
        <strong className="block text-base sm:text-lg font-semibold text-gray-100">
          Budget: {data?.budget?.toLocaleString() || 'N/A'} USD
        </strong>
      </div>

      {/* Gallery Section with Navigation */}
      <div className="mt-8">
        <h3 className="text-xl sm:text-2xl font-bold mb-4">Kadr</h3>
        <div className="relative">
          <button
            onClick={() => scrollGallery('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition-colors focus:outline-none"
            aria-label="Scroll left"
          >
            <FaArrowLeft className="text-lg" />
          </button>
          <div
            ref={galleryRef}
            className="flex overflow-x-auto scrollbar-none snap-x snap-mandatory py-4 scroll-smooth w-full gap-4"
          >
            {images?.backdrops?.slice(0, 10)?.map((image) => (
              <div
                key={image.file_path}
                className="snap-start flex-shrink-0 relative rounded-lg overflow-hidden shadow-md hover:shadow-red-500/50 hover:scale-105 transition-all duration-300"
              >
                <img
                  src={url + image.file_path}
                  alt="Gallery image"
                  className="w-[200px] sm:w-[220px] md:w-[240px] h-[150px] sm:h-[180px] md:h-[200px] object-cover"
                />
              </div>
            ))}
          </div>
          <button
            onClick={() => scrollGallery('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition-colors focus:outline-none"
            aria-label="Scroll right"
          >
            <FaArrowRight className="text-lg" />
          </button>
        </div>
      </div>

      {/* Similar Movies */}
      <div className="mt-10">
        <h3 className="text-xl sm:text-2xl font-bold mb-4">Similar Movies</h3>
        <MovieView movies={similar?.results?.slice(0, 4)} />
      </div>
    </div>
  );
};

export default Singlemovie;