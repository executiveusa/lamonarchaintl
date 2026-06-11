
import React from 'react';
import AnimatedBackground from './hero/AnimatedBackground';
import HeroContent from './hero/HeroContent';
import ScrollIndicator from './hero/ScrollIndicator';

const VIDEO_URL =
  'https://www.youtube.com/embed/V9Zv3ZsX4A8?autoplay=1&mute=1&loop=1&playlist=V9Zv3ZsX4A8&controls=0&showinfo=0&rel=0&modestbranding=1&disablekb=1&iv_load_policy=3&playsinline=1&enablejsapi=0';

const Hero: React.FC = () => {
  return (
    <section
      className="relative w-full overflow-hidden bg-monarca-black"
      style={{ height: '100dvh', minHeight: '600px' }}
    >
      <AnimatedBackground videoUrl={VIDEO_URL} />

      {/* Central content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center">
        <HeroContent />
      </div>

      <ScrollIndicator />

      {/* Breaking news ticker bar at the bottom of hero */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-monarca-terracotta/90 backdrop-blur-sm border-t border-white/10">
        <div className="flex items-center overflow-hidden h-9">
          <span className="flex-shrink-0 bg-monarca-black text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 h-full flex items-center border-r border-white/20">
            LIVE
          </span>
          <div className="overflow-hidden flex-1">
            <div className="whitespace-nowrap animate-[ticker_35s_linear_infinite] text-white text-xs font-medium inline-block">
              &nbsp;&nbsp;&nbsp;
              Arte comunitario transforma Barrio Santa María · · ·&nbsp;&nbsp;
              Músicos de Guadalajara rompen récords en Spotify · · ·&nbsp;&nbsp;
              Puerto Vallarta: primer destino sustentable de México · · ·&nbsp;&nbsp;
              Jóvenes emprendedores de CDMX lanzan 40 startups en 2026 · · ·&nbsp;&nbsp;
              Artistas latinoamericanos triunfan en bienal internacional · · ·&nbsp;&nbsp;
              Community art transforms Barrio Santa María · · ·&nbsp;&nbsp;
              Musicians from Guadalajara break Spotify records · · ·&nbsp;&nbsp;
              Puerto Vallarta named Mexico's first sustainable destination · · ·
              &nbsp;&nbsp;&nbsp;
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
