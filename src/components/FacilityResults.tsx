
import React from 'react';
import { cn } from '@/lib/utils';
import FacilityCard, { FacilityData } from './FacilityCard';

interface FacilityResultsProps {
  facilities: FacilityData[];
  visible: boolean;
  className?: string;
}

const FacilityResults = ({ facilities, visible, className }: FacilityResultsProps) => {
  return (
    <div 
      className={cn(
        "transition-all duration-500 ease-in-out space-y-4",
        visible ? "opacity-100" : "opacity-0 pointer-events-none",
        className
      )}
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {facilities.map((facility, index) => (
          <FacilityCard 
            key={facility.name}
            facility={facility}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default FacilityResults;
