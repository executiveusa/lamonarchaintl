
import React from 'react';
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

  return (
    <nav className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <Link to="/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap">
            {language === 'en' ? 'LA Monarca International' : 'LA Monarca Internacional'}
          </span>
        </Link>
        <div className="flex items-center lg:order-2 gap-3">
          <LanguageSwitcher />
          <AuthButton />
        </div>
        <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <Link to="/" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0">
                {menuItems.home}
              </Link>
            </li>
            <li>
              <a href="#articles" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0">
                {menuItems.articles}
              </a>
            </li>
            <li>
              <a href="#art" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0">
                {menuItems.art}
              </a>
            </li>
            <li>
              <a href="#music" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0">
                {menuItems.music}
              </a>
            </li>
            <li>
              <a href="#travel" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0">
                {menuItems.travel}
              </a>
            </li>
            <li>
              <a href="#innovation" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0">
                {menuItems.innovation}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
