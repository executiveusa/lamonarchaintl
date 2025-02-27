
import React from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { useLanguageStore } from '@/services/articleService';

const MusicSection: React.FC = () => {
  const { language } = useLanguageStore();

  return (
    <section id="musica" className="py-20 bg-monarca-cream">
      <div className="container mx-auto px-6">
        <Header 
          title={language === 'en' ? "Music Innovation" : "Innovación Musical"}
          subtitle={language === 'en' ? "Exploring the fusion of traditional Mexican music with modern technology" : "Explorando la fusión de la música tradicional mexicana con la tecnología moderna"}
          smallPadding
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
          <div className="order-2 lg:order-1">
            <span className="inline-block py-1 px-3 bg-monarca-terracotta/10 text-monarca-terracotta text-sm font-medium rounded-full mb-4">
              {language === 'en' ? "Musical Evolution" : "Evolución Musical"}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-medium mb-6">
              {language === 'en' ? "The Digital Symphony of Mexican Heritage" : "La Sinfonía Digital del Patrimonio Mexicano"}
            </h2>
            <p className="text-monarca-gray/90 mb-6">
              {language === 'en' 
                ? "Mexican musicians are redefining traditional sounds by integrating cutting-edge digital production techniques. This fusion creates a unique audio landscape that honors cultural roots while embracing technological innovation."
                : "Los músicos mexicanos están redefiniendo los sonidos tradicionales mediante la integración de técnicas de producción digital de vanguardia. Esta fusión crea un paisaje sonoro único que honra las raíces culturales mientras adopta la innovación tecnológica."}
            </p>
            <p className="text-monarca-gray/90 mb-8">
              {language === 'en'
                ? "From AI-generated compositions based on indigenous melodies to virtual concerts that transport audiences to historical venues, technology is opening new dimensions for experiencing Mexican musical heritage."
                : "Desde composiciones generadas por IA basadas en melodías indígenas hasta conciertos virtuales que transportan a las audiencias a lugares históricos, la tecnología está abriendo nuevas dimensiones para experimentar el patrimonio musical mexicano."}
            </p>
            <Button 
              variant="outline"
              className="text-monarca-terracotta hover:text-monarca-orange border-monarca-terracotta hover:border-monarca-orange hover:bg-monarca-orange/5 group flex items-center"
            >
              {language === 'en' ? "Discover musical innovations" : "Descubrir innovaciones musicales"}
              <svg 
                className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </div>
          <div className="relative order-1 lg:order-2">
            <div className="absolute inset-0 translate-x-4 translate-y-4 bg-monarca-terracotta/20 rounded-lg"></div>
            <img 
              src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
              alt="Mexican music innovation" 
              className="relative z-10 rounded-lg w-full h-[400px] object-cover shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicSection;
