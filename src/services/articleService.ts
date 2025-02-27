
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import { toast } from 'sonner';

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

interface Article {
  section: string;
  title: string;
  content: string;
  published_at?: Date;
  language?: string;
}

export const generateAndPostArticle = async (article: Article) => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .insert([{
        ...article,
        published_at: new Date(),
      }]);

    if (error) throw error;

    toast.success('Article posted successfully');
    return data;
  } catch (error) {
    console.error('Error posting article:', error);
    toast.error('Failed to post article');
    throw error;
  }
};

export const translateArticle = async (text: string, targetLang: string) => {
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

export const triggerMakeWebhook = async () => {
  try {
    const webhookUrl = import.meta.env.VITE_MAKE_WEBHOOK_URL;
    if (!webhookUrl) {
      throw new Error('Make.com webhook URL not found');
    }

    await axios.post(webhookUrl, {
      message: 'New articles posted successfully',
      timestamp: new Date().toISOString(),
    });

    toast.success('Make.com webhook triggered successfully');
  } catch (error) {
    console.error('Error triggering Make.com webhook:', error);
    toast.error('Failed to trigger Make.com webhook');
    throw error;
  }
};

export const postDailyArticles = async (article: Article) => {
  try {
    // Post original article
    await generateAndPostArticle(article);

    // Translate and post in other languages
    const languages = { 'EN': 'EN', 'FR': 'FR', 'PT': 'PT' };
    
    for (const [langCode, deeplLang] of Object.entries(languages)) {
      const translatedContent = await translateArticle(article.content, deeplLang);
      await generateAndPostArticle({
        ...article,
        title: `${article.title} (${langCode})`,
        content: translatedContent,
        language: langCode,
      });
    }

    // Trigger Make.com automation
    await triggerMakeWebhook();

    toast.success('All articles have been posted and translated successfully');
  } catch (error) {
    console.error('Error in postDailyArticles:', error);
    toast.error('Failed to complete article posting process');
    throw error;
  }
};
