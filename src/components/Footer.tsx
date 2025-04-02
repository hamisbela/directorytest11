import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, MapPin, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center text-xl font-bold mb-4">
              <Zap className="h-5 w-5 mr-2" />
              <span>Electrolysis Directory</span>
            </div>
            <p className="text-gray-300">
              Find the best electrolysis hair removal salons near you. Our comprehensive directory helps you locate trusted providers for permanent hair removal solutions.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/add-listing" className="text-gray-300 hover:text-white transition-colors">
                  Add a Listing
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-gray-400" />
                <span className="text-gray-300">1234 Electrolysis Way, Boston, MA 02110</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-gray-400" />
                <a href="tel:5551234567" className="text-gray-300 hover:text-white transition-colors">
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-400" />
                <a href="mailto:info@electrolysisdirectory.com" className="text-gray-300 hover:text-white transition-colors">
                  info@electrolysisdirectory.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {currentYear} Electrolysis Directory. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;