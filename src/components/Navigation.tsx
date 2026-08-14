import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLanguageStore } from '@/services/articleService';
import { Moon, Sun, ChevronDown, Menu, Newspaper } from 'lucide-react';
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
  const { language, setLanguage } = useLanguageStore();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const categories = [
    { label: language === 'en' ? 'Art' : 'Arte', path: '/categoria/arte' },
    { label: language === 'en' ? 'Music' : 'Música', path: '/categoria/musica' },
    { label: language === 'en' ? 'Nature' : 'Naturaleza', path: '/categoria/naturaleza' },
    { label: language === 'en' ? 'Sustainable Living' : 'Vida Sustentable', path: '/categoria/vida-sustentable' },
    { label: language === 'en' ? 'Design' : 'Diseño', path: '/categoria/diseno' },
    { label: language === 'en' ? 'Travel' : 'Viajes', path: '/categoria/viajes' },
    { label: language === 'en' ? 'AI & Innovation' : 'IA e Innovación', path: '/categoria/ia' },
  ];

  const mainNavItems = [
    { label: language === 'en' ? 'Home' : 'Inicio', path: '/' },
    { label: language === 'en' ? 'Local Guide' : 'La Guía', path: '/guia' },
    { label: language === 'en' ? 'Walking Tours' : 'Recorridos', path: '/recorridos' },
    { label: language === 'en' ? 'First Issue' : 'Primera Edición', path: '/primera-edicion' },
    { label: language === 'en' ? 'Private Paper' : 'Papel Privado', path: '/papel-privado' },
    { label: language === 'en' ? 'Work With Us' : 'Trabaja con Nosotros', path: '/trabaja-con-nosotros' },
    { label: language === 'en' ? 'Subscribe' : 'Suscribirse', path: '/suscribirse' },
  ];

  return (
    <nav className="bg-monarca-cream text-monarca-black shadow-md sticky top-0 z-50">
      <div className="border-b border-monarca-amber/20">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <Link to="/" className="font-display text-2xl md:text-3xl font-bold tracking-tight hover:text-monarca-terracotta transition-colors flex-shrink-0">
            La Monarca Internacional
          </Link>

          <div className="hidden md:flex items-center gap-1 text-xs text-monarca-gray">
            <Newspaper className="h-3 w-3" />
            <span>{language === 'en' ? 'A Kupuri Media Publication' : 'Una publicación de Kupuri Media'}</span>
          </div>

          <div className="flex items-center gap-2 ml-auto md:ml-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-xs font-bold tracking-widest border border-monarca-amber/40 hover:bg-monarca-amber/10"
            >
              {language === 'en' ? 'ES' : 'EN'}
            </Button>
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="px-3 py-2 text-sm font-medium flex items-center gap-1 h-auto">
                {language === 'en' ? 'Sections' : 'Secciones'}
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-52">
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
        </div>

        <div className="md:hidden flex items-center justify-between py-2">
          <span className="text-xs text-monarca-gray">Kupuri Media</span>
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
                  <Link to={item.path}>{item.label}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-xs text-monarca-gray">
                {language === 'en' ? 'Sections' : 'Secciones'}
              </DropdownMenuLabel>
              {categories.map((cat) => (
                <DropdownMenuItem key={cat.path} asChild>
                  <Link to={cat.path}>{cat.label}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={toggleLanguage}>
                {language === 'en' ? 'Cambiar a Español' : 'Switch to English'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={toggleTheme}>
                {isDarkMode
                  ? (language === 'en' ? 'Light Mode' : 'Modo Claro')
                  : (language === 'en' ? 'Dark Mode' : 'Modo Oscuro')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
