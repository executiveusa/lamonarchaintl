import axios from 'axios';

const POSTIZ_BASE_URL = import.meta.env.VITE_POSTIZ_BASE_URL || 'https://app.postiz.com';
const POSTIZ_API_KEY = import.meta.env.VITE_POSTIZ_API_KEY || '';

interface PostizPost {
  content: string;
  platforms: string[];
  scheduledAt?: string;
  media?: string[];
  tags?: string[];
}

interface PostizScheduleResult {
  id: string;
  status: 'scheduled' | 'draft' | 'published';
  scheduledAt: string;
  platforms: string[];
}

const postizApi = axios.create({
  baseURL: `${POSTIZ_BASE_URL}/api/v1`,
  headers: {
    Authorization: `Bearer ${POSTIZ_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export async function scheduleArticlePost(
  article: {
    title: string;
    summary: string;
    url: string;
    imageUrl?: string;
    category: string;
    language: 'es' | 'en';
  },
  platforms: string[] = ['instagram', 'facebook', 'x', 'threads'],
  scheduledAt?: Date
): Promise<PostizScheduleResult | null> {
  if (!POSTIZ_API_KEY) {
    console.warn('[Postiz] No API key configured. Set VITE_POSTIZ_API_KEY to enable auto-publishing.');
    return null;
  }

  const hashtags = buildHashtags(article.category, article.language);
  const caption = buildCaption(article, hashtags);
  const scheduleTime = scheduledAt || getNextSlot();

  try {
    const payload: PostizPost = {
      content: caption,
      platforms,
      scheduledAt: scheduleTime.toISOString(),
      ...(article.imageUrl ? { media: [article.imageUrl] } : {}),
    };

    const { data } = await postizApi.post('/posts', payload);
    return data as PostizScheduleResult;
  } catch (err) {
    console.error('[Postiz] Failed to schedule post:', err);
    return null;
  }
}

export async function getScheduledPosts(limit = 10): Promise<PostizScheduleResult[]> {
  if (!POSTIZ_API_KEY) return getMockScheduledPosts();
  try {
    const { data } = await postizApi.get('/posts', { params: { limit, status: 'scheduled' } });
    return data?.posts ?? [];
  } catch {
    return getMockScheduledPosts();
  }
}

export async function getPublishedPosts(limit = 6): Promise<PostizScheduleResult[]> {
  if (!POSTIZ_API_KEY) return getMockPublishedPosts();
  try {
    const { data } = await postizApi.get('/posts', { params: { limit, status: 'published' } });
    return data?.posts ?? [];
  } catch {
    return getMockPublishedPosts();
  }
}

function buildCaption(
  article: { title: string; summary: string; url: string; language: 'es' | 'en' },
  hashtags: string
): string {
  const cta = article.language === 'es'
    ? `Lee más en el enlace de nuestra bio 🦋\n\n${hashtags}`
    : `Full story at the link in our bio 🦋\n\n${hashtags}`;

  return `${article.title}\n\n${article.summary}\n\n${cta}`;
}

function buildHashtags(category: string, language: 'es' | 'en'): string {
  const brandTags = '#LaMonarcaInternacional #KupariMedia #México #LatinAmerica';
  const categoryMap: Record<string, string> = {
    comunidad: '#Comunidad #Community #MexicoCity #CDMX',
    arte: '#Arte #ArteMexicano #Cultura #MexicanArt',
    musica: '#Música #MúsicaMexicana #ArtistasLatinos',
    juventud: '#Juventud #Jóvenes #YouthVoices #GenZ',
    viajes: '#Viajes #Travel #VisitMexico #Turismo',
    innovacion: '#Innovación #TechLatam #Emprendedores #Innovation',
    entrevistas: '#Entrevistas #Interviews #Historias',
    negocios: '#Negocios #Business #EmpresasMexicanas',
  };
  return `${brandTags} ${categoryMap[category] || '#MexicoCity'}`;
}

function getNextSlot(): Date {
  const now = new Date();
  const slots = [10, 15, 19];
  const cdmxOffset = -6;
  const cdmxHour = (now.getUTCHours() + cdmxOffset + 24) % 24;
  const nextSlotHour = slots.find((h) => h > cdmxHour) ?? slots[0];
  const next = new Date(now);
  if (nextSlotHour <= cdmxHour) next.setDate(next.getDate() + 1);
  next.setUTCHours(nextSlotHour - cdmxOffset, 0, 0, 0);
  return next;
}

function getMockScheduledPosts(): PostizScheduleResult[] {
  return [
    { id: 'mock-1', status: 'scheduled', scheduledAt: getNextSlot().toISOString(), platforms: ['instagram', 'facebook'] },
    { id: 'mock-2', status: 'scheduled', scheduledAt: new Date(Date.now() + 3600000 * 5).toISOString(), platforms: ['x', 'threads'] },
  ];
}

function getMockPublishedPosts(): PostizScheduleResult[] {
  return [
    { id: 'pub-1', status: 'published', scheduledAt: new Date(Date.now() - 3600000 * 2).toISOString(), platforms: ['instagram', 'facebook', 'x'] },
    { id: 'pub-2', status: 'published', scheduledAt: new Date(Date.now() - 3600000 * 6).toISOString(), platforms: ['threads', 'bluesky'] },
  ];
}

export const POSTIZ_PLATFORMS = [
  { id: 'instagram', label: 'Instagram', icon: '📸' },
  { id: 'facebook', label: 'Facebook', icon: '👥' },
  { id: 'x', label: 'X / Twitter', icon: '✕' },
  { id: 'threads', label: 'Threads', icon: '🧵' },
  { id: 'bluesky', label: 'Bluesky', icon: '🦋' },
  { id: 'linkedin', label: 'LinkedIn', icon: '💼' },
];
