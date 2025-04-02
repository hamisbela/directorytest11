import React from 'react';
import { State } from '../../types/models';
import Skeleton from '../ui/Skeleton';
import StateCard from './StateCard';

interface StateListProps {
  states: State[];
  loading?: boolean;
}

const StateList: React.FC<StateListProps> = ({ states, loading = false }) => {
  // Create skeleton loading items
  const skeletonItems = Array(12).fill(0).map((_, index) => (
    <div key={`skeleton-${index}`} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <Skeleton className="h-32 w-full" rounded={false} />
      <div className="p-4">
        <Skeleton className="h-6 w-24 mb-2" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  ));

  if (loading) {
    return (
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {skeletonItems}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {states.map((state, index) => (
        <StateCard key={state.id} state={state} index={index} />
      ))}
    </div>
  );
};

export default StateList;