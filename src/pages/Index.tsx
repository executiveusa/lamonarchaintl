
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
import ResponsiveSearchBar from '@/components/ResponsiveSearchBar';
import { fetchArticles, useLanguageStore } from '@/services/articleService';
import { getMockArticles } from '@/utils/mockArticles';
import {
  Calendar, MapPin, ArrowRight, Star, Users, Newspaper,
  Heart, Lock, Leaf, Palette, Music, Globe, Cpu
} from 'lucide-react';
import EditorialTeamSection from '@/components/EditorialTeamSection';
import SocialDistributionPanel from '@/components/SocialDistributionPanel';

const CATEGORIES = [
  { es: 'Todo', en: 'All', path: '/', icon: null },
  { es: 'Arte', en: 'Art', path: '/categoria/arte', icon: Palette },
  { es: 'Música', en: 'Music', path: '/categoria/musica', icon: Music },
  { es: 'Naturaleza', en: 'Nature', path: '/categoria/naturaleza', icon: Leaf },
  { es: 'Vida Sustentable', en: 'Sustainable Living', path: '/categoria/vida-sustentable', icon: Leaf },
  { es: 'Diseño', en: 'Design', path: '/categoria/diseno', icon: Palette },
  { es: 'Viajes', en: 'Travel', path: '/categoria/viajes', icon: Globe },
  { es: 'IA e Innovación', en: 'AI & Innovation', path: '/categoria/ia', icon: Cpu },
];

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
    } catch {
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

      <Hero />

      {/* Subtle editorial status bar */}
      <div className="bg-monarca-black text-white border-b border-white/10">
        <div className="container mx-auto px-6 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-bold uppercase tracking-widest text-monarca-amber">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                {isEn ? 'Kupuri AI Newsroom' : 'Redacción IA Kupuri'}
              </span>
              <span className="text-white/40">
                {isEn
                  ? 'Writing new positive stories · Powered by Paperclip'
                  : 'Escribiendo nuevas historias positivas · Con Paperclip'}
              </span>
            </div>
            <div className="flex items-center gap-3 text-white/50">
              <span>📸 Instagram</span>
              <span>👥 Facebook</span>
              <span>✕ X</span>
              <span>🦋 Bluesky</span>
              <span className="text-white/30">·</span>
              <span className="text-green-400">
                {isEn ? 'Auto-distributing via Postiz' : 'Distribución automática vía Postiz'}
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
                    {isEn ? 'Coming September 2026' : 'Llega Septiembre 2026'}
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
                    : 'Presentando artistas, músicos y voces comunitarias de Puerto Vallarta'}
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
          <div className="flex items-center gap-1.5 overflow-x-auto py-3 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.path}
                to={cat.path}
                className="flex-shrink-0 px-4 py-1.5 text-sm font-medium rounded-full border border-monarca-amber/20 text-monarca-gray hover:bg-monarca-terracotta hover:text-white hover:border-monarca-terracotta transition-colors duration-200"
              >
                {isEn ? cat.en : cat.es}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <ResponsiveSearchBar />
      </div>

      {/* Articles — Selección de hoy */}
      <div id="articles">
        <ArticleSection articles={articles} isLoading={isLoading} />
      </div>

      {/* Art Section */}
      <div id="arte">
        <ArtSection />
      </div>

      {/* Music */}
      <div id="musica">
        <MusicSection />
      </div>

      {/* Travel */}
      <div id="viajes">
        <TravelSection />
      </div>

      {/* Innovation */}
      <div id="ia">
        <AIInnovationSection />
      </div>

      {/* Puerto Vallarta Print Edition Feature */}
      <div className="bg-gradient-to-br from-monarca-terracotta to-monarca-black text-white">
        <div className="container mx-auto px-6 py-16 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-monarca-amber text-monarca-black text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded mb-4">
                {isEn ? 'September 2026 · Puerto Vallarta' : 'Septiembre 2026 · Puerto Vallarta'}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 leading-tight">
                {isEn
                  ? 'The first print issue celebrates Puerto Vallarta'
                  : 'La primera edición impresa celebra Puerto Vallarta'}
              </h2>
              <p className="text-white/80 mb-4">
                {isEn
                  ? 'We spotlight the painters of Zona Romántica, the musicians redefining the Pacific sound, the chefs elevating Jalisco cuisine, and the surf culture shaping PV\'s creative identity.'
                  : 'Destacamos a los pintores de la Zona Romántica, los músicos que redefinen el sonido del Pacífico, los chefs que elevan la cocina jalisciense, y la cultura del surf que moldea la identidad creativa de PV.'}
              </p>
              <p className="text-white/70 mb-6 text-sm">
                {isEn
                  ? 'Distributed at select hotels, galleries, and cultural spaces across Puerto Vallarta. A collectors\' edition — limited print run.'
                  : 'Distribuida en hoteles selectos, galerías y espacios culturales de Puerto Vallarta. Edición de coleccionista — tiraje limitado.'}
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link to="/primera-edicion">
                  <Button className="bg-white text-monarca-terracotta hover:bg-white/90 font-bold">
                    {isEn ? 'Explore the Issue' : 'Explorar la Edición'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                <div className="font-display text-3xl font-black text-monarca-amber mb-1">PV</div>
                <div className="text-white/70 text-sm">{isEn ? 'Puerto Vallarta, Jalisco' : 'Puerto Vallarta, Jalisco'}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                <div className="font-display text-3xl font-black text-white mb-1">Sep</div>
                <div className="text-white/70 text-sm">{isEn ? 'First print 2026' : 'Primera edición 2026'}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                <div className="font-display text-3xl font-black text-white mb-1">~30</div>
                <div className="text-white/70 text-sm">{isEn ? 'Pages per issue' : 'Páginas por número'}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                <div className="font-display text-3xl font-black text-monarca-amber mb-1">ES/EN</div>
                <div className="text-white/70 text-sm">{isEn ? 'Bilingual edition' : 'Edición bilingüe'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Papel Privado / Membresía teaser */}
      <div className="bg-monarca-cream border-y border-monarca-amber/20">
        <div className="container mx-auto px-6 py-14 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <Lock className="h-4 w-4 text-monarca-terracotta" />
            <span className="text-xs font-black uppercase tracking-widest text-monarca-terracotta">
              {isEn ? 'Exclusive · Members Only' : 'Exclusivo · Solo para Miembros'}
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-monarca-black mb-3 leading-tight">
            {isEn ? 'Papel Privado' : 'Papel Privado'}
          </h2>
          <p className="text-monarca-gray mb-3 max-w-xl mx-auto">
            {isEn
              ? 'A private dossier for hotels, collectors, partners, and brands who believe in Mexico\'s creative culture. Exclusive intelligence. Real relationships.'
              : 'Un dossier privado para hoteles, coleccionistas, socios y marcas que creen en la cultura creativa de México. Inteligencia exclusiva. Relaciones reales.'}
          </p>
          <p className="text-monarca-gray/60 text-sm mb-6 max-w-lg mx-auto italic">
            {isEn
              ? 'A limited publication — not available on newsstands. By invitation or membership only.'
              : 'Una publicación limitada — no disponible en quioscos. Solo por invitación o membresía.'}
          </p>
          <Link to="/papel-privado">
            <Button className="bg-monarca-black text-white hover:bg-monarca-terracotta font-semibold px-8">
              {isEn ? 'Learn more about Papel Privado' : 'Conoce el Papel Privado'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="bg-white">
        <div className="container mx-auto px-6 py-16 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-monarca-amber/20 text-monarca-terracotta text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                {isEn ? 'About Us' : 'Quiénes Somos'}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-monarca-black mb-4 leading-tight">
                {isEn
                  ? 'Born in Barrio Santa María, Mexico City'
                  : 'Nacida en el Barrio Santa María, Ciudad de México'}
              </h2>
              <p className="text-monarca-gray mb-4">
                {isEn
                  ? 'La Monarca Internacional started as an idea in La Labyrinha — one of Mexico City\'s most vibrant neighborhoods. We wanted to create a media platform that celebrated what\'s great about Mexico through arts, culture, nature, and human stories.'
                  : 'La Monarca Internacional nació como una idea en La Labyrinha, uno de los barrios más vibrantes de la Ciudad de México. Quisimos crear una plataforma que celebrara lo grandioso de México a través del arte, la cultura, la naturaleza y las historias humanas.'}
              </p>
              <p className="text-monarca-gray mb-6">
                {isEn
                  ? 'Today, as a Kupuri Media publication, we cover artists, musicians, nature conservationists, designers, and anyone building something beautiful and sustainable in Mexico and Latin America.'
                  : 'Hoy, como publicación de Kupuri Media, cubrimos artistas, músicos, conservacionistas, diseñadores y cualquier persona que construya algo hermoso y sustentable en México y Latinoamérica.'}
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
                    {isEn ? 'Community-centred' : 'La comunidad primero'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-monarca-terracotta" />
                  <span className="text-sm text-monarca-gray">
                    {isEn ? 'A Kupuri Media publication' : 'Una publicación de Kupuri Media'}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-monarca-terracotta/10 rounded-xl p-6 text-center">
                <div className="font-display text-4xl font-black text-monarca-terracotta mb-1">7</div>
                <div className="text-monarca-gray text-sm">{isEn ? 'Positive categories' : 'Categorías positivas'}</div>
              </div>
              <div className="bg-monarca-amber/10 rounded-xl p-6 text-center">
                <div className="font-display text-4xl font-black text-monarca-black mb-1">2</div>
                <div className="text-monarca-gray text-sm">{isEn ? 'Languages (ES/EN)' : 'Idiomas (ES/EN)'}</div>
              </div>
              <div className="bg-green-50 rounded-xl p-6 text-center">
                <div className="font-display text-4xl font-black text-green-700 mb-1">~30</div>
                <div className="text-monarca-gray text-sm">{isEn ? 'Pages per issue' : 'Páginas por edición'}</div>
              </div>
              <div className="bg-monarca-black/5 rounded-xl p-6 text-center">
                <div className="font-display text-4xl font-black text-monarca-black mb-1">Sep</div>
                <div className="text-monarca-gray text-sm">{isEn ? 'First print issue 2026' : 'Primera edición impresa 2026'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Work With Kupuri Media CTA */}
      <div className="bg-monarca-terracotta text-white">
        <div className="container mx-auto px-6 py-12 max-w-4xl text-center">
          <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            {isEn ? 'Kupuri Media · Partnerships' : 'Kupuri Media · Alianzas'}
          </span>
          <h2 className="font-display text-3xl font-bold mb-3">
            {isEn ? 'Partner with Kupuri Media' : '¿Trabajamos juntos?'}
          </h2>
          <p className="text-white/80 mb-2 max-w-2xl mx-auto">
            {isEn
              ? 'La Monarca Internacional is a Kupuri Media product. We invite hotels, tourism boards, artists, sustainable brands, and cultural organizations to join our community.'
              : 'La Monarca Internacional es un producto de Kupuri Media. Invitamos a hoteles, organismos de turismo, artistas, marcas sustentables y organizaciones culturales a unirse a nuestra comunidad.'}
          </p>
          <p className="text-white/60 text-sm mb-6 max-w-xl mx-auto">
            {isEn
              ? 'Affiliate partnerships, sponsored features, print placements, and digital campaigns rooted in authentic storytelling.'
              : 'Alianzas de afiliados, reportajes patrocinados, espacios en impreso y campañas digitales basadas en narrativa auténtica.'}
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/trabaja-con-nosotros">
              <Button className="bg-white text-monarca-terracotta hover:bg-white/90 font-bold">
                {isEn ? 'Work With Kupuri Media' : 'Trabaja Con Kupuri Media'}
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
              ? 'Questions, story tips, or partnership inquiries? We read every message.'
              : '¿Preguntas, sugerencias de historias o consultas de alianzas? Leemos todos los mensajes.'}
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
            hola@lamonarcainternacional.com · @lamonarcaintl · kupurimedia.com
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
