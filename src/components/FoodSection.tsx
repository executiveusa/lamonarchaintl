import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguageStore } from '@/services/articleService';
import { ChefHat, MapPin, Clock, Users, ArrowRight } from 'lucide-react';

const FoodSection = () => {
  const { language } = useLanguageStore();
  const isEn = language === 'en';

  const foods = [
    {
      title_es: 'Las Palmas Comida Local',
      title_en: 'Las Palmas Local Cuisine',
      description_es: 'La legendaria sazón familiar desde 1988. El carne en su jugo de Doña Rosa es leyenda.',
      description_en: 'Legendary family flavors since 1988. Doña Rosa\'s famous carne en su jugo is the stuff of legends.',
      type: 'Comida Local',
      rating: '4.8★',
      location: 'Malecón Centro',
      visits: '500+ diarios',
    },
    {
      title_es: 'El Molcajete del Puerto',
      title_en: 'El Molcajete del Puerto',
      description_es: 'La fusión costera del Chef Miguel. Sus ceviches de 7 hierbas son incomparables.',
      description_en: 'Chef Miguel\'s coastal fusion magic. His seven-herb ceviches are unmatched.',
      type: 'Seafood',
      rating: '4.9★',
      location: 'Zona Romántica',
      visits: '200+ nightly',
    },
    {
      title_es: 'El Dorado Taco Stand',
      title_en: 'El Dorado Taco Stand',
      description_es: 'Los tacos al fuego de pit-fire de Jorge y María. Legendarios. 500+ por día.',
      description_en: 'Jorge & Maria\'s legendary pit-fire tacos. 500+ served daily.',
      type: 'Street Food',
      rating: '4.9★',
      location: 'Mercado 5 de Diciembre',
      visits: '~500 daily',
    },
  ];

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <ChefHat className="h-5 w-5 text-monarca-terracotta" />
            <span className="text-xs font-black uppercase tracking-widest text-monarca-terracotta">
              {isEn ? 'Comida & Mercados' : 'Food & Markets'}
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-monarca-black mb-3 leading-tight">
            {isEn ? 'Puerto Vallarta\'s Soul Food' : 'El Alma de la Comida Vallartense'}
          </h2>
          <p className="text-monarca-gray max-w-2xl mb-6">
            {isEn
              ? 'From legendary market stalls to hidden coastal gem restaurants — discover where locals eat, how to navigate like a pro, and the stories behind Puerto Vallarta\'s greatest flavors.'
              : 'Desde puestos legendarios en mercados hasta restaurantes costeros escondidos — descubre dónde comen los locales, cómo navegar como un pro, y las historias detrás de los mayores sabores de Puerto Vallarta.'}
          </p>
        </div>

        {/* Featured Food Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {foods.map((food, idx) => (
            <div
              key={idx}
              className="border border-monarca-amber/20 rounded-lg p-6 hover:border-monarca-terracotta hover:shadow-lg transition-all duration-200 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-monarca-black text-lg mb-1 group-hover:text-monarca-terracotta transition-colors">
                    {isEn ? food.title_en : food.title_es}
                  </h3>
                  <span className="inline-block bg-monarca-amber/10 text-monarca-terracotta text-xs font-bold px-2 py-1 rounded">
                    {food.type}
                  </span>
                </div>
                <span className="text-monarca-amber font-bold text-sm">{food.rating}</span>
              </div>
              <p className="text-monarca-gray text-sm mb-4">
                {isEn ? food.description_en : food.description_es}
              </p>
              <div className="flex flex-col gap-2 text-xs text-monarca-gray mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3 flex-shrink-0" />
                  <span>{food.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-3 w-3 flex-shrink-0" />
                  <span>{isEn && food.visits.includes('nightly') ? food.visits : food.visits}</span>
                </div>
              </div>
              <div className="pt-4 border-t border-monarca-amber/10">
                <button className="text-monarca-terracotta text-sm font-bold hover:text-monarca-orange transition-colors flex items-center gap-1">
                  {isEn ? 'Learn more' : 'Saber más'}
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA to full food category */}
        <div className="bg-gradient-to-r from-monarca-amber/10 to-monarca-terracotta/10 rounded-xl p-8 border border-monarca-amber/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-monarca-black mb-2">
                {isEn
                  ? 'Explore Puerto Vallarta\'s Complete Food Guide'
                  : 'Explora la Guía Completa de Comida de Puerto Vallarta'}
              </h3>
              <p className="text-monarca-gray">
                {isEn
                  ? 'Markets, restaurants, street food, local tips, and how to eat authentic and avoid tourist traps.'
                  : 'Mercados, restaurantes, comida callejera, consejos locales y cómo comer auténtico evitando trampas turísticas.'}
              </p>
            </div>
            <Link
              to="/categoria/vida-sustentable"
              className="flex-shrink-0 px-6 py-3 bg-monarca-terracotta text-white rounded-lg hover:bg-monarca-orange transition-colors font-bold flex items-center gap-2 whitespace-nowrap"
            >
              {isEn ? 'Read Full Guide' : 'Leer Guía Completa'}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodSection;
