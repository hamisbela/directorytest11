import React from 'react';
import Card from '../ui/Card';
import Skeleton from '../ui/Skeleton';

const SalonCardSkeleton: React.FC = () => {
  return (
    <Card className="overflow-hidden" padding="none">
      {/* Image placeholder */}
      <Skeleton className="h-56 w-full" rounded={false} />
      
      <div className="p-6">
        {/* Title placeholder */}
        <Skeleton className="h-7 w-3/4 mb-3" />
        
        {/* Rating placeholder */}
        <div className="flex mb-3">
          <Skeleton className="h-4 w-4 mr-1" circle />
          <Skeleton className="h-4 w-4 mr-1" circle />
          <Skeleton className="h-4 w-4 mr-1" circle />
          <Skeleton className="h-4 w-4 mr-1" circle />
          <Skeleton className="h-4 w-4 mr-1" circle />
          <Skeleton className="h-4 w-16 ml-1" />
        </div>
        
        {/* Categories placeholder */}
        <div className="flex mb-3">
          <Skeleton className="h-6 w-16 mr-2 rounded-full" />
          <Skeleton className="h-6 w-16 mr-2 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        
        {/* Description placeholder */}
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-5" />
        
        {/* Button placeholders */}
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-9 w-20 rounded-md" />
          <Skeleton className="h-9 w-28 rounded-md" />
        </div>
      </div>
    </Card>
  );
};

export default SalonCardSkeleton;