import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  isFullWidth?: boolean;
  href?: string;
  external?: boolean;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  isFullWidth = false,
  className = '',
  href,
  external = false,
  ...props
}) => {
  // Base classes
  const baseClasses = 'rounded-md font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-md hover:shadow-lg hover:-translate-y-0.5 transform';
  
  // Gradient and hover classes
  const gradientClasses = {
    primary: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white focus:ring-indigo-500',
    secondary: 'bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white focus:ring-teal-500',
    success: 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white focus:ring-green-500'
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'text-sm px-3 py-2',
    md: 'px-5 py-2.5',
    lg: 'text-lg px-6 py-3'
  };
  
  // Width classes
  const widthClasses = isFullWidth ? 'w-full' : '';
  
  // Combine all classes
  const allClasses = `${baseClasses} ${gradientClasses[variant]} ${sizeClasses[size]} ${widthClasses} ${className}`;
  
  // Content with icon
  const content = (
    <span className="flex items-center justify-center">
      {Icon && iconPosition === 'left' && <Icon className={`h-5 w-5 ${children ? 'mr-2' : ''}`} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className={`h-5 w-5 ${children ? 'ml-2' : ''}`} />}
    </span>
  );
  
  // Render as link if href is provided
  if (href) {
    return (
      <a 
        href={href} 
        className={allClasses}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    );
  }
  
  // Render as button otherwise
  return (
    <button className={allClasses} {...props}>
      {content}
    </button>
  );
};

export default GradientButton;