
import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguageStore } from "@/services/articleService";

const MusicBlogs = () => {
  const { language } = useLanguageStore();
  
  return (
    <div className="min-h-screen bg-monarca-cream">
      <Navigation />
      
      <div className="p-6 max-w-4xl mx-auto pt-24 pb-12">
        <h1 className="text-4xl font-display font-bold mb-6 text-monarca-black">
          {language === 'en' 
            ? 'Exploring the Sounds of Mexico: Sabino, Austin TV, and Moderatto' 
            : 'Explorando los Sonidos de México: Sabino, Austin TV y Moderatto'}
        </h1>
        
        {/* Sabino */}
        <article className="mb-12 border-b border-monarca-gray/20 pb-8">
          <h2 className="text-3xl font-display font-semibold mb-4 text-monarca-terracotta">
            {language === 'en' ? 'Sabino: The King of "Sab-Hop"' : 'Sabino: El Rey del "Sab-Hop"'}
          </h2>
          <p className="text-monarca-black mb-4">
            {language === 'en'
              ? 'Sabino is a Mexican rapper and singer known for pioneering "Sab-Hop," a unique blend of hip-hop and alternative rock infused with humor and storytelling. Born in Guadalajara, Jalisco, Sabino has redefined the Mexican rap scene by offering a fresh, playful, and relatable approach to music.'
              : 'Sabino es un rapero y cantante mexicano conocido por ser pionero del "Sab-Hop", una mezcla única de hip-hop y rock alternativo infundido con humor y narrativa. Nacido en Guadalajara, Jalisco, Sabino ha redefinido la escena del rap mexicano ofreciendo un enfoque fresco, juguetón y cercano a la música.'}
          </p>
          <p className="text-monarca-black mb-4">
            {language === 'en'
              ? 'His breakout hit, "Me Puse Pedo", catapulted him to fame, followed by fan-favorites like "Los Raros de la Clase" and "Ya le Bajo". His witty lyrics and engaging beats resonate with a broad audience, making him one of the most beloved indie artists in Mexico.'
              : 'Su éxito "Me Puse Pedo" lo catapultó a la fama, seguido por favoritos de los fans como "Los Raros de la Clase" y "Ya le Bajo". Sus letras ingeniosas y ritmos cautivadores resuenan con una amplia audiencia, convirtiéndolo en uno de los artistas independientes más queridos de México.'}
          </p>
        </article>
        
        {/* Austin TV */}
        <article className="mb-12 border-b border-monarca-gray/20 pb-8">
          <h2 className="text-3xl font-display font-semibold mb-4 text-monarca-terracotta">
            {language === 'en' ? 'Austin TV: The Post-Rock Legends of Mexico' : 'Austin TV: Las Leyendas del Post-Rock de México'}
          </h2>
          <p className="text-monarca-black mb-4">
            {language === 'en'
              ? 'Austin TV, one of Mexico\'s most influential instrumental post-rock bands, emerged in the early 2000s with an avant-garde style. Known for their masked personas and refusal to conform to traditional music industry norms, the band cultivated a cult-like following with their emotional and cinematic compositions.'
              : 'Austin TV, una de las bandas de post-rock instrumental más influyentes de México, surgió a principios de la década de 2000 con un estilo vanguardista. Conocidos por sus personajes enmascarados y su negativa a conformarse con las normas tradicionales de la industria musical, la banda cultivó un seguimiento casi de culto con sus composiciones emocionales y cinematográficas.'}
          </p>
          <p className="text-monarca-black mb-4">
            {language === 'en'
              ? 'Albums like "Fontana Bella" and "Caballeros del Albedrío" showcase their ability to craft powerful, narrative-driven music without the need for lyrics. After a hiatus, Austin TV made a triumphant return in 2022, proving that their music remains timeless and impactful.'
              : 'Álbumes como "Fontana Bella" y "Caballeros del Albedrío" muestran su capacidad para crear música poderosa e impulsada por narrativas sin necesidad de letras. Después de un hiato, Austin TV hizo un regreso triunfal en 2022, demostrando que su música sigue siendo atemporal e impactante.'}
          </p>
        </article>
        
        {/* Moderatto */}
        <article className="mb-8">
          <h2 className="text-3xl font-display font-semibold mb-4 text-monarca-terracotta">
            {language === 'en' ? 'Moderatto: The Glam Rock Revolution' : 'Moderatto: La Revolución del Glam Rock'}
          </h2>
          <p className="text-monarca-black mb-4">
            {language === 'en'
              ? 'Moderatto is Mexico\'s answer to glam rock, blending theatrical performances, electrifying riffs, and a larger-than-life persona. With their signature over-the-top style, they have kept the spirit of 80s rock alive in Latin America.'
              : 'Moderatto es la respuesta de México al glam rock, combinando actuaciones teatrales, riffs electrizantes y una personalidad más grande que la vida. Con su característico estilo exagerado, han mantenido vivo el espíritu del rock de los 80 en América Latina.'}
          </p>
          <p className="text-monarca-black mb-4">
            {language === 'en'
              ? 'Songs like "Muriendo Lento" and "Sentimettal" showcase their ability to merge humor, romance, and rock into an addictive sound. Their high-energy performances and charismatic stage presence make them a staple in Mexican rock culture.'
              : 'Canciones como "Muriendo Lento" y "Sentimettal" muestran su capacidad para fusionar humor, romance y rock en un sonido adictivo. Sus actuaciones llenas de energía y su carismática presencia escénica los convierten en un elemento básico de la cultura rock mexicana.'}
          </p>
        </article>
      </div>
      
      <Footer />
    </div>
  );
};

export default MusicBlogs;
