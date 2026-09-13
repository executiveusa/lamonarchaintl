
import React from 'react';
import AnimatedBackground from './hero/AnimatedBackground';
import HeroContent from './hero/HeroContent';
import ScrollIndicator from './hero/ScrollIndicator';

const positiveFacts = [
  'México es el país con más diversidad biológica por km² en América Latina · · ·',
  'El 70% de las artesanías mexicanas son creadas por mujeres · · ·',
  'Puerto Vallarta es pionera en turismo sustentable en el Pacífico mexicano · · ·',
  'La música mexicana independiente suma 400M+ streams globales al mes · · ·',
  'Más de 200 comunidades indígenas custodian bosques templados en México · · ·',
  'El movimiento muralista mexicano inspira arte público en 40 países · · ·',
  'Guadalajara es reconocida como Ciudad Creativa UNESCO · · ·',
  'México produce el 60% del aguacate orgánico del mundo · · ·',
];

const Hero: React.FC = () => {
  return (
    <section
      className="relative w-full overflow-hidden bg-monarca-black"
      style={{ height: '100dvh', minHeight: '600px' }}
    >
      <AnimatedBackground />

      {/* Central content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center">
        <HeroContent />
      </div>

      <ScrollIndicator />

      {/* Positive micro-facts ticker at the bottom of hero */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-monarca-black/80 backdrop-blur-sm border-t border-white/10">
        <div className="flex items-center overflow-hidden h-9">
          <span className="flex-shrink-0 bg-monarca-amber text-monarca-black text-[10px] font-black uppercase tracking-[0.2em] px-3 h-full flex items-center border-r border-black/20">
            ✦ HOY
          </span>
          <div className="overflow-hidden flex-1">
            <div className="whitespace-nowrap animate-[ticker_45s_linear_infinite] text-white/80 text-xs font-medium inline-block">
              &nbsp;&nbsp;&nbsp;
              {positiveFacts.map((fact, i) => (
                <span key={i}>{fact}&nbsp;&nbsp;</span>
              ))}
              &nbsp;&nbsp;&nbsp;
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
