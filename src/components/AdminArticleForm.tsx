
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { createArticle, publishMultilingualArticle, Article } from '../services/articleService';
import { toast } from 'sonner';
import ArticleFormFields, { ArticleFormValues } from './admin/ArticleFormFields';
import LanguageSelector from './admin/LanguageSelector';

interface AdminArticleFormProps {
  onSuccess?: () => void;
}

const AdminArticleForm: React.FC<AdminArticleFormProps> = ({ onSuccess }) => {
  const [formValues, setFormValues] = useState<ArticleFormValues>({
    title: '',
    content: '',
    summary: '',
    imageUrl: '',
    category: 'general',
    author: 'La Monarca Internacional',
    isMultilingual: false,
  });
  const [languages, setLanguages] = useState(['ES', 'EN', 'FR']);
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { value: 'ai', label: 'Artificial Intelligence' },
    { value: 'science', label: 'Science' },
    { value: 'culture', label: 'Culture' },
    { value: 'technology', label: 'Technology' },
    { value: 'general', label: 'General' }
  ];

  const handleFormValuesChange = (values: ArticleFormValues) => {
    setFormValues(values);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      
      const article: Partial<Article> = {
        title: formValues.title,
        content: formValues.content,
        summary: formValues.summary,
        image_url: formValues.imageUrl,
        category: formValues.category,
        author: formValues.author
      };
      
      if (formValues.isMultilingual) {
        await publishMultilingualArticle(article, languages);
      } else {
        await createArticle(article);
      }
      
      // Reset form
      setFormValues({
        title: '',
        content: '',
        summary: '',
        imageUrl: '',
        category: 'general',
        author: 'La Monarca Internacional',
        isMultilingual: false,
      });
      
      if (onSuccess) {
        onSuccess();
      }

      toast.success("Article published successfully!");
    } catch (error) {
      console.error('Error creating article:', error);
      toast.error("Failed to publish article");
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
            defaultValues={formValues}
            onValuesChange={handleFormValuesChange}
            categories={categories}
          />
          
          {formValues.isMultilingual && <LanguageSelector languages={languages} />}
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
