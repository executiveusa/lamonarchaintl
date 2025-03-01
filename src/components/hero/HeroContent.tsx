
import React, { useRef, useEffect } from 'react';
import { Typography, Box, Button } from '@mui/material';
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

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const HeroContent: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  
  useEffect(() => {
    // Animate on load
    const animateOnLoad = () => {
      if (titleRef.current) {
        titleRef.current.classList.add('animate-fade-in-up');
      }
      if (subtitleRef.current) {
        subtitleRef.current.classList.add('animate-fade-in-up');
      }
    };
    
    // Add a slight delay for the animation to be more noticeable
    const timer = setTimeout(() => {
      animateOnLoad();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ 
      maxWidth: '4xl', 
      mx: 'auto', 
      textAlign: 'center',
      color: 'white',
      position: 'relative'
    }}>
      <DecorativeElements />
      
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
      
      <HeroButtons />
    </Box>
  );
};

const DecorativeElements: React.FC = () => (
  <>
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
  </>
);

const HeroButtons: React.FC = () => (
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
);

export default HeroContent;
