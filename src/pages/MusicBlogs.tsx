
import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguageStore } from "@/services/articleService";
import { Link } from "react-router-dom";
import { Calendar, ArrowLeft, Music2, MapPin } from "lucide-react";

const blogPosts = [
  {
    id: 'sofia-angeles',
    title_en: 'Sofía Ángeles: Keeping the Huichol Song Alive',
    title_es: 'Sofía Ángeles: Manteniendo Vivo el Canto Huichol',
    date_en: 'June 8, 2026',
    date_es: '8 de junio, 2026',
    category_en: 'Puerto Vallarta · Issue 1 Feature',
    category_es: 'Puerto Vallarta · Artículo Edición 1',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    featured: true,
    content_en: [
      'Sofía Ángeles Banda grew up in the small community of San Andrés Cohamiata in Jalisco, where the Wixáritari (Huichol) people have maintained their sacred musical traditions for millennia. At 16, she left for Puerto Vallarta to study at the city\'s conservatory — but she brought every melody her grandmother ever sang with her.',
      '"When I play those chants through my synthesizer, I\'m not trying to modernize them," she told us, sitting in her studio in the Zona Romántica. "I\'m trying to make sure someone who\'s never heard them feels what I feel when I hear my grandmother\'s voice."',
      'Her debut EP, Tatewari (named for the Wixáritari fire deity), blends field recordings of actual ceremonial songs with minimal electronic production. The result is something both ancient and completely new. It reached #3 on Spotify Mexico\'s indie chart within two weeks of release.',
      'Sofía will be featured in our September 2026 print issue. If you\'re in Puerto Vallarta, you might catch her at her regular Thursday night residency at Café des Artistes.',
    ],
    content_es: [
      'Sofía Ángeles Banda creció en la pequeña comunidad de San Andrés Cohamiata, Jalisco, donde el pueblo wixáritari (huichol) ha mantenido sus tradiciones musicales sagradas durante milenios. A los 16 años, partió a Puerto Vallarta para estudiar en el conservatorio de la ciudad, pero llevó consigo todas las melodías que su abuela le había cantado.',
      '"Cuando toco esos cantos con mi sintetizador, no intento modernizarlos", nos dijo sentada en su estudio de la Zona Romántica. "Intento asegurarme de que alguien que nunca los haya escuchado sienta lo que yo siento cuando escucho la voz de mi abuela."',
      'Su EP debut, Tatewari (nombrado por la deidad del fuego wixáritari), mezcla grabaciones de campo de canciones ceremoniales reales con una producción electrónica minimalista. El resultado es algo a la vez ancestral y completamente nuevo. Alcanzó el número 3 en el chart indie de Spotify México a las dos semanas de su lanzamiento.',
      'Sofía aparecerá en nuestra edición impresa de septiembre de 2026. Si estás en Puerto Vallarta, puedes verla en su residencia fija los jueves por la noche en el Café des Artistes.',
    ],
  },
  {
    id: 'sabino',
    title_en: 'Sabino: The King of "Sab-Hop"',
    title_es: 'Sabino: El Rey del "Sab-Hop"',
    date_en: 'May 12, 2026',
    date_es: '12 de mayo, 2026',
    category_en: 'Guadalajara · Hip-Hop',
    category_es: 'Guadalajara · Hip-Hop',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    featured: false,
    content_en: [
      'Sabino is a Mexican rapper and singer known for pioneering "Sab-Hop," a unique blend of hip-hop and alternative rock infused with humor and storytelling. Born in Guadalajara, Jalisco, Sabino has redefined the Mexican rap scene by offering a fresh, playful, and relatable approach to music.',
      'His breakout hit, "Me Puse Pedo", catapulted him to fame, followed by fan-favorites like "Los Raros de la Clase" and "Ya le Bajo". His witty lyrics and engaging beats resonate with a broad audience, making him one of the most beloved indie artists in Mexico.',
    ],
    content_es: [
      'Sabino es un rapero y cantante mexicano conocido por ser pionero del "Sab-Hop", una mezcla única de hip-hop y rock alternativo infundido con humor y narrativa. Nacido en Guadalajara, Jalisco, Sabino ha redefinido la escena del rap mexicano ofreciendo un enfoque fresco, juguetón y cercano a la música.',
      'Su éxito de debut "Me Puse Pedo" lo catapultó a la fama, seguido por favoritos de los fans como "Los Raros de la Clase" y "Ya le Bajo". Sus letras ingeniosas y ritmos cautivadores resuenan con una amplia audiencia, convirtiéndolo en uno de los artistas independientes más queridos de México.',
    ],
  },
  {
    id: 'austin-tv',
    title_en: 'Austin TV: Post-Rock Legends Still Going Strong',
    title_es: 'Austin TV: Las Leyendas del Post-Rock Siguen en Pie',
    date_en: 'April 28, 2026',
    date_es: '28 de abril, 2026',
    category_en: 'Mexico City · Post-Rock',
    category_es: 'Ciudad de México · Post-Rock',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    featured: false,
    content_en: [
      'Austin TV, one of Mexico\'s most influential instrumental post-rock bands, emerged in the early 2000s with an avant-garde style. Known for their masked personas and refusal to conform to traditional music industry norms, the band cultivated a cult following with their emotional and cinematic compositions.',
      'Albums like "Fontana Bella" and "Caballeros del Albedrío" showcase their ability to craft powerful, narrative-driven music without the need for lyrics. After a hiatus, Austin TV made a triumphant return in 2022 — proving that their music remains timeless.',
    ],
    content_es: [
      'Austin TV, una de las bandas de post-rock instrumental más influyentes de México, surgió a principios de los 2000 con un estilo vanguardista. Conocidos por sus personajes enmascarados y su negativa a conformarse con las normas de la industria, la banda cultivó un seguimiento de culto con sus composiciones emocionales y cinematográficas.',
      'Álbumes como "Fontana Bella" y "Caballeros del Albedrío" muestran su capacidad para crear música poderosa e impulsada por narrativas sin necesidad de letras. Después de un hiato, Austin TV hizo un regreso triunfal en 2022, demostrando que su música sigue siendo atemporal.',
    ],
  },
];

