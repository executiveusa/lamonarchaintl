
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguageStore } from '@/services/articleService';
import { Button } from '@/components/ui/button';
import { Instagram, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguageStore();
  const isEn = language === 'en';

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const sections = [
    { label: isEn ? 'Community' : 'Comunidad', path: '/categoria/comunidad' },
    { label: isEn ? 'Art & Culture' : 'Arte y Cultura', path: '/categoria/arte' },
    { label: isEn ? 'Music' : 'Música', path: '/music-blogs' },
    { label: isEn ? 'Youth' : 'Juventud', path: '/categoria/juventud' },
    { label: isEn ? 'Travel' : 'Viajes', path: '/categoria/viajes' },
    { label: isEn ? 'Innovation' : 'Innovación', path: '/categoria/innovacion' },
    { label: isEn ? 'Interviews' : 'Entrevistas', path: '/categoria/entrevistas' },
    { label: isEn ? 'Business' : 'Negocios', path: '/categoria/negocios' },
  ];

  return (
    <footer className="bg-monarca-black text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">

          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-display text-xl font-bold mb-1">
              La Monarca Internacional
            </h3>
            <p className="text-monarca-gray/70 text-xs mb-3 flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {isEn ? 'Born in Barrio Santa María, Mexico City' : 'Nacida en Barrio Santa María, CDMX'}
            </p>
            <p className="text-monarca-gray/80 text-sm mb-5 leading-relaxed">
              {isEn
                ? 'Positive stories from Mexico and the world. A Kupari Media publication.'
                : 'Historias positivas de México y el mundo. Una publicación de Kupari Media.'}
            </p>
            <div className="flex space-x-3">
              <a href="https://instagram.com/lamonarcaintl" target="_blank" rel="noopener noreferrer"
                className="bg-white/10 hover:bg-monarca-terracotta p-2 rounded-lg transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com/lamonarcaintl" target="_blank" rel="noopener noreferrer"
                className="bg-white/10 hover:bg-monarca-terracotta p-2 rounded-lg transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="mailto:hola@lamonarcainternacional.com"
                className="bg-white/10 hover:bg-monarca-terracotta p-2 rounded-lg transition-colors" aria-label="Email">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Topics */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-4">
              {isEn ? 'Topics' : 'Temas'}
            </h4>
            <ul className="space-y-2">
              {sections.map((s) => (
                <li key={s.path}>
                  <Link to={s.path} className="text-monarca-gray hover:text-white text-sm transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-4">
              {isEn ? 'Company' : 'Empresa'}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/primera-edicion" className="text-monarca-gray hover:text-white text-sm transition-colors">
                  {isEn ? 'First Issue' : 'Primera Edición'}
                </Link>
              </li>
              <li>
                <Link to="/trabaja-con-nosotros" className="text-monarca-gray hover:text-white text-sm transition-colors">
                  {isEn ? 'Work With Us' : 'Trabaja Con Nosotros'}
                </Link>
              </li>
              <li>
                <Link to="/suscribirse" className="text-monarca-gray hover:text-white text-sm transition-colors">
                  {isEn ? 'Subscribe' : 'Suscribirse'}
                </Link>
              </li>
              <li>
                <Link to="/translator" className="text-monarca-gray hover:text-white text-sm transition-colors">
                  {isEn ? 'Translator' : 'Traductor'}
                </Link>
              </li>
              <li>
                <a
                  href="https://directorio-kupuri.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-monarca-amber hover:text-white text-sm transition-colors font-medium"
                >
                  {isEn ? 'Kupari Directory™' : 'Directorio Kupari™'}
                </a>
              </li>
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-4">
              {isEn ? 'Newsletter' : 'Boletín'}
            </h4>
            <p className="text-monarca-gray/80 text-sm mb-4 leading-relaxed">
              {isEn
                ? 'Get positive stories from Mexico delivered to your inbox.'
                : 'Recibe historias positivas de México en tu correo.'}
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                placeholder={isEn ? 'Your email address' : 'Tu correo electrónico'}
                className="w-full px-3 py-2.5 bg-white/10 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-monarca-amber transition-colors placeholder-white/40"
                required
              />
              <Button
                type="submit"
                className="w-full bg-monarca-terracotta hover:bg-monarca-orange text-white text-sm font-medium rounded-lg"
              >
                {isEn ? 'Subscribe' : 'Suscribirse'}
              </Button>
            </form>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
          <div className="flex flex-col md:flex-row items-center gap-2 text-monarca-gray/60">
            <span>© {currentYear} La Monarca Internacional.</span>
            <span className="hidden md:inline">·</span>
            <span>{isEn ? 'A Kupari Media Publication.' : 'Una Publicación de Kupari Media.'}</span>
            <span className="hidden md:inline">·</span>
            <span>{isEn ? 'All rights reserved.' : 'Todos los derechos reservados.'}</span>
          </div>
          <Link to="/admin" className="text-monarca-gray/30 hover:text-white text-xs transition-colors">
            {isEn ? 'Admin' : 'Administrador'}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
