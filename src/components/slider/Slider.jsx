import React, { useState } from "react";
import { Swiper as SwiperCore, SwiperSlide } from "swiper/react";
import {
  FreeMode,
  Navigation,
  Thumbs,
  Autoplay,
  EffectFade,
} from "swiper/modules";


import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";
import { useFetch } from "@/hooks/useFetch";
import Skeleton from "../skeleton/Skeleton";

export default function MovieSlider() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { data, loading, error } = useFetch("/discover/movie");
  const imageBase = import.meta.env.VITE_IMAGE_URL;

  const movies = data?.results || [];

  if (loading) return <Skeleton count={4} />; 
  if (error) return <p className="text-center text-white">Error: {error.message}</p>;

  return (
    <div className="mb-12">
      <div className="container mx-auto px-4">
        <SwiperCore
          style={{ "--swiper-navigation-color": "#ef4444" }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          effect="fade"
          speed={600}
          modules={[FreeMode, Navigation, Thumbs, Autoplay, EffectFade]}
          className="w-full h-[400px] sm:h-[500px] md:h-[640px] rounded-xl overflow-hidden"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id} className="relative rounded-xl overflow-hidden">
              <img
                src={`${imageBase}${movie.backdrop_path || movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-xl"></div>
              <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2">
                <h2 className="text-white text-lg sm:text-xl md:text-2xl font-bold truncate">
                  {movie.title}
                </h2>
                <p className="text-red-500 text-sm sm:text-base font-medium flex items-center gap-1">
                  <span>★</span>
                  {movie.vote_average.toFixed(1)} / 10
                </p>
                <button className="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition-all w-max">
                  Watch Now
                </button>
              </div>
            </SwiperSlide>
          ))}
        </SwiperCore>
      </div>
    </div>
  );
}