import React from 'react';
import { Building2, Home } from 'lucide-react';
import { City } from '../../types/models';
import Card from '../ui/Card';
import ImageWithFallback from '../ui/ImageWithFallback';
import Animate from '../ui/Animate';

interface CityCardProps {
  city: City;
  index?: number;
}

const CityCard: React.FC<CityCardProps> = ({ city, index = 0 }) => {
  const salonCount = city.salon_ids?.length || 0;
  
  return (
    <Animate type="slideUp" delay={index * 0.05}>
      <a
        href={`/cities/${city.slug}/`}
        className="block group"
      >
        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 p-0">
          <div className="relative">
            <ImageWithFallback
              src={undefined} // We're using the fallback for all cities
              alt={city.city}
              fallbackType="city"
              className="w-full h-40 object-cover filter group-hover:brightness-110 transition-all duration-300"
            />
            
            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
            
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent">
              <h3 className="font-bold text-white text-xl">{city.city}</h3>
              {city.state_name && (
                <p className="text-white/90 text-sm mt-1">{city.state_name}</p>
              )}
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center text-indigo-600">
                <Building2 className="h-4 w-4 mr-1" />
                <span className="font-medium">
                  {salonCount} {salonCount === 1 ? 'salon' : 'salons'}
                </span>
              </div>
              <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded-full">
                View Details
              </span>
            </div>
          </div>
        </Card>
      </a>
    </Animate>
  );
};

export default CityCard;