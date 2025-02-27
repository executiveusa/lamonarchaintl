
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
      
      <div className="fixed top-20 right-4 z-10 w-64 md:w-72 lg:w-80">
        <WeatherInfoCard />
      </div>
      
      <Hero />
      
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
      
      <NewsletterSubscription />
      
      <Footer />
    </div>
  );
};

export default Index;
