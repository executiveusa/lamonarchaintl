
import { supabase } from "../integrations/supabase/client";
import axios from 'axios';
import { toast } from 'sonner';
import { create } from 'zustand';

export interface Article {
  id?: string;
  title: string;
  content: string;
  summary?: string;
  image_url?: string;
  category: string;
  created_at?: string; // Changed from Date to string to match Supabase
  updated_at?: string; // Changed from Date to string to match Supabase
  author?: string;
  language?: string; // Add language field
  original_article_id?: string; // Reference to original article
}

// Language store to manage the current language
interface LanguageState {
  language: string;
  setLanguage: (language: string) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: localStorage.getItem('preferredLanguage') || 'en',
  setLanguage: (language: string) => {
    localStorage.setItem('preferredLanguage', language);
    set({ language });
  },
}));

export const fetchArticles = async (language = 'en') => {
  try {
    let query = supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });
    
    // Filter by language if provided
    if (language) {
      query = query.eq('language', language);
    }
    
    const { data, error } = await query;

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    toast.error('Failed to fetch articles');
    throw error;
  }
};

export const fetchArticleById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching article:', error);
    toast.error('Failed to fetch article');
    throw error;
  }
};

export const createArticle = async (article: Article) => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .insert([article])
      .select();

    if (error) throw error;
    
    toast.success('Article created successfully');
    return data[0];
  } catch (error) {
    console.error('Error creating article:', error);
    toast.error('Failed to create article');
    throw error;
  }
};

export const updateArticle = async (id: string, article: Partial<Article>) => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .update(article)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    toast.success('Article updated successfully');
    return data;
  } catch (error) {
    console.error('Error updating article:', error);
    toast.error('Failed to update article');
    throw error;
  }
};

export const deleteArticle = async (id: string) => {
  try {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);

    if (error) throw error;
    
    toast.success('Article deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting article:', error);
    toast.error('Failed to delete article');
    throw error;
  }
};

export const translateContent = async (text: string, targetLang: string) => {
  try {
    const deeplApiKey = import.meta.env.VITE_DEEPL_API_KEY;
    if (!deeplApiKey) {
      throw new Error('DeepL API key not found');
    }

    const response = await axios.post('https://api-free.deepl.com/v2/translate', null, {
      params: {
        auth_key: deeplApiKey,
        text,
        target_lang: targetLang,
      },
    });

    return response.data.translations[0].text;
  } catch (error) {
    console.error('Translation error:', error);
    toast.error('Translation failed');
    throw error;
  }
};

export const triggerMakeWebhook = async (articleId: string) => {
  try {
    const webhookUrl = import.meta.env.VITE_MAKE_WEBHOOK_URL;
    if (!webhookUrl) {
      throw new Error('Make.com webhook URL not found');
    }

    await axios.post(webhookUrl, {
      message: 'New article published successfully',
      articleId,
      timestamp: new Date().toISOString(),
    });

    toast.success('Make.com webhook triggered successfully');
  } catch (error) {
    console.error('Error triggering Make.com webhook:', error);
    toast.error('Failed to trigger Make.com webhook');
    throw error;
  }
};

export const publishMultilingualArticle = async (article: Article, languages: string[]) => {
  try {
    // Create the original article first
    const originalArticle = await createArticle({
      ...article,
      language: 'en', // Set language for original article
    });
    
    if (!originalArticle || !originalArticle.id) {
      throw new Error('Failed to create original article');
    }
    
    // For each language, translate and create a new article
    const translationPromises = languages.map(async (langCode) => {
      const translatedTitle = await translateContent(article.title, langCode);
      const translatedContent = await translateContent(article.content, langCode);
      let translatedSummary = article.summary;
      
      if (article.summary) {
        translatedSummary = await translateContent(article.summary, langCode);
      }
      
      // Create translated article with reference to original
      return createArticle({
        title: translatedTitle,
        content: translatedContent,
        summary: translatedSummary,
        image_url: article.image_url,
        category: article.category,
        author: article.author,
        language: langCode,
        original_article_id: originalArticle.id
      });
    });
    
    // Wait for all translations to complete
    await Promise.all(translationPromises);
    
    // Trigger Make.com webhook with the original article ID
    await triggerMakeWebhook(originalArticle.id);
    
    toast.success('Article published in multiple languages');
    return originalArticle;
  } catch (error) {
    console.error('Error in publishMultilingualArticle:', error);
    toast.error('Failed to publish multilingual article');
    throw error;
  }
};

// Function to fetch article translations
export const fetchArticleTranslations = async (originalArticleId: string) => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('original_article_id', originalArticleId);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching article translations:', error);
    toast.error('Failed to fetch article translations');
    throw error;
  }
};
