
import React, { useEffect, useRef, useState } from 'react';

interface AnimatedBackgroundProps {
  desktopPoster?: string;
  mobilePoster?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  desktopPoster = 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1920&q=80',
  mobilePoster = 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=768&q=70',
}) => {
  const [visible, setVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const mobileQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mobileQuery.matches);

    const handleMobileChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mobileQuery.addEventListener('change', handleMobileChange);

    const timer = setTimeout(() => setVisible(true), 200);
    return () => {
      clearTimeout(timer);
      mobileQuery.removeEventListener('change', handleMobileChange);
    };
  }, []);

  const poster = isMobile ? mobilePoster : desktopPoster;

  return (
    <>
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 1.2s ease-in-out' }}
      >
        {/* Poster fallback — always visible until video loads or reduced motion */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${poster})`,
            filter: 'brightness(0.55) saturate(1.1)',
          }}
        />

        {/* Native video — hidden when reduced motion is preferred */}
        {!prefersReducedMotion && (
          <video
            ref={videoRef}
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover transform -translate-x-1/2 -translate-y-1/2"
            style={{ filter: 'brightness(0.55) saturate(1.1)' }}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={poster}
            onCanPlay={() => setVisible(true)}
          >
            {/* Prefer self-hosted video; falls back gracefully to poster if src is absent */}
            <source src="/videos/hero-desktop.mp4" type="video/mp4" media="(min-width: 769px)" />
            <source src="/videos/hero-mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
          </video>
        )}
      </div>

      {/* Dark gradient overlay — keeps text readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/30 z-10" />
      {/* Side vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 z-10" />
    </>
  );
};

export default AnimatedBackground;
