
import React from 'react';
import { useLanguageStore } from '@/services/articleService';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';

const destinations = [
  {
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    tag_en: 'Featured Destination',
    tag_es: 'Destino Destacado',
    title_en: 'Puerto Vallarta, Jalisco',
    title_es: 'Puerto Vallarta, Jalisco',
    desc_en: 'Home of La Monarca\'s first print issue. A Pacific gem where surf culture, world-class art, and ancient traditions collide. September 2026 is the month.',
    desc_es: 'Sede de la primera edición impresa de La Monarca. Una joya del Pacífico donde la cultura surf, el arte de talla mundial y las tradiciones ancestrales convergen. Septiembre 2026 es el mes.',
    highlight: true,
    path: '/primera-edicion',
  },
  {
    image: 'https://images.unsplash.com/photo-1512813195386-6cf811ad3542?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    tag_en: 'Urban Culture',
    tag_es: 'Cultura Urbana',
    title_en: 'La Labyrinha, Mexico City',
    title_es: 'La Labyrinha, Ciudad de México',
    desc_en: 'Where La Monarca was born. Barrio Santa María is a neighborhood of artists, taqueros, and community builders — the creative heartbeat of the capital.',
    desc_es: 'Donde nació La Monarca. El Barrio Santa María es un barrio de artistas, taqueros y constructores de comunidad, el latido creativo de la capital.',
    highlight: false,
    path: '/categoria/naturaleza',
  },
  {
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    tag_en: 'Natural Wonder',
    tag_es: 'Maravilla Natural',
    title_en: 'Michoacán Highlands',
    title_es: 'Altos de Michoacán',
    desc_en: 'Home of the Monarch butterfly reserve. Every winter, 100 million butterflies return — one of the great natural spectacles on Earth.',
    desc_es: 'Sede de la reserva de la mariposa monarca. Cada invierno, 100 millones de mariposas regresan, uno de los grandes espectáculos naturales de la Tierra.',
    highlight: false,
    path: '/categoria/naturaleza',
  },
];

const TravelSection: React.FC = () => {
  const { language } = useLanguageStore();
  const isEn = language === 'en';

  return (
    <section id="travel" className="py-16 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
              {isEn ? 'Travel & Places' : 'Viajes y Lugares'}
            </span>
            <h2 className="font-display text-3xl font-bold text-monarca-black">
              {isEn ? 'Mexico Worth Discovering' : 'México Que Vale la Pena Descubrir'}
            </h2>
          </div>
          <Link to="/categoria/viajes" className="hidden sm:flex items-center gap-1.5 text-monarca-terracotta hover:text-monarca-orange text-sm font-medium">
            {isEn ? 'All destinations' : 'Todos los destinos'}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {destinations.map((dest, i) => (
            <div
              key={i}
              className={`group bg-monarca-cream rounded-xl overflow-hidden hover:shadow-lg transition-shadow ${dest.highlight ? 'md:row-span-1 ring-2 ring-monarca-terracotta/30' : ''}`}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={dest.image}
                  alt={isEn ? dest.title_en : dest.title_es}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {dest.highlight && (
                  <div className="absolute top-3 left-3 bg-monarca-terracotta text-white text-xs font-bold px-2 py-1 rounded">
                    {isEn ? '★ Issue 1 Location' : '★ Edición 1'}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white/90 text-xs">
                  <MapPin className="h-3.5 w-3.5" />
                  {isEn ? dest.title_en : dest.title_es}
                </div>
              </div>
              <div className="p-5">
                <span className="text-monarca-terracotta text-xs font-bold uppercase tracking-wide">
                  {isEn ? dest.tag_en : dest.tag_es}
                </span>
                <h3 className="font-display text-xl font-bold text-monarca-black mt-1 mb-2">
                  {isEn ? dest.title_en : dest.title_es}
                </h3>
                <p className="text-monarca-gray text-sm leading-relaxed mb-4">
                  {isEn ? dest.desc_en : dest.desc_es}
                </p>
                <Link
                  to={dest.path}
                  className="flex items-center gap-1.5 text-monarca-terracotta hover:text-monarca-orange text-sm font-medium transition-colors"
                >
                  {isEn ? 'Read more' : 'Leer más'}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelSection;
