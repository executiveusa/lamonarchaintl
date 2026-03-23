import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLanguageStore } from '@/services/articleService';
import { Moon, Sun, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Navigation = () => {
  const location = useLocation();
  const { language, setLanguage } = useLanguageStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const sections = [
    { label: language === 'en' ? 'News' : 'Noticias',        path: '/', anchor: '#articles' },
    { label: language === 'en' ? 'Business' : 'Negocios',    path: '/', anchor: '#negocios' },
    { label: language === 'en' ? 'Technology' : 'Tecnología', path: '/', anchor: '#tech' },
    { label: language === 'en' ? 'Culture' : 'Cultura',      path: '/', anchor: '#art' },
    { label: language === 'en' ? 'Music' : 'Música',         path: '/music-blogs', anchor: '' },
    { label: language === 'en' ? 'LATAM' : 'LATAM',          path: '/', anchor: '#travel' },
  ];

  return (
    <nav className="bg-monarca-cream text-monarca-black py-3 shadow-sm sticky top-0 z-50 border-b border-black/10">
      {/* Top bar: brand + actions */}
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl font-bold tracking-tight">
          La Monarca Internacional
        </Link>

        <div className="hidden md:flex items-center gap-3">
          {/* Language Toggle */}
          <Button variant="ghost" size="sm" onClick={toggleLanguage} className="text-xs font-medium">
            {language === 'en' ? 'ES' : 'EN'}
          </Button>

          {/* Theme Toggle */}
          <Button variant="ghost" size="sm" onClick={toggleTheme}>
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* Directorio CTA */}
          <a
            href={import.meta.env.VITE_DIRECTORY_URL || 'https://directorio-kupuri.vercel.app'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold px-3 py-1.5 rounded-md bg-monarca-terracotta text-white hover:bg-monarca-orange transition-colors"
          >
            {language === 'en' ? 'Directory' : 'Directorio'}
          </a>

          {/* Subscribe CTA */}
          <Link
            to="/suscribirse"
            className="text-xs font-bold px-3 py-1.5 rounded-md bg-monarca-black text-monarca-cream hover:bg-monarca-black/80 transition-colors"
          >
            {language === 'en' ? 'Subscribe' : 'Suscríbete'}
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <span className="sr-only">Open main menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>La Monarca</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {sections.map((item) => (
                <DropdownMenuItem key={item.label} asChild>
                  <Link to={item.anchor ? `${item.path}${item.anchor}` : item.path} onClick={closeMenu}>
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/suscribirse" onClick={closeMenu}>
                  {language === 'en' ? 'Subscribe' : 'Suscríbete'}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={toggleLanguage}>
                {language === 'en' ? 'Español' : 'English'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={toggleTheme}>
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Section sub-nav (desktop) */}
      <div className="hidden md:block border-t border-black/10 mt-2 pt-2">
        <div className="container mx-auto px-6 flex items-center gap-6">
          {sections.map((item) => (
            <Link
              key={item.label}
              to={item.anchor ? `${item.path}${item.anchor}` : item.path}
              className="text-xs font-medium text-monarca-black/70 hover:text-monarca-terracotta transition-colors pb-1"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/translator"
            className="text-xs font-medium text-monarca-black/70 hover:text-monarca-terracotta transition-colors pb-1 ml-auto flex items-center gap-1"
          >
            <BookOpen className="h-3 w-3" />
            {language === 'en' ? 'Translator' : 'Traductor'}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

const Navigation = () => {
  const location = useLocation();
  const { language, setLanguage } = useLanguageStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: language === 'en' ? 'Music Blogs' : 'Blogs de Música', path: '/music-blogs' },
    { label: 'Translator', path: '/translator' },
  ];

  return (
    <nav className="bg-monarca-cream text-monarca-black py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo and Brand */}
        <Link to="/" className="font-display text-3xl font-bold">
          La Monarca Internacional
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? 'text-monarca-terracotta hover:text-monarca-orange transition-colors duration-200 font-semibold'
                  : 'hover:text-monarca-terracotta transition-colors duration-200'
              }
            >
              {item.label}
            </NavLink>
          ))}

          {/* Language Toggle */}
          <Button variant="ghost" size="sm" onClick={toggleLanguage}>
            {language === 'en' ? 'Español' : 'English'}
          </Button>

          {/* Theme Toggle */}
          <Button variant="ghost" size="sm" onClick={toggleTheme}>
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline" size="icon">
                <span className="sr-only">Open main menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-menu"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {navItems.map((item) => (
                <DropdownMenuItem key={item.label} asChild>
                  <Link to={item.path} onClick={closeMenu}>
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={toggleLanguage}>
                {language === 'en' ? 'Español' : 'English'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={toggleTheme}>
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
