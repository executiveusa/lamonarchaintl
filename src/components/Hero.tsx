
import React, { useEffect, useRef, useState } from 'react';
import { Button, Typography, Box, Container } from '@mui/material';
import { keyframes } from '@emotion/react';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const blurIn = keyframes`
  from {
    opacity: 0;
    filter: blur(10px);
  }
  to {
    opacity: 1;
    filter: blur(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate video loading
    const timer = setTimeout(() => {
      setIsVideoLoaded(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

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
      {/* YouTube video background with enhanced loading state */}
      <div 
        ref={videoContainerRef}
        className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
      >
        <div className="relative w-full h-full overflow-hidden">
          {!isVideoLoaded && (
            <div className="absolute inset-0 bg-monarca-terracotta/20 animate-pulse"></div>
          )}
          <iframe 
            src="https://www.youtube.com/embed/V9Zv3ZsX4A8?autoplay=1&mute=1&loop=1&playlist=V9Zv3ZsX4A8&controls=0&showinfo=0&rel=0&modestbranding=1&disablekb=1&iv_load_policy=3&playsinline=1"
            className="absolute top-1/2 left-1/2 min-w-[150%] min-h-[150%] w-auto h-auto transform -translate-x-1/2 -translate-y-1/2 scale-125"
            style={{ filter: 'brightness(0.7)' }}
            title="Monarca Internacional Background"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      
      {/* Enhanced overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10" />
      
      {/* Content with Material UI integration */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 20 }}>
        <Box sx={{ 
          maxWidth: '4xl', 
          mx: 'auto', 
          textAlign: 'center',
          color: 'white',
          position: 'relative'
        }}>
          <Box sx={{
            position: 'absolute',
            width: '150px',
            height: '150px',
            background: 'radial-gradient(circle, rgba(232,93,38,0.2) 0%, rgba(0,0,0,0) 70%)',
            top: '-100px',
            left: '10%',
            borderRadius: '50%',
            filter: 'blur(20px)',
            animation: `${fadeIn} 2s ease-out forwards`,
            opacity: 0,
            animationDelay: '1s'
          }} />
          
          <Typography
            ref={titleRef}
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '3rem', md: '4.5rem' },
              fontWeight: 600,
              mb: 3,
              opacity: 0,
              fontFamily: '"Playfair Display", serif',
              textShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}
          >
            La Monarca Internacional
          </Typography>
          
          <Typography
            ref={subtitleRef}
            variant="h5"
            component="p"
            sx={{
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              fontWeight: 300,
              mb: 4,
              opacity: 0,
              maxWidth: '700px',
              mx: 'auto',
              animationDelay: '200ms',
              lineHeight: 1.4
            }}
          >
            The heart of innovation and cultural transformation in México
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            justifyContent: 'center', 
            gap: 2,
            mt: 2
          }}>
            <Button 
              variant="contained"
              color="primary"
              size="large"
              href="#noticias"
              sx={{
                py: 1.5,
                px: 4,
                opacity: 0,
                animation: `${fadeInUp} 0.8s ease-out forwards`,
                animationDelay: '300ms',
                fontWeight: 500,
                textTransform: 'none',
                fontSize: '1rem'
              }}
            >
              Discover
            </Button>
            <Button 
              variant="outlined"
              color="inherit"
              size="large"
              href="#contacto"
              sx={{
                py: 1.5,
                px: 4,
                opacity: 0,
                animation: `${fadeInUp} 0.8s ease-out forwards`,
                animationDelay: '400ms',
                fontWeight: 500,
                textTransform: 'none',
                fontSize: '1rem',
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Contact Us
            </Button>
          </Box>
          
          {/* Decorative element */}
          <Box sx={{
            position: 'absolute',
            width: '180px',
            height: '180px',
            background: 'radial-gradient(circle, rgba(248,185,59,0.15) 0%, rgba(0,0,0,0) 70%)',
            bottom: '-120px',
            right: '10%',
            borderRadius: '50%',
            filter: 'blur(25px)',
            animation: `${fadeIn} 2s ease-out forwards`,
            opacity: 0,
            animationDelay: '1.2s'
          }} />
        </Box>
      </Container>
      
      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 animate-fade-in delay-500 z-20">
        <div className="w-6 h-10 rounded-full border-2 border-white flex justify-center backdrop-blur-sm bg-white/5">
          <div className="w-1 h-3 bg-monarca-terracotta rounded-full animate-[bounce_1.5s_infinite] mt-2" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
