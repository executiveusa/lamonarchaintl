
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
    <header className="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3 border-b border-gray-200">
      <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex-none text-xl font-semibold text-monarca-black focus:outline-none focus:opacity-80"
            aria-label="Brand"
          >
            <span className="inline-flex items-center gap-x-2 font-semibold">
              <span className="self-center text-xl font-semibold whitespace-nowrap">
                {language === 'en' ? 'LA Monarca International' : 'LA Monarca Internacional'}
              </span>
            </span>
          </Link>
          <div className="sm:hidden">
            <button
              type="button"
              className="hs-collapse-toggle relative size-7 flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              id="hs-navbar-collapse"
              aria-controls="hs-navbar-menu"
              aria-expanded="false"
              aria-label="Toggle navigation"
              data-hs-collapse="#hs-navbar-menu"
            >
              <svg
                className="hs-collapse-open:hidden shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1={3} x2={21} y1={6} y2={6} />
                <line x1={3} x2={21} y1={12} y2={12} />
                <line x1={3} x2={21} y1={18} y2={18} />
              </svg>
              <svg
                className="hs-collapse-open:block hidden shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
              <span className="sr-only">Toggle navigation</span>
            </button>
          </div>
        </div>
        <div
          id="hs-navbar-menu"
          className="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block"
          aria-labelledby="hs-navbar-collapse"
        >
          <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
            <div className="sm:flex sm:items-center sm:justify-between sm:gap-x-6 lg:gap-x-8">
              <Link
                to="/"
                className="nav-link font-medium"
                aria-current="page"
              >
                {menuItems.home}
              </Link>
              <a
                href="#articles"
                className="nav-link font-medium"
              >
                {menuItems.articles}
              </a>
              <a
                href="#art"
                className="nav-link font-medium"
              >
                {menuItems.art}
              </a>
              <a
                href="#music"
                className="nav-link font-medium"
              >
                {menuItems.music}
              </a>
              <a
                href="#travel"
                className="nav-link font-medium"
              >
                {menuItems.travel}
              </a>
              <a
                href="#innovation"
                className="nav-link font-medium"
              >
                {menuItems.innovation}
              </a>
              <a
                href="#about"
                className="nav-link font-medium"
              >
                {menuItems.about}
              </a>
              <a
                href="#contact"
                className="nav-link font-medium"
              >
                {menuItems.contact}
              </a>
            </div>
            <div className="flex items-center gap-3 sm:ml-6">
              <LanguageSwitcher />
              <AuthButton />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
