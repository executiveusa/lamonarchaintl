
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import ArticleSection from '@/components/ArticleSection';
import ArtSection from '@/components/ArtSection';
import MusicSection from '@/components/MusicSection';
import TravelSection from '@/components/TravelSection';
import AIInnovationSection from '@/components/AIInnovationSection';
import VolumeSlider from '@/components/VolumeSlider';
import NewsletterSubscription from '@/components/NewsletterSubscription';
import WeatherInfoCard from '@/components/WeatherInfoCard';
import ResponsiveSearchBar from '@/components/ResponsiveSearchBar';
import CompanyIconsGrid from '@/components/CompanyIconsGrid';
import { fetchArticles, useLanguageStore } from '@/services/articleService';
import { getMockArticles } from '@/utils/mockArticles';

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
    const mockArticles = getMockArticles(language);
    
    setTimeout(() => {
      setArticles(mockArticles);
      setIsLoading(false);
    }, 800);
  };
  
  return (
    <div className="min-h-screen bg-monarca-cream relative">
      <Navigation />
      
      <div className="fixed top-20 right-4 z-10 w-32 md:w-36 lg:w-40">
        <WeatherInfoCard />
      </div>
      
      <Hero />
      
      <div className="container mx-auto">
        <ResponsiveSearchBar />
      </div>
      
      <div id="articles">
        <ArticleSection articles={articles} isLoading={isLoading} />
      </div>
      
      <div id="art">
        <ArtSection />
      </div>
      
      <div className="container mx-auto px-6 py-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-display mb-4">Audio Settings</h3>
          <VolumeSlider onChange={(vol) => console.log(`Volume set to ${vol}%`)} />
        </div>
      </div>
      
      <div id="music">
        <MusicSection />
      </div>
      
      <div id="travel">
        <TravelSection />
      </div>
      
      <div id="innovation">
        <AIInnovationSection />
      </div>
      
      <div id="about" className="container mx-auto px-6 py-12">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-3xl font-display mb-6 text-monarca-black">
            {language === 'en' ? 'About Us' : 'Acerca de Nosotros'}
          </h2>
          <p className="text-monarca-black mb-4">
            {language === 'en' 
              ? 'LA Monarca International is a cultural platform dedicated to promoting art, music, and travel experiences across borders.'
              : 'LA Monarca Internacional es una plataforma cultural dedicada a promover el arte, la música y las experiencias de viaje más allá de las fronteras.'}
          </p>
          <p className="text-monarca-black">
            {language === 'en'
              ? 'Our mission is to connect people through shared cultural experiences and innovative content.'
              : 'Nuestra misión es conectar a las personas a través de experiencias culturales compartidas y contenido innovador.'}
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-display mb-6 text-monarca-black text-center">
          {language === 'en' ? 'Our Partners' : 'Nuestros Socios'}
        </h2>
        <CompanyIconsGrid />
      </div>
      
      <div id="contact" className="container mx-auto px-6 py-12 mb-8">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-3xl font-display mb-6 text-monarca-black">
            {language === 'en' ? 'Contact Us' : 'Contáctanos'}
          </h2>
          <p className="text-monarca-black mb-6">
            {language === 'en'
              ? 'Have questions or feedback? Reach out to our team.'
              : '¿Tienes preguntas o comentarios? Comunícate con nuestro equipo.'}
          </p>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <input 
              type="email" 
              placeholder={language === 'en' ? 'Your email' : 'Tu correo electrónico'} 
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-monarca-amber"
            />
            <Button className="bg-monarca-terracotta hover:bg-monarca-orange">
              {language === 'en' ? 'Send Message' : 'Enviar Mensaje'}
            </Button>
          </div>
        </div>
      </div>
      
      <NewsletterSubscription />
      
      <Footer />
    </div>
  );
};

export default Index;
