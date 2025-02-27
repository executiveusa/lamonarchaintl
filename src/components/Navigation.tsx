
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { MenuIcon, X } from 'lucide-react';

interface NavigationProps {
  transparent?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ transparent = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <nav 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        (scrolled || !transparent) 
          ? 'bg-white/90 backdrop-blur-lg shadow-sm' 
          : 'bg-transparent',
        isMenuOpen ? 'bg-white' : ''
      )}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#" 
            className="text-2xl font-display font-medium text-monarca-black hover:text-monarca-terracotta transition-colors"
          >
            La Monarca
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <a href="#noticias" className="nav-link">News</a>
            <a href="#arte" className="nav-link">Art</a>
            <a href="#musica" className="nav-link">Music</a>
            <a href="#viajes" className="nav-link">Travel</a>
            <a href="#inteligencia-artificial" className="nav-link">AI</a>
            <a href="#belleza" className="nav-link">Beauty</a>
            <a href="#monarca" className="nav-link">Monarchs</a>
            <a href="#contacto" className="nav-link">Contact</a>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden focus:outline-none"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-monarca-black" />
            ) : (
              <MenuIcon className="w-6 h-6 text-monarca-black" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          'fixed inset-0 bg-white z-40 pt-20 transition-transform duration-300 ease-in-out md:hidden',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="container mx-auto px-6 py-6 flex flex-col space-y-8 text-center">
          <a 
            href="#noticias" 
            className="text-2xl py-2 border-b border-monarca-cream"
            onClick={toggleMenu}
          >
            News
          </a>
          <a 
            href="#arte" 
            className="text-2xl py-2 border-b border-monarca-cream"
            onClick={toggleMenu}
          >
            Art
          </a>
          <a 
            href="#musica" 
            className="text-2xl py-2 border-b border-monarca-cream"
            onClick={toggleMenu}
          >
            Music
          </a>
          <a 
            href="#viajes" 
            className="text-2xl py-2 border-b border-monarca-cream"
            onClick={toggleMenu}
          >
            Travel
          </a>
          <a 
            href="#inteligencia-artificial" 
            className="text-2xl py-2 border-b border-monarca-cream"
            onClick={toggleMenu}
          >
            AI
          </a>
          <a 
            href="#belleza" 
            className="text-2xl py-2 border-b border-monarca-cream"
            onClick={toggleMenu}
          >
            Beauty
          </a>
          <a 
            href="#monarca" 
            className="text-2xl py-2 border-b border-monarca-cream"
            onClick={toggleMenu}
          >
            Monarchs
          </a>
          <a 
            href="#contacto" 
            className="text-2xl py-2"
            onClick={toggleMenu}
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
