
import React from 'react';
import { useLanguageStore } from '@/services/articleService';
import { Link } from 'react-router-dom';
import { Lightbulb, Cpu, Leaf, GraduationCap, ArrowRight } from 'lucide-react';

const innovations = [
  {
    icon: GraduationCap,
    title_en: 'AI for Education',
    title_es: 'IA para la Educación',
    desc_en: 'Mexican nonprofits are using AI to create personalized learning tools for students in underserved communities across 22 states.',
    desc_es: 'ONG mexicanas usan IA para crear herramientas de aprendizaje personalizadas para estudiantes en comunidades desatendidas en 22 estados.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Leaf,
    title_en: 'Clean Tech Startups',
    title_es: 'Startups de Tecnología Limpia',
    desc_en: 'Solar microgrids, water purification tech, and urban farming platforms are being built by Mexican founders for Mexican communities.',
    desc_es: 'Microrredes solares, tecnología de purificación de agua y plataformas de agricultura urbana están siendo construidas por fundadores mexicanos para comunidades mexicanas.',
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    icon: Cpu,
    title_en: 'Cultural Preservation Tech',
    title_es: 'Tecnología de Preservación Cultural',
    desc_en: 'Indigenous language apps, digital archiving of traditional music, and AR experiences at archaeological sites are being developed by UNAM and startups alike.',
    desc_es: 'Apps de lenguas indígenas, archivado digital de música tradicional y experiencias de RA en sitios arqueológicos son desarrollados por la UNAM y startups por igual.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
  {
    icon: Lightbulb,
    title_en: 'Youth Innovation Hubs',
    title_es: 'Centros de Innovación Juvenil',
    desc_en: 'From Monterrey to Oaxaca City, youth innovation centers are teaching teenagers to build apps, hardware, and social enterprises.',
    desc_es: 'Desde Monterrey hasta la Ciudad de Oaxaca, centros de innovación juvenil enseñan a adolescentes a crear apps, hardware y empresas sociales.',
    color: 'text-monarca-terracotta',
    bg: 'bg-monarca-terracotta/10',
  },
];

const AIInnovationSection: React.FC = () => {
  const { language } = useLanguageStore();
  const isEn = language === 'en';

  return (
    <section id="innovation" className="py-16 bg-monarca-cream">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="inline-block bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
              {isEn ? 'Innovation' : 'Innovación'}
            </span>
            <h2 className="font-display text-3xl font-bold text-monarca-black">
              {isEn ? 'Mexico Building the Future' : 'México Construyendo el Futuro'}
            </h2>
          </div>
          <Link to="/categoria/innovacion" className="hidden sm:flex items-center gap-1.5 text-monarca-terracotta hover:text-monarca-orange text-sm font-medium transition-colors">
            {isEn ? 'All innovation stories' : 'Todas las historias de innovación'}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Main feature */}
          <div className="lg:col-span-3 bg-monarca-black text-white rounded-xl overflow-hidden">
            <div
              className="h-52 bg-cover bg-center"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80)' }}
            />
            <div className="p-6">
              <span className="text-monarca-amber text-xs font-bold uppercase tracking-widest">
                {isEn ? 'Special Report' : 'Reportaje Especial'}
              </span>
              <h3 className="font-display text-2xl font-bold mt-1 mb-3">
                {isEn
                  ? 'How Mexican Startups Are Solving LATAM\'s Toughest Problems'
                  : 'Cómo las Startups Mexicanas Resuelven los Problemas Más Difíciles de LATAM'}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                {isEn
                  ? 'A new generation of founders is looking at the challenges unique to Mexico and Latin America — and building technology solutions designed specifically for their communities.'
                  : 'Una nueva generación de fundadores observa los desafíos únicos de México y América Latina y construye soluciones tecnológicas diseñadas específicamente para sus comunidades.'}
              </p>
              <Link to="/categoria/innovacion" className="flex items-center gap-2 text-monarca-amber hover:text-white text-sm font-medium transition-colors">
                {isEn ? 'Read the story' : 'Leer el reportaje'}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Innovation cards */}
          <div className="lg:col-span-2 space-y-4">
            {innovations.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-white rounded-xl p-4 border border-black/5 flex gap-3 hover:shadow-sm transition-shadow">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${item.bg}`}>
                    <Icon className={`h-5 w-5 ${item.color}`} />
                  </div>
                  <div>
                    <h4 className="font-bold text-monarca-black text-sm mb-1">
                      {isEn ? item.title_en : item.title_es}
                    </h4>
                    <p className="text-monarca-gray text-xs leading-relaxed line-clamp-3">
                      {isEn ? item.desc_en : item.desc_es}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIInnovationSection;
