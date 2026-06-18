
import React from 'react';
import { useLanguageStore } from '@/services/articleService';

const HeroContent: React.FC = () => {
  const { language } = useLanguageStore();
  const isEn = language === 'en';

  return (
    <div className="max-w-4xl mx-auto text-center text-white px-4">

      {/* Overline chip */}
      <div
        className="inline-flex items-center gap-2 border border-white/25 rounded-full px-5 py-2 mb-8"
        style={{ animation: 'fadeInUp 0.7s ease-out 0ms both' }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-monarca-amber animate-pulse" />
        <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/80">
          {isEn
            ? 'A Kupari Media Publication · Born in Barrio Santa María, CDMX'
            : 'Una Publicación de Kupari Media · Nacida en Barrio Santa María, CDMX'}
        </span>
      </div>

      {/* Main headline */}
      <h1
        className="font-display font-bold leading-[1.02] tracking-tight mb-6"
        style={{
          fontSize: 'clamp(3rem, 8vw, 7rem)',
          textShadow: '0 2px 40px rgba(0,0,0,0.4)',
          animation: 'fadeInUp 0.8s ease-out 120ms both',
        }}
      >
        La Monarca
        <span
          className="block"
          style={{ color: '#F39C12' }}
        >
          Internacional
        </span>
      </h1>

      {/* Subtitle */}
      <p
        className="text-base md:text-xl font-light leading-relaxed text-white/80 max-w-2xl mx-auto mb-10"
        style={{ animation: 'fadeInUp 0.8s ease-out 240ms both' }}
      >
        {isEn
          ? 'Positive stories from Mexico and the world. Artists, youth, community, culture — the people building something beautiful.'
          : 'Historias positivas de México y el mundo. Artistas, jóvenes, comunidad, cultura: las personas construyendo algo hermoso.'}
      </p>

      {/* CTA buttons */}
      <div
        className="flex flex-col sm:flex-row justify-center gap-4"
        style={{ animation: 'fadeInUp 0.8s ease-out 360ms both' }}
      >
        <a
          href="#articles"
          className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-base text-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
          style={{ backgroundColor: '#D35400' }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#E67E22')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#D35400')}
        >
          {isEn ? 'Read the Magazine' : 'Leer la Revista'}
        </a>
        <a
          href="/primera-edicion"
          className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-medium text-base text-white border border-white/40 backdrop-blur-sm hover:bg-white/10 hover:border-white/70 transition-all duration-200"
        >
          {isEn ? 'First Issue — Sept 2026' : 'Primera Edición — Sept 2026'}
        </a>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default HeroContent;
