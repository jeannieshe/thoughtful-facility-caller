
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface FacilityData {
  name: string;
  location: string;
  phone: string;
  website: string;
  services: string[];
  availableBeds: number;
}

interface FacilityCardProps {
  facility: FacilityData;
  index: number;
  className?: string;
}

const FacilityCard = ({ facility, index, className }: FacilityCardProps) => {
  // Calculate the animation delay based on index
  const animationDelay = `${index * 100}ms`;
  
  return (
    <Card className={cn(
      "glass-card overflow-hidden opacity-0",
      "animate-fade-in-up",
      className
    )} 
    style={{ animationDelay, animationFillMode: 'forwards' }}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-semibold">{facility.name}</CardTitle>
          <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            {facility.availableBeds} {facility.availableBeds === 1 ? 'Bed' : 'Beds'} Available
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Location</p>
          <p className="text-sm font-medium">{facility.location}</p>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Contact</p>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">{facility.phone}</p>
            <a 
              href={facility.website} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-primary hover:underline transition-all duration-200"
            >
              {facility.website.replace(/^https?:\/\//, '')}
            </a>
          </div>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Services</p>
          <div className="flex flex-wrap gap-1.5">
            {facility.services.map((service, idx) => (
              <Badge 
                key={idx} 
                variant="secondary"
                className="text-xs font-normal"
              >
                {service}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FacilityCard;