const MusicBlogs = () => {
  const { language } = useLanguageStore();
  const isEn = language === 'en';

  const featured = blogPosts.find(p => p.featured);
  const rest = blogPosts.filter(p => !p.featured);

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
            <Music2 className="h-5 w-5 text-monarca-amber" />
            <span className="text-monarca-amber text-xs font-bold uppercase tracking-widest">
              {isEn ? 'Music' : 'Música'}
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-black mb-2">
            {isEn ? 'Music Blogs' : 'Blogs de Música'}
          </h1>
          <p className="text-white/60 max-w-xl">
            {isEn
              ? 'Stories about the artists and movements shaping the sound of Mexico.'
              : 'Historias sobre los artistas y movimientos que dan forma al sonido de México.'}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-5xl">
        {/* Featured post */}
        {featured && (
          <div className="mb-12">
            <div className="bg-white rounded-2xl overflow-hidden border border-black/5 shadow-sm">
              <div className="relative h-72 md:h-96 overflow-hidden">
                <img
                  src={featured.image}
                  alt={isEn ? featured.title_en : featured.title_es}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-monarca-terracotta text-white text-xs font-bold uppercase px-3 py-1.5 rounded">
                    {isEn ? '★ Issue 1 Feature' : '★ Artículo Edición 1'}
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 text-white/70 text-xs mb-2">
                    <MapPin className="h-3.5 w-3.5" />
                    {isEn ? featured.category_en : featured.category_es}
                    <span>·</span>
                    <Calendar className="h-3.5 w-3.5" />
                    {isEn ? featured.date_en : featured.date_es}
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight">
                    {isEn ? featured.title_en : featured.title_es}
                  </h2>
                </div>
              </div>
              <div className="p-8">
                {(isEn ? featured.content_en : featured.content_es).map((para, i) => (
                  <p key={i} className="text-monarca-black mb-4 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Other posts */}
        <h2 className="font-display text-2xl font-bold text-monarca-black mb-6">
          {isEn ? 'More Music Stories' : 'Más Historias de Música'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((post) => (
            <div key={post.id} className="bg-white rounded-xl overflow-hidden border border-black/5 hover:shadow-md transition-shadow">
              <div className="relative h-52 overflow-hidden">
                <img
                  src={post.image}
                  alt={isEn ? post.title_en : post.title_es}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-monarca-gray text-xs mb-2">
                  <MapPin className="h-3 w-3" />
                  {isEn ? post.category_en : post.category_es}
                  <span>·</span>
                  {isEn ? post.date_en : post.date_es}
                </div>
                <h3 className="font-display text-xl font-bold text-monarca-black mb-3">
                  {isEn ? post.title_en : post.title_es}
                </h3>
                <p className="text-monarca-gray text-sm leading-relaxed line-clamp-3">
                  {(isEn ? post.content_en : post.content_es)[0]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MusicBlogs;
