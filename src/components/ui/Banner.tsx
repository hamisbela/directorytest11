import React from 'react';
import { XCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';

type BannerVariant = 'success' | 'error' | 'warning' | 'info';

interface BannerProps {
  title: string;
  message?: string;
  variant: BannerVariant;
  onDismiss?: () => void;
  className?: string;
}

const Banner: React.FC<BannerProps> = ({
  title,
  message,
  variant = 'info',
  onDismiss,
  className = '',
}) => {
  // Define variant-specific styles
  const variantStyles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-500',
      text: 'text-green-800',
      icon: <CheckCircle className="h-5 w-5 text-green-500" />
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-500',
      text: 'text-red-800',
      icon: <XCircle className="h-5 w-5 text-red-500" />
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-500',
      text: 'text-yellow-800',
      icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-500',
      text: 'text-blue-800',
      icon: <Info className="h-5 w-5 text-blue-500" />
    }
  };

  const styles = variantStyles[variant];

  return (
    <div className={`${styles.bg} border-l-4 ${styles.border} p-4 ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {styles.icon}
        </div>
        <div className="ml-3">
          <h3 className={`text-sm font-medium ${styles.text}`}>
            {title}
          </h3>
          {message && (
            <div className={`mt-2 text-sm ${styles.text.replace('800', '700')}`}>
              <p>{message}</p>
            </div>
          )}
        </div>
        {onDismiss && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onDismiss}
                className={`inline-flex rounded-md p-1.5 ${styles.bg} ${styles.text} hover:bg-${variant}-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${variant}-500`}
              >
                <span className="sr-only">Dismiss</span>
                <XCircle className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;