import React, { useState, useEffect } from 'react';
import { 
  Button as MuiButton, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActions, 
  Typography, 
  Box 
} from '@mui/material';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { fetchArticles, useLanguageStore } from '@/services/articleService';

const Index = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { language } = useLanguageStore();

  useEffect(() => {
    loadArticles();
  }, [language]);

  async function loadArticles() {
    setIsLoading(true);
    
    try {
      const articlesData = await fetchArticles(language);
      
      if (articlesData && articlesData.length > 0) {
        setArticles(articlesData);
      } else {
        loadMockArticles();
      }
    } catch (err) {
      console.error('Failed to fetch articles:', err);
      loadMockArticles();
    } finally {
      setIsLoading(false);
    }
  }
  
  const loadMockArticles = () => {
    const mockArticles = language === 'en' ? [
      {
        id: '1',
        title: 'Mexico leads advances in AI applied to climate change analysis',
        content: 'Mexican researchers develop an AI model that accurately predicts regional climate patterns, setting a new global standard.',
        image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        category: 'Science',
        created_at: '2023-05-12T00:00:00.000Z',
        updated_at: '2023-05-12T00:00:00.000Z',
        author: 'La Monarca Internacional',
        date: 'May 12, 2023',
        language: 'en'
      },
      {
        id: '2',
        title: 'The Digital Revolution in Contemporary Mexican Art',
        content: 'Mexican artists are redefining the national artistic landscape by integrating cutting-edge technologies into their creations.',
        image_url: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        category: 'Art',
        created_at: '2023-04-28T00:00:00.000Z',
        updated_at: '2023-04-28T00:00:00.000Z',
        author: 'La Monarca Internacional',
        date: 'April 28, 2023',
        language: 'en'
      },
      {
        id: '3',
        title: 'New Technology Innovation Policies in Mexico City',
        content: 'The capital\'s government announces major investments in digital infrastructure to transform CDMX into a Latin American technology hub.',
        image_url: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        category: 'Technology',
        created_at: '2023-04-15T00:00:00.000Z',
        updated_at: '2023-04-15T00:00:00.000Z',
        author: 'La Monarca Internacional',
        date: 'April 15, 2023',
        language: 'en'
      },
      {
        id: '4',
        title: 'The Impact of Monarch Migration on Digital Ecosystems',
        content: 'An innovative study establishes parallels between the migratory patterns of monarch butterflies and the dissemination of information on social networks.',
        image_url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        category: 'Monarchs',
        created_at: '2023-04-03T00:00:00.000Z',
        updated_at: '2023-04-03T00:00:00.000Z',
        author: 'La Monarca Internacional',
        date: 'April 3, 2023',
        language: 'en'
      },
      {
        id: '5',
        title: 'Mexican Startup Develops AI System for Cultural Preservation',
        content: 'An innovative platform uses machine learning algorithms to digitize and preserve endangered indigenous languages.',
        image_url: 'https://images.unsplash.com/photo-1527576539890-dfa815648363?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        category: 'Innovation',
        created_at: '2023-03-22T00:00:00.000Z',
        updated_at: '2023-03-22T00:00:00.000Z',
        author: 'La Monarca Internacional',
        date: 'March 22, 2023',
        language: 'en'
      },
      {
        id: '6',
        title: 'The Renaissance of Traditional Craftsmanship through Technology',
        content: 'Artisans from various regions of Mexico are incorporating digital tools to preserve and evolve ancestral techniques.',
        image_url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        category: 'Art',
        created_at: '2023-03-10T00:00:00.000Z',
        updated_at: '2023-03-10T00:00:00.000Z',
        author: 'La Monarca Internacional',
        date: 'March 10, 2023',
        language: 'en'
      }
    ] : [
      {
        id: '1-es',
        title: 'México lidera avances en IA aplicada al análisis del cambio climático',
        content: 'Investigadores mexicanos desarrollan un modelo de IA que predice con precisión los patrones climáticos regionales, estableciendo un nuevo estándar global.',
        image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        category: 'Ciencia',
        created_at: '2023-05-12T00:00:00.000Z',
        updated_at: '2023-05-12T00:00:00.000Z',
        author: 'La Monarca Internacional',
        date: '12 de mayo, 2023',
        language: 'es'
      },
      {
        id: '2-es',
        title: 'La Revolución Digital en el Arte Mexicano Contemporáneo',
        content: 'Artistas mexicanos están redefiniendo el panorama artístico nacional mediante la integración de tecnologías de vanguardia en sus creaciones.',
        image_url: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        category: 'Arte',
        created_at: '2023-04-28T00:00:00.000Z',
        updated_at: '2023-04-28T00:00:00.000Z',
        author: 'La Monarca Internacional',
        date: '28 de abril, 2023',
        language: 'es'
      },
      {
        id: '3-es',
        title: 'Nuevas Políticas de Innovación Tecnológica en la Ciudad de México',
        content: 'El gobierno de la capital anuncia importantes inversiones en infraestructura digital para transformar CDMX en un centro tecnológico latinoamericano.',
        image_url: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        category: 'Tecnología',
        created_at: '2023-04-15T00:00:00.000Z',
        updated_at: '2023-04-15T00:00:00.000Z',
        author: 'La Monarca Internacional',
        date: '15 de abril, 2023',
        language: 'es'
      },
      {
        id: '4-es',
        title: 'El Impacto de la Migración de la Mariposa Monarca en Ecosistemas Digitales',
        content: 'Un innovador estudio establece paralelismos entre los patrones migratorios de las mariposas monarca y la diseminación de información en redes sociales.',
        image_url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        category: 'Monarcas',
        created_at: '2023-04-03T00:00:00.000Z',
        updated_at: '2023-04-03T00:00:00.000Z',
        author: 'La Monarca Internacional',
        date: '3 de abril, 2023',
        language: 'es'
      },
      {
        id: '5-es',
        title: 'Startup Mexicana Desarrolla Sistema de IA para Preservación Cultural',
        content: 'Una plataforma innovadora utiliza algoritmos de aprendizaje automático para digitalizar y preservar lenguas indígenas en peligro de extinción.',
        image_url: 'https://images.unsplash.com/photo-1527576539890-dfa815648363?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        category: 'Innovación',
        created_at: '2023-03-22T00:00:00.000Z',
        updated_at: '2023-03-22T00:00:00.000Z',
        author: 'La Monarca Internacional',
        date: '22 de marzo, 2023',
        language: 'es'
      },
      {
        id: '6-es',
        title: 'El Renacimiento de la Artesanía Tradicional a través de la Tecnología',
        content: 'Artesanos de diversas regiones de México están incorporando herramientas digitales para preservar y evolucionar técnicas ancestrales.',
        image_url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        category: 'Arte',
        created_at: '2023-03-10T00:00:00.000Z',
        updated_at: '2023-03-10T00:00:00.000Z',
        author: 'La Monarca Internacional',
        date: '10 de marzo, 2023',
        language: 'es'
      }
    ];
    
    setTimeout(() => {
      setArticles(mockArticles);
      setIsLoading(false);
    }, 800);
  };

  // Translate section titles and content based on language
  const getTranslatedContent = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      'latest_news': {
        'en': 'Latest AI News',
        'es': 'Últimas Noticias de IA'
      },
      'latest_news_subtitle': {
        'en': 'Discover the most recent advances in artificial intelligence and their impact in Mexico',
        'es': 'Descubre los avances más recientes en inteligencia artificial y su impacto en México'
      },
      'view_more': {
        'en': 'View more news',
        'es': 'Ver más noticias'
      },
      'read_more': {
        'en': 'Read More',
        'es': 'Leer Más'
      },
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
    <div className="min-h-screen bg-monarca-cream">
      <Navigation />
      
      <div className="fixed top-20 right-6 z-50">
        <LanguageSwitcher />
      </div>
      
      <Hero />
      
      <section id="noticias" className="py-20">
        <div className="container mx-auto px-6">
          <Header 
            title={getTranslatedContent('latest_news')}
            subtitle={getTranslatedContent('latest_news_subtitle')}
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
                <Card key={article.id} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={article.image_url}
                    alt={article.title}
                  />
                  <Box sx={{ position: 'absolute', top: 16, left: 16, bgcolor: 'primary.main', color: 'white', px: 1, py: 0.5, borderRadius: 1 }}>
                    {article.category}
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      {article.date || new Date(article.created_at).toLocaleDateString(language === 'en' ? 'en-US' : 'es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Typography>
                    <Typography variant="h5" component="h2" gutterBottom>
                      {article.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {article.content}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <MuiButton size="small" color="primary">
                      {getTranslatedContent('read_more')}
                    </MuiButton>
                  </CardActions>
                </Card>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Button 
              variant="default" 
              size="lg"
              className="bg-monarca-terracotta hover:bg-monarca-orange text-white py-3 px-6 rounded-md"
            >
              {getTranslatedContent('view_more')}
            </Button>
          </div>
        </div>
      </section>
      
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
                <span className="text-xs text-monarca-terracotta font-medium uppercase tracking-wider">{language === 'en' ? "Urban Experience" : "Experiencia Urbana"}</span>
                <h3 className="text-2xl font-display font-medium mt-2 mb-3">{language === 'en' ? "Mexico City Virtual Tour" : "Recorrido Virtual por la Ciudad de México"}</h3>
                <p className="text-monarca-gray/80 mb-4">{language === 'en' ? "Experience the vibrant streets and historical landmarks of Mexico City through our AI-guided virtual reality tours." : "Experimenta las vibrantes calles y los monumentos históricos de la Ciudad de México a través de nuestros recorridos de realidad virtual guiados por IA."}</p>
                <a href="#" className="text-monarca-terracotta hover:text-monarca-orange transition-colors">{language === 'en' ? "Explore now →" : "Explorar ahora →"}</a>
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
                <span className="text-xs text-monarca-terracotta font-medium uppercase tracking-wider">{language === 'en' ? "Natural Wonders" : "Maravillas Naturales"}</span>
                <h3 className="text-2xl font-display font-medium mt-2 mb-3">{language === 'en' ? "Biodiversity Expedition" : "Expedición de Biodiversidad"}</h3>
                <p className="text-monarca-gray/80 mb-4">{language === 'en' ? "Explore Mexico's diverse ecosystems through augmented reality experiences that highlight conservation efforts." : "Explora los diversos ecosistemas de México a través de experiencias de realidad aumentada que destacan los esfuerzos de conservación."}</p>
                <a href="#" className="text-monarca-terracotta hover:text-monarca-orange transition-colors">{language === 'en' ? "Discover biodiversity →" : "Descubrir la biodiversidad →"}</a>
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
                <span className="text-xs text-monarca-terracotta font-medium uppercase tracking-wider">{language === 'en' ? "Cultural Heritage" : "Patrimonio Cultural"}</span>
                <h3 className="text-2xl font-display font-medium mt-2 mb-3">{language === 'en' ? "Ancestral Sites" : "Sitios Ancestrales"}</h3>
                <p className="text-monarca-gray/80 mb-4">{language === 'en' ? "Visit ancient Mayan and Aztec sites through interactive 3D reconstructions powered by archaeological data." : "Visita antiguos sitios mayas y aztecas a través de reconstrucciones interactivas en 3D impulsadas por datos arqueológicos."}</p>
                <a href="#" className="text-monarca-terracotta hover:text-monarca-orange transition-colors">{language === 'en' ? "Travel back in time →" : "Viajar en el tiempo →"}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section id="inteligencia-artificial" className="py-20 bg-monarca-cream relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-monarca-terracotta/10 to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10">
          <Header 
            title={language === 'en' ? "AI Innovation Hub" : "Centro de Innovación en IA"}
            subtitle={language === 'en' ? "Mexico's contributions to the global artificial intelligence landscape" : "Contribuciones de México al panorama mundial de la inteligencia artificial"}
            smallPadding
          />
          
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl md:text-3xl font-display font-medium mb-6">{language === 'en' ? "Leading the AI Revolution in Latin America" : "Liderando la Revolución de la IA en América Latina"}</h3>
                <p className="text-monarca-gray/90 mb-6">
                  {language === 'en'
                    ? "Mexico is positioning itself as a leader in artificial intelligence research and development throughout Latin America. With significant investments in education, infrastructure, and startup ecosystems, the country is fostering innovation that addresses unique regional challenges."
                    : "México se está posicionando como líder en investigación y desarrollo de inteligencia artificial en toda América Latina. Con importantes inversiones en educación, infraestructura y ecosistemas de startups, el país está fomentando la innovación que aborda desafíos regionales únicos."}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-start">
                    <div className="mr-4 p-3 bg-monarca-orange/10 text-monarca-orange rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="1
