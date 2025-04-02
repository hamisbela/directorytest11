import React from 'react';
import { BeautySalon } from '../../types/models';
import SalonCard from './SalonCard';
import SalonCardSkeleton from './SalonCardSkeleton';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';

interface SalonListProps {
  salons: BeautySalon[];
  title?: string;
  loading?: boolean;
  emptyMessage?: string;
  limit?: number;
  showViewAllLink?: boolean;
}

const SalonList: React.FC<SalonListProps> = ({
  salons,
  title = "Featured Providers",
  loading = false,
  emptyMessage = "We couldn't find any electrolysis providers in our directory.",
  limit,
  showViewAllLink = false,
}) => {
  // Apply limit if specified
  const displayedSalons = limit ? salons.slice(0, limit) : salons;
  
  // Create skeleton loading cards
  const skeletonCards = Array(6).fill(0).map((_, index) => (
    <SalonCardSkeleton key={`skeleton-${index}`} />
  ));
  
  return (
    <div className="container mx-auto">
      {title && <h2 className="text-3xl font-bold text-gray-800 mb-8">{title}</h2>}
      
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skeletonCards}
        </div>
      ) : displayedSalons.length > 0 ? (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedSalons.map(salon => (
              <SalonCard key={salon.id} salon={salon} />
            ))}
          </div>
          
          {showViewAllLink && salons.length > limit! && (
            <div className="mt-6 text-center">
              <p className="text-gray-600 mb-2">
                Showing {displayedSalons.length} of {salons.length} providers
              </p>
              <Link to="/" className="text-indigo-600 hover:underline">
                View all providers
              </Link>
            </div>
          )}
        </>
      ) : (
        <Card className="text-center py-12">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">No listings found</h3>
          <p className="text-gray-500 mb-6">{emptyMessage}</p>
          <Link to="/add-listing">
            <Button variant="primary" size="md">
              Add a Listing
            </Button>
          </Link>
        </Card>
      )}
    </div>
  );
};

export default SalonList;