
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import ArticleSection from '@/components/ArticleSection';
import ArtSection from '@/components/ArtSection';
import MusicSection from '@/components/MusicSection';
import TravelSection from '@/components/TravelSection';
import AIInnovationSection from '@/components/AIInnovationSection';
import NewsletterSubscription from '@/components/NewsletterSubscription';
import WeatherInfoCard from '@/components/WeatherInfoCard';
import ResponsiveSearchBar from '@/components/ResponsiveSearchBar';
import { fetchArticles, useLanguageStore } from '@/services/articleService';
import { getMockArticles } from '@/utils/mockArticles';
import { Calendar, MapPin, ArrowRight, Star, Users, Newspaper, Heart } from 'lucide-react';
import EditorialTeamSection from '@/components/EditorialTeamSection';
import SocialDistributionPanel from '@/components/SocialDistributionPanel';

const Index = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { language } = useLanguageStore();
  const isEn = language === 'en';

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
    }, 500);
  };

  return (
    <div className="min-h-screen bg-monarca-cream relative">
      <Navigation />

      <div className="fixed top-24 right-4 z-10 w-32 md:w-36 lg:w-40">
        <WeatherInfoCard />
      </div>

      <Hero />

      {/* Auto Newsroom Status Bar */}
      <div className="bg-monarca-black text-white border-b border-white/10">
        <div className="container mx-auto px-6 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-bold uppercase tracking-widest text-monarca-amber">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                {isEn ? 'Newsroom Live' : 'Redacción en Vivo'}
              </span>
              <span className="text-white/40">
                {isEn ? 'AI editorial team active · Powered by Paperclip' : 'Equipo editorial IA activo · Con Paperclip'}
              </span>
            </div>
            <div className="flex items-center gap-3 text-white/50">
              <span>📸 Instagram</span>
              <span>👥 Facebook</span>
              <span>✕ X</span>
              <span>🧵 Threads</span>
              <span>🦋 Bluesky</span>
              <span className="text-white/30">·</span>
              <span className="text-green-400">
                {isEn ? 'Auto-posting via Postiz' : 'Auto-publicando vía Postiz'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* First Issue Banner */}
      <div className="bg-monarca-black text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-monarca-terracotta rounded-lg p-3 flex-shrink-0">
                <Newspaper className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-monarca-amber text-monarca-black text-xs font-black uppercase tracking-widest px-2 py-0.5 rounded">
                    {isEn ? 'Coming Sept 2026' : 'Llega Sept 2026'}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold leading-tight">
                  {isEn
                    ? 'Our First Print Issue Drops in Puerto Vallarta'
                    : 'Nuestra Primera Edición Impresa Llega a Puerto Vallarta'}
                </h3>
                <p className="text-white/60 text-sm flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {isEn
                    ? 'Featuring the artists, musicians, and community heroes of PV'
                    : 'Presentando los artistas, músicos y héroes comunitarios de PV'}
                </p>
              </div>
            </div>
            <Link to="/primera-edicion" className="flex-shrink-0">
              <Button className="bg-monarca-terracotta hover:bg-monarca-orange text-white">
                {isEn ? 'Preview the Issue' : 'Ver la Edición'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Category Navigation Bar */}
      <div className="bg-white border-b border-monarca-amber/20">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
            {[
              { label: isEn ? 'All' : 'Todo', path: '/' },
              { label: isEn ? 'Community' : 'Comunidad', path: '/categoria/comunidad' },
              { label: isEn ? 'Art & Culture' : 'Arte y Cultura', path: '/categoria/arte' },
              { label: isEn ? 'Music' : 'Música', path: '/music-blogs' },
              { label: isEn ? 'Youth' : 'Juventud', path: '/categoria/juventud' },
              { label: isEn ? 'Travel' : 'Viajes', path: '/categoria/viajes' },
              { label: isEn ? 'Innovation' : 'Innovación', path: '/categoria/innovacion' },
              { label: isEn ? 'Interviews' : 'Entrevistas', path: '/categoria/entrevistas' },
              { label: isEn ? 'Business' : 'Negocios', path: '/categoria/negocios' },
            ].map((cat) => (
              <Link
                key={cat.path}
                to={cat.path}
                className="flex-shrink-0 px-4 py-1.5 text-sm font-medium rounded-full border border-monarca-amber/20 text-monarca-gray hover:bg-monarca-terracotta hover:text-white hover:border-monarca-terracotta transition-colors duration-200"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <ResponsiveSearchBar />
      </div>

      {/* Articles */}
      <div id="articles">
        <ArticleSection articles={articles} isLoading={isLoading} />
      </div>

      {/* Art Section */}
      <div id="art">
        <ArtSection />
      </div>

      {/* Music */}
      <div id="music">
        <MusicSection />
      </div>

      {/* Travel */}
      <div id="travel">
        <TravelSection />
      </div>

      {/* Innovation */}
      <div id="innovation">
        <AIInnovationSection />
      </div>

      {/* About Section */}
      <div id="about" className="bg-white">
        <div className="container mx-auto px-6 py-16 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-monarca-amber/20 text-monarca-terracotta text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                {isEn ? 'Our Story' : 'Nuestra Historia'}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-monarca-black mb-4 leading-tight">
                {isEn
                  ? 'Born in Barrio Santa María, Mexico City'
                  : 'Nacida en el Barrio Santa María, Ciudad de México'}
              </h2>
              <p className="text-monarca-gray mb-4">
                {isEn
                  ? 'La Monarca Internacional started as an idea in La Labyrinha — one of Mexico City\'s most vibrant and overlooked neighborhoods. We wanted to create a media platform that celebrated what\'s great about Mexico, not what\'s wrong.'
                  : 'La Monarca Internacional nació como una idea en La Labyrinha, uno de los barrios más vibrantes y subestimados de la Ciudad de México. Queríamos crear una plataforma de medios que celebrara lo grandioso de México, no lo que está mal.'}
              </p>
              <p className="text-monarca-gray mb-6">
                {isEn
                  ? 'Today, as a Kupari Media publication, we cover artists, youth, community heroes, musicians, entrepreneurs, and anyone building something beautiful in Mexico and Latin America.'
                  : 'Hoy, como publicación de Kupari Media, cubrimos artistas, jóvenes, héroes comunitarios, músicos, empresarios y cualquier persona que construya algo hermoso en México y América Latina.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-monarca-terracotta" />
                  <span className="text-sm text-monarca-gray">
                    {isEn ? '100% positive stories' : '100% historias positivas'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-monarca-terracotta" />
                  <span className="text-sm text-monarca-gray">
                    {isEn ? 'Community first' : 'La comunidad primero'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-monarca-terracotta" />
                  <span className="text-sm text-monarca-gray">
                    {isEn ? 'A Kupari Media publication' : 'Una publicación Kupari Media'}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-monarca-terracotta/10 rounded-xl p-6 text-center">
                <div className="font-display text-4xl font-black text-monarca-terracotta mb-1">12+</div>
                <div className="text-monarca-gray text-sm">{isEn ? 'Content categories' : 'Categorías de contenido'}</div>
              </div>
              <div className="bg-monarca-amber/10 rounded-xl p-6 text-center">
                <div className="font-display text-4xl font-black text-monarca-black mb-1">2</div>
                <div className="text-monarca-gray text-sm">{isEn ? 'Languages (EN/ES)' : 'Idiomas (EN/ES)'}</div>
              </div>
              <div className="bg-monarca-black/5 rounded-xl p-6 text-center">
                <div className="font-display text-4xl font-black text-monarca-black mb-1">~30</div>
                <div className="text-monarca-gray text-sm">{isEn ? 'Pages per issue' : 'Páginas por edición'}</div>
              </div>
              <div className="bg-green-50 rounded-xl p-6 text-center">
                <div className="font-display text-4xl font-black text-green-700 mb-1">Sep</div>
                <div className="text-monarca-gray text-sm">{isEn ? 'First print issue 2026' : 'Primera edición impresa 2026'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Work With Us CTA */}
      <div className="bg-monarca-terracotta text-white">
        <div className="container mx-auto px-6 py-12 max-w-4xl text-center">
          <h2 className="font-display text-3xl font-bold mb-3">
            {isEn ? 'Have a Story to Tell?' : '¿Tienes una Historia que Contar?'}
          </h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            {isEn
              ? 'Whether you\'re an artist, a business owner, a youth organizer, or just someone doing great things in your community — we want to hear from you.'
              : 'Ya seas artista, propietario de negocio, organizador juvenil o simplemente alguien que hace grandes cosas en su comunidad, queremos saber de ti.'}
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/trabaja-con-nosotros">
              <Button className="bg-white text-monarca-terracotta hover:bg-white/90 font-bold">
                {isEn ? 'Work With Us' : 'Trabaja Con Nosotros'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/suscribirse">
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                {isEn ? 'Subscribe' : 'Suscribirse'}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div id="contact" className="container mx-auto px-6 py-12 max-w-3xl">
        <div className="bg-white rounded-xl border border-monarca-amber/20 p-8">
          <h2 className="font-display text-2xl font-bold text-monarca-black mb-2">
            {isEn ? 'Contact' : 'Contacto'}
          </h2>
          <p className="text-monarca-gray mb-6 text-sm">
            {isEn
              ? 'Questions, tips, or feedback? We read every message.'
              : '¿Preguntas, sugerencias o comentarios? Leemos todos los mensajes.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder={isEn ? 'Your email address' : 'Tu correo electrónico'}
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-monarca-amber/30 focus:border-monarca-amber text-sm"
            />
            <Button className="bg-monarca-terracotta hover:bg-monarca-orange text-white flex-shrink-0">
              {isEn ? 'Send Message' : 'Enviar Mensaje'}
            </Button>
          </div>
          <p className="text-xs text-monarca-gray mt-3">
            hola@lamonarcainternacional.com · @lamonarcaintl
          </p>
        </div>
      </div>

      {/* Editorial Team — Paperclip AI agents */}
      <EditorialTeamSection />

      {/* Social Distribution — Postiz */}
      <SocialDistributionPanel />

      <NewsletterSubscription />

      <Footer />
    </div>
  );
};

export default Index;
