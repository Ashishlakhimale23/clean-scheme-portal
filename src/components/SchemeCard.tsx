
import { useState } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface SchemeCardProps {
  title: string;
  category: string;
  eligibility: string;
  benefit: string;
  icon: React.ReactNode;
  color: string;
  delay: number;
  id?: string;
}

export const SchemeCard = ({ 
  title, 
  category, 
  eligibility, 
  benefit,
  icon,
  color,
  delay,
  id
}: SchemeCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Generate an ID from the title if not provided
  const schemeId = id || title.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div 
      className={`
        relative overflow-hidden glass-card p-6 sm:p-8 transition-all duration-500 ease-out
        animate-fade-in opacity-0
        hover:shadow-lg hover:translate-y-[-5px]
      `}
      style={{ 
        animationDelay: `${delay}ms`, 
        animationFillMode: 'forwards' 
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background decoration */}
      <div 
        className={cn(
          "absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2 transition-opacity duration-500",
          isHovered ? "opacity-30" : "opacity-20"
        )}
        style={{ backgroundColor: color }}
      />
      
      {/* Card content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Top section */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <span 
              className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3"
              style={{ backgroundColor: `${color}20`, color: color }}
            >
              {category}
            </span>
            <h3 className="text-xl font-bold font-display tracking-tight">{title}</h3>
          </div>
          <div 
            className={cn(
              "flex items-center justify-center w-12 h-12 rounded-full transition-colors",
              isHovered ? `bg-${color}/15` : "bg-gray-100"
            )}
            style={{ backgroundColor: isHovered ? `${color}20` : undefined }}
          >
            {icon}
          </div>
        </div>
        
        {/* Details */}
        <div className="space-y-4 mb-6 flex-grow">
          <div>
            <p className="text-xs text-gray-500 uppercase font-medium">Eligibility</p>
            <p className="text-sm text-gray-700 mt-1">{eligibility}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-medium">Benefit</p>
            <p className="text-sm text-gray-700 mt-1">{benefit}</p>
          </div>
        </div>
        
        {/* Action button */}
        <div className="mt-auto">
          <Link 
            to={`/scheme/${schemeId}`}
            className={`
              group flex items-center text-sm font-medium
              transition-all duration-300 ease-out
            `}
            style={{ color }}
          >
            View Details
            <ChevronRight 
              className={`
                ml-1 h-4 w-4 transition-transform duration-300 ease-out
                ${isHovered ? 'translate-x-1' : ''}
              `} 
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
