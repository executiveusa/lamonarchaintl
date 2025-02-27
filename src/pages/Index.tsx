
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ArticleCard from '@/components/ArticleCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Mock data fetch - in a real app, this would be a fetch to your API
    const fetchArticles = () => {
      setIsLoading(true);
      
      // Mock articles data
      const mockArticles = [
        {
          id: 1,
          title: 'México lidera avances en IA aplicada al análisis del cambio climático',
          excerpt: 'Investigadores mexicanos desarrollan un modelo de IA que predice con precisión patrones climáticos regionales, estableciendo un nuevo estándar global.',
          imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
          category: 'Ciencia',
          date: '12 Mayo, 2023'
        },
        {
          id: 2,
          title: 'La Revolución Digital en el Arte Mexicano Contemporáneo',
          excerpt: 'Artistas mexicanos están redefiniendo el panorama artístico nacional integrando tecnologías de vanguardia en sus creaciones.',
          imageUrl: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
          category: 'Arte',
          date: '28 Abril, 2023'
        },
        {
          id: 3,
          title: 'Nuevas Políticas de Innovación Tecnológica en Ciudad de México',
          excerpt: 'El gobierno capitalino anuncia importantes inversiones en infraestructura digital para convertir a CDMX en un hub tecnológico latinoamericano.',
          imageUrl: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
          category: 'Tecnología',
          date: '15 Abril, 2023'
        },
        {
          id: 4,
          title: 'El Impacto de la Migración de las Monarcas en los Ecosistemas Digitales',
          excerpt: 'Un estudio innovador establece paralelismos entre los patrones migratorios de las mariposas monarca y la difusión de información en redes sociales.',
          imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
          category: 'Monarcas',
          date: '3 Abril, 2023'
        },
        {
          id: 5,
          title: 'Startup Mexicana Desarrolla Sistema de IA para Preservación Cultural',
          excerpt: 'Una innovadora plataforma utiliza algoritmos de aprendizaje automático para digitalizar y preservar lenguas indígenas en peligro de extinción.',
          imageUrl: 'https://images.unsplash.com/photo-1527576539890-dfa815648363?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
          category: 'Innovación',
          date: '22 Marzo, 2023'
        },
        {
          id: 6,
          title: 'El Renacimiento de la Artesanía Tradicional a través de la Tecnología',
          excerpt: 'Artesanos de diversas regiones de México están incorporando herramientas digitales para preservar y evolucionar técnicas ancestrales.',
          imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
          category: 'Arte',
          date: '10 Marzo, 2023'
        }
      ];
      
      // Simulate network delay
      setTimeout(() => {
        setArticles(mockArticles);
        setIsLoading(false);
      }, 800);
    };
    
    fetchArticles();
  }, []);
  
  return (
    <div className="min-h-screen bg-monarca-cream">
      {/* Navigation */}
      <Navigation transparent />
      
      {/* Hero Section */}
      <Hero />
      
      {/* News Section */}
      <section id="noticias" className="py-20">
        <div className="container mx-auto px-6">
          <Header 
            title="Últimas Noticias en IA" 
            subtitle="Descubre los avances más recientes en inteligencia artificial y su impacto en México"
            smallPadding
          />
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md h-[400px] animate-pulse">
                  <div className="bg-monarca-gray/20 h-60" />
                  <div className="p-6">
                    <div className="h-4 bg-monarca-gray/20 rounded w-1/4 mb-4" />
                    <div className="h-6 bg-monarca-gray/20 rounded w-3/4 mb-4" />
                    <div className="h-4 bg-monarca-gray/20 rounded w-full mb-2" />
                    <div className="h-4 bg-monarca-gray/20 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {articles.map((article, index) => (
                <ArticleCard 
                  key={article.id}
                  title={article.title}
                  excerpt={article.excerpt}
                  imageUrl={article.imageUrl}
                  category={article.category}
                  date={article.date}
                  index={index}
                />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <a 
              href="#" 
              className="inline-block bg-monarca-terracotta hover:bg-monarca-orange text-white py-3 px-8 rounded-md transition-all duration-300 hover:shadow-lg"
            >
              Ver más noticias
            </a>
          </div>
        </div>
      </section>
      
      {/* Featured Section */}
      <section id="arte" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block py-1 px-3 bg-monarca-orange/10 text-monarca-orange text-sm font-medium rounded-full mb-4">
                Innovación Artística
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-medium mb-6">
                La Revolución Digital en el Arte Mexicano
              </h2>
              <p className="text-monarca-gray/90 mb-6">
                La intersección entre tecnología y expresión artística está creando nuevas formas de experimentar la rica cultura mexicana. Desde instalaciones interactivas hasta experiencias de realidad aumentada, los artistas mexicanos están a la vanguardia de la innovación.
              </p>
              <p className="text-monarca-gray/90 mb-8">
                Mediante la aplicación de inteligencia artificial, realidad virtual y otras tecnologías emergentes, el panorama artístico nacional se está transformando, atrayendo la atención internacional y estableciendo nuevos paradigmas creativos.
              </p>
              <a 
                href="#" 
                className="inline-flex items-center text-monarca-terracotta hover:text-monarca-orange transition-colors duration-300 group"
              >
                Explorar tendencias artísticas
                <svg 
                  className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-0 -translate-x-4 -translate-y-4 bg-monarca-orange/20 rounded-lg"></div>
              <img 
                src="https://images.unsplash.com/photo-1460574283810-2aab119d8511?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
                alt="Arte digital mexicano" 
                className="relative z-10 rounded-lg w-full h-[400px] object-cover shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section id="contacto" className="relative py-24">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1527576539890-dfa815648363?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
            filter: 'brightness(0.4)'
          }}
        />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-5xl font-display font-medium mb-6">
              Únete a la conversación sobre el futuro de México
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Suscríbete a nuestro boletín para recibir las últimas noticias, artículos y eventos directamente en tu bandeja de entrada.
            </p>
            <form className="flex flex-col sm:flex-row max-w-xl mx-auto gap-4">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-grow px-4 py-3 bg-black/30 border border-white/30 rounded-md focus:outline-none focus:border-monarca-terracotta transition-colors text-white"
              />
              <button 
                type="submit" 
                className="px-6 py-3 bg-monarca-terracotta hover:bg-monarca-orange text-white rounded-md transition-all duration-300 hover:shadow-lg"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
