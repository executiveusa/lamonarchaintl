import React, { useState } from 'react';
import { useLanguageStore } from '@/services/articleService';
import { Bot, Zap, Globe, Camera, Share2, Edit3, CheckCircle } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  role: { en: string; es: string };
  model: string;
  icon: React.ReactNode;
  color: string;
  tasks: { en: string; es: string }[];
  status: 'active' | 'idle' | 'working';
  schedule: string;
}

const AGENTS: Agent[] = [
  {
    id: 'chief-editor',
    name: 'Elena Vázquez',
    role: { en: 'Chief Editor', es: 'Editora en Jefe' },
    model: 'claude-opus-4-8',
    icon: <Edit3 className="w-5 h-5" />,
    color: '#D35400',
    tasks: {
      en: ['Curates top 5 daily stories', 'Assigns to section editors', 'Approves all content', 'Maintains brand voice'],
      es: ['Selecciona 5 historias diarias', 'Asigna a editores de sección', 'Aprueba todo el contenido', 'Mantiene la voz de la marca'],
    },
    status: 'active',
    schedule: 'Every day at 6:00 AM CDMX',
  },
  {
    id: 'community-editor',
    name: 'Sofía Reyes',
    role: { en: 'Community & Culture Editor', es: 'Editora de Comunidad y Cultura' },
    model: 'claude-sonnet-4-6',
    icon: <Globe className="w-5 h-5" />,
    color: '#E67E22',
    tasks: {
      en: ['Community spotlight articles', 'Barrio Santa María stories', 'Youth movement coverage', 'Bilingual translation'],
      es: ['Artículos de comunidad', 'Historias del Barrio Santa María', 'Cobertura de movimientos juveniles', 'Traducción bilingüe'],
    },
    status: 'working',
    schedule: 'Every day at 7:00 AM CDMX',
  },
  {
    id: 'arts-editor',
    name: 'Diego Morales',
    role: { en: 'Arts & Music Editor', es: 'Editor de Arte y Música' },
    model: 'claude-sonnet-4-6',
    icon: <Zap className="w-5 h-5" />,
    color: '#F39C12',
    tasks: {
      en: ['Emerging artist profiles', 'Album & exhibition reviews', 'Artist interview features', 'Cultural event previews'],
      es: ['Perfiles de artistas emergentes', 'Reseñas de álbumes y exposiciones', 'Entrevistas a artistas', 'Previas de eventos culturales'],
    },
    status: 'idle',
    schedule: 'Mon, Wed, Fri at 8:00 AM CDMX',
  },
  {
    id: 'travel-editor',
    name: 'Camila Torres',
    role: { en: 'Travel & Innovation Editor', es: 'Editora de Viajes e Innovación' },
    model: 'claude-haiku-4-5',
    icon: <Globe className="w-5 h-5" />,
    color: '#27AE60',
    tasks: {
      en: ['Mexican destination guides', 'LatAm tech & innovation', 'Entrepreneur features', 'Puerto Vallarta first-issue prep'],
      es: ['Guías de destinos mexicanos', 'Tech e innovación en LATAM', 'Perfiles de emprendedores', 'Preparación primera edición PV'],
    },
    status: 'active',
    schedule: 'Tue, Thu at 9:00 AM CDMX',
  },
  {
    id: 'photo-editor',
    name: 'Mateo Fuentes',
    role: { en: 'Visual Editor', es: 'Editor Visual' },
    model: 'claude-haiku-4-5',
    icon: <Camera className="w-5 h-5" />,
    color: '#8E44AD',
    tasks: {
      en: ['Sources & captions cover images', 'Verifies image rights', 'Social media variants', 'Brand visual consistency'],
      es: ['Busca imágenes de portada', 'Verifica derechos de imagen', 'Variantes para redes sociales', 'Consistencia visual de marca'],
    },
    status: 'working',
    schedule: 'Every day at 11:00 AM CDMX',
  },
  {
    id: 'social-manager',
    name: 'Luna García',
    role: { en: 'Social Media Manager', es: 'Gestora de Redes Sociales' },
    model: 'claude-haiku-4-5',
    icon: <Share2 className="w-5 h-5" />,
    color: '#2980B9',
    tasks: {
      en: ['Auto-posts via Postiz to IG/FB/X/Threads', 'Writes platform-optimized captions', 'Bilingual content in EN & ES', 'Weekly engagement reports'],
      es: ['Auto-publica vía Postiz en IG/FB/X/Threads', 'Escribe descripciones optimizadas', 'Contenido bilingüe EN y ES', 'Reportes semanales de engagement'],
    },
    status: 'active',
    schedule: '10 AM · 3 PM · 7 PM CDMX daily',
  },
];

const StatusBadge: React.FC<{ status: Agent['status'] }> = ({ status }) => {
  const map = {
    active: { label: 'Active', color: 'bg-green-500', pulse: true },
    working: { label: 'Writing…', color: 'bg-monarca-amber', pulse: true },
    idle: { label: 'Idle', color: 'bg-white/30', pulse: false },
  };
  const s = map[status];
  return (
    <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/80">
      <span className={`w-1.5 h-1.5 rounded-full ${s.color} ${s.pulse ? 'animate-pulse' : ''}`} />
      {s.label}
    </span>
  );
};

