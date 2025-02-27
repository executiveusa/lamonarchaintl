
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguageStore } from '@/services/articleService';

const ArtSection: React.FC = () => {
  const { language } = useLanguageStore();

  // Translate section content based on language
  const getTranslatedContent = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      'art_innovation': {
        'en': 'Artistic Innovation',
        'es': 'Innovación Artística'
      },
      'digital_revolution': {
        'en': 'The Digital Revolution in Mexican Art',
        'es': 'La Revolución Digital en el Arte Mexicano'
      },
      'art_description': {
        'en': 'The intersection between technology and artistic expression is creating new ways to experience Mexico\'s rich culture. From interactive installations to augmented reality experiences, Mexican artists are at the forefront of innovation.',
        'es': 'La intersección entre tecnología y expresión artística está creando nuevas formas de experimentar la rica cultura de México. Desde instalaciones interactivas hasta experiencias de realidad aumentada, los artistas mexicanos están a la vanguardia de la innovación.'
      },
      'art_description_2': {
        'en': 'Through the application of artificial intelligence, virtual reality, and other emerging technologies, the national artistic landscape is being transformed, attracting international attention and establishing new creative paradigms.',
        'es': 'A través de la aplicación de inteligencia artificial, realidad virtual y otras tecnologías emergentes, el panorama artístico nacional se está transformando, atrayendo la atención internacional y estableciendo nuevos paradigmas creativos.'
      },
      'explore_trends': {
        'en': 'Explore artistic trends',
        'es': 'Explorar tendencias artísticas'
      }
    };

    return translations[key][language] || key;
  };

  return (
    <section id="arte" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block py-1 px-3 bg-monarca-orange/10 text-monarca-orange text-sm font-medium rounded-full mb-4">
              {getTranslatedContent('art_innovation')}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-medium mb-6">
              {getTranslatedContent('digital_revolution')}
            </h2>
            <p className="text-monarca-gray/90 mb-6">
              {getTranslatedContent('art_description')}
            </p>
            <p className="text-monarca-gray/90 mb-8">
              {getTranslatedContent('art_description_2')}
            </p>
            <Button 
              variant="outline"
              className="text-monarca-terracotta hover:text-monarca-orange border-monarca-terracotta hover:border-monarca-orange hover:bg-monarca-orange/5 group flex items-center"
            >
              {getTranslatedContent('explore_trends')}
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
          <div className="relative">
            <div className="absolute inset-0 -translate-x-4 -translate-y-4 bg-monarca-orange/20 rounded-lg"></div>
            <img 
              src="https://images.unsplash.com/photo-1460574283810-2aab119d8511?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
              alt="Mexican digital art" 
              className="relative z-10 rounded-lg w-full h-[400px] object-cover shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtSection;
