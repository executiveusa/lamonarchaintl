
import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, CardMedia, CardActions, Typography, Box } from '@mui/material';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { fetchArticles } from '@/services/articleService';

const Index = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    loadArticles();
  }, []);

  async function loadArticles() {
    setIsLoading(true);
    
    try {
      const articlesData = await fetchArticles();
      
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
    const mockArticles = [
      {
        id: '1',
        title: 'Mexico leads advances in AI applied to climate change analysis',
        content: 'Mexican researchers develop an AI model that accurately predicts regional climate patterns, setting a new global standard.',
        image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        category: 'Science',
        created_at: '2023-05-12T00:00:00.000Z',
        updated_at: '2023-05-12T00:00:00.000Z',
        author: 'La Monarca Internacional',
        date: 'May 12, 2023'
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
        date: 'April 28, 2023'
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
        date: 'April 15, 2023'
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
        date: 'April 3, 2023'
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
        date: 'March 22, 2023'
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
        date: 'March 10, 2023'
      }
    ];
    
    setTimeout(() => {
      setArticles(mockArticles);
      setIsLoading(false);
    }, 800);
  };
  
  return (
    <div className="min-h-screen bg-monarca-cream">
      <Navigation />
      
      <Hero />
      
      <section id="noticias" className="py-20">
        <div className="container mx-auto px-6">
          <Header 
            title="Latest AI News" 
            subtitle="Discover the most recent advances in artificial intelligence and their impact in Mexico"
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
                      {article.date || new Date(article.created_at).toLocaleDateString('en-US', {
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
                    <Button size="small" color="primary">
                      Read More
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Button 
              variant="contained" 
              color="primary"
              size="large"
            >
              View more news
            </Button>
          </div>
        </div>
      </section>
      
      <section id="arte" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block py-1 px-3 bg-monarca-orange/10 text-monarca-orange text-sm font-medium rounded-full mb-4">
                Artistic Innovation
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-medium mb-6">
                The Digital Revolution in Mexican Art
              </h2>
              <p className="text-monarca-gray/90 mb-6">
                The intersection between technology and artistic expression is creating new ways to experience Mexico's rich culture. From interactive installations to augmented reality experiences, Mexican artists are at the forefront of innovation.
              </p>
              <p className="text-monarca-gray/90 mb-8">
                Through the application of artificial intelligence, virtual reality, and other emerging technologies, the national artistic landscape is being transformed, attracting international attention and establishing new creative paradigms.
              </p>
              <Button 
                variant="text" 
                color="primary"
                endIcon={
                  <svg 
                    className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                }
              >
                Explore artistic trends
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
            title="Music Innovation" 
            subtitle="Exploring the fusion of traditional Mexican music with modern technology"
            smallPadding
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
            <div className="order-2 lg:order-1">
              <span className="inline-block py-1 px-3 bg-monarca-terracotta/10 text-monarca-terracotta text-sm font-medium rounded-full mb-4">
                Musical Evolution
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-medium mb-6">
                The Digital Symphony of Mexican Heritage
              </h2>
              <p className="text-monarca-gray/90 mb-6">
                Mexican musicians are redefining traditional sounds by integrating cutting-edge digital production techniques. This fusion creates a unique audio landscape that honors cultural roots while embracing technological innovation.
              </p>
              <p className="text-monarca-gray/90 mb-8">
                From AI-generated compositions based on indigenous melodies to virtual concerts that transport audiences to historical venues, technology is opening new dimensions for experiencing Mexican musical heritage.
              </p>
              <Button 
                variant="text" 
                color="primary"
                endIcon={
                  <svg 
                    className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                }
              >
                Discover musical innovations
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
            title="Travel Experiences" 
            subtitle="Discover Mexico through immersive technological journeys"
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
                <span className="text-xs text-monarca-terracotta font-medium uppercase tracking-wider">Urban Experience</span>
                <h3 className="text-2xl font-display font-medium mt-2 mb-3">Mexico City Virtual Tour</h3>
                <p className="text-monarca-gray/80 mb-4">Experience the vibrant streets and historical landmarks of Mexico City through our AI-guided virtual reality tours.</p>
                <a href="#" className="text-monarca-terracotta hover:text-monarca-orange transition-colors">Explore now →</a>
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
                <span className="text-xs text-monarca-terracotta font-medium uppercase tracking-wider">Natural Wonders</span>
                <h3 className="text-2xl font-display font-medium mt-2 mb-3">Biodiversity Expedition</h3>
                <p className="text-monarca-gray/80 mb-4">Explore Mexico's diverse ecosystems through augmented reality experiences that highlight conservation efforts.</p>
                <a href="#" className="text-monarca-terracotta hover:text-monarca-orange transition-colors">Discover biodiversity →</a>
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
                <span className="text-xs text-monarca-terracotta font-medium uppercase tracking-wider">Cultural Heritage</span>
                <h3 className="text-2xl font-display font-medium mt-2 mb-3">Ancestral Sites</h3>
                <p className="text-monarca-gray/80 mb-4">Visit ancient Mayan and Aztec sites through interactive 3D reconstructions powered by archaeological data.</p>
                <a href="#" className="text-monarca-terracotta hover:text-monarca-orange transition-colors">Travel back in time →</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section id="inteligencia-artificial" className="py-20 bg-monarca-cream relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-monarca-terracotta/10 to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10">
          <Header 
            title="AI Innovation Hub" 
            subtitle="Mexico's contributions to the global artificial intelligence landscape"
            smallPadding
          />
          
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl md:text-3xl font-display font-medium mb-6">Leading the AI Revolution in Latin America</h3>
                <p className="text-monarca-gray/90 mb-6">
                  Mexico is positioning itself as a leader in artificial intelligence research and development throughout Latin America. With significant investments in education, infrastructure, and startup ecosystems, the country is fostering innovation that addresses unique regional challenges.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-start">
                    <div className="mr-4 p-3 bg-monarca-orange/10 text-monarca-orange rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-2">Quantum Computing Research</h4>
                      <p className="text-monarca-gray/80">Pioneering research in quantum algorithms for solving complex environmental challenges.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 p-3 bg-monarca-terracotta/10 text-monarca-terracotta rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"></path><path d="m12 12 4 10 1.7-4.3L22 16Z"></path></svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-2">Natural Language Processing</h4>
                      <p className="text-monarca-gray/80">Developing AI models that preserve and translate indigenous languages.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 p-3 bg-monarca-amber/10 text-monarca-amber rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 2v6h6M2.66 15.57a10 10 0 1 0 .57-8.38"></path></svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-2">Agricultural AI Systems</h4>
                      <p className="text-monarca-gray/80">Smart farming solutions optimized for Mexico's diverse climate zones.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 p-3 bg-monarca-orange/10 text-monarca-orange rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-2">Healthcare AI</h4>
                      <p className="text-monarca-gray/80">Diagnostic tools designed for underserved communities and remote regions.</p>
                    </div>
                  </div>
                </div>
                <a 
                  href="#" 
                  className="inline-block bg-monarca-terracotta hover:bg-monarca-orange text-white py-3 px-8 rounded-md transition-all duration-300 hover:shadow-lg"
                >
                  Explore AI initiatives
                </a>
              </div>
            </div>
            <div>
              <div className="bg-white rounded-xl p-8 shadow-lg h-full flex flex-col">
                <h3 className="text-xl font-display font-medium mb-6">Recent AI Achievements</h3>
                <div className="space-y-6 flex-grow">
                  <div className="border-l-4 border-monarca-terracotta pl-4">
                    <span className="text-xs text-monarca-gray">May 2023</span>
                    <h4 className="font-medium mb-1">National AI Strategy Launch</h4>
                    <p className="text-sm text-monarca-gray/80">Comprehensive governmental framework for AI development and regulation.</p>
                  </div>
                  <div className="border-l-4 border-monarca-orange pl-4">
                    <span className="text-xs text-monarca-gray">April 2023</span>
                    <h4 className="font-medium mb-1">Mexico AI Summit</h4>
                    <p className="text-sm text-monarca-gray/80">International gathering of AI researchers and industry leaders in Mexico City.</p>
                  </div>
                  <div className="border-l-4 border-monarca-amber pl-4">
                    <span className="text-xs text-monarca-gray">March 2023</span>
                    <h4 className="font-medium mb-1">AI Climate Monitoring System</h4>
                    <p className="text-sm text-monarca-gray/80">Launch of nationwide network of AI-powered environmental sensors.</p>
                  </div>
                </div>
                <a href="#" className="text-monarca-terracotta hover:text-monarca-orange transition-colors mt-6 inline-block">
                  View all achievements →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section id="belleza" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <Header 
            title="Beauty & Innovation" 
            subtitle="The intersection of technology and beauty in Mexican culture"
            smallPadding
          />
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-monarca-cream/50 rounded-xl p-8 relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full bg-monarca-terracotta/10"></div>
              <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-monarca-orange/10"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-display font-medium mb-6">Virtual Beauty Experiences</h3>
                <p className="text-monarca-gray/90 mb-6">
                  Mexican beauty brands are embracing augmented reality to create personalized customer experiences. These technologies allow users to virtually try products and receive customized recommendations based on their unique features.
                </p>
                <div className="flex flex-col space-y-4 mb-8">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-monarca-terracotta/20 flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-monarca-terracotta"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path></svg>
                    </div>
                    <span className="text-monarca-black/80">Natural ingredient AI identification</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-monarca-orange/20 flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-monarca-orange"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" x2="22" y1="2" y2="22"></line></svg>
                    </div>
                    <span className="text-monarca-black/80">AR makeup try-on technology</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-monarca-amber/20 flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-monarca-amber"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                    </div>
                    <span className="text-monarca-black/80">Personalized beauty consultations</span>
                  </div>
                </div>
                <a 
                  href="#" 
                  className="inline-flex items-center text-monarca-terracotta hover:text-monarca-orange transition-colors duration-300 group"
                >
                  Discover beauty innovations
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
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-xl overflow-hidden h-64 relative group">
                <img 
                  src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1365&q=80" 
                  alt="Traditional skincare" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <span className="text-white font-medium p-4">Traditional Skincare</span>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden h-64 relative group">
                <img 
                  src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-1.2.1&auto=format&fit=crop&w=1789&q=80" 
                  alt="Sustainable beauty" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <span className="text-white font-medium p-4">Sustainable Practices</span>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden h-64 relative group col-span-2">
                <img 
                  src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1488&q=80" 
                  alt="Beauty tech" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <span className="text-white font-medium p-4">Beauty Tech Innovation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
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
              Join the conversation about Mexico's future
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Subscribe to our newsletter to receive the latest news, articles, and events directly in your inbox.
            </p>
            <form className="flex flex-col sm:flex-row max-w-xl mx-auto gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 bg-black/30 border border-white/30 rounded-md focus:outline-none focus:border-monarca-terracotta transition-colors text-white"
              />
              <button 
                type="submit" 
                className="px-6 py-3 bg-monarca-terracotta hover:bg-monarca-orange text-white rounded-md transition-all duration-300 hover:shadow-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
