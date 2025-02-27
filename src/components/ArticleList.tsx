
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { fetchArticles, Article } from '../services/articleService';
import { Skeleton } from './ui/skeleton';

const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        const data = await fetchArticles();
        setArticles(data);
      } catch (error) {
        console.error('Failed to load articles', error);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-2/3 mb-2" />
              <Skeleton className="h-6 w-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-24 w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-4 w-1/3" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="flex justify-center items-center p-12">
        <p className="text-lg text-gray-500">No articles found. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {articles.map((article) => (
        <Card key={article.id} className="overflow-hidden flex flex-col">
          {article.image_url && (
            <div className="aspect-video w-full overflow-hidden">
              <img 
                src={article.image_url} 
                alt={article.title} 
                className="object-cover w-full h-full transition-transform hover:scale-105"
              />
            </div>
          )}
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">{article.title}</CardTitle>
            <CardDescription className="text-sm text-gray-500">
              {article.created_at ? new Date(article.created_at).toLocaleDateString() : 'No date'} • {article.category}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-gray-700 line-clamp-3">
              {article.summary || article.content.substring(0, 150) + '...'}
            </p>
          </CardContent>
          <CardFooter className="pt-2 flex justify-between">
            <span className="text-sm text-gray-500">By {article.author || 'Unknown'}</span>
            <a 
              href={`/article/${article.id}`} 
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Read more →
            </a>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ArticleList;
