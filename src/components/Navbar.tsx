import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Zap, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center text-2xl font-bold text-indigo-600">
            <Zap className="h-6 w-6 mr-2" />
            <span>Electrolysis Directory</span>
          </Link>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive ? "text-indigo-600 font-medium" : "text-gray-600 hover:text-indigo-600"
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                isActive ? "text-indigo-600 font-medium" : "text-gray-600 hover:text-indigo-600"
              }
            >
              About
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                isActive ? "text-indigo-600 font-medium" : "text-gray-600 hover:text-indigo-600"
              }
            >
              Contact
            </NavLink>
            <Link 
              to="/add-listing" 
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Add Listing
            </Link>
          </nav>
        </div>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="mt-4 border-t border-gray-100 pt-4 md:hidden">
            <ul className="space-y-4">
              <li>
                <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    isActive ? "block text-indigo-600 font-medium" : "block text-gray-600 hover:text-indigo-600"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/about" 
                  className={({ isActive }) => 
                    isActive ? "block text-indigo-600 font-medium" : "block text-gray-600 hover:text-indigo-600"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/contact" 
                  className={({ isActive }) => 
                    isActive ? "block text-indigo-600 font-medium" : "block text-gray-600 hover:text-indigo-600"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <Link 
                  to="/add-listing" 
                  className="block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-center transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Add Listing
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;