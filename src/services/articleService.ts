import { create } from 'zustand';
import { supabase } from '../integrations/supabase/client';

export interface Article {
  id: string;
  title: string;
  excerpt?: string;
  content: string;
  author: string;
  category: string;
  date?: string;
  thumbnail?: string;
  language?: string;
  summary?: string;
  image_url?: string;
  publication_status?: 'published' | 'draft' | 'archived';
  created_at?: string;
  updated_at?: string;
}

interface LanguageState {
  language: 'en' | 'es';
  setLanguage: (language: 'en' | 'es') => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: (localStorage.getItem('preferredLanguage') as 'en' | 'es') || 'es',
  setLanguage: (language: 'en' | 'es') => {
    localStorage.setItem('preferredLanguage', language);
    set({ language });
  },
}));

const mapArticle = (row: any): Article => ({
  id: row.id,
  title: row.title,
  content: row.content,
  summary: row.summary ?? undefined,
  excerpt: row.summary ?? undefined,
  image_url: row.image_url ?? undefined,
  thumbnail: row.image_url ?? undefined,
  category: row.category,
  author: row.author || 'La Monarca Internacional',
  publication_status: row.publication_status ?? 'published',
  created_at: row.created_at,
  updated_at: row.updated_at,
  date: row.created_at,
});

export const fetchArticles = async (_language: string = 'es'): Promise<Article[]> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('publication_status', 'published')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapArticle);
};

export const fetchAdminArticles = async (): Promise<Article[]> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapArticle);
};

export const getArticleById = async (id: string, _language: string = 'es'): Promise<Article> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .eq('publication_status', 'published')
    .single();

  if (error) throw error;
  return mapArticle(data);
};

export const searchArticles = async (query: string, language: string = 'es'): Promise<Article[]> => {
  const normalized = query.trim().toLocaleLowerCase();
  if (!normalized) return fetchArticles(language);

  const articles = await fetchArticles(language);
  return articles.filter((article) =>
    [article.title, article.content, article.summary]
      .filter(Boolean)
      .some((value) => String(value).toLocaleLowerCase().includes(normalized))
  );
};

export const createArticle = async (article: Partial<Article>): Promise<Article> => {
  const { data, error } = await supabase
    .from('articles')
    .insert([
      {
        title: article.title || '',
        content: article.content || '',
        summary: article.summary || null,
        image_url: article.image_url || null,
        category: article.category || 'general',
        author: article.author || 'La Monarca Internacional',
        publication_status: 'draft',
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return mapArticle(data);
};

export const publishMultilingualArticle = async (
  article: Partial<Article>,
  languages: string[] = ['ES', 'EN']
): Promise<void> => {
  await createArticle(article);
  console.info(`Draft article saved. Requested language workflow: ${languages.join(', ')}. Publish through the governed editorial workflow after review.`);
};
