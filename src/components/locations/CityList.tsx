import React from 'react';
import { City } from '../../types/models';
import Skeleton from '../ui/Skeleton';
import CityCard from './CityCard';

interface CityListProps {
  cities: City[];
  loading?: boolean;
  title?: string;
}

const CityList: React.FC<CityListProps> = ({ 
  cities, 
  loading = false,
  title
}) => {
  // Create skeleton loading items
  const skeletonItems = Array(6).fill(0).map((_, index) => (
    <div key={`skeleton-${index}`} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <Skeleton className="h-40 w-full" rounded={false} />
      <div className="p-4">
        <Skeleton className="h-6 w-24 mb-2" />
        <Skeleton className="h-4 w-36" />
      </div>
    </div>
  ));

  if (loading) {
    return (
      <div>
        {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skeletonItems}
        </div>
      </div>
    );
  }

  if (cities.length === 0) {
    return null;
  }

  return (
    <div>
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cities.map((city, index) => (
          <CityCard key={city.id} city={city} index={index} />
        ))}
      </div>
    </div>
  );
};

export default CityList;