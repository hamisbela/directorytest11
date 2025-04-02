import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ImageWithFallbackProps {
  src?: string;
  alt: string;
  fallbackType?: 'salon' | 'state' | 'city' | 'category';
  className?: string;
  containerClassName?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ 
  src, 
  alt, 
  fallbackType = 'salon',
  className = '',
  containerClassName = ''
}) => {
  const [imgError, setImgError] = useState(false);

  // Handle image loading error
  const handleError = () => {
    setImgError(true);
  };

  // Default image placeholder URLs based on type
  const defaultImages = {
    salon: [
      'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    state: [
      'https://images.unsplash.com/photo-1546593064-053d21199be1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551887373-3c5bd224f6e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    city: [
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1444723121867-7a241cacace9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    category: [
      'https://images.unsplash.com/photo-1587909209111-5097ee578ec3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595781518440-ad7435ce2058?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1521147669136-7f67226770b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ]
  };

  // Randomly select one of the default images for the given type
  const getRandomDefaultImage = (type: 'salon' | 'state' | 'city' | 'category'): string => {
    const images = defaultImages[type];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  // Determine the image source
  const imageSrc = (!src || imgError) ? getRandomDefaultImage(fallbackType) : src;

  // For the situation where both original image and fallback fail (unlikely but possible)
  const renderFallbackElement = () => (
    <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
      <div className="text-center">
        <ImageOff className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-500">Image not available</p>
      </div>
    </div>
  );

  return (
    <div className={`overflow-hidden ${containerClassName}`}>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={alt}
          className={className}
          onError={handleError}
        />
      ) : (
        renderFallbackElement()
      )}
    </div>
  );
};

export default ImageWithFallback;