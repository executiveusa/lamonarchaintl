
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguageStore } from '@/services/articleService';
import { ArrowRight, Palette } from 'lucide-react';

const ArtSection: React.FC = () => {
  const { language } = useLanguageStore();
  const isEn = language === 'en';

  return (
    <section id="art" className="py-16 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-monarca-terracotta/10 text-monarca-terracotta text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
              {isEn ? 'Art & Culture' : 'Arte y Cultura'}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-monarca-black mb-4 leading-tight">
              {isEn
                ? 'Mexican Creativity Is Having Its Moment'
                : 'La Creatividad Mexicana Está Teniendo Su Momento'}
            </h2>
            <p className="text-monarca-gray mb-4 leading-relaxed">
              {isEn
                ? 'From the murals of Puerto Vallarta\'s Zona Romántica to the galleries of Roma Norte, Mexican artists are commanding international attention — and staying rooted in their communities.'
                : 'Desde los murales de la Zona Romántica de Puerto Vallarta hasta las galerías de Roma Norte, los artistas mexicanos están captando la atención internacional y permaneciendo arraigados en sus comunidades.'}
            </p>
            <p className="text-monarca-gray mb-6 leading-relaxed">
              {isEn
                ? 'La Monarca dedicates its Art & Culture section to the makers, painters, photographers, sculptors, and designers building Mexico\'s visual identity — one work at a time.'
                : 'La Monarca dedica su sección de Arte y Cultura a los creadores, pintores, fotógrafos, escultores y diseñadores que construyen la identidad visual de México, una obra a la vez.'}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/categoria/arte"
                className="inline-flex items-center gap-2 px-4 py-2 border-2 border-monarca-terracotta text-monarca-terracotta hover:bg-monarca-terracotta hover:text-white rounded-lg text-sm font-semibold transition-colors"
              >
                <Palette className="h-4 w-4" />
                {isEn ? 'Explore Art & Culture' : 'Explorar Arte y Cultura'}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="relative">
            {/* Decorative offset box */}
            <div className="absolute inset-0 -translate-x-4 -translate-y-4 bg-monarca-amber/20 rounded-xl" />
            <div className="relative z-10 grid grid-cols-2 gap-3">
              <img
                src="https://images.unsplash.com/photo-1551524164-687a55dd1126?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                alt={isEn ? 'Puerto Vallarta mural art' : 'Arte mural en Puerto Vallarta'}
                className="rounded-xl w-full h-48 object-cover shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1460574283810-2aab119d8511?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                alt={isEn ? 'Mexican contemporary art' : 'Arte contemporáneo mexicano'}
                className="rounded-xl w-full h-48 object-cover shadow-lg mt-6"
              />
              <div className="bg-monarca-black rounded-xl p-4 flex flex-col justify-center">
                <div className="font-display text-3xl font-black text-monarca-amber mb-0.5">100+</div>
                <div className="text-white text-xs">
                  {isEn ? 'Artists covered annually' : 'Artistas cubiertos anualmente'}
                </div>
              </div>
              <img
                src="https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                alt={isEn ? 'Mexican market photography' : 'Fotografía de mercado mexicano'}
                className="rounded-xl w-full h-36 object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtSection;
