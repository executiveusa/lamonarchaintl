
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { MenuIcon, X } from 'lucide-react';
import { Button } from '@mui/material';

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
          <div className="hidden md:flex items-center space-x-2">
            <Button href="#noticias" variant="contained" color="primary" size="small">News</Button>
            <Button href="#arte" variant="contained" color="primary" size="small">Art</Button>
            <Button href="#musica" variant="contained" color="primary" size="small">Music</Button>
            <Button href="#viajes" variant="contained" color="primary" size="small">Travel</Button>
            <Button href="#inteligencia-artificial" variant="contained" color="primary" size="small">AI</Button>
            <Button href="#belleza" variant="contained" color="primary" size="small">Beauty</Button>
            <Button href="#monarca" variant="contained" color="primary" size="small">Monarchs</Button>
            <Button href="#contacto" variant="contained" color="primary" size="small">Contact</Button>
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
        <div className="container mx-auto px-6 py-6 flex flex-col space-y-4 text-center">
          <Button 
            href="#noticias" 
            variant="contained" 
            color="primary"
            fullWidth
            onClick={toggleMenu}
          >
            News
          </Button>
          <Button 
            href="#arte" 
            variant="contained" 
            color="primary"
            fullWidth
            onClick={toggleMenu}
          >
            Art
          </Button>
          <Button 
            href="#musica" 
            variant="contained" 
            color="primary"
            fullWidth
            onClick={toggleMenu}
          >
            Music
          </Button>
          <Button 
            href="#viajes" 
            variant="contained" 
            color="primary"
            fullWidth
            onClick={toggleMenu}
          >
            Travel
          </Button>
          <Button 
            href="#inteligencia-artificial" 
            variant="contained" 
            color="primary"
            fullWidth
            onClick={toggleMenu}
          >
            AI
          </Button>
          <Button 
            href="#belleza" 
            variant="contained" 
            color="primary"
            fullWidth
            onClick={toggleMenu}
          >
            Beauty
          </Button>
          <Button 
            href="#monarca" 
            variant="contained" 
            color="primary"
            fullWidth
            onClick={toggleMenu}
          >
            Monarchs
          </Button>
          <Button 
            href="#contacto" 
            variant="contained" 
            color="primary"
            fullWidth
            onClick={toggleMenu}
          >
            Contact
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
