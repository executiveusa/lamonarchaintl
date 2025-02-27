
import React, { useEffect, useRef } from 'react';

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animate on load
    const animateOnLoad = () => {
      if (titleRef.current) {
        titleRef.current.classList.add('animate-fade-in-up');
      }
      if (subtitleRef.current) {
        subtitleRef.current.classList.add('animate-fade-in-up');
      }
      if (videoContainerRef.current) {
        videoContainerRef.current.classList.add('animate-blur-in');
      }
    };
    
    // Add a slight delay for the animation to be more noticeable
    const timer = setTimeout(() => {
      animateOnLoad();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* YouTube video background */}
      <div 
        ref={videoContainerRef}
        className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
      >
        <div className="relative w-full h-full overflow-hidden">
          <iframe 
            src="https://www.youtube.com/embed/V9Zv3ZsX4A8?autoplay=1&mute=1&loop=1&playlist=V9Zv3ZsX4A8&controls=0&showinfo=0&rel=0&modestbranding=1&disablekb=1&iv_load_policy=3&playsinline=1"
            className="absolute top-1/2 left-1/2 min-w-[150%] min-h-[150%] w-auto h-auto transform -translate-x-1/2 -translate-y-1/2 scale-125"
            style={{ filter: 'brightness(0.7)' }}
            title="La Monarca International Background"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />
      
      {/* Content */}
      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 
            ref={titleRef} 
            className="text-5xl md:text-7xl font-display font-semibold mb-6 opacity-0"
          >
            La Monarca International
          </h1>
          <p 
            ref={subtitleRef} 
            className="text-xl md:text-2xl font-light mb-8 opacity-0 delay-200"
          >
            The heart of innovation in Mexico
          </p>
          
          <div className="flex justify-center space-x-4">
            <a 
              href="#noticias" 
              className="opacity-0 animate-fade-in-up delay-300 bg-monarca-terracotta hover:bg-monarca-orange text-white py-3 px-8 rounded-md transition-all duration-300 hover:shadow-lg"
            >
              Discover
            </a>
            <a 
              href="#contacto" 
              className="opacity-0 animate-fade-in-up delay-400 bg-transparent hover:bg-white/10 text-white border border-white py-3 px-8 rounded-md transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 animate-fade-in delay-500 z-20">
        <div className="w-6 h-10 rounded-full border-2 border-white flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full animate-[bounce_1.5s_infinite] mt-2" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
