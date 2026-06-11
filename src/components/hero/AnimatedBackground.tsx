
import React, { useState, useEffect } from 'react';

interface AnimatedBackgroundProps {
  videoUrl: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ videoUrl }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 1.2s ease-in-out' }}
      >
        <div className="relative w-full h-full overflow-hidden">
          {!visible && (
            <div className="absolute inset-0 bg-monarca-black animate-pulse" />
          )}
          <iframe
            src={videoUrl}
            className="absolute top-1/2 left-1/2 min-w-[177.78vh] min-h-[56.25vw] w-full h-full transform -translate-x-1/2 -translate-y-1/2"
            style={{ filter: 'brightness(0.55) saturate(1.1)' }}
            title="Monarca Internacional Background Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      {/* Dark gradient overlay - keeps text readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/30 z-10" />
      {/* Side vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 z-10" />
    </>
  );
};

export default AnimatedBackground;
