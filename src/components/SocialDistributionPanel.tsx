import React from 'react';
import { useLanguageStore } from '@/services/articleService';
import { POSTIZ_PLATFORMS } from '@/services/postizService';
import { Share2 } from 'lucide-react';

const SocialDistributionPanel: React.FC = () => {
  const { language } = useLanguageStore();
  const isEn = language === 'en';

  return (
    <section className="bg-monarca-black/95 border-t border-white/5 py-14 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <Share2 className="w-4 h-4 text-monarca-amber" />
              <span className="text-white/40 text-xs font-bold uppercase tracking-widest">
                {isEn ? 'Distribution workflow' : 'Flujo de distribución'}
              </span>
            </div>
            <h2 className="font-display text-2xl font-bold text-white">
              {isEn ? 'Social publishing infrastructure' : 'Infraestructura de publicación social'}
            </h2>
            <p className="text-white/50 text-sm mt-2 leading-relaxed">
              {isEn
                ? 'La Monarca is preparing a governed multi-platform distribution workflow. Live queue status and performance metrics are intentionally hidden here until the Postiz connection is verified in production.'
                : 'La Monarca está preparando un flujo gobernado de distribución multiplataforma. El estado de la cola y las métricas se ocultan aquí hasta verificar la conexión de Postiz en producción.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 md:max-w-sm md:justify-end">
            {POSTIZ_PLATFORMS.map((platform) => (
              <span
                key={platform.id}
                className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs text-white/60"
              >
                <span>{platform.icon}</span>
                {platform.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialDistributionPanel;
