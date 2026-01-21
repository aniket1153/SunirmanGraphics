import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import img1 from '../assets/mylogo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/aboutmain' },
    { name: 'Services', path: '/OurServices' },
{ name: 'Gallery', path: '/Gallery' },
    { name: 'Contact Us', path: '/ContactForm' },
  ];

  return (
<header className="w-full fixed top-0 left-0 z-50 bg-[#0a1f44]">
    <nav className="max-w-[1280px] mx-auto pl-2 sm:pl-4 md:pl-1 pr-4 sm:pr-6 lg:pr-8 py-4 flex items-center justify-between">

        
        {/* Logo */}
        <Link to="/" className="flex items-start gap-3">
          <img
            src={img1}
            alt="Logo"
            className="h-10 sm:h-12 object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-white font-medium text-base lg:text-lg">
          {navItems.map((item) => (
            <li key={item.name} className="relative group">
              <Link
                to={item.path}
                className="transition-colors duration-300 hover:text-[#ff8c00]"
              >
                {item.name}
              </Link>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#ff8c00] transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}
        </ul>

        {/* Mobile Icon */}
        <div className="md:hidden text-white">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <ul className="absolute top-full right-4 mt-2 w-[230px] bg-[#0a1f44] border border-[#1f355f] shadow-xl rounded-md p-5 space-y-4 md:hidden">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="block text-white font-medium hover:text-[#ff8c00] transition-colors duration-200"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
