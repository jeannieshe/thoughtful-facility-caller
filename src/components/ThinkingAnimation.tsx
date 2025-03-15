
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ThinkingAnimationProps {
  thinking: boolean;
  className?: string;
}

const ThinkingAnimation = ({ thinking, className }: ThinkingAnimationProps) => {
  const [text, setText] = useState("Calling facility centers now");
  
  // Add animated dots to the text when thinking
  useEffect(() => {
    if (!thinking) return;
    
    const interval = setInterval(() => {
      setText((prevText) => {
        if (prevText === "Calling facility centers now...") {
          return "Calling facility centers now";
        } else {
          return prevText + ".";
        }
      });
    }, 800);
    
    return () => clearInterval(interval);
  }, [thinking]);
  
  return (
    <div 
      className={cn(
        "relative flex items-center justify-center py-8 transition-all duration-500 ease-in-out",
        thinking ? "opacity-100" : "opacity-0 pointer-events-none",
        className
      )}
    >
      <div className="glass px-6 py-4 rounded-2xl flex items-center justify-center max-w-md mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-thinking-dot-1"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-thinking-dot-2"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-thinking-dot-3"></div>
        </div>
        <p className="ml-3 text-lg font-medium text-foreground">{text}</p>
      </div>
    </div>
  );
};

export default ThinkingAnimation;
