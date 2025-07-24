import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-nepal-blue text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold flex items-center">
            🏔️ Hotel Nepal
          </Link>
          <ul className="flex space-x-6">
            <li>
              <Link 
                to="/" 
                className="hover:text-nepal-red transition duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/hotels" 
                className="hover:text-nepal-red transition duration-200"
              >
                Hotels
              </Link>
            </li>
            <li>
              <Link 
                to="/bookings" 
                className="hover:text-nepal-red transition duration-200"
              >
                My Bookings
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
