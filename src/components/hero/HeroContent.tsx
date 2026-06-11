
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import { useLanguageStore } from '@/services/articleService';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const HeroContent: React.FC = () => {
  const { language } = useLanguageStore();
  const isEn = language === 'en';

  return (
    <Box sx={{ maxWidth: '800px', mx: 'auto', textAlign: 'center', color: 'white' }}>
      {/* Tagline chip */}
      <Box
        sx={{
          display: 'inline-block',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '100px',
          px: 2.5,
          py: 0.75,
          mb: 3,
          opacity: 0,
          animation: `${fadeInUp} 0.7s ease-out forwards`,
          animationDelay: '0ms',
        }}
      >
        <Typography variant="caption" sx={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)' }}>
          {isEn ? 'A Kupari Media Publication · Born in Barrio Santa María, CDMX' : 'Una Publicación de Kupari Media · Nacida en Barrio Santa María, CDMX'}
        </Typography>
      </Box>

      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '2.8rem', sm: '4rem', md: '5.5rem' },
          fontWeight: 700,
          lineHeight: 1.05,
          mb: 2,
          opacity: 0,
          fontFamily: '"Playfair Display", serif',
          textShadow: '0 2px 20px rgba(0,0,0,0.3)',
          animation: `${fadeInUp} 0.8s ease-out forwards`,
          animationDelay: '100ms',
        }}
      >
        La Monarca
        <Box component="span" sx={{ display: 'block', color: '#F39C12' }}>
          Internacional
        </Box>
      </Typography>

      <Typography
        variant="h5"
        sx={{
          fontSize: { xs: '1rem', md: '1.25rem' },
          fontWeight: 300,
          mb: 5,
          opacity: 0,
          maxWidth: '620px',
          mx: 'auto',
          lineHeight: 1.6,
          color: 'rgba(255,255,255,0.85)',
          animation: `${fadeInUp} 0.8s ease-out forwards`,
          animationDelay: '200ms',
        }}
      >
        {isEn
          ? 'Positive stories from Mexico and the world. Artists, youth, community, culture — the people building something beautiful.'
          : 'Historias positivas de México y el mundo. Artistas, jóvenes, comunidad, cultura: las personas construyendo algo hermoso.'}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'center',
          gap: 2,
          opacity: 0,
          animation: `${fadeInUp} 0.8s ease-out forwards`,
          animationDelay: '300ms',
        }}
      >
        <Button
          variant="contained"
          size="large"
          href="#articles"
          sx={{
            py: 1.5,
            px: 4,
            fontWeight: 600,
            textTransform: 'none',
            fontSize: '1rem',
            backgroundColor: '#D35400',
            '&:hover': { backgroundColor: '#E67E22' },
            borderRadius: '8px',
          }}
        >
          {isEn ? 'Read the Magazine' : 'Leer la Revista'}
        </Button>
        <Button
          variant="outlined"
          size="large"
          href="/primera-edicion"
          sx={{
            py: 1.5,
            px: 4,
            fontWeight: 500,
            textTransform: 'none',
            fontSize: '1rem',
            borderColor: 'rgba(255,255,255,0.5)',
            color: 'white',
            borderRadius: '8px',
            '&:hover': {
              borderColor: 'white',
              backgroundColor: 'rgba(255,255,255,0.1)',
            },
          }}
        >
          {isEn ? 'First Issue — Sept 2026' : 'Primera Edición — Sept 2026'}
        </Button>
      </Box>
    </Box>
  );
};

export default HeroContent;
