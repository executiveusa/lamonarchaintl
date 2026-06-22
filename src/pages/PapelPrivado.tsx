
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguageStore } from '@/services/articleService';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Lock, Star, BookOpen, Globe, Leaf, Users, ArrowRight, Check } from 'lucide-react';

const PapelPrivado: React.FC = () => {
  const { language } = useLanguageStore();
  const isEn = language === 'en';

  const pillars = [
    {
      icon: Lock,
      es: 'Acceso exclusivo',
      en: 'Exclusive access',
      descEs: 'Contenido editorial que nunca aparecerá en el sitio público. Dossiers, perfiles en profundidad y reportajes que requieren tiempo real.',
      descEn: 'Editorial content that will never appear on the public site. Dossiers, in-depth profiles, and stories that require real time.',
    },
    {
      icon: Star,
      es: 'Relaciones reales',
      en: 'Real relationships',
      descEs: 'Conexión directa con la red de artistas, diseñadores, chefs y líderes culturales que cubre Kupuri Media.',
      descEn: 'Direct connection to the network of artists, designers, chefs, and cultural leaders that Kupuri Media covers.',
    },
    {
      icon: BookOpen,
      es: 'El dossier impreso',
      en: 'The print dossier',
      descEs: 'Una pieza física de colección — no un catálogo. Diseño editorial de primer nivel, en papel de alta calidad, distribuida personalmente.',
      descEn: 'A collectible physical piece — not a catalogue. First-rate editorial design, on high-quality paper, personally distributed.',
    },
    {
      icon: Globe,
      es: 'Inteligencia de mercado',
      en: 'Market intelligence',
      descEs: 'Análisis sobre tendencias creativas, culturales y de turismo sustentable en México y Latinoamérica.',
      descEn: 'Analysis on creative, cultural, and sustainable tourism trends in Mexico and Latin America.',
    },
  ];

  const memberTypes = [
    {
      icon: Leaf,
      es: 'Hoteles y turismo sustentable',
      en: 'Hotels & sustainable tourism',
    },
    {
      icon: Globe,
      es: 'Organismos de turismo y gobierno',
      en: 'Tourism boards & government bodies',
    },
    {
      icon: Star,
      es: 'Artistas, galeristas y creadores',
      en: 'Artists, gallerists & creators',
    },
    {
      icon: Users,
      es: 'Marcas sustentables y de diseño',
      en: 'Sustainable & design brands',
    },
  ];

  return (
    <div className="min-h-screen bg-monarca-cream">
      <Navigation />

      {/* Hero */}
      <div className="bg-monarca-black text-white">
        <div className="container mx-auto px-6 py-20 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <Lock className="h-4 w-4 text-monarca-amber" />
            <span className="text-xs font-black uppercase tracking-widest text-monarca-amber">
              {isEn ? 'Kupuri Media · Private Publication' : 'Kupuri Media · Publicación Privada'}
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Papel Privado
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-2">
            {isEn
              ? 'Private Paper'
              : 'Papel Privado'}
          </p>
          <p className="text-white/50 text-sm max-w-xl mx-auto mt-4">
            {isEn
              ? 'A private dossier for the people and organizations who believe deeply in Mexico\'s creative, cultural, and natural richness — and want to be part of the story.'
              : 'Un dossier privado para las personas y organizaciones que creen profundamente en la riqueza creativa, cultural y natural de México — y quieren ser parte de la historia.'}
          </p>
        </div>
      </div>

      {/* The manifesto */}
      <div className="bg-white border-b border-monarca-amber/20">
        <div className="container mx-auto px-6 py-16 max-w-3xl">
          <span className="inline-block bg-monarca-amber/20 text-monarca-terracotta text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
            {isEn ? 'The concept' : 'El concepto'}
          </span>
          <h2 className="font-display text-3xl font-bold text-monarca-black mb-6 leading-tight">
            {isEn
              ? 'Not everything worth knowing is meant to be public.'
              : 'No todo lo que vale la pena saber está pensado para ser público.'}
          </h2>
          <div className="space-y-4 text-monarca-gray leading-relaxed">
            <p>
              {isEn
                ? 'La Monarca Internacional publishes positive stories from Mexico for the world. Papel Privado goes deeper — it\'s the intelligence layer, the behind-the-scenes, the curated relationships that only exist when trust is established.'
                : 'La Monarca Internacional publica historias positivas de México para el mundo. El Papel Privado va más profundo: es la capa de inteligencia, el detrás de cámaras, las relaciones curadas que solo existen cuando se establece confianza.'}
            </p>
            <p>
              {isEn
                ? 'Think of it as a private letter from the editors — except it arrives beautifully printed, hand-delivered to hotels, galleries, boardrooms, and homes of people who genuinely care about what Kupuri Media is building.'
                : 'Piénsalo como una carta privada de los editores, excepto que llega impresa con cuidado, entregada en mano a hoteles, galerías, salas de juntas y hogares de personas que genuinamente les importa lo que está construyendo Kupuri Media.'}
            </p>
            <p className="italic text-monarca-black font-medium">
              {isEn
                ? 'This is not a magazine. This is a relationship.'
                : 'Esto no es una revista. Es una relación.'}
            </p>
          </div>
        </div>
      </div>

      {/* Four pillars */}
      <div className="container mx-auto px-6 py-16 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-monarca-black mb-3">
            {isEn ? 'What Papel Privado offers' : 'Qué ofrece el Papel Privado'}
          </h2>
          <p className="text-monarca-gray max-w-xl mx-auto">
            {isEn
              ? 'Four reasons to be part of a very small, very intentional circle.'
              : 'Cuatro razones para ser parte de un círculo muy pequeño y muy intencional.'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.en} className="bg-white rounded-xl p-8 border border-monarca-amber/20 hover:border-monarca-terracotta/30 transition-colors">
                <div className="bg-monarca-terracotta/10 rounded-xl p-3 w-fit mb-4">
                  <Icon className="h-5 w-5 text-monarca-terracotta" />
                </div>
                <h3 className="font-display text-xl font-bold text-monarca-black mb-2">
                  {isEn ? pillar.en : pillar.es}
                </h3>
                <p className="text-monarca-gray text-sm leading-relaxed">
                  {isEn ? pillar.descEn : pillar.descEs}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Who is it for */}
      <div className="bg-monarca-cream border-y border-monarca-amber/20">
        <div className="container mx-auto px-6 py-16 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-monarca-black mb-3">
              {isEn ? 'Who is Papel Privado for?' : '¿Para quién es el Papel Privado?'}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {memberTypes.map((type) => {
              const Icon = type.icon;
              return (
                <div key={type.en} className="flex items-start gap-3 bg-white rounded-xl p-5 border border-monarca-amber/20">
                  <div className="bg-monarca-amber/10 rounded-lg p-2 mt-0.5 flex-shrink-0">
                    <Icon className="h-4 w-4 text-monarca-terracotta" />
                  </div>
                  <span className="text-monarca-black font-medium text-sm">
                    {isEn ? type.en : type.es}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="bg-monarca-black text-white rounded-2xl p-8 text-center">
            <Lock className="h-6 w-6 text-monarca-amber mx-auto mb-3" />
            <h3 className="font-display text-2xl font-bold mb-3">
              {isEn ? 'Not available on newsstands.' : 'No disponible en quioscos.'}
            </h3>
            <p className="text-white/70 mb-6 max-w-lg mx-auto text-sm">
              {isEn
                ? 'Papel Privado is available by invitation or by reaching out directly to the Kupuri Media editorial team. If you feel like this is for you, we\'d love to hear from you.'
                : 'El Papel Privado está disponible por invitación o contactando directamente al equipo editorial de Kupuri Media. Si sientes que es para ti, nos encantaría escucharte.'}
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <a href="mailto:hola@lamonarcainternacional.com">
                <Button className="bg-monarca-amber text-monarca-black hover:bg-monarca-orange font-bold">
                  {isEn ? 'Contact the editorial team' : 'Contactar al equipo editorial'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <Link to="/trabaja-con-nosotros">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  {isEn ? 'Work with Kupuri Media' : 'Trabaja con Kupuri Media'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Coming soon note */}
      <div className="container mx-auto px-6 py-10 max-w-3xl text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Check className="h-4 w-4 text-green-600" />
          <span className="text-xs font-bold uppercase tracking-widest text-green-700">
            {isEn ? 'In development · 2026' : 'En desarrollo · 2026'}
          </span>
        </div>
        <p className="text-monarca-gray/60 text-sm">
          {isEn
            ? 'The full Papel Privado membership programme will be announced alongside the September 2026 Puerto Vallarta print issue.'
            : 'El programa completo de membresía de Papel Privado se anunciará junto con la edición impresa de Puerto Vallarta en septiembre de 2026.'}
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default PapelPrivado;
