import React, { useState } from 'react';
import { useLanguageStore } from '@/services/articleService';
import { MapPin, Clock, DollarSign, Star, ChefHat, Leaf } from 'lucide-react';

const FoodMarketFeature: React.FC = () => {
  const { language } = useLanguageStore();
  const isEn = language === 'en';
  const [expandedMarket, setExpandedMarket] = useState<string | null>('mercado-5-diciembre');

  const markets = [
    {
      id: 'mercado-5-diciembre',
      name_en: 'Mercado 5 de Diciembre',
      name_es: 'Mercado 5 de Diciembre',
      desc_en: 'Puerto Vallarta\'s heart of local food culture. This vibrant market is where locals source fresh produce, seafood, and handmade tortillas. Built in 1970, it remains unchanged in spirit—a true community gathering place.',
      desc_es: 'El corazón de la cultura gastronómica local de Puerto Vallarta. Este mercado vibrante es donde los locales obtienen productos frescos, mariscos y tortillas hechas a mano. Construido en 1970, sigue siendo el mismo en espíritu, un verdadero lugar de encuentro comunitario.',
      highlights_en: ['Fresh catch daily', 'Organic produce stand', 'Artisanal tamales & tortillas', 'Juice bar with tropical fruits'],
      highlights_es: ['Captura fresca diaria', 'Puesto de productos orgánicos', 'Tamales y tortillas artesanales', 'Barra de jugos con frutas tropicales'],
      hours: 'Daily 6am - 3pm',
      location: 'Centro, Puerto Vallarta',
      price_en: 'Affordable',
      price_es: 'Asequible',
    },
    {
      id: 'mercado-rio-cuale',
      name_en: 'Río Cuale Market',
      name_es: 'Mercado del Río Cuale',
      desc_en: 'Located on the island in the middle of Río Cuale, this artisanal market combines local crafts with fresh food vendors. It\'s a culinary and cultural experience—watch vendors prepare fresh ceviche and aguachiles right before your eyes.',
      desc_es: 'Ubicado en la isla en medio del Río Cuale, este mercado artesanal combina artesanías locales con vendedores de comida fresca. Es una experiencia culinaria y cultural; observe a los vendedores preparar ceviche y aguachiles frescos ante sus ojos.',
      highlights_en: ['Fresh ceviche stations', 'Handmade crafts', 'Street food vendors', 'River views & relaxation'],
      highlights_es: ['Estaciones de ceviche fresco', 'Artesanías hechas a mano', 'Vendedores de comida callejera', 'Vistas al río y relajación'],
      hours: 'Daily 9am - 6pm',
      location: 'Isla del Río Cuale',
      price_en: 'Budget-friendly',
      price_es: 'Económico',
    },
  ];

  const restaurants = [
    {
      id: 'las-palmas',
      name_en: 'Las Palmas Comida Local',
      name_es: 'Las Palmas Comida Local',
      cuisine_en: 'Traditional Mexican',
      cuisine_es: 'Mexicana Tradicional',
      description_en: 'Family-run since 1988. Specializes in regional Jalisco cuisine with recipes passed down through generations. The carne en su jugo (beef in its own broth) is legendary. Owner Doña Rosa personally ensures every dish honors her grandmother\'s traditions.',
      description_es: 'Dirigido por la familia desde 1988. Se especializa en cocina regional de Jalisco con recetas transmitidas de generación en generación. La carne en su jugo es legendaria. La propietaria, Doña Rosa, asegura personalmente que cada plato honre las tradiciones de su abuela.',
      signature_en: 'Carne en Su Jugo',
      signature_es: 'Carne en Su Jugo',
      price_en: 'Moderate',
      price_es: 'Moderado',
      rating: 4.8,
      visits: '1000+ locals monthly',
    },
    {
      id: 'el-molcajete',
      name_en: 'El Molcajete del Puerto',
      name_es: 'El Molcajete del Puerto',
      cuisine_en: 'Coastal Fusion',
      cuisine_es: 'Fusión Costera',
      description_en: 'Chef Miguel combines fresh Pacific seafood with traditional techniques. Every ingredient is sourced from the morning market—fish caught within 12 hours, vegetables picked at dawn. The ceviches are an art form, balancing citrus, chiles, and coastal herbs.',
      description_es: 'El Chef Miguel combina mariscos frescos del Pacífico con técnicas tradicionales. Cada ingrediente se obtiene del mercado matutino: pescado capturado dentro de 12 horas, verduras recolectadas al amanecer. Los ceviches son una forma de arte, equilibrando cítricos, chiles y hierbas costeras.',
      signature_en: 'Seven-Herb Ceviche',
      signature_es: 'Ceviche de Siete Hierbas',
      price_en: 'Moderate to High',
      price_es: 'Moderado a Alto',
      rating: 4.9,
      visits: 'Chef trained in Oaxaca & Yucatán',
    },
    {
      id: 'el-dorado-tacos',
      name_en: 'El Dorado Taco Stand',
      name_es: 'Puesto de Tacos El Dorado',
      cuisine_en: 'Street Tacos',
      cuisine_es: 'Tacos Callejeros',
      description_en: 'Legendary spot operated by Jorge and his wife Maria since 2001. Open only 5pm-11pm, but locals line up an hour early. Their carne asada, carnitas, and fish tacos are prepared using traditional pit-fire techniques. A true rite of passage for Puerto Vallarta visitors.',
      description_es: 'Lugar legendario operado por Jorge y su esposa María desde 2001. Abierto solo de 5pm a 11pm, pero los locales se forman una hora antes. Sus tacos de carne asada, carnitas y pescado se preparan usando técnicas tradicionales de fuego de pozo. Un verdadero rito de iniciación para los visitantes.',
      signature_en: 'Carne Asada & Carnitas Tacos',
      signature_es: 'Tacos de Carne Asada y Carnitas',
      price_en: 'Budget',
      price_es: 'Económico',
      rating: 4.9,
      visits: '500+ daily',
    },
  ];

  return (
    <div className="py-16 bg-gradient-to-b from-white to-monarca-cream/30">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <div className="mb-14">
          <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            {isEn ? 'Food Culture' : 'Cultura Gastronómica'}
          </span>
          <h2 className="font-display text-4xl font-bold text-monarca-black mb-4">
            {isEn ? 'The Flavors of Puerto Vallarta' : 'Los Sabores de Puerto Vallarta'}
          </h2>
          <p className="text-lg text-monarca-gray leading-relaxed">
            {isEn
              ? 'Where locals eat reveals the soul of a place. Puerto Vallarta\'s food scene is where tradition meets the ocean, community meets sustainability, and every meal tells a story.'
              : 'Dónde comen los locales revela el alma de un lugar. La escena gastronómica de Puerto Vallarta es donde la tradición se encuentra con el océano, la comunidad se encuentra con la sostenibilidad, y cada comida cuenta una historia.'}
          </p>
        </div>

        {/* Markets Section */}
        <div className="mb-16">
          <h3 className="font-display text-2xl font-bold text-monarca-black mb-8 flex items-center gap-3">
            <Leaf className="h-6 w-6 text-green-600" />
            {isEn ? 'Local Markets' : 'Mercados Locales'}
          </h3>
          <div className="space-y-4">
            {markets.map((market) => (
              <div
                key={market.id}
                className="bg-white rounded-lg border border-monarca-cream/50 overflow-hidden hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => setExpandedMarket(expandedMarket === market.id ? null : market.id)}
                  className="w-full p-6 flex items-start justify-between hover:bg-monarca-cream/20 transition-colors"
                >
                  <div className="flex-1 text-left">
                    <h4 className="font-display text-xl font-bold text-monarca-black mb-2">
                      {isEn ? market.name_en : market.name_es}
                    </h4>
                    <div className="flex flex-wrap gap-4 text-sm text-monarca-gray">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-monarca-terracotta" />
                        {market.location}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-monarca-terracotta" />
                        {market.hours}
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 text-monarca-terracotta">
                    {expandedMarket === market.id ? '−' : '+'}
                  </div>
                </button>

                {expandedMarket === market.id && (
                  <div className="border-t border-monarca-cream/50 p-6 bg-monarca-cream/10">
                    <p className="text-monarca-gray leading-relaxed mb-6">
                      {isEn ? market.desc_en : market.desc_es}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {(isEn ? market.highlights_en : market.highlights_es).map((highlight, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <ChefHat className="h-4 w-4 text-monarca-terracotta mt-1 flex-shrink-0" />
                          <span className="text-sm text-monarca-gray">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Restaurants Section */}
        <div>
          <h3 className="font-display text-2xl font-bold text-monarca-black mb-8 flex items-center gap-3">
            <ChefHat className="h-6 w-6 text-monarca-terracotta" />
            {isEn ? 'Local Favorites' : 'Favoritos Locales'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {restaurants.map((rest) => (
              <div key={rest.id} className="bg-white rounded-lg border border-monarca-cream/50 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-display text-lg font-bold text-monarca-black">
                      {isEn ? rest.name_en : rest.name_es}
                    </h4>
                    <span className="text-sm text-monarca-terracotta font-medium">
                      {isEn ? rest.cuisine_en : rest.cuisine_es}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-bold text-yellow-700">{rest.rating}</span>
                  </div>
                </div>

                <p className="text-sm text-monarca-gray leading-relaxed mb-4">
                  {isEn ? rest.description_en : rest.description_es}
                </p>

                <div className="space-y-3 pt-4 border-t border-monarca-cream/50">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-monarca-terracotta uppercase">
                      {isEn ? 'Signature' : 'Especialidad'}:
                    </span>
                    <span className="text-sm font-medium text-monarca-black">
                      {isEn ? rest.signature_en : rest.signature_es}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-monarca-gray">
                      <DollarSign className="h-3.5 w-3.5" />
                      {isEn ? rest.price_en : rest.price_es}
                    </div>
                    <span className="text-monarca-terracotta font-medium">{rest.visits}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Tip */}
        <div className="mt-16 bg-monarca-terracotta/10 border-l-4 border-monarca-terracotta p-6 rounded">
          <p className="text-monarca-black font-bold mb-2">
            {isEn ? 'Pro Tip from Locals' : 'Consejo de los Locales'}
          </p>
          <p className="text-sm text-monarca-gray leading-relaxed">
            {isEn
              ? 'Visit markets early (before 9am) for the best selection. Don\'t be shy—ask vendors for recommendations. In Puerto Vallarta, hospitality is served with every meal. Come hungry, leave happy.'
              : 'Visita los mercados temprano (antes de las 9am) para la mejor selección. No seas tímido, pídeles a los vendedores recomendaciones. En Puerto Vallarta, la hospitalidad se sirve con cada comida. Llega hambriento, vete feliz.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FoodMarketFeature;
