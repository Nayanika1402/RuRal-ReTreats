import React, { useState, useEffect } from 'react';
import { FaBars, FaChevronDown, FaSearch, FaTimes } from 'react-icons/fa';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll to apply shadow or shrink effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-gradient-to-r from-green-200 to-emerald-300 py-4"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center space-x-3">
         
          <a href="/" className="flex items-center space-x-2">
            <img src="/img/favicon_114x114.png" alt="Logo" className="w-10 h-10 rounded-full" />
            <span className="text-2xl font-extrabold text-green-800 tracking-tight">
              Rural Retreats
            </span>
          </a>
        </div>
         <button className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <FaBars size={22} />
          </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 items-center font-medium text-green-900">
          <li>
            <a href="/" className="relative group">
              Home
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-700 transition-all group-hover:w-full"></span>
            </a>
          </li>
          <li className="relative group">
            <a href="/services" className="flex items-center gap-1 relative">
              Services <FaChevronDown size={12} />
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-700 transition-all group-hover:w-full"></span>
            </a>
            <ul className="absolute hidden group-hover:block bg-white shadow-md mt-2 p-2 rounded">
              <li><a href="/services#tours" className="block px-4 py-2 hover:bg-gray-100">Holiday Packages</a></li>
              <li><a href="/services#bus" className="block px-4 py-2 hover:bg-gray-100">Bus Booking</a></li>
              <li><a href="/services#homestays" className="block px-4 py-2 hover:bg-gray-100">Homestays Booking</a></li>
            </ul>
          </li>
          <li>
            <a href="/homestays" className="relative group">
              HomeStays
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-700 transition-all group-hover:w-full"></span>
            </a>
          </li>
          <li>
            <a href="/faq" className="relative group">
              FAQs
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-700 transition-all group-hover:w-full"></span>
            </a>
          </li>
          <li>
            <a href="/contact" className="relative group font-semibold">
              Contact Us
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-700 transition-all group-hover:w-full"></span>
            </a>
          </li>
        </ul>

        {/* Desktop Search + Login */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex border rounded overflow-hidden">
            <input type="text" placeholder="Search..." className="px-2 py-1 outline-none" />
            <button className="bg-green-700 text-white px-3"><FaSearch /></button>
          </div>
          <button 
            onClick={() => window.location.href="/login"} 
            className="bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-800 transition"
          >
            Log In
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0  bg-opacity-50 z-50 flex">
          <div className="bg-white w-64 h-full p-6 transform transition-transform duration-300 translate-x-0">
            <button 
              className="absolute top-4 right-4 text-2xl" 
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaTimes />
            </button>
            <div className="mb-6 mt-12">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full border px-2 py-1 rounded" 
              />
            </div>
            <ul className="space-y-6 font-medium text-green-900">
              <li><a href="/" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
              <li><a href="/services" onClick={() => setMobileMenuOpen(false)}>Services</a></li>
              <li><a href="/homestays" onClick={() => setMobileMenuOpen(false)}>HomeStays</a></li>
              <li><a href="/faq" onClick={() => setMobileMenuOpen(false)}>FAQs</a></li>
              <li><a href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact Us</a></li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
