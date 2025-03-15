
import React, { useState, useEffect } from 'react';
import ThinkingAnimation from '@/components/ThinkingAnimation';
import FacilityResults from '@/components/FacilityResults';
import { FacilityData } from '@/components/FacilityCard';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col items-center justify-start p-4 sm:p-8 bg-black">
      {/* Header */}
      <header className="w-full max-w-7xl mx-auto py-4 px-6 flex items-center justify-between border-b border-white/10">
        <div className="text-primary font-bold text-2xl">Lois</div>
        <div className="flex items-center space-x-8">
          <a href="#" className="text-white hover:text-primary/90 transition-colors">About</a>
          <a href="#" className="text-white hover:text-primary/90 transition-colors">Features</a>
          <Button 
            size="sm" 
            className="bg-primary text-white rounded-full px-4 py-2 flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            Ask Lois
          </Button>
        </div>
      </header>

      <div className="w-full max-w-7xl mx-auto mt-16 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        {/* Left Side - Hero Text */}
        <div className="w-full md:w-1/2 space-y-6 md:pt-8">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Ask Lois: Your AI agent to manage Alcohol Addiction in the ER with <span className="text-primary">24/7 addiction medication guidance</span> and <span className="text-primary">real-time bed availability</span> in recovery centers.
          </h1>
          
          <p className="text-white/70 text-lg">
            Built during MIT GrandHack 2025
          </p>
          
          <Button 
            size="lg" 
            onClick={startThinking}
            className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-base font-medium flex items-center gap-2"
          >
            <Phone className="w-5 h-5" />
            Ask Lois: call now!
          </Button>
        </div>
        
        {/* Right Side - Content */}
        <div className="w-full md:w-1/2 space-y-8">
          <ThinkingAnimation thinking={isThinking} />
          
          <FacilityResults 
            facilities={facilityData} 
            visible={showResults}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
