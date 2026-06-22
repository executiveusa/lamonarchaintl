import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useLanguageStore } from '@/services/articleService';
import { Link } from 'react-router-dom';
import {
  Pen, Camera, Mic, Building2, Briefcase, Users, Heart,
  Mail, Phone, ArrowRight, CheckCircle2, Instagram, Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const opportunities = [
  {
    icon: Pen,
    title_en: 'Write for Us',
    title_es: 'Escribe para Nosotros',
    desc_en: 'Pitch a story, column, or opinion piece. We cover community heroes, local business, art, music, youth, and positive innovation across Mexico.',
    desc_es: 'Propón una historia, columna u opinión. Cubrimos héroes comunitarios, negocios locales, arte, música, juventud e innovación positiva en todo México.',
    cta_en: 'Pitch a Story',
    cta_es: 'Proponer una Historia',
    tag_en: 'Editorial',
    tag_es: 'Editorial',
    color: 'bg-monarca-terracotta/10 text-monarca-terracotta',
  },
  {
    icon: Camera,
    title_en: 'Photo Submissions',
    title_es: 'Envío de Fotografías',
    desc_en: 'We are always looking for powerful photography that tells positive stories about Mexico and its communities. Submit your portfolio.',
    desc_es: 'Siempre buscamos fotografías poderosas que cuenten historias positivas sobre México y sus comunidades. Envía tu portafolio.',
    cta_en: 'Submit Photos',
    cta_es: 'Enviar Fotografías',
    tag_en: 'Photography',
    tag_es: 'Fotografía',
    color: 'bg-blue-100 text-blue-700',
  },
  {
    icon: Mic,
    title_en: 'Be Interviewed',
    title_es: 'Ser Entrevistado',
    desc_en: 'Are you an artist, musician, chef, activist, or entrepreneur creating impact? We want to tell your story to our bilingual audience.',
    desc_es: '¿Eres artista, músico, chef, activista o empresario creando impacto? Queremos contar tu historia a nuestra audiencia bilingüe.',
    cta_en: 'Request Interview',
    cta_es: 'Solicitar Entrevista',
    tag_en: 'Interviews',
    tag_es: 'Entrevistas',
    color: 'bg-purple-100 text-purple-700',
  },
  {
    icon: Building2,
    title_en: 'Advertise Your Business',
    title_es: 'Anuncia Tu Negocio',
    desc_en: 'Reach a bilingual audience across Mexico and the US. Our print and digital editions offer targeted advertising for local and regional businesses.',
    desc_es: 'Llega a una audiencia bilingüe en México y Estados Unidos. Nuestras ediciones impresa y digital ofrecen publicidad dirigida para negocios locales y regionales.',
    cta_en: 'See Ad Packages',
    cta_es: 'Ver Paquetes Publicitarios',
    tag_en: 'Advertising',
    tag_es: 'Publicidad',
    color: 'bg-monarca-amber/20 text-monarca-black',
  },
  {
    icon: Briefcase,
    title_en: 'Partner With Kupuri Media',
    title_es: 'Asociarte con Kupuri Media',
    desc_en: 'Kupuri Media produces content, events, and digital experiences rooted in LATAM culture. Explore strategic partnership opportunities.',
    desc_es: 'Kupuri Media produce contenido, eventos y experiencias digitales arraigadas en la cultura LATAM. Explora oportunidades de alianza estratégica.',
    cta_en: 'Explore Partnership',
    cta_es: 'Explorar Alianza',
    tag_en: 'Partnership',
    tag_es: 'Alianza',
    color: 'bg-green-100 text-green-700',
  },
  {
    icon: Heart,
    title_en: 'Community Events',
    title_es: 'Eventos Comunitarios',
    desc_en: 'Host a La Monarca event in your community. We partner with local organizations to bring magazine launches, gallery nights, and cultural conversations to your neighborhood.',
    desc_es: 'Organiza un evento de La Monarca en tu comunidad. Nos asociamos con organizaciones locales para llevar lanzamientos de revistas, noches de galería y conversaciones culturales a tu barrio.',
    cta_en: 'Host an Event',
    cta_es: 'Organizar un Evento',
    tag_en: 'Events',
    tag_es: 'Eventos',
    color: 'bg-red-100 text-red-700',
  },
];

const TrabajaConNosotros: React.FC = () => {
  const { language } = useLanguageStore();
  const isEn = language === 'en';
  const [formState, setFormState] = useState({ name: '', email: '', topic: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-monarca-cream">
      <Navigation />

      {/* Hero */}
      <div className="bg-monarca-black text-white">
        <div className="container mx-auto px-6 py-16 max-w-4xl text-center">
          <span className="inline-block bg-monarca-terracotta text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded mb-4">
            {isEn ? 'A Kupuri Media Publication' : 'Una Publicación de Kupuri Media'}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-black mb-4 leading-tight">
            {isEn ? 'Work With Us' : 'Trabaja Con Nosotros'}
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {isEn
              ? 'La Monarca Internacional is the official newspaper of Kupuri Media. We are building a media platform that celebrates the real stories of Mexico. Join us.'
              : 'La Monarca Internacional es el periódico oficial de Kupuri Media. Estamos construyendo una plataforma de medios que celebra las historias reales de México. Únete a nosotros.'}
          </p>
        </div>
      </div>

      {/* About Kupuri Media */}
      <div className="bg-white border-b border-monarca-amber/20">
        <div className="container mx-auto px-6 py-12 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block bg-monarca-amber/20 text-monarca-terracotta text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                {isEn ? 'About Kupuri Media' : 'Sobre Kupuri Media'}
              </span>
              <h2 className="font-display text-3xl font-bold text-monarca-black mb-4">
                {isEn ? 'The Story Behind the Magazine' : 'La Historia Detrás de la Revista'}
              </h2>
              <p className="text-monarca-gray mb-4">
                {isEn
                  ? 'Kupuri Media was born in Barrio Santa María, La Labyrinha, Mexico City — a neighborhood that has always punched above its weight in creativity, community, and culture.'
                  : 'Kupuri Media nació en el Barrio Santa María, La Labyrinha, Ciudad de México, un barrio que siempre ha estado a la altura en creatividad, comunidad y cultura.'}
              </p>
              <p className="text-monarca-gray mb-4">
                {isEn
                  ? 'We launched La Monarca Internacional because Mexico\'s story deserves to be told with pride, precision, and positivity. Too many media outlets focus on what\'s wrong. We focus on what\'s working — and the people making it happen.'
                  : 'Lanzamos La Monarca Internacional porque la historia de México merece ser contada con orgullo, precisión y positividad. Demasiados medios se centran en lo que está mal. Nosotros nos centramos en lo que funciona y en las personas que lo hacen posible.'}
              </p>
              <div className="flex gap-4 mt-6">
                <a href="https://instagram.com/kupari.media" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-monarca-terracotta hover:text-monarca-orange text-sm font-medium">
                  <Instagram className="h-4 w-4" />
                  @kupari.media
                </a>
                <a href="https://kuparimedia.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-monarca-gray hover:text-monarca-black text-sm">
                  <Globe className="h-4 w-4" />
                  kuparimedia.com
                </a>
              </div>
            </div>
            <div className="bg-monarca-cream rounded-xl p-6 border border-monarca-amber/20">
              <h3 className="font-bold text-monarca-black mb-4">{isEn ? 'What We Cover' : 'Lo Que Cubrimos'}</h3>
              {[
                { en: 'Community heroes & changemakers', es: 'Héroes comunitarios y agentes de cambio' },
                { en: 'Artists, musicians & creatives', es: 'Artistas, músicos y creativos' },
                { en: 'Youth doing remarkable things', es: 'Jóvenes haciendo cosas extraordinarias' },
                { en: 'Local businesses & entrepreneurs', es: 'Negocios locales y emprendedores' },
                { en: 'Culture, traditions & innovations', es: 'Cultura, tradiciones e innovaciones' },
                { en: 'Travel & regional experiences', es: 'Viajes y experiencias regionales' },
                { en: 'Positive innovation & tech', es: 'Innovación positiva y tecnología' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 py-1.5 border-b border-monarca-amber/10 last:border-0">
                  <CheckCircle2 className="h-4 w-4 text-monarca-terracotta flex-shrink-0" />
                  <span className="text-monarca-gray text-sm">{isEn ? item.en : item.es}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Opportunities Grid */}
      <div className="container mx-auto px-6 py-16 max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold text-monarca-black mb-3">
            {isEn ? 'How to Get Involved' : 'Cómo Participar'}
          </h2>
          <p className="text-monarca-gray max-w-xl mx-auto">
            {isEn
              ? 'There are many ways to work with La Monarca and Kupuri Media — from submitting your writing to advertising your business.'
              : 'Hay muchas formas de trabajar con La Monarca y Kupuri Media, desde enviar tu escritura hasta anunciar tu negocio.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((opp, i) => {
            const Icon = opp.icon;
            return (
              <div key={i} className="bg-white rounded-xl border border-black/5 p-6 flex flex-col hover:shadow-md transition-shadow">
                <div className={`inline-flex p-2.5 rounded-lg mb-4 w-fit ${opp.color.split(' ')[0]} `}>
                  <Icon className={`h-5 w-5 ${opp.color.split(' ')[1]}`} />
                </div>
                <span className={`text-xs font-bold uppercase tracking-wider mb-2 ${opp.color.split(' ')[1]}`}>
                  {isEn ? opp.tag_en : opp.tag_es}
                </span>
                <h3 className="font-bold text-monarca-black text-lg mb-2">
                  {isEn ? opp.title_en : opp.title_es}
                </h3>
                <p className="text-monarca-gray text-sm flex-1 mb-4 leading-relaxed">
                  {isEn ? opp.desc_en : opp.desc_es}
                </p>
                <button
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center text-monarca-terracotta hover:text-monarca-orange text-sm font-medium transition-colors"
                >
                  {isEn ? opp.cta_en : opp.cta_es}
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact Form */}
      <div id="contact-form" className="bg-white border-t border-monarca-amber/20">
        <div className="container mx-auto px-6 py-16 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-monarca-black mb-3">
              {isEn ? 'Get in Touch' : 'Ponte en Contacto'}
            </h2>
            <p className="text-monarca-gray">
              {isEn
                ? 'Tell us what you have in mind and the team at Kupuri Media will respond within 48 hours.'
                : 'Cuéntanos lo que tienes en mente y el equipo de Kupuri Media responderá en 48 horas.'}
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-12">
              <CheckCircle2 className="h-14 w-14 text-green-500 mx-auto mb-4" />
              <h3 className="font-bold text-monarca-black text-xl mb-2">
                {isEn ? 'Message Received!' : '¡Mensaje Recibido!'}
              </h3>
              <p className="text-monarca-gray">
                {isEn
                  ? 'Thank you for reaching out. We\'ll be in touch within 48 hours.'
                  : 'Gracias por comunicarte. Te contactaremos en 48 horas.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-monarca-black mb-1.5">
                    {isEn ? 'Your Name' : 'Tu Nombre'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={e => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-monarca-amber/30 focus:border-monarca-amber"
                    placeholder={isEn ? 'Ana García' : 'Ana García'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-monarca-black mb-1.5">
                    {isEn ? 'Email Address' : 'Correo Electrónico'}
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={e => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-monarca-amber/30 focus:border-monarca-amber"
                    placeholder="ana@ejemplo.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-monarca-black mb-1.5">
                  {isEn ? 'How Can We Work Together?' : '¿Cómo Podemos Trabajar Juntos?'}
                </label>
                <select
                  required
                  value={formState.topic}
                  onChange={e => setFormState({ ...formState, topic: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-monarca-amber/30 focus:border-monarca-amber bg-white"
                >
                  <option value="">{isEn ? 'Select a topic...' : 'Selecciona un tema...'}</option>
                  <option value="write">{isEn ? 'I want to write for you' : 'Quiero escribir para ustedes'}</option>
                  <option value="photo">{isEn ? 'Photo submission' : 'Envío de fotografías'}</option>
                  <option value="interview">{isEn ? 'I want to be interviewed' : 'Quiero ser entrevistado/a'}</option>
                  <option value="advertise">{isEn ? 'Advertising & business listing' : 'Publicidad y directorio'}</option>
                  <option value="partner">{isEn ? 'Strategic partnership' : 'Alianza estratégica'}</option>
                  <option value="event">{isEn ? 'Host a community event' : 'Organizar un evento comunitario'}</option>
                  <option value="other">{isEn ? 'Other' : 'Otro'}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-monarca-black mb-1.5">
                  {isEn ? 'Tell Us More' : 'Cuéntanos Más'}
                </label>
                <textarea
                  required
                  rows={5}
                  value={formState.message}
                  onChange={e => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-monarca-amber/30 focus:border-monarca-amber resize-none"
                  placeholder={isEn
                    ? 'Tell us about yourself and what you have in mind...'
                    : 'Cuéntanos sobre ti y lo que tienes en mente...'}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                <p className="text-xs text-monarca-gray">
                  {isEn
                    ? 'We respond to all inquiries within 48 hours.'
                    : 'Respondemos a todas las consultas en 48 horas.'}
                </p>
                <Button
                  type="submit"
                  size="lg"
                  className="bg-monarca-terracotta hover:bg-monarca-orange text-white"
                >
                  {isEn ? 'Send Message' : 'Enviar Mensaje'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          )}

          {/* Contact info */}
          <div className="mt-10 pt-8 border-t border-monarca-amber/20 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-monarca-terracotta/10 p-2.5 rounded-lg">
                <Mail className="h-4 w-4 text-monarca-terracotta" />
              </div>
              <div>
                <div className="text-xs text-monarca-gray">{isEn ? 'Email us' : 'Escríbenos'}</div>
                <a href="mailto:hola@lamonarcainternacional.com" className="text-monarca-black font-medium text-sm hover:text-monarca-terracotta">
                  hola@lamonarcainternacional.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-monarca-terracotta/10 p-2.5 rounded-lg">
                <Instagram className="h-4 w-4 text-monarca-terracotta" />
              </div>
              <div>
                <div className="text-xs text-monarca-gray">{isEn ? 'Follow us' : 'Síguenos'}</div>
                <a href="https://instagram.com/lamonarcaintl" target="_blank" rel="noopener noreferrer" className="text-monarca-black font-medium text-sm hover:text-monarca-terracotta">
                  @lamonarcaintl
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TrabajaConNosotros;
