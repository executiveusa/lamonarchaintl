
import React, { useEffect, useRef } from 'react';

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animate on load
    const animateOnLoad = () => {
      if (titleRef.current) {
        titleRef.current.classList.add('animate-fade-in-up');
      }
      if (subtitleRef.current) {
        subtitleRef.current.classList.add('animate-fade-in-up');
      }
      if (imageRef.current) {
        imageRef.current.classList.add('animate-blur-in');
      }
    };
    
    // Add a slight delay for the animation to be more noticeable
    const timer = setTimeout(() => {
      animateOnLoad();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (imageRef.current) {
        imageRef.current.style.transform = `translateY(${scrollPosition * 0.2}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with parallax effect */}
      <div 
        ref={imageRef}
        className="absolute inset-0 w-full h-full opacity-0"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1527576539890-dfa815648363?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.7)'
        }}
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      
      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 
            ref={titleRef} 
            className="text-5xl md:text-7xl font-display font-semibold mb-6 opacity-0"
          >
            La Monarca Internacional
          </h1>
          <p 
            ref={subtitleRef} 
            className="text-xl md:text-2xl font-light mb-8 opacity-0 delay-200"
          >
            El corazón de la innovación en México
          </p>
          
          <div className="flex justify-center space-x-4">
            <a 
              href="#noticias" 
              className="opacity-0 animate-fade-in-up delay-300 bg-monarca-terracotta hover:bg-monarca-orange text-white py-3 px-8 rounded-md transition-all duration-300 hover:shadow-lg"
            >
              Descubrir
            </a>
            <a 
              href="#contacto" 
              className="opacity-0 animate-fade-in-up delay-400 bg-transparent hover:bg-white/10 text-white border border-white py-3 px-8 rounded-md transition-all duration-300"
            >
              Contáctanos
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 animate-fade-in delay-500">
        <div className="w-6 h-10 rounded-full border-2 border-white flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full animate-[bounce_1.5s_infinite] mt-2" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
