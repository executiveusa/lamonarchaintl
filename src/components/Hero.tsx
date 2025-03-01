
import React from 'react';
import { Container } from '@mui/material';
import AnimatedBackground from './hero/AnimatedBackground';
import HeroContent from './hero/HeroContent';
import ScrollIndicator from './hero/ScrollIndicator';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground videoUrl="https://www.youtube.com/embed/V9Zv3ZsX4A8?autoplay=1&mute=1&loop=1&playlist=V9Zv3ZsX4A8&controls=0&showinfo=0&rel=0&modestbranding=1&disablekb=1&iv_load_policy=3&playsinline=1" />
      
      {/* Content with Material UI integration */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 20 }}>
        <HeroContent />
      </Container>
      
      <ScrollIndicator />
    </section>
  );
};

export default Hero;
