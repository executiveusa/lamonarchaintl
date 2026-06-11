import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useLanguageStore } from '@/services/articleService';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Star, Users, Camera, Music, Palette, ChefHat, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    name: 'Valentina Reyes',
    role_en: 'Muralist & Visual Artist',
    role_es: 'Muralista y Artista Visual',
    desc_en: 'Her murals span the entire Malecón — stories of Pacific fishermen, indigenous women, and the sea itself told in vivid color.',
    desc_es: 'Sus murales abarcan todo el Malecón: historias de pescadores del Pacífico, mujeres indígenas y el mar mismo narradas en vívido color.',
    icon: Palette,
    color: 'text-monarca-terracotta',
    bg: 'bg-monarca-terracotta/10',
  },
  {
    name: 'Diego "El Tiburón" Morales',
    role_en: 'Surf Photographer & Community Builder',
    role_es: 'Fotógrafo de Surf y Constructor de Comunidad',
    desc_en: 'Diego turned his surf photography into a school for youth in Pitillal — teaching kids to see the beauty in their own environment.',
    desc_es: 'Diego convirtió su fotografía de surf en una escuela para jóvenes en Pitillal, enseñándoles a ver la belleza en su propio entorno.',
    icon: Camera,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    name: 'Sofía Ángeles Banda',
    role_en: 'Musician & Cultural Preservationist',
    role_es: 'Músico y Preservacionista Cultural',
    desc_en: 'Sofía blends traditional huichol melodies with contemporary production, keeping an ancient sound alive for a new generation.',
    desc_es: 'Sofía mezcla melodías tradicionales huicholas con producción contemporánea, manteniendo vivo un sonido ancestral para una nueva generación.',
    icon: Music,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
  {
    name: 'Chef Rodrigo Solís',
    role_en: 'Chef & Culinary Ambassador',
    role_es: 'Chef y Embajador Culinario',
    desc_en: 'Rodrigo left a Michelin-star kitchen in Barcelona to come home and cook the food his grandmother made — now the world lines up for it.',
    desc_es: 'Rodrigo dejó una cocina con estrella Michelin en Barcelona para regresar a casa y cocinar lo que hacía su abuela. Ahora el mundo hace fila para probarlo.',
    icon: ChefHat,
    color: 'text-monarca-amber',
    bg: 'bg-monarca-amber/10',
  },
  {
    name: 'La Colmena Collective',
    role_en: '10-Artist Youth Mural Collective',
    role_es: 'Colectivo de Muralismo Juvenil de 10 Artistas',
    desc_en: 'Ten artists between 16 and 24 years old who are repainting Puerto Vallarta\'s colonias one wall at a time.',
    desc_es: 'Diez artistas de entre 16 y 24 años que están repintando las colonias de Puerto Vallarta, una pared a la vez.',
    icon: Users,
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
];

const PrimeraEdicion: React.FC = () => {
  const { language } = useLanguageStore();
  const isEn = language === 'en';

  return (
    <div className="min-h-screen bg-monarca-cream">
      <Navigation />

      {/* Cover Hero */}
      <div className="relative bg-monarca-black text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-monarca-black/70 to-monarca-black" />

        <div className="relative container mx-auto px-6 py-20 max-w-5xl">
          {/* Magazine label */}
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-monarca-terracotta text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded">
              {isEn ? 'Vol. 1 · Issue 1' : 'Vol. 1 · Edición 1'}
            </span>
            <span className="text-white/60 text-sm flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {isEn ? 'September 2026' : 'Septiembre 2026'}
            </span>
            <span className="text-white/60 text-sm flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              Puerto Vallarta, Jalisco
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-black leading-none tracking-tight mb-4">
            La Monarca
            <br />
            <span className="text-monarca-amber">Internacional</span>
          </h1>

          <p className="text-white/80 text-xl md:text-2xl font-light max-w-2xl mb-3 leading-relaxed">
            {isEn
              ? '"The Pulse of Puerto Vallarta"'
              : '"El Pulso de Puerto Vallarta"'}
          </p>
          <p className="text-white/60 text-base max-w-xl mb-10">
            {isEn
              ? 'Our debut print edition — dropping in Puerto Vallarta this September 2026. Featuring the artists, chefs, musicians, and community builders who are writing the city\'s next chapter.'
              : 'Nuestra primera edición impresa — se distribuye en Puerto Vallarta este septiembre de 2026. Presenta a los artistas, chefs, músicos y constructores de comunidad que escriben el próximo capítulo de la ciudad.'}
          </p>

          <div className="flex flex-wrap gap-3">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-sm">
              <span className="text-monarca-amber font-bold text-lg block">~30</span>
              <span className="text-white/70">{isEn ? 'Pages per issue' : 'Páginas por edición'}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-sm">
              <span className="text-monarca-amber font-bold text-lg block">5+</span>
              <span className="text-white/70">{isEn ? 'Interviews' : 'Entrevistas'}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-sm">
              <span className="text-monarca-amber font-bold text-lg block">100%</span>
              <span className="text-white/70">{isEn ? 'Positive stories' : 'Historias positivas'}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-sm">
              <span className="text-monarca-amber font-bold text-lg block">EN / ES</span>
              <span className="text-white/70">{isEn ? 'Bilingual' : 'Bilingüe'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cover Preview */}
      <div className="bg-white border-b border-monarca-amber/20">
        <div className="container mx-auto px-6 py-12 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Cover design mockup */}
            <div className="relative">
              <div className="bg-monarca-black rounded-xl overflow-hidden shadow-2xl aspect-[3/4] flex flex-col">
                <div
                  className="flex-1 relative"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1551524164-687a55dd1126?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-monarca-black" />
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <div>
                      <div className="text-white font-display text-lg font-bold leading-none">La Monarca</div>
                      <div className="text-monarca-amber font-display text-lg font-bold leading-none">Internacional</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white/80 text-xs">Vol. 1 · Issue 1</div>
                      <div className="text-white/80 text-xs">Sept 2026</div>
                    </div>
                  </div>
                </div>
                <div className="bg-monarca-black p-4">
                  <div className="text-monarca-amber text-xs font-bold uppercase tracking-widest mb-1">
                    {isEn ? 'COVER STORY' : 'HISTORIA DE PORTADA'}
                  </div>
                  <div className="text-white font-display text-base font-bold leading-tight mb-2">
                    {isEn ? 'Puerto Vallarta\'s Creative Revolution' : 'La Revolución Creativa de Puerto Vallarta'}
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {['Art', 'Music', 'Food', 'Community'].map(tag => (
                      <span key={tag} className="text-white/50 text-xs border border-white/20 rounded px-1.5 py-0.5">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 bg-monarca-terracotta text-white text-xs font-bold px-3 py-2 rounded-lg shadow-lg">
                {isEn ? 'Sept 2026' : 'Sept 2026'}
              </div>
            </div>

            <div>
              <span className="inline-block bg-monarca-amber/20 text-monarca-terracotta text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                {isEn ? 'First Print Edition' : 'Primera Edición Impresa'}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-monarca-black mb-4 leading-tight">
                {isEn
                  ? 'Puerto Vallarta Is the Story'
                  : 'Puerto Vallarta Es la Historia'}
              </h2>
              <p className="text-monarca-gray mb-4">
                {isEn
                  ? 'Our debut issue is dedicated entirely to Puerto Vallarta — a city exploding with creative energy. We\'ve spent months embedded in the community, listening to the people doing remarkable things.'
                  : 'Nuestra primera edición está dedicada íntegramente a Puerto Vallarta, una ciudad que explota de energía creativa. Hemos pasado meses inmersos en la comunidad, escuchando a las personas que hacen cosas extraordinarias.'}
              </p>
              <p className="text-monarca-gray mb-6">
                {isEn
                  ? 'The physical magazine will be distributed free of charge throughout Puerto Vallarta in September 2026 — at galleries, restaurants, surf shops, community centers, and wherever people gather.'
                  : 'La revista física se distribuirá de forma gratuita en todo Puerto Vallarta en septiembre de 2026, en galerías, restaurantes, tiendas de surf, centros comunitarios y dondequiera que se reúna la gente.'}
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link to="/suscribirse">
                  <Button className="bg-monarca-terracotta hover:bg-monarca-orange text-white">
                    {isEn ? 'Get the Digital Edition' : 'Obtener la Edición Digital'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/trabaja-con-nosotros">
                  <Button variant="outline" className="border-monarca-terracotta text-monarca-terracotta hover:bg-monarca-terracotta/5">
                    {isEn ? 'Feature Your Story' : 'Presenta Tu Historia'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured People */}
      <div className="container mx-auto px-6 py-16 max-w-5xl">
        <div className="text-center mb-10">
          <span className="inline-block bg-monarca-amber/20 text-monarca-terracotta text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">
            {isEn ? 'In This Issue' : 'En Esta Edición'}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-monarca-black mb-3">
            {isEn ? 'People Doing the Work' : 'Las Personas Haciendo el Trabajo'}
          </h2>
          <p className="text-monarca-gray max-w-2xl mx-auto">
            {isEn
              ? 'Every person featured in Issue 1 is someone who woke up and decided to make Puerto Vallarta better. Their stories are the heart of this magazine.'
              : 'Cada persona destacada en la Edición 1 es alguien que se levantó y decidió hacer mejor Puerto Vallarta. Sus historias son el corazón de esta revista.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((person, i) => {
            const Icon = person.icon;
            return (
              <div key={i} className="bg-white rounded-xl border border-black/5 p-6 hover:shadow-md transition-shadow">
                <div className={`inline-flex p-2.5 rounded-lg ${person.bg} mb-4`}>
                  <Icon className={`h-5 w-5 ${person.color}`} />
                </div>
                <h3 className="font-bold text-monarca-black text-lg mb-0.5">{person.name}</h3>
                <p className={`text-sm font-medium mb-3 ${person.color}`}>
                  {isEn ? person.role_en : person.role_es}
                </p>
                <p className="text-monarca-gray text-sm leading-relaxed">
                  {isEn ? person.desc_en : person.desc_es}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* What's inside */}
      <div className="bg-monarca-black text-white">
        <div className="container mx-auto px-6 py-16 max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold mb-3">
              {isEn ? 'Inside the Issue' : 'Dentro de la Edición'}
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              {isEn
                ? '~30 pages of stories, photos, and interviews — zero negativity, all heart'
                : '~30 páginas de historias, fotos y entrevistas: cero negatividad, todo corazón'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { en: 'Cover Story', es: 'Historia de Portada', detail_en: '4 pages on PV\'s creative scene', detail_es: '4 páginas sobre la escena creativa de PV', num: '1' },
              { en: 'Interviews', es: 'Entrevistas', detail_en: '5 in-depth sit-downs with local icons', detail_es: '5 conversaciones profundas con íconos locales', num: '2' },
              { en: 'Photo Essays', es: 'Ensayos Fotográficos', detail_en: 'Visual stories from the streets', detail_es: 'Historias visuales desde las calles', num: '3' },
              { en: 'Community Spotlight', es: 'Luz sobre la Comunidad', detail_en: 'Organizations changing lives in PV', detail_es: 'Organizaciones cambiando vidas en PV', num: '4' },
              { en: 'Food & Culture', es: 'Comida y Cultura', detail_en: 'The flavors defining Puerto Vallarta today', detail_es: 'Los sabores que definen Puerto Vallarta hoy', num: '5' },
              { en: 'Youth Section', es: 'Sección Juvenil', detail_en: 'Stories by and for young people', detail_es: 'Historias para y por jóvenes', num: '6' },
              { en: 'Business Directory', es: 'Directorio Comercial', detail_en: 'Local businesses worth supporting', detail_es: 'Negocios locales que merece la pena apoyar', num: '7' },
              { en: 'Work With Kupari', es: 'Trabaja con Kupari', detail_en: 'How to get featured in Issue 2', detail_es: 'Cómo aparecer en la Edición 2', num: '8' },
            ].map((section, i) => (
              <div key={i} className="border border-white/10 rounded-lg p-4">
                <div className="text-monarca-amber font-black text-2xl mb-1">{section.num}</div>
                <div className="text-white font-semibold mb-1">{isEn ? section.en : section.es}</div>
                <div className="text-white/50 text-xs">{isEn ? section.detail_en : section.detail_es}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-6 py-16 max-w-3xl text-center">
        <Star className="h-8 w-8 text-monarca-amber mx-auto mb-4" />
        <h2 className="font-display text-3xl font-bold text-monarca-black mb-4">
          {isEn ? 'Be Part of Issue 1' : 'Sé Parte de la Edición 1'}
        </h2>
        <p className="text-monarca-gray mb-8 max-w-xl mx-auto">
          {isEn
            ? 'Are you an artist, musician, chef, youth organizer, or community leader doing great work in Puerto Vallarta? We want to tell your story.'
            : '¿Eres artista, músico, chef, organizador juvenil o líder comunitario haciendo un gran trabajo en Puerto Vallarta? Queremos contar tu historia.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/trabaja-con-nosotros">
            <Button size="lg" className="bg-monarca-terracotta hover:bg-monarca-orange text-white">
              {isEn ? 'Submit Your Story' : 'Envía Tu Historia'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/suscribirse">
            <Button size="lg" variant="outline" className="border-monarca-terracotta text-monarca-terracotta">
              {isEn ? 'Subscribe to Digital' : 'Suscribirse al Digital'}
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrimeraEdicion;
