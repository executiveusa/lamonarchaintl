
import React, { useRef, useState, useEffect } from 'react';

interface AnimatedBackgroundProps {
  videoUrl: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ videoUrl }) => {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate video loading
    const timer = setTimeout(() => {
      setIsVideoLoaded(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (videoContainerRef.current) {
      videoContainerRef.current.classList.add('animate-blur-in');
    }
  }, []);

  return (
    <>
      {/* YouTube video background with enhanced loading state */}
      <div 
        ref={videoContainerRef}
        className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
      >
        <div className="relative w-full h-full overflow-hidden">
          {!isVideoLoaded && (
            <div className="absolute inset-0 bg-monarca-terracotta/20 animate-pulse"></div>
          )}
          <iframe 
            src={videoUrl}
            className="absolute top-1/2 left-1/2 min-w-[150%] min-h-[150%] w-auto h-auto transform -translate-x-1/2 -translate-y-1/2 scale-125"
            style={{ filter: 'brightness(0.7)' }}
            title="Monarca Internacional Background"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      
      {/* Enhanced overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10" />
    </>
  );
};

export default AnimatedBackground;
