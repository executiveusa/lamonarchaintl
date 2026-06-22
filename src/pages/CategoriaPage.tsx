import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import RudyDiazFeature from '@/components/RudyDiazFeature';
import { useLanguageStore } from '@/services/articleService';
import { useParams, Link } from 'react-router-dom';
import { getMockArticles } from '@/utils/mockArticles';
import { ArrowLeft, Calendar } from 'lucide-react';

const categoryMeta: Record<string, { en: string; es: string; desc_en: string; desc_es: string; matchEn: string[]; matchEs: string[] }> = {
  arte: {
    en: 'Art',
    es: 'Arte',
    desc_en: 'Muralism, visual arts, painting, sculpture, and public art celebrating Mexican and Latin American culture.',
    desc_es: 'Muralismo, artes visuales, pintura, escultura y arte público que celebran la cultura mexicana y latinoamericana.',
    matchEn: ['Art & Culture', 'Art', 'arte'],
    matchEs: ['Arte y Cultura', 'Arte', 'arte'],
  },
  musica: {
    en: 'Music',
    es: 'Música',
    desc_en: 'The sounds of Mexico — independent artists, regional genres, and the global impact of Latin American music.',
    desc_es: 'Los sonidos de México: artistas independientes, géneros regionales y el impacto global de la música latinoamericana.',
    matchEn: ['Music', 'musica'],
    matchEs: ['Música', 'musica'],
  },
  naturaleza: {
    en: 'Nature',
    es: 'Naturaleza',
    desc_en: 'Conservation victories, biodiversity, national parks, wildlife, and community stewardship of Mexico\'s natural treasures.',
    desc_es: 'Victorias de conservación, biodiversidad, parques nacionales, vida silvestre y custodios comunitarios de los tesoros naturales de México.',
    matchEn: ['Nature', 'naturaleza'],
    matchEs: ['Naturaleza', 'naturaleza'],
  },
  'vida-sustentable': {
    en: 'Sustainable Living',
    es: 'Vida Sustentable',
    desc_en: 'Urban gardens, circular economy, regenerative agriculture, zero-waste communities, and sustainable innovation.',
    desc_es: 'Huertos urbanos, economía circular, agricultura regenerativa, comunidades cero residuos e innovación sustentable.',
    matchEn: ['Sustainable Living', 'vida_sustentable'],
    matchEs: ['Vida Sustentable', 'vida_sustentable'],
  },
  diseno: {
    en: 'Design',
    es: 'Diseño',
    desc_en: 'Mexican and Latin American design — graphic, textile, industrial, architectural, and fashion rooted in heritage.',
    desc_es: 'Diseño mexicano y latinoamericano — gráfico, textil, industrial, arquitectónico y de moda arraigado en el patrimonio.',
    matchEn: ['Design', 'diseño'],
    matchEs: ['Diseño', 'diseño'],
  },
  viajes: {
    en: 'Travel',
    es: 'Viajes',
    desc_en: 'Sustainable and cultural travel in Mexico and Latin America, destinations that give back to communities.',
    desc_es: 'Viajes sostenibles y culturales en México y Latinoamérica, destinos que devuelven a las comunidades.',
    matchEn: ['Travel', 'viajes'],
    matchEs: ['Viajes', 'viajes'],
  },
  ia: {
    en: 'AI & Innovation',
    es: 'IA e Innovación',
    desc_en: 'AI startups, clean tech, civic technology, and the intersection of tradition and innovation in Latin America.',
    desc_es: 'Startups de IA, tecnología limpia, tecnología cívica y la intersección de tradición e innovación en Latinoamérica.',
    matchEn: ['AI & Innovation', 'Innovation', 'ia'],
    matchEs: ['IA e Innovación', 'Innovación', 'ia'],
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

      {/* Featured Artist Section - Show only for Arte category */}
      {categoria === 'arte' && <RudyDiazFeature />}

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
