import React from 'react';
import { MapPin } from 'lucide-react';
import { State } from '../../types/models';
import Card from '../ui/Card';
import ImageWithFallback from '../ui/ImageWithFallback';
import Animate from '../ui/Animate';

interface StateCardProps {
  state: State;
  index?: number;
}

const StateCard: React.FC<StateCardProps> = ({ state, index = 0 }) => {
  const cityCount = state.city_ids?.length || 0;
  const salonCount = state.salon_ids?.length || 0;
  
  return (
    <Animate type="fadeIn" delay={index * 0.05}>
      <a
        href={`/states/${state.slug}/`}
        className="block group"
      >
        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 p-0">
          <div className="relative">
            <ImageWithFallback
              src={undefined} // We're using the fallback for all states
              alt={state.state}
              fallbackType="state"
              className="w-full h-32 object-cover filter group-hover:brightness-110 transition-all duration-300"
            />
            
            <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"></div>
            
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent">
              <h3 className="font-bold text-white text-lg">{state.state}</h3>
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-indigo-500" />
                {cityCount} {cityCount === 1 ? 'city' : 'cities'}
              </span>
              <span>{salonCount} {salonCount === 1 ? 'listing' : 'listings'}</span>
            </div>
          </div>
        </Card>
      </a>
    </Animate>
  );
};

export default StateCard;