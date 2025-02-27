
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { createArticle, publishMultilingualArticle, Article } from '../services/articleService';
import { toast } from 'sonner';
import ArticleFormFields from './admin/ArticleFormFields';
import LanguageSelector from './admin/LanguageSelector';

interface AdminArticleFormProps {
  onSuccess?: () => void;
}

const AdminArticleForm: React.FC<AdminArticleFormProps> = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('general');
  const [author, setAuthor] = useState('La Monarca Internacional');
  const [isMultilingual, setIsMultilingual] = useState(false);
  const [languages, setLanguages] = useState(['ES', 'EN', 'FR']);
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { value: 'ai', label: 'Artificial Intelligence' },
    { value: 'science', label: 'Science' },
    { value: 'culture', label: 'Culture' },
    { value: 'technology', label: 'Technology' },
    { value: 'general', label: 'General' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !content || !category) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    try {
      setIsLoading(true);
      
      const article: Partial<Article> = {
        title,
        content,
        summary,
        image_url: imageUrl,
        category,
        author
      };
      
      if (isMultilingual) {
        await publishMultilingualArticle(article, languages);
      } else {
        await createArticle(article);
      }
      
      // Reset form
      setTitle('');
      setContent('');
      setSummary('');
      setImageUrl('');
      setCategory('general');
      setAuthor('La Monarca Internacional');
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error creating article:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create New Article</CardTitle>
        <CardDescription>
          Fill in the details to create a new article for La Monarca Internacional
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <ArticleFormFields
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
            summary={summary}
            setSummary={setSummary}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            category={category}
            setCategory={setCategory}
            author={author}
            setAuthor={setAuthor}
            isMultilingual={isMultilingual}
            setIsMultilingual={setIsMultilingual}
            categories={categories}
          />
          
          {isMultilingual && <LanguageSelector languages={languages} />}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Publishing...' : 'Publish Article'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AdminArticleForm;
