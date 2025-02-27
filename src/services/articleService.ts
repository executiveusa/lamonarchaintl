
import { create } from 'zustand';
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';

// Article interface
export interface Article {
  id?: string;
  title: string;
  content: string;
  summary?: string;
  image_url?: string;
  category: string;
  created_at?: string;
  updated_at?: string;
  author?: string;
  language?: string;
  original_article_id?: string;
}

// Language store to manage the current language
interface LanguageState {
  language: string;
  setLanguage: (lang: string) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: localStorage.getItem('preferredLanguage') || 'en',
  setLanguage: (lang: string) => {
    localStorage.setItem('preferredLanguage', lang);
    set({ language: lang });
  },
}));

// Fetch articles from Supabase
export const fetchArticles = async (language = 'en'): Promise<Article[]> => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('language', language)
      .order('created_at', { ascending: false });
      
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};

// Create a new article
export const createArticle = async (article: Article): Promise<Article | null> => {
  try {
    // Set language to 'en' if not provided
    const articleWithLanguage = {
      ...article,
      language: article.language || 'en',
      created_at: article.created_at || new Date().toISOString(),
    };
    
    const { data, error } = await supabase
      .from('articles')
      .insert(articleWithLanguage)
      .select()
      .single();
      
    if (error) {
      throw error;
    }
    
    toast.success('Article created successfully');
    return data;
  } catch (error) {
    console.error('Error creating article:', error);
    toast.error('Failed to create article');
    return null;
  }
};

// Update an existing article
export const updateArticle = async (id: string, article: Partial<Article>): Promise<Article | null> => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .update({
        ...article,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      throw error;
    }
    
    toast.success('Article updated successfully');
    return data;
  } catch (error) {
    console.error('Error updating article:', error);
    toast.error('Failed to update article');
    return null;
  }
};

// Delete an article
export const deleteArticle = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);
      
    if (error) {
      throw error;
    }
    
    toast.success('Article deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting article:', error);
    toast.error('Failed to delete article');
    return false;
  }
};

// Get a single article by ID
export const getArticleById = async (id: string): Promise<Article | null> => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
};

// Publish article in multiple languages using translation API
export const publishMultilingualArticle = async (
  article: Article,
  languages: string[] = ['EN', 'ES', 'FR']
): Promise<boolean> => {
  try {
    // First, create the original article
    const originalArticle = await createArticle({
      ...article,
      language: 'en', // Default original language is English
    });
    
    if (!originalArticle || !originalArticle.id) {
      throw new Error('Failed to create original article');
    }
    
    // Mock translation process - in a real app this would call an external API
    const mockTranslate = (text: string, targetLang: string): string => {
      if (targetLang === 'EN') return text;
      
      // Just a simple mock that adds a language tag to the text
      if (targetLang === 'ES') return `[ES] ${text}`;
      if (targetLang === 'FR') return `[FR] ${text}`;
      
      return text;
    };
    
    // Create translated versions
    const translationPromises = languages
      .filter(lang => lang !== 'EN') // Skip English as it's the original
      .map(async (lang) => {
        const translatedTitle = mockTranslate(article.title, lang);
        const translatedContent = mockTranslate(article.content, lang);
        const translatedSummary = article.summary 
          ? mockTranslate(article.summary, lang) 
          : undefined;
        
        return createArticle({
          title: translatedTitle,
          content: translatedContent,
          summary: translatedSummary,
          image_url: article.image_url,
          category: article.category,
          author: article.author,
          language: lang.toLowerCase(),
          original_article_id: originalArticle.id,
        });
      });
    
    await Promise.all(translationPromises);
    toast.success('Article published in multiple languages');
    return true;
  } catch (error) {
    console.error('Error publishing multilingual article:', error);
    toast.error('Failed to publish in multiple languages');
    return false;
  }
};

// Export the function that was previously missing
export const postDailyArticles = async (article: Article): Promise<void> => {
  // This is just a wrapper around createArticle for backward compatibility
  await createArticle(article);
};
