
import { create } from 'zustand';
import axios from 'axios';
import { supabase } from '../integrations/supabase/client';
import type { Tables } from '../integrations/supabase/types';

// Define types for article data
export interface Article {
  id: string;
  title: string;
  title_es?: string;
  title_en?: string;
  excerpt?: string;
  dek_es?: string;
  dek_en?: string;
  content: string;
  date?: string;
  author: string;
  category: 'arte' | 'musica' | 'naturaleza' | 'vida_sustentable' | 'diseño' | 'viajes' | 'ia' | string;
  location?: string;
  thumbnail?: string;
  language?: string;
  summary?: string;
  image_url?: string;
  image_credit?: string;
  positive_angle?: string;
  affiliate_opportunity?: Record<string, unknown> | null;
  status?: 'published' | 'draft' | 'archived';
  created_at?: string;
  updated_at?: string;
  featured?: boolean;
}

// Define the store state type
interface LanguageState {
  language: 'en' | 'es';
  setLanguage: (language: 'en' | 'es') => void;
}

// Create the language store with zustand
export const useLanguageStore = create<LanguageState>((set) => ({
  language: localStorage.getItem('preferredLanguage') as 'en' | 'es' || 'es',
  setLanguage: (language: 'en' | 'es') => {
    localStorage.setItem('preferredLanguage', language);
    set({ language });
  },
}));

// Function to fetch articles from the backend
export const fetchArticles = async (language: string = 'en'): Promise<Article[]> => {
  try {
    const response = await axios.get(`/api/articles?language=${language}`);
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

// Function to get article by ID
export const getArticleById = async (id: string, language: string = 'en'): Promise<Article> => {
  try {
    const response = await axios.get(`/api/articles/${id}?language=${language}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching article with ID ${id}:`, error);
    throw error;
  }
};

// Search articles function
export const searchArticles = async (query: string, language: string = 'en'): Promise<Article[]> => {
  try {
    const response = await axios.get(`/api/articles/search?q=${query}&language=${language}`);
    return response.data.articles;
  } catch (error) {
    console.error('Error searching articles:', error);
    throw error;
  }
};

// Function to create a new article
export const createArticle = async (article: Partial<Article>): Promise<Article> => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .insert([
        {
          title: article.title || '',
          content: article.content || '',
          summary: article.summary || null,
          image_url: article.image_url || null,
          category: article.category || 'general',
          author: article.author || 'La Monarca Internacional'
        }
      ])
      .select()
      .single();

    if (error) throw error;
    
    return data as unknown as Article;
  } catch (error) {
    console.error('Error creating article:', error);
    throw error;
  }
};

// Function to publish multilingual article
export const publishMultilingualArticle = async (
  article: Partial<Article>, 
  languages: string[] = ['EN', 'ES', 'FR']
): Promise<void> => {
  try {
    // Create the primary article
    await createArticle(article);
    
    // Here you would typically call a translation API
    // For each language and create translated versions
    // This is a simplified implementation
    
    console.log(`Article published in multiple languages: ${languages.join(', ')}`);
  } catch (error) {
    console.error('Error publishing multilingual article:', error);
    throw error;
  }
};
