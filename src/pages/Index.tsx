
import React, { useState, useEffect } from 'react';
import ThinkingAnimation from '@/components/ThinkingAnimation';
import FacilityResults from '@/components/FacilityResults';
import { FacilityData } from '@/components/FacilityCard';
import { Button } from '@/components/ui/button';

const facilityData: FacilityData[] = [
  {
    name: "Bicycle Health",
    location: "Telehealth, Boston, MA 02111",
    phone: "844-943-2514",
    website: "http://bicyclehealth.com",
    services: [
      "Substance Use Treatment",
      "Buprenorphine",
      "Naltrexone",
      "Cognitive Behavioral Therapy",
      "Telehealth"
    ],
    availableBeds: 3
  },
  {
    name: "Bay Cove Treatment Center",
    location: "66 Canal Street, Boston, MA 02114",
    phone: "617-371-3030",
    website: "http://www.baycovehumanservices.org",
    services: [
      "Substance Use Treatment",
      "Detoxification",
      "Mental Health Services",
      "Medication-Assisted Treatment",
      "Outpatient Services"
    ],
    availableBeds: 7
  },
  {
    name: "Fenway Health",
    location: "142 Berkeley Street, Boston, MA 02116",
    phone: "617-267-0900",
    website: "http://www.fenwayhealth.org",
    services: [
      "Substance Use Treatment",
      "Mental Health Services",
      "HIV Testing",
      "LGBTQ+ Specialized Services"
    ],
    availableBeds: 1
  }
];

const Index = () => {
  const [isThinking, setIsThinking] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  // Function to handle the animation sequence
  const startThinking = () => {
    setShowResults(false);
    setIsThinking(true);
    
    // Simulate loading time, then show results
    setTimeout(() => {
      setIsThinking(false);
      setTimeout(() => setShowResults(true), 300);
    }, 4000);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Treatment Facility Finder
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find available treatment facilities in your area with real-time availability
          </p>
          <Button 
            size="lg" 
            onClick={startThinking}
            className="mt-4 rounded-full px-8 text-base font-medium transition-all duration-300 hover:opacity-90 hover:scale-105"
          >
            {showResults ? "Search Again" : "Find Treatment Centers"}
          </Button>
        </div>
        
        <ThinkingAnimation thinking={isThinking} />
        
        <FacilityResults 
          facilities={facilityData} 
          visible={showResults}
        />
      </div>
    </div>
  );
};

export default Index;
