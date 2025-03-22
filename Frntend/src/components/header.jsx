import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="bg-gradient-to-r from-blue-300 via-blue-200 to-blue-100 py-3 px-4 sm:px-5 flex justify-between items-center">
      {/* Logo Section */}
      <NavLink to="/">
        <h2 className="text-xl font-bold w-50 text-black leading-tight">
          Sam&apos;s Blog Site
          <p className="text-xs ml-2 mt-1 font-medium">
            Upload your daily blogs...!
          </p>
        </h2>
      </NavLink>

      {/* Hamburger Icon (Mobile) */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          className="text-3xl text-black hover:text-blue-700">
          <HiDotsVertical />
        </button>
      </div>

      {/* Navigation Links */}
      <nav
        className={`${
          menuOpen ? "block" : "hidden"
        } absolute top-16 right-0 w-40 bg-blue-300 border-none rounded-3xl md:bg-transparent md:static md:flex md:items-center md:gap-2 lg:gap-2 text-left md:text-left z-50 px-2 py-2 md:p-0 transition-all duration-300 ease-in-out`}>
        <ul className="w-full md:flex md:items-center md:gap-3 lg:gap-5 justify-end">
          {/* Nav Links */}
          <li className="mb-2 md:mb-0">
            <Link
              to="/home"
              className="text-sm sm:text-base md:text-lg px-2 sm:px-3 inline-block whitespace-nowrap hover:underline">
              Home
            </Link>
          </li>
          <li className="mb-2 md:mb-0">
            <Link
              to="/create"
              className="text-sm sm:text-base md:text-lg px-2 sm:px-1 inline-block whitespace-nowrap hover:underline">
              Upload Blog
            </Link>
          </li>
          <li className="mb-2 md:mb-0">
            <Link
              to="/about"
              className="text-sm sm:text-base md:text-lg px-2 sm:px-3 inline-block whitespace-nowrap hover:underline">
              About Us
            </Link>
          </li>
          <li className="mb-2 md:mb-0">
            <Link
              to="/contact"
              className="text-sm sm:text-base md:text-lg px-2 sm:px-3 inline-block whitespace-nowrap hover:underline">
              Contact Us
            </Link>
          </li>

          {/* Auth Buttons */}
          <li className="mb-2 md:mb-0 md:ml-3">
            <Link
              to="/login"
              className="inline-block whitespace-nowrap bg-blue-500 text-white text-sm sm:text-base py-1 px-3 sm:px-4 rounded-full hover:bg-blue-600 transition">
              Login
            </Link>
          </li>
          <li className="md:ml-2">
            <Link
              to="/signup"
              className="inline-block whitespace-nowrap bg-blue-500 text-white text-sm sm:text-base py-1 px-3 sm:px-4 rounded-full hover:bg-blue-600 transition">
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
