import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoHomeOutline, IoBookmarkOutline, IoSearchOutline, IoMenuOutline, IoCloseOutline } from 'react-icons/io5';
import { MdOutlineMovie } from 'react-icons/md';
import logo from '@/assets/logo.svg';
import './style.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="container mx-auto flex flex-wrap items-center justify-between py-4 gap-4 text-white mb-3 px-4">
      <div className="flex-shrink-0">
        <img src={logo} alt="Logo" className="h-10 w-auto" />
      </div>

      <button
        className="md:hidden text-white text-3xl focus:outline-none"
        onClick={toggleMenu}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
      >
        {isMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
      </button>

      <nav
        className={`${
          isMenuOpen ? 'flex' : 'hidden'
        } md:flex flex-col md:flex-row justify-center gap-4 md:gap-6 lg:gap-8 order-3 md:order-2 w-full md:w-auto mt-4 md:mt-0 md:bg-transparent absolute md:static top-16 left-0 md:top-auto md:left-auto z-10 md:z-auto px-4 md:px-0 py-4 md:py-0 transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 md:opacity-100'
        }`}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center header-link ${isActive ? 'text-red-500' : 'text-white'} hover:text-red-500 transition-colors py-2 md:py-0`
          }
          onClick={() => setIsMenuOpen(false)}
        >
          <IoHomeOutline className="text-xl md:text-2xl" />
          <span className="text-sm md:text-base">Home</span>
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            `flex flex-col items-center header-link ${isActive ? 'text-red-500' : 'text-white'} hover:text-red-500 transition-colors py-2 md:py-0`
          }
          onClick={() => setIsMenuOpen(false)}
        >
          <MdOutlineMovie className="text-xl md:text-2xl" />
          <span className="text-sm md:text-base">Movies</span>
        </NavLink>
        <NavLink
          to="/saved"
          className={({ isActive }) =>
            `flex flex-col items-center header-link ${isActive ? 'text-red-500' : 'text-white'} hover:text-red-500 transition-colors py-2 md:py-0`
          }
          onClick={() => setIsMenuOpen(false)}
        >
          <IoBookmarkOutline className="text-xl md:text-2xl" />
          <span className="text-sm md:text-base">Saved</span>
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) =>
            `flex flex-col items-center header-link ${isActive ? 'text-red-500' : 'text-white'} hover:text-red-500 transition-colors py-2 md:py-0`
          }
          onClick={() => setIsMenuOpen(false)}
        >
          <IoSearchOutline className="text-xl md:text-2xl" />
          <span className="text-sm md:text-base">Search</span>
        </NavLink>
      </nav>

      <div className="flex items-center gap-4 order-2 md:order-3">
        <div className="rounded bg-[#1D1D1D80] px-2 py-1">
          <select name="language" id="language" className="bg-transparent text-white text-sm outline-none">
            <option value="en" className="text-black">En</option>
            <option value="ru"  className="text-black">Ru</option>
            <option value="uz" className="text-black">Uz</option>
          </select>
        </div>
        <button className="bg-red-600 px-4 md:px-6 py-2 rounded-[5px] text-sm md:text-base hover:bg-red-700 transition-colors">
          Login
        </button>
      </div>
    </header>
  );
};

export default Header;