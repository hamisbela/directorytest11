import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, FileQuestion, Scissors } from 'lucide-react';
import Section from '../components/layout/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const NotFound: React.FC = () => {
  return (
    <Section padding="md">
      <div className="max-w-3xl mx-auto text-center">
        <Card padding="lg">
          <div className="flex justify-center mb-6">
            <Scissors className="h-20 w-20 text-indigo-500" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h1>
          
          <p className="text-xl text-gray-600 mb-8">
            We couldn't find the page you're looking for. The page may have been moved, removed, or might be temporarily unavailable.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
            <Link to="/" className="flex items-center justify-center p-4 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors">
              <Home className="h-5 w-5 mr-2" />
              <span>Return to Homepage</span>
            </Link>
            
            <Link to="/contact" className="flex items-center justify-center p-4 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors">
              <FileQuestion className="h-5 w-5 mr-2" />
              <span>Contact Support</span>
            </Link>
          </div>
          
          <div className="mt-12 border-t border-gray-200 pt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Looking for electrolysis services?</h2>
            
            <p className="text-gray-600 mb-6">
              Browse our directory to find a provider near you:
            </p>
            
            <Link to="/">
              <Button variant="primary" icon={Search}>
                Search Providers
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </Section>
  );
};

export default NotFound;