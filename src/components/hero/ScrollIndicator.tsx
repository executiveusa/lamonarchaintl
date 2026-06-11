
import React from 'react';

const ScrollIndicator: React.FC = () => {
  return (
    <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20" style={{ animation: 'fadeInUp 0.8s ease-out 800ms both' }}>
      <div className="w-6 h-10 rounded-full border-2 border-white flex justify-center backdrop-blur-sm bg-white/5">
        <div className="w-1 h-3 bg-monarca-terracotta rounded-full animate-[bounce_1.5s_infinite] mt-2" />
      </div>
    </div>
  );
};

export default ScrollIndicator;
