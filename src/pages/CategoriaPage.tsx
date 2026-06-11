import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useLanguageStore } from '@/services/articleService';
import { useParams, Link } from 'react-router-dom';
import { getMockArticles } from '@/utils/mockArticles';
import { ArrowLeft, Calendar } from 'lucide-react';

const categoryMeta: Record<string, { en: string; es: string; desc_en: string; desc_es: string; matchEn: string[]; matchEs: string[] }> = {
  comunidad: {
    en: 'Community',
    es: 'Comunidad',
    desc_en: 'Stories about people and organizations building stronger communities across Mexico.',
    desc_es: 'Historias sobre personas y organizaciones que construyen comunidades más fuertes en todo México.',
    matchEn: ['Community'],
    matchEs: ['Comunidad'],
  },
  arte: {
    en: 'Art & Culture',
    es: 'Arte y Cultura',
    desc_en: 'Art, culture, and creativity from Mexico and beyond.',
    desc_es: 'Arte, cultura y creatividad de México y más allá.',
    matchEn: ['Art & Culture', 'Art'],
    matchEs: ['Arte y Cultura', 'Arte'],
  },
  juventud: {
    en: 'Youth',
    es: 'Juventud',
    desc_en: 'Young people doing remarkable things. The future is already here.',
    desc_es: 'Jóvenes haciendo cosas extraordinarias. El futuro ya está aquí.',
    matchEn: ['Youth'],
    matchEs: ['Juventud'],
  },
  innovacion: {
    en: 'Innovation',
    es: 'Innovación',
    desc_en: 'Technology, startups, and ideas changing Latin America.',
    desc_es: 'Tecnología, startups e ideas que cambian América Latina.',
    matchEn: ['Innovation'],
    matchEs: ['Innovación'],
  },
  viajes: {
    en: 'Travel',
    es: 'Viajes',
    desc_en: 'Discover the beauty and culture of Mexico through travel.',
    desc_es: 'Descubre la belleza y cultura de México a través de los viajes.',
    matchEn: ['Travel'],
    matchEs: ['Viajes'],
  },
  entrevistas: {
    en: 'Interviews',
    es: 'Entrevistas',
    desc_en: 'In-depth conversations with people shaping Mexico\'s future.',
    desc_es: 'Conversaciones a fondo con personas que dan forma al futuro de México.',
    matchEn: ['Interviews'],
    matchEs: ['Entrevistas'],
  },
  negocios: {
    en: 'Business',
    es: 'Negocios',
    desc_en: 'Mexican businesses, entrepreneurs, and economic stories.',
    desc_es: 'Negocios mexicanos, emprendedores e historias económicas.',
    matchEn: ['Business'],
    matchEs: ['Negocios'],
  },
  musica: {
    en: 'Music',
    es: 'Música',
    desc_en: 'The sounds of Mexico — traditional, contemporary, and everything in between.',
    desc_es: 'Los sonidos de México: tradicional, contemporáneo y todo lo que hay entre medias.',
    matchEn: ['Music'],
    matchEs: ['Música'],
  },
};

const CategoriaPage: React.FC = () => {
  const { categoria } = useParams<{ categoria: string }>();
  const { language } = useLanguageStore();
  const isEn = language === 'en';
  const [articles, setArticles] = useState<any[]>([]);

  const meta = categoryMeta[categoria || ''];

  useEffect(() => {
    const all = getMockArticles(language);
    if (meta) {
      const matches = isEn ? meta.matchEn : meta.matchEs;
      setArticles(all.filter(a => matches.some(m => a.category?.toLowerCase().includes(m.toLowerCase()))));
    } else {
      setArticles(all);
    }
  }, [categoria, language]);

  const title = meta ? (isEn ? meta.en : meta.es) : (isEn ? 'All Topics' : 'Todos los Temas');
  const desc = meta ? (isEn ? meta.desc_en : meta.desc_es) : '';

  return (
    <div className="min-h-screen bg-monarca-cream">
      <Navigation />

      {/* Header */}
      <div className="bg-monarca-black text-white">
        <div className="container mx-auto px-6 py-12 max-w-5xl">
          <Link to="/" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            {isEn ? 'Back to Home' : 'Volver al Inicio'}
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-monarca-terracotta text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded">
              {isEn ? 'Category' : 'Categoría'}
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-black mb-3">{title}</h1>
          {desc && <p className="text-white/60 max-w-2xl">{desc}</p>}
        </div>
      </div>

      {/* Articles */}
      <div className="container mx-auto px-6 py-12 max-w-5xl">
        {articles.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-monarca-gray text-lg mb-4">
              {isEn ? 'No articles in this category yet.' : 'Aún no hay artículos en esta categoría.'}
            </p>
            <Link to="/" className="text-monarca-terracotta hover:text-monarca-orange font-medium">
              {isEn ? '← Back to Home' : '← Volver al Inicio'}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div key={article.id} className="bg-white rounded-xl overflow-hidden border border-black/5 hover:shadow-md transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-monarca-terracotta/90 text-white text-xs font-bold uppercase px-2 py-1 rounded">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-monarca-gray text-xs mb-2">
                    <Calendar className="h-3 w-3" />
                    {article.date}
                  </div>
                  <h3 className="font-bold text-monarca-black mb-2 leading-tight hover:text-monarca-terracotta transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-monarca-gray text-sm line-clamp-3 leading-relaxed">
                    {article.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CategoriaPage;
