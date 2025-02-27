
import { create } from 'zustand';
import axios from 'axios';

// Define types for article data
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  thumbnail: string;
  language: string;
}

// Define the store state type
interface LanguageState {
  language: 'en' | 'es';
  setLanguage: (language: 'en' | 'es') => void;
}

// Create the language store with zustand
export const useLanguageStore = create<LanguageState>((set) => ({
  language: localStorage.getItem('preferredLanguage') as 'en' | 'es' || 'en',
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
