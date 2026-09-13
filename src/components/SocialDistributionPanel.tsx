import React, { useEffect, useState } from 'react';
import { useLanguageStore } from '@/services/articleService';
import { getScheduledPosts, POSTIZ_PLATFORMS } from '@/services/postizService';
import { Share2, Clock, CheckCircle, ExternalLink } from 'lucide-react';

const PLATFORM_ICONS: Record<string, string> = {
  instagram: '📸',
  facebook: '👥',
  x: '✕',
  threads: '🧵',
  bluesky: '🦋',
  linkedin: '💼',
};

const SAMPLE_QUEUE = [
  {
    id: 'q1',
    headline: { en: 'Community murals breathe new life into Tepito', es: 'Murales comunitarios renuevan el alma de Tepito' },
    platforms: ['instagram', 'facebook', 'threads'],
    scheduledAt: new Date(Date.now() + 1000 * 60 * 45).toISOString(),
    category: 'comunidad',
  },
  {
    id: 'q2',
    headline: { en: 'Rising star Valeria Cruz on her debut EP', es: 'La estrella emergente Valeria Cruz habla de su EP debut' },
    platforms: ['instagram', 'x', 'bluesky'],
    scheduledAt: new Date(Date.now() + 1000 * 60 * 150).toISOString(),
    category: 'musica',
  },
  {
    id: 'q3',
    headline: { en: 'Puerto Vallarta: 5 hidden gems for 2026', es: 'Puerto Vallarta: 5 joyas escondidas para 2026' },
    platforms: ['instagram', 'facebook', 'x', 'threads'],
    scheduledAt: new Date(Date.now() + 1000 * 60 * 330).toISOString(),
    category: 'viajes',
  },
];

function formatTimeUntil(isoDate: string): string {
  const diff = new Date(isoDate).getTime() - Date.now();
  const mins = Math.round(diff / 60000);
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  const rem = mins % 60;
  return rem > 0 ? `${hours}h ${rem}m` : `${hours}h`;
}

const SocialDistributionPanel: React.FC = () => {
  const { language } = useLanguageStore();
  const isEn = language === 'en';
  const [ticked, setTicked] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTicked((t) => t + 1), 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="bg-monarca-black/95 border-t border-white/5 py-14 px-6">
      <div className="container mx-auto max-w-6xl">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Share2 className="w-4 h-4 text-monarca-amber" />
              <span className="text-white/40 text-xs font-bold uppercase tracking-widest">
                {isEn ? 'Social Distribution · Powered by Postiz' : 'Distribución Social · Con Postiz'}
              </span>
            </div>
            <h2 className="font-display text-2xl font-bold text-white">
              {isEn ? 'Auto-Publishing Queue' : 'Cola de Publicación Automática'}
            </h2>
            <p className="text-white/40 text-sm mt-1">
              {isEn
                ? 'Luna García schedules posts automatically via Postiz across all platforms.'
                : 'Luna García programa publicaciones automáticamente vía Postiz en todas las plataformas.'}
            </p>
          </div>

          {/* Platform pills */}
          <div className="flex flex-wrap gap-2">
            {POSTIZ_PLATFORMS.map((p) => (
              <span
                key={p.id}
                className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs text-white/60"
              >
                <span>{p.icon}</span>
                {p.label}
              </span>
            ))}
          </div>
        </div>

        {/* Queue */}
        <div className="space-y-3">
          {SAMPLE_QUEUE.map((post) => (
            <div
              key={post.id}
              className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 hover:bg-white/[0.05] transition-colors"
            >
              {/* Time badge */}
              <div className="flex-shrink-0 flex items-center gap-2 w-24">
                <Clock className="w-3.5 h-3.5 text-monarca-amber" />
                <span className="text-monarca-amber text-sm font-mono font-bold">
                  {formatTimeUntil(post.scheduledAt)}
                </span>
              </div>

              {/* Headline */}
              <div className="flex-1 min-w-0">
                <p className="text-white/90 text-sm font-medium truncate">
                  {isEn ? post.headline.en : post.headline.es}
                </p>
                <span className="text-white/30 text-[10px] uppercase tracking-widest">{post.category}</span>
              </div>

              {/* Platform icons */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                {post.platforms.map((p) => (
                  <span
                    key={p}
                    className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[11px]"
                    title={p}
                  >
                    {PLATFORM_ICONS[p]}
                  </span>
                ))}
              </div>

              {/* Status */}
              <div className="flex-shrink-0">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  {isEn ? 'Scheduled' : 'Programado'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { label: isEn ? 'Posts Today' : 'Posts Hoy', value: '6' },
            { label: isEn ? 'Platforms' : 'Plataformas', value: '6' },
            { label: isEn ? 'Avg Reach' : 'Alcance Promedio', value: '3.2K' },
            { label: isEn ? 'Auto-Published This Week' : 'Auto-Publicados Esta Semana', value: '42' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center">
              <div className="font-display text-3xl font-black text-monarca-amber mb-1">{stat.value}</div>
              <div className="text-white/40 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Postiz link */}
        <div className="mt-6 text-center">
          <a
            href="https://postiz.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-white/30 hover:text-monarca-amber transition-colors"
          >
            <CheckCircle className="w-3 h-3" />
            {isEn ? 'Connected to Postiz · Open dashboard' : 'Conectado a Postiz · Abrir dashboard'}
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default SocialDistributionPanel;
