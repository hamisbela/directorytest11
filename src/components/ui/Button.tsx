import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  isFullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  isFullWidth = false,
  className = '',
  ...props
}) => {
  // Base classes
  const baseClasses = 'rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
    secondary: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 focus:ring-indigo-400',
    outline: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-indigo-400'
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'text-sm px-3 py-2',
    md: 'px-4 py-2',
    lg: 'text-lg px-6 py-3'
  };
  
  // Width classes
  const widthClasses = isFullWidth ? 'w-full' : '';
  
  // Combine all classes
  const allClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClasses} ${className}`;
  
  return (
    <button className={allClasses} {...props}>
      <span className="flex items-center justify-center">
        {Icon && iconPosition === 'left' && <Icon className={`h-5 w-5 ${children ? 'mr-2' : ''}`} />}
        {children}
        {Icon && iconPosition === 'right' && <Icon className={`h-5 w-5 ${children ? 'ml-2' : ''}`} />}
      </span>
    </button>
  );
};

export default Button;