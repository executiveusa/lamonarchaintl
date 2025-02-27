
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { createArticle, publishMultilingualArticle, Article } from '../services/articleService';
import { toast } from 'sonner';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !content || !category) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    try {
      setIsLoading(true);
      
      const article: Article = {
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

  const categories = [
    { value: 'ai', label: 'Artificial Intelligence' },
    { value: 'science', label: 'Science' },
    { value: 'culture', label: 'Culture' },
    { value: 'technology', label: 'Technology' },
    { value: 'general', label: 'General' }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create New Article</CardTitle>
        <CardDescription>
          Fill in the details to create a new article for La Monarca Internacional
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter article title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Brief summary of the article"
              rows={2}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter article content"
              rows={10}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select 
                value={category} 
                onValueChange={setCategory}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter author name"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="multilingual"
              checked={isMultilingual}
              onChange={(e) => setIsMultilingual(e.target.checked)}
              className="rounded border-gray-300"
            />
            <Label htmlFor="multilingual" className="font-normal cursor-pointer">
              Publish in multiple languages
            </Label>
          </div>
          
          {isMultilingual && (
            <div className="p-3 bg-blue-50 rounded-md">
              <p className="text-sm font-medium mb-2">
                This article will be automatically translated to:
              </p>
              <div className="text-sm">
                {languages.map((lang) => (
                  <span 
                    key={lang} 
                    className="inline-block bg-blue-100 text-blue-800 rounded-full px-2 py-1 mr-2 mb-2"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}
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
