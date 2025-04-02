import React from 'react';
import Animate from './Animate';

interface HeroProps {
  title: string;
  subtitle?: string;
  image?: string;
  children?: React.ReactNode;
  overlayOpacity?: number;
  textAlignment?: 'left' | 'center' | 'right';
  size?: 'sm' | 'md' | 'lg';
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  image = 'https://images.unsplash.com/photo-1532710093739-9470acff878f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  children,
  overlayOpacity = 70,
  textAlignment = 'center',
  size = 'lg'
}) => {
  // Derive classes from props
  const overlayClasses = `absolute inset-0 bg-black opacity-${overlayOpacity/10}`;
  const textAlignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  };
  const sizeClasses = {
    sm: 'py-10',
    md: 'py-16',
    lg: 'py-24'
  };
  
  return (
    <div className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={image} 
          alt="Hero Background" 
          className="w-full h-full object-cover"
        />
        <div className={overlayClasses}></div>
      </div>
      
      {/* Content */}
      <div className={`relative flex flex-col justify-center ${textAlignmentClasses[textAlignment]} ${sizeClasses[size]} px-4 sm:px-6 lg:px-8`}>
        <div className={`max-w-3xl ${textAlignment === 'center' ? 'mx-auto' : ''}`}>
          <Animate type="fadeIn">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              {title}
            </h1>
          </Animate>
          
          {subtitle && (
            <Animate type="slideUp" delay={0.1}>
              <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl">
                {subtitle}
              </p>
            </Animate>
          )}
          
          {children && (
            <Animate type="slideUp" delay={0.2}>
              <div className="mt-2">
                {children}
              </div>
            </Animate>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;