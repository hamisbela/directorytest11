import React from 'react';
import { MapPin, Phone, Star } from 'lucide-react';
import { BeautySalon } from '../../types/models';
import { truncateText, formatLocation } from '../../utils/formatting';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import ImageWithFallback from '../ui/ImageWithFallback';
import Animate from '../ui/Animate';

interface SalonCardProps {
  salon: BeautySalon;
  index?: number;
}

const SalonCard: React.FC<SalonCardProps> = ({ salon, index = 0 }) => {
  const location = formatLocation(salon.city_name, salon.state_name);
  
  // Generate rating stars if available
  const renderRating = () => {
    if (!salon.average_star) return null;
    
    const rating = parseFloat(salon.average_star);
    if (isNaN(rating)) return null;
    
    return (
      <div className="flex items-center mt-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({salon.reviews || '0'})</span>
      </div>
    );
  };
  
  return (
    <Animate type="slideUp" delay={index * 0.1}>
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative">
          <ImageWithFallback 
            src={salon.images && salon.images.length > 0 ? salon.images[0] : undefined}
            alt={salon.title}
            fallbackType="salon"
            className="w-full h-56 object-cover"
          />
          
          {/* Location badge */}
          <div className="absolute bottom-2 left-2">
            <Badge variant="primary" className="bg-white/90 backdrop-blur-sm text-indigo-700 border border-indigo-100">
              <MapPin className="w-3 h-3 mr-1" /> {location}
            </Badge>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-1">
            <a href={`/companies/${salon.slug}/`} className="hover:text-indigo-600 transition-colors">
              {salon.title}
            </a>
          </h3>
          
          {renderRating()}
          
          {/* Show categories if available */}
          {salon.category_ids && salon.category_ids.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {salon.category_ids.slice(0, 3).map((id, index) => (
                <Badge key={id} variant="default" size="sm">
                  {id.substring(0, 10)}
                </Badge>
              ))}
              {salon.category_ids.length > 3 && (
                <Badge variant="default" size="sm">+{salon.category_ids.length - 3}</Badge>
              )}
            </div>
          )}
          
          <p className="text-gray-600 mb-4 line-clamp-2">
            {truncateText(salon.description || 'Professional electrolysis services for permanent hair removal.', 100)}
          </p>
          
          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            {salon.telephone ? (
              <a 
                href={`tel:${salon.telephone}`} 
                className="text-indigo-600 hover:text-indigo-800 flex items-center transform hover:scale-105 transition-transform"
              >
                <Phone className="h-4 w-4 mr-1" />
                Call Now
              </a>
            ) : (
              <span></span>
            )}
            
            <a 
              href={`/companies/${salon.slug}/`} 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
            >
              View Details
            </a>
          </div>
        </div>
      </Card>
    </Animate>
  );
};

export default SalonCard;