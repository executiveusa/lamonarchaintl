
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  CardActions, 
  Typography, 
  Box 
} from '@mui/material';
import { Button as MuiButton } from '@mui/material';
import { Button } from '@/components/ui/button';
import { useLanguageStore } from '@/services/articleService';

interface ArticleSectionProps {
  articles: any[];
  isLoading: boolean;
}

const ArticleSection: React.FC<ArticleSectionProps> = ({ articles, isLoading }) => {
  const { language } = useLanguageStore();
  
  // Translate section titles and content based on language
  const getTranslatedContent = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      'latest_news': {
        'en': 'Latest AI News',
        'es': 'Últimas Noticias de IA'
      },
      'latest_news_subtitle': {
        'en': 'Discover the most recent advances in artificial intelligence and their impact in Mexico',
        'es': 'Descubre los avances más recientes en inteligencia artificial y su impacto en México'
      },
      'view_more': {
        'en': 'View more news',
        'es': 'Ver más noticias'
      },
      'read_more': {
        'en': 'Read More',
        'es': 'Leer Más'
      }
    };

    return translations[key][language] || key;
  };

  return (
    <section id="noticias" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-medium mb-2">
            {getTranslatedContent('latest_news')}
          </h2>
          <p className="text-monarca-gray/90 max-w-2xl mx-auto">
            {getTranslatedContent('latest_news_subtitle')}
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md h-[400px] animate-pulse">
                <div className="bg-monarca-gray/20 h-60"></div>
                <div className="p-6">
                  <div className="h-4 bg-monarca-gray/20 rounded w-1/4 mb-4"></div>
                  <div className="h-6 bg-monarca-gray/20 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-monarca-gray/20 rounded w-full mb-2"></div>
                  <div className="h-4 bg-monarca-gray/20 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {articles.map((article) => (
              <Card key={article.id} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={article.image_url}
                  alt={article.title}
                />
                <Box sx={{ position: 'absolute', top: 16, left: 16, bgcolor: 'primary.main', color: 'white', px: 1, py: 0.5, borderRadius: 1 }}>
                  {article.category}
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    {article.date || new Date(article.created_at).toLocaleDateString(language === 'en' ? 'en-US' : 'es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Typography>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {article.content}
                  </Typography>
                </CardContent>
                <CardActions>
                  <MuiButton size="small" color="primary">
                    {getTranslatedContent('read_more')}
                  </MuiButton>
                </CardActions>
              </Card>
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <Button 
            variant="default" 
            size="lg"
            className="bg-monarca-terracotta hover:bg-monarca-orange text-white py-3 px-6 rounded-md"
          >
            {getTranslatedContent('view_more')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ArticleSection;
