
import React, { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ThinkingAnimationProps {
  thinking: boolean;
  className?: string;
  onAnimationComplete?: () => void;
  onFacilityFound?: (facilityName: string) => void;
}

const ThinkingAnimation = ({ thinking, className, onAnimationComplete, onFacilityFound }: ThinkingAnimationProps) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  
  // Define all messages to be displayed
  const allMessages = [
    "Searching for beds available in treatment centers in the Boston Area...",
    "Finding \"Bicycle Health\" contact information...",
    "Bicycle Health phone number: 844-943-2514",
    "Calling \"Bicycle Health\"...",
    "Bicycle Health has 3 bed available at the moment",
    "Information saved.",
    "Finding \"Fenway Health\" contact information...",
    "Fenway Health phone number: 617-267-0900",
    "Calling \"Fenway Health\"...",
    "Fenway Health has 1 bed available at the moment.",
    "Information saved.",
    "Calling \"Bay Cove Treatment Center\"",
    "Bay Cove Treatment Center phone number: 617-371-3030",
    "Bay Cove Treatment Center has 7 beds available at the moment.",
    "Information saved.",
    "Creating the report..."
  ];

  // Function to trigger facility display
  const checkForFacilityCompletion = useCallback((message: string) => {
    if (message.includes("Information saved.")) {
      const previousMessage = allMessages[currentMessageIndex - 1];
      if (previousMessage.includes("Bicycle Health")) {
        onFacilityFound?.("Bicycle Health");
      } else if (previousMessage.includes("Fenway Health")) {
        onFacilityFound?.("Fenway Health");
      } else if (previousMessage.includes("Bay Cove Treatment Center")) {
        onFacilityFound?.("Bay Cove Treatment Center");
      }
    }
    
    if (message === "Creating the report...") {
      // Wait a bit before calling animation complete
      setTimeout(() => {
        onAnimationComplete?.();
      }, 1000);
    }
  }, [onAnimationComplete, onFacilityFound, currentMessageIndex, allMessages]);

  // Show new messages sequentially with a limit of 5 visible messages
  useEffect(() => {
    if (!thinking) {
      setMessages([]);
      setCurrentMessageIndex(0);
      return;
    }
    
    if (currentMessageIndex < allMessages.length) {
      const timer = setTimeout(() => {
        const newMessage = allMessages[currentMessageIndex];
        setMessages(prev => {
          // Only keep the most recent 4 messages to make room for the new one
          // This ensures we always show exactly 5 messages maximum
          const updatedMessages = [...prev];
          if (updatedMessages.length >= 5) {
            updatedMessages.shift(); // Remove the oldest message
          }
          return [...updatedMessages, newMessage];
        });
        
        checkForFacilityCompletion(newMessage);
        setCurrentMessageIndex(prev => prev + 1);
      }, 1500); // Adjust speed as needed for readability
      
      return () => clearTimeout(timer);
    }
  }, [thinking, currentMessageIndex, allMessages, checkForFacilityCompletion]);
  
  return (
    <div 
      className={cn(
        "relative py-8 transition-all duration-500 ease-in-out h-[250px] w-full",
        thinking ? "opacity-100" : "opacity-0 pointer-events-none",
        className
      )}
    >
      <div className="glass px-6 py-4 rounded-2xl w-full mx-auto h-full flex flex-col">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-primary animate-thinking-dot-1"></div>
          <div className="w-2 h-2 rounded-full bg-primary animate-thinking-dot-2"></div>
          <div className="w-2 h-2 rounded-full bg-primary animate-thinking-dot-3"></div>
        </div>
        <ScrollArea className="flex-1 w-full">
          <div className="space-y-3 text-center">
            {messages.map((message, index) => {
              const isLatest = index === messages.length - 1;
              return (
                <p 
                  key={`message-${currentMessageIndex}-${index}`}
                  className={cn(
                    "text-base md:text-lg font-medium transition-colors duration-500",
                    isLatest ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {message}
                </p>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ThinkingAnimation;
