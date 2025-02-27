
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
          title: 'Mexico leads advances in AI applied to climate change analysis',
          excerpt: 'Mexican researchers develop an AI model that accurately predicts regional climate patterns, setting a new global standard.',
          imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
          category: 'Science',
          date: 'May 12, 2023'
        },
        {
          id: 2,
          title: 'The Digital Revolution in Contemporary Mexican Art',
          excerpt: 'Mexican artists are redefining the national artistic landscape by integrating cutting-edge technologies into their creations.',
          imageUrl: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
          category: 'Art',
          date: 'April 28, 2023'
        },
        {
          id: 3,
          title: 'New Technology Innovation Policies in Mexico City',
          excerpt: 'The capital\'s government announces major investments in digital infrastructure to transform CDMX into a Latin American technology hub.',
          imageUrl: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
          category: 'Technology',
          date: 'April 15, 2023'
        },
        {
          id: 4,
          title: 'The Impact of Monarch Migration on Digital Ecosystems',
          excerpt: 'An innovative study establishes parallels between the migratory patterns of monarch butterflies and the dissemination of information on social networks.',
          imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
          category: 'Monarchs',
          date: 'April 3, 2023'
        },
        {
          id: 5,
          title: 'Mexican Startup Develops AI System for Cultural Preservation',
          excerpt: 'An innovative platform uses machine learning algorithms to digitize and preserve endangered indigenous languages.',
          imageUrl: 'https://images.unsplash.com/photo-1527576539890-dfa815648363?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
          category: 'Innovation',
          date: 'March 22, 2023'
        },
        {
          id: 6,
          title: 'The Renaissance of Traditional Craftsmanship through Technology',
          excerpt: 'Artisans from various regions of Mexico are incorporating digital tools to preserve and evolve ancestral techniques.',
          imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
          category: 'Art',
          date: 'March 10, 2023'
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
              View more news
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
              <a 
                href="#" 
                className="inline-flex items-center text-monarca-terracotta hover:text-monarca-orange transition-colors duration-300 group"
              >
                Explore artistic trends
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
                alt="Mexican digital art" 
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
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
