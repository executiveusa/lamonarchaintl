import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLanguageStore } from '@/services/articleService';
import { Moon, Sun, ChevronDown, Menu, X, Newspaper } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  const categories = [
    { label: language === 'en' ? 'Community' : 'Comunidad', path: '/categoria/comunidad' },
    { label: language === 'en' ? 'Art & Culture' : 'Arte y Cultura', path: '/categoria/arte' },
    { label: language === 'en' ? 'Music' : 'Música', path: '/music-blogs' },
    { label: language === 'en' ? 'Youth' : 'Juventud', path: '/categoria/juventud' },
    { label: language === 'en' ? 'Innovation' : 'Innovación', path: '/categoria/innovacion' },
    { label: language === 'en' ? 'Travel' : 'Viajes', path: '/categoria/viajes' },
    { label: language === 'en' ? 'Interviews' : 'Entrevistas', path: '/categoria/entrevistas' },
    { label: language === 'en' ? 'Business' : 'Negocios', path: '/categoria/negocios' },
  ];

  const mainNavItems = [
    { label: language === 'en' ? 'Home' : 'Inicio', path: '/' },
    { label: language === 'en' ? 'First Issue' : 'Primera Edición', path: '/primera-edicion' },
    { label: language === 'en' ? 'Work With Us' : 'Trabaja con Nosotros', path: '/trabaja-con-nosotros' },
    { label: language === 'en' ? 'Subscribe' : 'Suscribirse', path: '/suscribirse' },
  ];

  return (
    <nav className="bg-monarca-cream text-monarca-black shadow-md sticky top-0 z-50">
      {/* Top bar - brand name */}
      <div className="border-b border-monarca-amber/20">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="font-display text-2xl md:text-3xl font-bold tracking-tight hover:text-monarca-terracotta transition-colors">
            La Monarca Internacional
          </Link>
          <div className="hidden md:flex items-center gap-3 text-xs text-monarca-gray">
            <span className="flex items-center gap-1">
              <Newspaper className="h-3 w-3" />
              {language === 'en' ? 'Born in Barrio Santa María · Mexico City' : 'Nacida en Barrio Santa María · Ciudad de México'}
            </span>
            <span className="text-monarca-amber">|</span>
            <span>{language === 'en' ? 'A Kupari Media Publication' : 'Una publicación de Kupari Media'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={toggleLanguage} className="text-xs font-medium">
              {language === 'en' ? 'Español' : 'English'}
            </Button>
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Main nav bar */}
      <div className="container mx-auto px-6">
        <div className="hidden md:flex items-center gap-1 py-2">
          {mainNavItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-medium rounded transition-colors duration-200 ${
                  isActive
                    ? 'text-monarca-terracotta bg-monarca-terracotta/5'
                    : 'hover:text-monarca-terracotta hover:bg-monarca-terracotta/5'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {/* Categories dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="px-3 py-2 text-sm font-medium flex items-center gap-1 h-auto">
                {language === 'en' ? 'Topics' : 'Temas'}
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuLabel className="text-xs text-monarca-gray">
                {language === 'en' ? 'Browse by Category' : 'Explorar por Categoría'}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {categories.map((cat) => (
                <DropdownMenuItem key={cat.path} asChild>
                  <Link to={cat.path} className="cursor-pointer">{cat.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <NavLink
            to="/translator"
            className={({ isActive }) =>
              `px-3 py-2 text-sm font-medium rounded transition-colors duration-200 ${
                isActive
                  ? 'text-monarca-terracotta bg-monarca-terracotta/5'
                  : 'hover:text-monarca-terracotta hover:bg-monarca-terracotta/5'
              }`
            }
          >
            {language === 'en' ? 'Translator' : 'Traductor'}
          </NavLink>
        </div>

        {/* Mobile nav */}
        <div className="md:hidden flex items-center justify-between py-2">
          <span className="text-xs text-monarca-gray">
            {language === 'en' ? 'A Kupari Media Publication' : 'Una publicación de Kupari Media'}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>La Monarca Internacional</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {mainNavItems.map((item) => (
                <DropdownMenuItem key={item.label} asChild>
                  <Link to={item.path} onClick={closeMenu}>{item.label}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-xs text-monarca-gray">
                {language === 'en' ? 'Topics' : 'Temas'}
              </DropdownMenuLabel>
              {categories.map((cat) => (
                <DropdownMenuItem key={cat.path} asChild>
                  <Link to={cat.path} onClick={closeMenu}>{cat.label}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/translator" onClick={closeMenu}>
                  {language === 'en' ? 'Translator' : 'Traductor'}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={toggleLanguage}>
                {language === 'en' ? 'Español' : 'English'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={toggleTheme}>
                {isDarkMode ? (language === 'en' ? 'Light Mode' : 'Modo Claro') : (language === 'en' ? 'Dark Mode' : 'Modo Oscuro')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
