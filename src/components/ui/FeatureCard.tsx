import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import Card from './Card';
import Animate from './Animate';

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  iconClassName?: string;
  className?: string;
  index?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  iconClassName = 'text-indigo-600',
  className = '',
  index = 0
}) => {
  return (
    <Animate type="fadeIn" delay={index * 0.1}>
      <Card className={`hover:shadow-lg transition-all duration-300 ${className}`}>
        <div className="flex flex-col h-full">
          {Icon && (
            <div className="mb-4">
              <div className={`inline-flex p-3 rounded-md bg-indigo-100 ${iconClassName}`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          )}
          
          <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
          
          <p className="text-gray-600 flex-grow">{description}</p>
        </div>
      </Card>
    </Animate>
  );
};

export default FeatureCard;