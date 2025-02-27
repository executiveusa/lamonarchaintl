
import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface ArticleFormFieldsProps {
  title: string;
  setTitle: (value: string) => void;
  content: string;
  setContent: (value: string) => void;
  summary: string;
  setSummary: (value: string) => void;
  imageUrl: string;
  setImageUrl: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  author: string;
  setAuthor: (value: string) => void;
  isMultilingual: boolean;
  setIsMultilingual: (value: boolean) => void;
  categories: Array<{ value: string; label: string }>;
}

const ArticleFormFields: React.FC<ArticleFormFieldsProps> = ({
  title,
  setTitle,
  content,
  setContent,
  summary,
  setSummary,
  imageUrl,
  setImageUrl,
  category,
  setCategory,
  author,
  setAuthor,
  isMultilingual,
  setIsMultilingual,
  categories,
}) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default ArticleFormFields;
