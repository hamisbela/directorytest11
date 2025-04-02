import React from 'react';

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  rounded?: boolean;
  circle?: boolean;
  animate?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  width,
  height,
  rounded = true,
  circle = false,
  animate = true,
}) => {
  const baseClasses = 'bg-gray-200';
  const animationClasses = animate ? 'animate-pulse' : '';
  const roundedClasses = circle 
    ? 'rounded-full' 
    : rounded 
      ? 'rounded-md' 
      : '';
  
  const style = {
    width: width,
    height: height,
  };

  return (
    <div 
      className={`${baseClasses} ${animationClasses} ${roundedClasses} ${className}`}
      style={style}
    ></div>
  );
};

export default Skeleton;