import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  withShadow?: boolean;
  withBorder?: boolean;
  rounded?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  withShadow = true,
  withBorder = false,
  rounded = true,
}) => {
  // Base classes
  const baseClasses = 'bg-white';
  
  // Padding classes
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  // Shadow classes
  const shadowClasses = withShadow ? 'shadow-md hover:shadow-lg transition-shadow' : '';
  
  // Border classes
  const borderClasses = withBorder ? 'border border-gray-200' : '';
  
  // Rounded classes
  const roundedClasses = rounded ? 'rounded-lg' : '';
  
  // Combine all classes
  const allClasses = `${baseClasses} ${paddingClasses[padding]} ${shadowClasses} ${borderClasses} ${roundedClasses} ${className}`;
  
  return (
    <div className={allClasses}>
      {children}
    </div>
  );
};

export default Card;