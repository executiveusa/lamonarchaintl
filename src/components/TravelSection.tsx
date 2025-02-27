
import React from 'react';
import Header from '@/components/Header';
import { useLanguageStore } from '@/services/articleService';

const TravelSection: React.FC = () => {
  const { language } = useLanguageStore();

  return (
    <section id="viajes" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <Header 
          title={language === 'en' ? "Travel Experiences" : "Experiencias de Viaje"}
          subtitle={language === 'en' ? "Discover Mexico through immersive technological journeys" : "Descubre México a través de viajes tecnológicos inmersivos"}
          smallPadding
        />
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-monarca-cream rounded-xl overflow-hidden shadow-md transform transition-transform duration-300 hover:-translate-y-2">
            <div className="h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1512813195386-6cf811ad3542?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
                alt="Mexico City" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="p-6">
              <span className="text-xs text-monarca-terracotta font-medium uppercase tracking-wider">
                {language === 'en' ? "Urban Experience" : "Experiencia Urbana"}
              </span>
              <h3 className="text-2xl font-display font-medium mt-2 mb-3">
                {language === 'en' ? "Mexico City Virtual Tour" : "Recorrido Virtual por la Ciudad de México"}
              </h3>
              <p className="text-monarca-gray/80 mb-4">
                {language === 'en' ? "Experience the vibrant streets and historical landmarks of Mexico City through our AI-guided virtual reality tours." : "Experimenta las vibrantes calles y los monumentos históricos de la Ciudad de México a través de nuestros recorridos de realidad virtual guiados por IA."}
              </p>
              <a href="#" className="text-monarca-terracotta hover:text-monarca-orange transition-colors">
                {language === 'en' ? "Explore now →" : "Explorar ahora →"}
              </a>
            </div>
          </div>
          
          <div className="bg-monarca-cream rounded-xl overflow-hidden shadow-md transform transition-transform duration-300 hover:-translate-y-2">
            <div className="h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
                alt="Natural landscapes" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="p-6">
              <span className="text-xs text-monarca-terracotta font-medium uppercase tracking-wider">
                {language === 'en' ? "Natural Wonders" : "Maravillas Naturales"}
              </span>
              <h3 className="text-2xl font-display font-medium mt-2 mb-3">
                {language === 'en' ? "Biodiversity Expedition" : "Expedición de Biodiversidad"}
              </h3>
              <p className="text-monarca-gray/80 mb-4">
                {language === 'en' ? "Explore Mexico's diverse ecosystems through augmented reality experiences that highlight conservation efforts." : "Explora los diversos ecosistemas de México a través de experiencias de realidad aumentada que destacan los esfuerzos de conservación."}
              </p>
              <a href="#" className="text-monarca-terracotta hover:text-monarca-orange transition-colors">
                {language === 'en' ? "Discover biodiversity →" : "Descubrir la biodiversidad →"}
              </a>
            </div>
          </div>
          
          <div className="bg-monarca-cream rounded-xl overflow-hidden shadow-md transform transition-transform duration-300 hover:-translate-y-2">
            <div className="h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
                alt="Cultural heritage" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="p-6">
              <span className="text-xs text-monarca-terracotta font-medium uppercase tracking-wider">
                {language === 'en' ? "Cultural Heritage" : "Patrimonio Cultural"}
              </span>
              <h3 className="text-2xl font-display font-medium mt-2 mb-3">
                {language === 'en' ? "Ancestral Sites" : "Sitios Ancestrales"}
              </h3>
              <p className="text-monarca-gray/80 mb-4">
                {language === 'en' ? "Visit ancient Mayan and Aztec sites through interactive 3D reconstructions powered by archaeological data." : "Visita antiguos sitios mayas y aztecas a través de reconstrucciones interactivas en 3D impulsadas por datos arqueológicos."}
              </p>
              <a href="#" className="text-monarca-terracotta hover:text-monarca-orange transition-colors">
                {language === 'en' ? "Travel back in time →" : "Viajar en el tiempo →"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelSection;
