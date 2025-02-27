
import React, { useState } from 'react';
import { Button } from '@mui/material';
import { postDailyArticles } from '../services/articleService';

const ArticleGenerator = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateArticles = async () => {
    setIsLoading(true);
    try {
      const article = {
        section: 'Music',
        title: 'Sabino: El Rapero Que Revoluciona La Música Mexicana',
        content: `Sabino, el talentoso rapero de la Ciudad de México, sigue conquistando la escena musical con sus últimas canciones. 
        Su estilo único de 'sab-hop' ha atraído a miles de seguidores, y además, está impulsando a nuevos artistas emergentes 
        al brindarles oportunidades de colaboración. Su nuevo álbum ha sido un éxito en plataformas digitales, consolidándolo 
        como una de las figuras más innovadoras del hip-hop latino.`
      };

      await postDailyArticles(article);
    } catch (error) {
      console.error('Failed to generate articles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <Button
        variant="contained"
        color="primary"
        onClick={handleGenerateArticles}
        disabled={isLoading}
      >
        {isLoading ? 'Generating Articles...' : 'Generate Daily Articles'}
      </Button>
    </div>
  );
};

export default ArticleGenerator;
