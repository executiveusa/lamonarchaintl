
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguageStore } from '@/services/articleService';
import { Calendar, ArrowRight } from 'lucide-react';

interface ArticleSectionProps {
  articles: any[];
  isLoading: boolean;
}

const ArticleSection: React.FC<ArticleSectionProps> = ({ articles, isLoading }) => {
  const { language } = useLanguageStore();
  const isEn = language === 'en';

  const featured = articles.find(a => a.featured) || articles[0];
  const rest = articles.filter(a => a !== featured).slice(0, 8);

  if (isLoading) {
    return (
      <section id="noticias" className="py-16 bg-monarca-cream">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-8">
            <div className="h-8 bg-monarca-gray/20 rounded w-48 mb-2 animate-pulse" />
            <div className="h-4 bg-monarca-gray/20 rounded w-80 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-[420px] bg-white rounded-xl animate-pulse" />
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-white rounded-xl animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="noticias" className="py-16 bg-monarca-cream">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="inline-block bg-monarca-terracotta/10 text-monarca-terracotta text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
              {isEn ? 'Latest Stories' : 'Últimas Historias'}
            </span>
            <h2 className="font-display text-3xl font-bold text-monarca-black">
              {isEn ? 'From Mexico & the World' : 'De México y el Mundo'}
            </h2>
          </div>
          <Link to="/categoria/comunidad" className="hidden sm:flex items-center gap-1.5 text-monarca-terracotta hover:text-monarca-orange text-sm font-medium transition-colors">
            {isEn ? 'All stories' : 'Ver todo'}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-12 text-monarca-gray">
            {isEn ? 'No stories available right now.' : 'No hay historias disponibles ahora.'}
          </div>
        ) : (
          <>
            {/* Featured + sidebar layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Featured article */}
              {featured && (
                <div className="lg:col-span-2 group bg-white rounded-xl overflow-hidden border border-black/5 hover:shadow-md transition-shadow">
                  <div className="relative h-[260px] md:h-[320px] overflow-hidden">
                    <img
                      src={featured.image_url}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-monarca-terracotta text-white text-xs font-bold uppercase px-2.5 py-1 rounded">
                        {isEn ? '★ Featured' : '★ Destacado'}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="text-white/70 text-xs uppercase tracking-wider font-medium">{featured.category}</span>
                      <h3 className="text-white font-display text-xl md:text-2xl font-bold mt-1 leading-tight">
                        {featured.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-monarca-gray text-sm leading-relaxed line-clamp-2 mb-3">
                      {featured.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-monarca-gray text-xs">
                        <Calendar className="h-3.5 w-3.5" />
                        {featured.date}
                      </div>
                      <span className="text-monarca-terracotta hover:text-monarca-orange text-sm font-medium flex items-center gap-1 cursor-pointer">
                        {isEn ? 'Read more' : 'Leer más'}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Sidebar articles */}
              <div className="space-y-3">
                {rest.slice(0, 4).map((article) => (
                  <div key={article.id} className="group bg-white rounded-xl overflow-hidden border border-black/5 flex hover:shadow-sm transition-shadow">
                    <div className="w-24 h-24 flex-shrink-0 overflow-hidden">
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3 flex-1 min-w-0">
                      <span className="text-monarca-terracotta text-xs font-bold uppercase tracking-wide">{article.category}</span>
                      <h4 className="text-monarca-black text-sm font-semibold line-clamp-2 mt-0.5 leading-tight group-hover:text-monarca-terracotta transition-colors">
                        {article.title}
                      </h4>
                      <div className="flex items-center gap-1 text-monarca-gray text-xs mt-1">
                        <Calendar className="h-3 w-3" />
                        {article.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Grid of remaining articles */}
            {rest.length > 4 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {rest.slice(4).map((article) => (
                  <div key={article.id} className="group bg-white rounded-xl overflow-hidden border border-black/5 hover:shadow-md transition-shadow">
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="bg-monarca-terracotta/90 text-white text-xs font-bold uppercase px-2 py-0.5 rounded">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="text-monarca-black text-sm font-semibold line-clamp-2 mb-2 group-hover:text-monarca-terracotta transition-colors leading-tight">
                        {article.title}
                      </h4>
                      <div className="flex items-center gap-1 text-monarca-gray text-xs">
                        <Calendar className="h-3 w-3" />
                        {article.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ArticleSection;
