
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguageStore } from '@/services/articleService';
import { Music2, ArrowRight, Play } from 'lucide-react';

const artists = [
  {
    name: 'Sofía Ángeles Banda',
    genre_en: 'Huichol Fusion',
    genre_es: 'Fusión Huichola',
    origin_en: 'Puerto Vallarta, Jalisco',
    origin_es: 'Puerto Vallarta, Jalisco',
    desc_en: 'Blending ancestral Wixáritari chants with electronic beats, Sofía is redefining what Mexican music can sound like.',
    desc_es: 'Mezclando cánticos ancestrales wixaritari con electrónica, Sofía redefine cómo puede sonar la música mexicana.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    name: 'Los Jardineros del Sur',
    genre_en: 'Cumbia Urbana',
    genre_es: 'Cumbia Urbana',
    origin_en: 'Mexico City',
    origin_es: 'Ciudad de México',
    desc_en: 'Street-born cumbia from the colonias of CDMX. Their shows are half concert, half neighborhood party.',
    desc_es: 'Cumbia callejera de las colonias de la CDMX. Sus shows son mitad concierto, mitad fiesta de barrio.',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    featured: false,
  },
  {
    name: 'Marigold Trío',
    genre_en: 'Jazz + Mariachi',
    genre_es: 'Jazz + Mariachi',
    origin_en: 'Guadalajara, Jalisco',
    origin_es: 'Guadalajara, Jalisco',
    desc_en: 'Three musicians taking the mariachi tradition somewhere it has never been before.',
    desc_es: 'Tres músicos llevando la tradición del mariachi a donde nunca ha estado.',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    featured: false,
  },
];

const MusicSection: React.FC = () => {
  const { language } = useLanguageStore();
  const isEn = language === 'en';

  return (
    <section id="music" className="py-16 bg-monarca-black text-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="inline-block bg-white/10 text-white/70 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
              {isEn ? 'Music' : 'Música'}
            </span>
            <h2 className="font-display text-3xl font-bold">
              {isEn ? 'The Sound of Mexico' : 'El Sonido de México'}
            </h2>
          </div>
          <Link to="/categoria/musica" className="hidden sm:flex items-center gap-1.5 text-monarca-amber hover:text-white text-sm font-medium transition-colors">
            {isEn ? 'All music stories' : 'Todas las historias de música'}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Featured artist */}
          {artists.filter(a => a.featured).map((artist, i) => (
            <div key={i} className="lg:col-span-3 group relative rounded-xl overflow-hidden">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-[360px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-monarca-terracotta text-white text-xs font-bold uppercase px-2 py-0.5 rounded">
                    {isEn ? '★ Issue 1 Feature' : '★ En la Edición 1'}
                  </span>
                  <span className="text-white/60 text-xs">{isEn ? artist.genre_en : artist.genre_es}</span>
                </div>
                <h3 className="font-display text-2xl font-bold mb-1">{artist.name}</h3>
                <p className="text-white/70 text-sm mb-3">{isEn ? artist.desc_en : artist.desc_es}</p>
                <Link to="/categoria/musica" className="flex items-center gap-2 text-monarca-amber hover:text-white text-sm font-medium transition-colors">
                  <Play className="h-4 w-4" />
                  {isEn ? 'Read the story' : 'Leer la historia'}
                </Link>
              </div>
            </div>
          ))}

          {/* Other artists */}
          <div className="lg:col-span-2 space-y-4">
            {artists.filter(a => !a.featured).map((artist, i) => (
              <div key={i} className="group bg-white/10 rounded-xl overflow-hidden flex hover:bg-white/15 transition-colors">
                <div className="w-28 h-28 flex-shrink-0 overflow-hidden">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 flex-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Music2 className="h-3 w-3 text-monarca-amber" />
                    <span className="text-monarca-amber text-xs font-medium">{isEn ? artist.genre_en : artist.genre_es}</span>
                  </div>
                  <h4 className="font-bold text-white mb-0.5">{artist.name}</h4>
                  <p className="text-white/60 text-xs">{isEn ? artist.origin_en : artist.origin_es}</p>
                </div>
              </div>
            ))}

            {/* Discover more */}
            <div className="bg-monarca-terracotta/20 border border-monarca-terracotta/30 rounded-xl p-5">
              <h4 className="font-bold text-white mb-2">
                {isEn ? 'More Music Stories' : 'Más Historias de Música'}
              </h4>
              <p className="text-white/60 text-sm mb-3">
                {isEn
                  ? 'Deep dives into the artists and movements shaping Mexican music.'
                  : 'Análisis profundos de los artistas y movimientos que dan forma a la música mexicana.'}
              </p>
              <Link
                to="/categoria/musica"
                className="flex items-center gap-1.5 text-monarca-amber hover:text-white text-sm font-medium transition-colors"
              >
                {isEn ? 'Explore music' : 'Explorar música'}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicSection;
