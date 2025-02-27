
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthButton from './AuthButton';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguageStore } from '@/services/articleService';

const Navigation: React.FC = () => {
  const { language } = useLanguageStore();

  // Navigation menu translations
  const menuItems = {
    home: language === 'en' ? 'Home' : 'Inicio',
    articles: language === 'en' ? 'Articles' : 'Artículos',
    art: language === 'en' ? 'Art' : 'Arte',
    music: language === 'en' ? 'Music' : 'Música',
    travel: language === 'en' ? 'Travel' : 'Viajes',
    innovation: language === 'en' ? 'AI Innovation' : 'Innovación IA',
    about: language === 'en' ? 'About' : 'Acerca de',
    contact: language === 'en' ? 'Contact' : 'Contacto'
  };

  // Initialize Preline JS for dropdown/collapse functionality
  useEffect(() => {
    // @ts-ignore - Preline is loaded via CDN
    if (typeof window !== 'undefined' && window.HSStaticMethods) {
      // @ts-ignore
      window.HSStaticMethods.autoInit();
    }
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-display text-monarca-black hover:text-monarca-terracotta transition-colors">
              {language === 'en' ? 'LA Monarca International' : 'LA Monarca Internacional'}
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-monarca-black hover:text-monarca-terracotta focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
              data-hs-collapse="#mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          {/* Desktop menu */}
          <nav className="hidden md:flex space-x-2 lg:space-x-4">
            <div className="flex items-center justify-between space-x-2 lg:space-x-4">
              <Link to="/" className="font-montserrat font-bold text-monarca-black hover:text-monarca-terracotta px-3 py-2 rounded-md text-sm tracking-wide">
                {menuItems.home}
              </Link>
              <a href="#articles" className="font-montserrat font-bold text-monarca-black hover:text-monarca-terracotta px-3 py-2 rounded-md text-sm tracking-wide">
                {menuItems.articles}
              </a>
              <a href="#art" className="font-montserrat font-bold text-monarca-black hover:text-monarca-terracotta px-3 py-2 rounded-md text-sm tracking-wide">
                {menuItems.art}
              </a>
              <a href="#music" className="font-montserrat font-bold text-monarca-black hover:text-monarca-terracotta px-3 py-2 rounded-md text-sm tracking-wide">
                {menuItems.music}
              </a>
              <a href="#travel" className="font-montserrat font-bold text-monarca-black hover:text-monarca-terracotta px-3 py-2 rounded-md text-sm tracking-wide">
                {menuItems.travel}
              </a>
              <a href="#innovation" className="font-montserrat font-bold text-monarca-black hover:text-monarca-terracotta px-3 py-2 rounded-md text-sm tracking-wide">
                {menuItems.innovation}
              </a>
              <a href="#about" className="font-montserrat font-bold text-monarca-black hover:text-monarca-terracotta px-3 py-2 rounded-md text-sm tracking-wide">
                {menuItems.about}
              </a>
              <a href="#contact" className="font-montserrat font-bold text-monarca-black hover:text-monarca-terracotta px-3 py-2 rounded-md text-sm tracking-wide">
                {menuItems.contact}
              </a>
            </div>
          </nav>
          
          {/* Right side - Language switcher and auth */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <AuthButton />
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      <div className="md:hidden hidden hs-collapse" id="mobile-menu">
        <div className="px-4 pt-2 pb-3 space-y-1 border-t border-gray-200">
          <Link to="/" className="font-montserrat font-bold text-monarca-black hover:text-monarca-terracotta block px-3 py-2 rounded-md text-base">
            {menuItems.home}
          </Link>
          <a href="#articles" className="font-montserrat font-bold text-monarca-black hover:text-monarca-terracotta block px-3 py-2 rounded-md text-base">
            {menuItems.articles}
          </a>
          <a href="#art" className="font-montserrat font-bold text-monarca-black hover:text-monarca-terracotta block px-3 py-2 rounded-md text-base">
            {menuItems.art}
          </a>
          <a href="#music" className="font-montserrat font-bold text-monarca-black hover:text-monarca-terracotta block px-3 py-2 rounded-md text-base">
            {menuItems.music}
          </a>
          <a href="#travel" className="font-montserrat font-bold text-monarca-black hover:text-monarca-terracotta block px-3 py-2 rounded-md text-base">
            {menuItems.travel}
          </a>
          <a href="#innovation" className="font-montserrat font-bold text-monarca-black hover:text-monarca-terracotta block px-3 py-2 rounded-md text-base">
            {menuItems.innovation}
          </a>
          <a href="#about" className="font-montserrat font-bold text-monarca-black hover:text-monarca-terracotta block px-3 py-2 rounded-md text-base">
            {menuItems.about}
          </a>
          <a href="#contact" className="font-montserrat font-bold text-monarca-black hover:text-monarca-terracotta block px-3 py-2 rounded-md text-base">
            {menuItems.contact}
          </a>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-300">
            <LanguageSwitcher />
            <AuthButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
