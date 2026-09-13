import React, { useState } from 'react';
import { useLanguageStore } from '@/services/articleService';
import { MapPin, Users, Shield, AlertCircle, Zap } from 'lucide-react';

const EffrainTourGuideFeature: React.FC = () => {
  const { language } = useLanguageStore();
  const isEn = language === 'en';
  const [expandedQ, setExpandedQ] = useState<number | null>(0);

  const interviews = [
    {
      q_en: 'How many years have you been guiding tours in Puerto Vallarta, and what made you start?',
      q_es: '¿Cuántos años llevas guiando tours en Puerto Vallarta, y qué te motivó a comenzar?',
      a_en: 'I\'ve been guiding for 18 years now. I started because I fell in love with Puerto Vallarta after visiting as a tourist in 1995. The city and its people captured my heart. I decided to dedicate my life to helping visitors experience the real Puerto Vallarta—not the tourist trap version, but the authentic culture, hidden beaches, and genuine hospitality. My mission is to help people understand that this isn\'t just a vacation destination; it\'s a living, breathing community with stories worth hearing.',
      a_es: 'Llevo 18 años guiando tours. Comencé porque me enamoré de Puerto Vallarta después de visitarla como turista en 1995. La ciudad y su gente capturaron mi corazón. Decidí dedicar mi vida a ayudar a los visitantes a experimentar el verdadero Puerto Vallarta, no la versión de trampa turística, sino la cultura auténtica, playas escondidas y hospitalidad genuina. Mi misión es ayudar a las personas a entender que esto no es solo un destino de vacaciones; es una comunidad viva que respira, con historias que vale la pena escuchar.',
    },
    {
      q_en: 'What are your top 3 tour recommendations for visitors, and why?',
      q_es: '¿Cuáles son tus 3 recomendaciones principales de tours para visitantes, y por qué?',
      a_en: '1) The Malecón Sunset Walk - It\'s more than a walk; it\'s where locals gather. You see street performers, artists, families, vendors. I introduce people to locals, we eat ceviche from trusted vendors, and guests see how Puerto Vallarta lives. 2) The Hiking Tour to Agua Blanca Waterfall - Most tourists miss this. We hike through jungle that few people see, swim in pools surrounded by palms, and you\'re never crowded. It\'s spiritual. 3) The "Real Cuisine" Market Tour - We visit Mercado 5 de Diciembre early morning, meet vendors I\'ve known for 15 years, learn about ingredients, and end with breakfast that costs less than a coffee at the resort. These tours show people the soul of Puerto Vallarta.',
      a_es: '1) El Paseo del Malecón al Atardecer - Es más que un paseo; es donde se reúnen los locales. Ves artistas callejeros, artistas, familias, vendedores. Presento a las personas con locales, comemos ceviche de vendedores de confianza, y los huéspedes ven cómo vive Puerto Vallarta. 2) El Tour de Senderismo a la Cascada Agua Blanca - La mayoría de los turistas se lo pierden. Caminamos por la jungla que poca gente ve, nadamos en piscinas rodeadas de palmeras, y nunca está abarrotado. Es espiritual. 3) El Tour de "Cocina Real" al Mercado - Visitamos el Mercado 5 de Diciembre por la mañana temprano, conocemos a vendedores que he conocido durante 15 años, aprendemos sobre ingredientes, y terminamos con desayuno que cuesta menos que un café en el resort. Estos tours muestran a las personas el alma de Puerto Vallarta.',
    },
    {
      q_en: 'What nightlife would you recommend for different types of travelers?',
      q_es: '¿Qué vida nocturna recomendarías para diferentes tipos de viajeros?',
      a_en: 'For families: Beachfront restaurants like Señor Chente\'s - live music, fresh ceviche, everyone feels safe. For couples: Malecón bar-hopping at smaller places (not the mega-clubs) - Mar Salado has the best mezcal, Casa Cupula rooftop has sunset views and local mixologists. For party crowds: Señor Frog\'s is party central, but honestly, the real magic is at smaller venues. Collage is a smaller club where you meet locals, dance with genuine people, not tourists all night. For those seeking culture: Friday nights at Casa Doña Rosa for traditional music and folklore performances.',
      a_es: 'Para familias: restaurantes frente a la playa como Señor Chente - música en vivo, ceviche fresco, todos se sienten seguros. Para parejas: tours de bares por el Malecón en lugares más pequeños (no en megaclubs) - Mar Salado tiene el mejor mezcal, la azotea de Casa Cupula tiene vistas al atardecer y mixólogos locales. Para multitudes que festejan: Señor Frog\'s es el centro de fiestas, pero honestamente, la verdadera magia está en lugares más pequeños. Collage es un club más pequeño donde conoces a locales, bailas con personas genuinas, no turistas toda la noche. Para quienes buscan cultura: viernes por la noche en Casa Doña Rosa para música tradicional y presentaciones de folclore.',
    },
    {
      q_en: 'This is the tough question: What should tourists avoid, and where might they get taken advantage of?',
      q_es: 'Esta es la pregunta difícil: ¿Qué deberían evitar los turistas, y dónde podrían ser estafados?',
      a_en: '(Laughs) I appreciate you asking this. Here\'s the honest truth: Stay away from unmarked "taxis" - use radio cabs or your hotel. Never exchange money at hotel rates; go to OXXO or a real exchange house. Don\'t book water sports from solicitors on the beach; they overchart and equipment isn\'t maintained. The "free sunset booze cruise" leads to inflated bar tabs. Avoid timeshare presentations—they\'re relentless. Don\'t buy from street vendors selling "authentic" jewelry unless you know it\'s real. And please, don\'t go to nightclubs that offer to buy you drinks early in the night—you\'ll pay astronomical prices later. Best rule: If a deal sounds too good to be true, it is. Stick with your hotel concierge or hire a legitimate guide. I know 100+ guides; if you call your hotel and ask for a recommendation, you\'ll get the real deal.',
      a_es: '(Ríe) Agradezco que hagas esta pregunta. Aquí está la verdad honesta: Evita los "taxis" sin identificar; usa taxis por radio u hotel. Nunca cambies dinero a tasas del hotel; ve a OXXO o a una casa de cambio real. No reserves deportes acuáticos de personas que te aborden en la playa; cobran demasiado y el equipo no está mantenido. El "crucero de ponche de sol gratis" lleva a facturas de bar infladas. Evita presentaciones de tiempo compartido, son implacables. No compres a vendedores callejeros joyas "auténticas" a menos que sepas que es real. Y por favor, no vayas a clubes nocturnos que te ofrezcan comprar bebidas temprano en la noche, pagarás precios astronómicos después. Mejor regla: Si un trato suena demasiado bueno para ser verdad, lo es. Quédate con tu conserje del hotel o contrata una guía legítima. Conozco a más de 100 guías; si llamas a tu hotel y pides una recomendación, obtendrás el trato real.',
    },
    {
      q_en: 'What\'s something about Puerto Vallarta that tourists never see but locals love?',
      q_es: '¿Qué hay algo sobre Puerto Vallarta que los turistas nunca ven pero que los locales aman?',
      a_en: 'The quiet morning walks along Playa Camarones before 7am—the fishermen bringing in the catch, pelicans diving, no noise, just the ocean. The neighborhood of Versalles, where there\'s a weekly tianguis (outdoor market) and families shop for everything. The view from Viewpoint Road at sunset, where you can see the entire bay. And honestly? Just sitting with friends at a beachside palapa, drinking horchata, watching the day pass. Tourism brings money, but locals find joy in simple moments. That\'s what I want visitors to understand.',
      a_es: 'Los paseos tranquilos por la mañana por Playa Camarones antes de las 7am, con los pescadores trayendo la captura, pelícanos bucando, sin ruido, solo el océano. El barrio de Versalles, donde hay un tianguis semanal y familias compran de todo. La vista desde Viewpoint Road al atardecer, donde puedes ver toda la bahía. ¿Y honestamente? Solo sentarse con amigos en una palapa junto a la playa, bebiendo horchata, viendo pasar el día. El turismo trae dinero, pero los locales encuentran alegría en momentos simples. Eso es lo que quiero que los visitantes entiendan.',
    },
  ];

  const tips = [
    {
      title_en: 'Go with a Licensed Guide',
      title_es: 'Ve con una Guía Licenciada',
      desc_en: 'Hotels can recommend certified guides. They know local stories, safe routes, and get commissions that keep them honest.',
      desc_es: 'Los hoteles pueden recomendar guías certificados. Conocen historias locales, rutas seguras, y reciben comisiones que los mantienen honestos.',
      icon: Shield,
    },
    {
      title_en: 'Ask Questions & Set Expectations',
      title_es: 'Haz Preguntas y Establece Expectativas',
      desc_en: 'Before any tour or purchase, ask the price, what\'s included, and get it in writing. Confusion leads to conflict.',
      desc_es: 'Antes de cualquier tour o compra, pregunta el precio, qué está incluido, y obtenlo por escrito. La confusión lleva a conflicto.',
      icon: AlertCircle,
    },
    {
      title_en: 'Trust Your Instincts',
      title_es: 'Confía en tu Instinto',
      desc_en: 'If someone or a situation feels off, it probably is. Say no and move on. Puerto Vallarta is safe, but stay alert.',
      desc_es: 'Si algo o una situación se siente mal, probablemente lo sea. Di que no y sigue adelante. Puerto Vallarta es seguro, pero mantente alerta.',
      icon: Zap,
    },
  ];

  return (
    <div className="py-16 bg-gradient-to-b from-white to-blue-50/30">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <div className="mb-14">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            {isEn ? 'Local Expertise' : 'Pericia Local'}
          </span>
          <h2 className="font-display text-4xl font-bold text-monarca-black mb-4">
            {isEn ? 'An Honest Guide: Effrain\'s Insider Tips' : 'Una Guía Honesta: Consejos Internos de Effrain'}
          </h2>
          <p className="text-lg text-monarca-gray leading-relaxed">
            {isEn
              ? 'Effrain has guided nearly 5,000 visitors through Puerto Vallarta over 18 years. He knows where locals eat, which nightlife experiences are authentic, and exactly where to avoid tourist traps. We sat down for a candid conversation.'
              : 'Effrain ha guiado a casi 5,000 visitantes a través de Puerto Vallarta durante 18 años. Sabe dónde comen los locales, qué experiencias de vida nocturna son auténticas, y exactamente dónde evitar trampas turísticas. Nos sentamos para una conversación sincera.'}
          </p>
        </div>

        {/* Featured Profile */}
        <div className="mb-16 bg-white rounded-lg border-2 border-blue-100 p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-8">
            {/* Image Placeholder */}
            <div className="md:col-span-1">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg aspect-square flex items-center justify-center border-2 border-blue-200">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-blue-400 mx-auto mb-2" />
                  <p className="text-sm text-blue-600 font-medium">{isEn ? 'Effrain Photo' : 'Foto de Effrain'}</p>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="md:col-span-2">
              <h3 className="font-display text-3xl font-bold text-monarca-black mb-2">
                {isEn ? 'Effrain Morales' : 'Effrain Morales'}
              </h3>
              <p className="text-lg text-blue-600 font-semibold mb-4">
                {isEn ? 'Certified Puerto Vallarta Tour Guide' : 'Guía Turístico Certificado de Puerto Vallarta'}
              </p>
              <div className="space-y-3 text-sm text-monarca-gray">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-monarca-black">18 {isEn ? 'years experience' : 'años de experiencia'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span>{isEn ? '4,800+ visitors guided' : '4,800+ visitantes guiados'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <span>{isEn ? 'Native Puerto Vallarta' : 'Nativo de Puerto Vallarta'}</span>
                </div>
                <p className="mt-4 leading-relaxed italic text-monarca-gray">
                  {isEn
                    ? '"I don\'t just show people Puerto Vallarta. I help them understand it."'
                    : '"No solo le muestro Puerto Vallarta a las personas. Las ayudo a comprenderlo."'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interview */}
        <div className="mb-16">
          <h3 className="font-display text-2xl font-bold text-monarca-black mb-8">
            {isEn ? 'The Interview' : 'La Entrevista'}
          </h3>
          <div className="space-y-3">
            {interviews.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg border border-blue-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => setExpandedQ(expandedQ === idx ? null : idx)}
                  className="w-full p-6 flex items-start justify-between hover:bg-blue-50/30 transition-colors text-left"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-monarca-black leading-relaxed">
                      {isEn ? item.q_en : item.q_es}
                    </p>
                  </div>
                  <div className="ml-4 text-blue-600 font-bold text-xl flex-shrink-0">
                    {expandedQ === idx ? '−' : '+'}
                  </div>
                </button>

                {expandedQ === idx && (
                  <div className="border-t border-blue-100 p-6 bg-blue-50/20">
                    <div className="prose prose-sm max-w-none">
                      <p className="text-monarca-gray leading-relaxed whitespace-pre-wrap">
                        {isEn ? item.a_en : item.a_es}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Safety Tips */}
        <div>
          <h3 className="font-display text-2xl font-bold text-monarca-black mb-8">
            {isEn ? 'Staying Safe & Avoiding Tourist Traps' : 'Mantenerse Seguro y Evitar Trampas Turísticas'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tips.map((tip, idx) => {
              const Icon = tip.icon;
              return (
                <div key={idx} className="bg-white rounded-lg border border-blue-100 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3 mb-4">
                    <Icon className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <h4 className="font-display font-bold text-monarca-black">
                      {isEn ? tip.title_en : tip.title_es}
                    </h4>
                  </div>
                  <p className="text-sm text-monarca-gray leading-relaxed">
                    {isEn ? tip.desc_en : tip.desc_es}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Closing */}
        <div className="mt-16 bg-blue-50 border-l-4 border-blue-600 p-8 rounded">
          <p className="text-monarca-black font-bold text-lg mb-3">
            {isEn ? 'Effrain\'s Final Thought' : 'Pensamiento Final de Effrain'}
          </p>
          <p className="text-monarca-gray leading-relaxed">
            {isEn
              ? '"Puerto Vallarta isn\'t a museum; it\'s alive. Every street has a story, every local has wisdom. Come with curiosity, respect the community, follow the simple rules, and you\'ll have the time of your life. I\'ve walked these streets for 18 years. I promise you, if you listen to what I\'ve shared here, you\'ll be safe, happy, and you\'ll understand why I fell in love with this place all those years ago."'
              : '"Puerto Vallarta no es un museo; está vivo. Cada calle tiene una historia, cada local tiene sabiduría. Ven con curiosidad, respeta la comunidad, sigue las reglas simples, y tendrás el mejor momento de tu vida. He caminado por estas calles durante 18 años. Te prometo que si escuchas lo que he compartido aquí, estarás seguro, feliz, y entenderás por qué me enamoré de este lugar hace todos esos años."'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EffrainTourGuideFeature;
