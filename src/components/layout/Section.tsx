import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  background?: 'white' | 'gray' | 'indigo' | 'none';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Section: React.FC<SectionProps> = ({
  children,
  title,
  description,
  className = '',
  background = 'white',
  padding = 'lg',
}) => {
  // Background classes
  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    indigo: 'bg-indigo-800 text-white',
    none: ''
  };
  
  // Padding classes
  const paddingClasses = {
    none: '',
    sm: 'py-8 px-4',
    md: 'py-12 px-4',
    lg: 'py-16 px-4'
  };
  
  // Combine all classes
  const sectionClasses = `${backgroundClasses[background]} ${paddingClasses[padding]} ${className}`;
  
  // Text color based on background
  const titleTextColor = background === 'indigo' ? 'text-white' : 'text-gray-800';
  const descriptionTextColor = background === 'indigo' ? 'text-indigo-100' : 'text-gray-600';
  
  return (
    <section className={sectionClasses}>
      <div className="container mx-auto">
        {title && (
          <h2 className={`text-3xl font-bold ${titleTextColor} mb-4`}>{title}</h2>
        )}
        
        {description && (
          <p className={`${descriptionTextColor} mb-8`}>{description}</p>
        )}
        
        {children}
      </div>
    </section>
  );
};

export default Section;