const EditorialTeamSection: React.FC = () => {
  const { language } = useLanguageStore();
  const isEn = language === 'en';
  const [activeAgent, setActiveAgent] = useState<string | null>(null);

  return (
    <section className="bg-monarca-black text-white py-20 px-6">
      <div className="container mx-auto max-w-6xl">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 bg-monarca-terracotta/20 border border-monarca-terracotta/40 text-monarca-amber text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
                <Bot className="w-3 h-3" />
                {isEn ? 'Powered by Paperclip AI' : 'Impulsado por Paperclip AI'}
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
              {isEn ? 'The Editorial Team' : 'El Equipo Editorial'}
            </h2>
            <p className="text-white/60 mt-3 max-w-lg text-sm leading-relaxed">
              {isEn
                ? 'Six AI editorial agents orchestrated by Paperclip publish La Monarca Internacional around the clock — from story curation to social media distribution.'
                : 'Seis agentes editoriales de IA orquestados por Paperclip publican La Monarca Internacional las 24 horas — desde la selección de historias hasta la distribución en redes sociales.'}
            </p>
          </div>
          <div className="flex-shrink-0 flex flex-col gap-1 text-right">
            <div className="flex items-center justify-end gap-2 text-xs text-white/50">
              <CheckCircle className="w-3.5 h-3.5 text-green-400" />
              <span>{isEn ? 'All systems operational' : 'Todos los sistemas operativos'}</span>
            </div>
            <span className="text-white/30 text-xs">
              {isEn ? 'Last run: today 6:03 AM CDMX' : 'Última ejecución: hoy 6:03 AM CDMX'}
            </span>
          </div>
        </div>

        {/* Agent grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {AGENTS.map((agent) => (
            <button
              key={agent.id}
              onClick={() => setActiveAgent(activeAgent === agent.id ? null : agent.id)}
              className={`text-left rounded-2xl border transition-all duration-300 overflow-hidden group ${
                activeAgent === agent.id
                  ? 'border-monarca-amber bg-white/5 scale-[1.01]'
                  : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]'
              }`}
            >
              {/* Card top bar with agent color */}
              <div className="h-1 w-full" style={{ backgroundColor: agent.color }} />

              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${agent.color}25` }}
                  >
                    <span style={{ color: agent.color }}>{agent.icon}</span>
                  </div>
                  <StatusBadge status={agent.status} />
                </div>

                <div className="mb-1">
                  <h3 className="font-display text-lg font-bold text-white">{agent.name}</h3>
                  <p className="text-xs font-medium" style={{ color: agent.color }}>
                    {isEn ? agent.role.en : agent.role.es}
                  </p>
                </div>

                <p className="text-white/30 text-[10px] font-mono mb-3">{agent.model}</p>

                {/* Expandable tasks */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    activeAgent === agent.id ? 'max-h-48' : 'max-h-0'
                  }`}
                >
                  <ul className="space-y-1.5 pt-2 border-t border-white/10">
                    {(isEn ? agent.tasks.en : agent.tasks.es).map((task, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-white/60">
                        <span className="w-1 h-1 rounded-full bg-monarca-amber mt-1.5 flex-shrink-0" />
                        {task}
                      </li>
                    ))}
                    <li className="pt-2 text-[10px] text-white/30 font-mono">
                      ⏰ {agent.schedule}
                    </li>
                  </ul>
                </div>

                {activeAgent !== agent.id && (
                  <p className="text-white/30 text-[10px] mt-2">
                    {isEn ? 'Click to view tasks →' : 'Clic para ver tareas →'}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Pipeline diagram */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-6">
            {isEn ? 'Daily Edition Pipeline' : 'Pipeline de la Edición Diaria'}
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            {[
              { label: isEn ? 'Story Curation' : 'Selección', agent: 'Elena', time: '6:00 AM' },
              { label: isEn ? 'Writing' : 'Redacción', agent: 'Sofía · Diego · Camila', time: '7–9 AM' },
              { label: isEn ? 'Visuals' : 'Imágenes', agent: 'Mateo', time: '11:00 AM' },
              { label: isEn ? 'Approval' : 'Aprobación', agent: 'Elena', time: '12:00 PM' },
              { label: isEn ? 'Publish' : 'Publicación', agent: isEn ? 'Auto' : 'Auto', time: '12:05 PM' },
              { label: isEn ? 'Social Posts' : 'Redes Sociales', agent: 'Luna via Postiz', time: '10 AM · 3 PM · 7 PM' },
            ].map((step, i, arr) => (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center text-center min-w-[90px]">
                  <div className="w-8 h-8 rounded-full bg-monarca-terracotta/20 border border-monarca-terracotta/40 flex items-center justify-center text-monarca-amber font-bold text-sm mb-1">
                    {i + 1}
                  </div>
                  <span className="text-white/80 text-xs font-medium">{step.label}</span>
                  <span className="text-white/30 text-[10px]">{step.agent}</span>
                  <span className="text-monarca-amber text-[10px] font-mono">{step.time}</span>
                </div>
                {i < arr.length - 1 && (
                  <div className="flex-1 min-w-[20px] h-px bg-white/10 hidden sm:block" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default EditorialTeamSection;
