import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Button from './Button';

interface SearchBarProps {
  onSearch: (state: string, category: string) => void;
  states: Array<{ id: string; state: string; slug: string }>;
  categories: Array<{ id: string; category: string; slug: string }>;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  states,
  categories,
  className = '',
}) => {
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleSearch = () => {
    onSearch(selectedState, selectedCategory);
  };

  return (
    <div className={`bg-white rounded-lg p-4 shadow-lg ${className}`}>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <select
            id="state"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.id} value={state.slug}>
                {state.state}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex-grow">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.category}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-end">
          <Button
            onClick={handleSearch}
            variant="primary"
            size="md"
            icon={Search}
            isFullWidth
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;