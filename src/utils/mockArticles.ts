
import { useLanguageStore } from '@/services/articleService';

export const getMockArticles = (language: string) => {
  return language === 'en' ? [
    {
      id: '1',
      title: 'Mexico leads advances in AI applied to climate change analysis',
      content: 'Mexican researchers develop an AI model that accurately predicts regional climate patterns, setting a new global standard.',
      image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      category: 'Science',
      created_at: '2023-05-12T00:00:00.000Z',
      updated_at: '2023-05-12T00:00:00.000Z',
      author: 'La Monarca Internacional',
      date: 'May 12, 2023',
      language: 'en'
    },
    {
      id: '2',
      title: 'The Digital Revolution in Contemporary Mexican Art',
      content: 'Mexican artists are redefining the national artistic landscape by integrating cutting-edge technologies into their creations.',
      image_url: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      category: 'Art',
      created_at: '2023-04-28T00:00:00.000Z',
      updated_at: '2023-04-28T00:00:00.000Z',
      author: 'La Monarca Internacional',
      date: 'April 28, 2023',
      language: 'en'
    },
    {
      id: '3',
      title: 'New Technology Innovation Policies in Mexico City',
      content: 'The capital\'s government announces major investments in digital infrastructure to transform CDMX into a Latin American technology hub.',
      image_url: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      category: 'Technology',
      created_at: '2023-04-15T00:00:00.000Z',
      updated_at: '2023-04-15T00:00:00.000Z',
      author: 'La Monarca Internacional',
      date: 'April 15, 2023',
      language: 'en'
    },
    {
      id: '4',
      title: 'The Impact of Monarch Migration on Digital Ecosystems',
      content: 'An innovative study establishes parallels between the migratory patterns of monarch butterflies and the dissemination of information on social networks.',
      image_url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      category: 'Monarchs',
      created_at: '2023-04-03T00:00:00.000Z',
      updated_at: '2023-04-03T00:00:00.000Z',
      author: 'La Monarca Internacional',
      date: 'April 3, 2023',
      language: 'en'
    },
    {
      id: '5',
      title: 'Mexican Startup Develops AI System for Cultural Preservation',
      content: 'An innovative platform uses machine learning algorithms to digitize and preserve endangered indigenous languages.',
      image_url: 'https://images.unsplash.com/photo-1527576539890-dfa815648363?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      category: 'Innovation',
      created_at: '2023-03-22T00:00:00.000Z',
      updated_at: '2023-03-22T00:00:00.000Z',
      author: 'La Monarca Internacional',
      date: 'March 22, 2023',
      language: 'en'
    },
    {
      id: '6',
      title: 'The Renaissance of Traditional Craftsmanship through Technology',
      content: 'Artisans from various regions of Mexico are incorporating digital tools to preserve and evolve ancestral techniques.',
      image_url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      category: 'Art',
      created_at: '2023-03-10T00:00:00.000Z',
      updated_at: '2023-03-10T00:00:00.000Z',
      author: 'La Monarca Internacional',
      date: 'March 10, 2023',
      language: 'en'
    }
  ] : [
    {
      id: '1-es',
      title: 'México lidera avances en IA aplicada al análisis del cambio climático',
      content: 'Investigadores mexicanos desarrollan un modelo de IA que predice con precisión los patrones climáticos regionales, estableciendo un nuevo estándar global.',
      image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      category: 'Ciencia',
      created_at: '2023-05-12T00:00:00.000Z',
      updated_at: '2023-05-12T00:00:00.000Z',
      author: 'La Monarca Internacional',
      date: '12 de mayo, 2023',
      language: 'es'
    },
    {
      id: '2-es',
      title: 'La Revolución Digital en el Arte Mexicano Contemporáneo',
      content: 'Artistas mexicanos están redefiniendo el panorama artístico nacional mediante la integración de tecnologías de vanguardia en sus creaciones.',
      image_url: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      category: 'Arte',
      created_at: '2023-04-28T00:00:00.000Z',
      updated_at: '2023-04-28T00:00:00.000Z',
      author: 'La Monarca Internacional',
      date: '28 de abril, 2023',
      language: 'es'
    },
    {
      id: '3-es',
      title: 'Nuevas Políticas de Innovación Tecnológica en la Ciudad de México',
      content: 'El gobierno de la capital anuncia importantes inversiones en infraestructura digital para transformar CDMX en un centro tecnológico latinoamericano.',
      image_url: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      category: 'Tecnología',
      created_at: '2023-04-15T00:00:00.000Z',
      updated_at: '2023-04-15T00:00:00.000Z',
      author: 'La Monarca Internacional',
      date: '15 de abril, 2023',
      language: 'es'
    },
    {
      id: '4-es',
      title: 'El Impacto de la Migración de la Mariposa Monarca en Ecosistemas Digitales',
      content: 'Un innovador estudio establece paralelismos entre los patrones migratorios de las mariposas monarca y la diseminación de información en redes sociales.',
      image_url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      category: 'Monarcas',
      created_at: '2023-04-03T00:00:00.000Z',
      updated_at: '2023-04-03T00:00:00.000Z',
      author: 'La Monarca Internacional',
      date: '3 de abril, 2023',
      language: 'es'
    },
    {
      id: '5-es',
      title: 'Startup Mexicana Desarrolla Sistema de IA para Preservación Cultural',
      content: 'Una plataforma innovadora utiliza algoritmos de aprendizaje automático para digitalizar y preservar lenguas indígenas en peligro de extinción.',
      image_url: 'https://images.unsplash.com/photo-1527576539890-dfa815648363?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      category: 'Innovación',
      created_at: '2023-03-22T00:00:00.000Z',
      updated_at: '2023-03-22T00:00:00.000Z',
      author: 'La Monarca Internacional',
      date: '22 de marzo, 2023',
      language: 'es'
    },
    {
      id: '6-es',
      title: 'El Renacimiento de la Artesanía Tradicional a través de la Tecnología',
      content: 'Artesanos de diversas regiones de México están incorporando herramientas digitales para preservar y evolucionar técnicas ancestrales.',
      image_url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      category: 'Arte',
      created_at: '2023-03-10T00:00:00.000Z',
      updated_at: '2023-03-10T00:00:00.000Z',
      author: 'La Monarca Internacional',
      date: '10 de marzo, 2023',
      language: 'es'
    }
  ];
};
