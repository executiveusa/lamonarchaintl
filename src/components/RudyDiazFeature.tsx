import React, { useState } from 'react';
import { useLanguageStore } from '@/services/articleService';
import { ChevronDown, ChevronUp } from 'lucide-react';

const RudyDiazFeature: React.FC = () => {
  const { language } = useLanguageStore();
  const isEn = language === 'en';
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(0);

  const interview = isEn ? interviewEn : interviewEs;

  return (
    <section className="py-16 bg-gradient-to-b from-white to-monarca-cream">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <span className="inline-block bg-monarca-terracotta/10 text-monarca-terracotta text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            {isEn ? 'Artist Profile' : 'Perfil de Artista'}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-monarca-black mb-4 leading-tight">
            {interview.title}
          </h1>
          <p className="text-lg text-monarca-gray leading-relaxed">
            {interview.subtitle}
          </p>
        </div>

        {/* Featured Image Placeholder */}
        <div className="mb-12 rounded-xl overflow-hidden shadow-lg border border-monarca-amber/20">
          <div className="bg-gradient-to-br from-monarca-amber/30 via-monarca-terracotta/20 to-monarca-black/10 h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🎨</div>
              <p className="text-monarca-gray font-semibold">
                {isEn ? 'Rudy Diaz at Work' : 'Rudy Diaz en Acción'}
              </p>
              <p className="text-sm text-monarca-gray/70 mt-1">
                {isEn ? 'Artist portrait photo' : 'Fotografía del artista'}
              </p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="mb-12 bg-white rounded-xl p-8 border border-monarca-amber/10 shadow-sm">
          <h2 className="font-display text-2xl font-bold text-monarca-black mb-4">
            {interview.storyTitle}
          </h2>
          <div className="space-y-4 text-monarca-gray leading-relaxed">
            {interview.story.map((paragraph, idx) => (
              <p key={idx} className="text-base">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Interview Section */}
        <div className="mb-12">
          <h2 className="font-display text-2xl font-bold text-monarca-black mb-6">
            {interview.interviewTitle}
          </h2>
          <div className="space-y-3">
            {interview.questions.map((qa, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg border border-monarca-amber/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => setExpandedQuestion(expandedQuestion === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-start justify-between gap-4 hover:bg-monarca-cream/30 transition-colors text-left"
                >
                  <span className="font-semibold text-monarca-black leading-tight pr-4">
                    {qa.question}
                  </span>
                  <div className="flex-shrink-0 mt-1">
                    {expandedQuestion === idx ? (
                      <ChevronUp className="h-5 w-5 text-monarca-terracotta" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-monarca-gray" />
                    )}
                  </div>
                </button>
                {expandedQuestion === idx && (
                  <div className="px-6 py-4 bg-monarca-cream/40 border-t border-monarca-amber/10">
                    <p className="text-monarca-gray leading-relaxed">
                      {qa.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Indigo Azul Project Highlight */}
        <div className="bg-gradient-to-r from-monarca-amber/10 to-monarca-terracotta/10 rounded-xl p-8 border border-monarca-amber/30">
          <h3 className="font-display text-xl font-bold text-monarca-black mb-3">
            {interview.projectTitle}
          </h3>
          <p className="text-monarca-gray leading-relaxed mb-4">
            {interview.projectDescription}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {interview.projectHighlights.map((highlight, idx) => (
              <div key={idx} className="bg-white rounded-lg p-4 border border-monarca-amber/20">
                <div className="text-3xl mb-2">{highlight.icon}</div>
                <p className="font-semibold text-monarca-black text-sm">
                  {highlight.title}
                </p>
                <p className="text-xs text-monarca-gray mt-1">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Culture Center Info */}
        <div className="mt-12 bg-white rounded-xl p-8 border border-monarca-amber/10 shadow-sm">
          <h3 className="font-display text-xl font-bold text-monarca-black mb-4">
            {interview.cultureCenterTitle}
          </h3>
          <p className="text-monarca-gray leading-relaxed">
            {interview.cultureCenterDescription}
          </p>
        </div>
      </div>
    </section>
  );
};

const interviewEn = {
  title: 'Rudy Diaz: Art, Community, and the Malecón',
  subtitle: 'An artist transforming Puerto Vallarta\'s public spaces and building the future through collaboration, murals, and regenerative agriculture.',
  storyTitle: 'The Artist on the Malecón',
  story: [
    'Rudy Diaz has watched Puerto Vallarta transform over the past decade. What began as sidewalk paintings has evolved into a movement—one where local artists claim the Malecón, the Zona Romántica, and neighborhood walls as canvases for stories that matter.',
    'Growing up in Puerto Vallarta, Rudy felt the pull between tourism and community. "You see this beautiful coast," he reflects, "but locals often don\'t feel their own stories reflected in it." That tension sparked his mission: to create art that belongs to the people, not just the visitors.',
    'Today, he\'s known for large-scale murals celebrating Mexican identity, indigenous imagery, and environmental themes. But his work extends far beyond paint. As a volunteer with the Indigo Azul project in Paso de Guayabo, Rudy has donated hundreds of hours creating art installations and leading mural workshops at a food forest that\'s becoming a beacon for regenerative agriculture in the region.',
    'The Puerto Vallarta Cultural Center—a new hub for artist residencies, exhibitions, and public commissions—has been instrumental in giving artists like Rudy the infrastructure to thrive. "They believe in us," Rudy says simply. "They give us the walls, the resources, and the permission to dream bigger."'
  ],
  interviewTitle: 'In Conversation with Rudy',
  questions: [
    {
      question: '¿Cuándo supiste que eras artista, y qué te motivó a trabajar específicamente en espacios públicos?',
      answer: 'I was seven when my grandfather took me to see a famous mural in Mexico City. I remember standing there, seeing this massive painting on an ordinary wall, and thinking: art could be for everyone, not just in museums. By my teenage years, I was sneaking out to paint. But the real turning point came when the Cultural Center opened its doors. They didn\'t just let me paint—they invited me to lead. That shift from "artist working alone" to "artist in service of community" changed everything.'
    },
    {
      question: 'How do you choose what stories to tell through your work? What\'s the relationship between your murals and the places they live?',
      answer: 'I spend time in a neighborhood. I talk to people. I listen for the stories that matter—the ones about resilience, about ancestry, about what locals want the world to see. A mural on the Malecón isn\'t about impressing tourists; it\'s about local pride. When I painted the piece on Calle Olas Altas, I incorporated imagery from indigenous communities that have roots in this region. That mural belongs to them.'
    },
    {
      question: 'Tell us about your work with Indigo Azul and the food forest in Paso de Guayabo.',
      answer: 'Indigo Azul is special because it combines everything I care about: art, ecology, and community. The food forest is this incredible experiment in regenerative agriculture—fruit trees, native plants, people learning to grow their own food. My role has been to create visual markers and gathering spaces within it. We\'ve painted murals depicting the food forest\'s history, and I\'ve led workshops teaching young people to see themselves as both artists and stewards of the land. It\'s not just about the final image; it\'s about process, about people discovering their own creativity.'
    },
    {
      question: 'What does the Cultural Center mean to Puerto Vallarta\'s artistic community?',
      answer: 'Before, artists were scattered, competing for scraps of wall space. The Center has centralized opportunity—not just gallery shows, but commissions, residencies, and mentorship. They\'re paying young artists. They\'re connecting us with each other. For the first time, being an artist in Puerto Vallarta feels sustainable. I can focus on my work instead of working three other jobs just to survive. That matters.'
    },
    {
      question: 'What\'s next for you? Where do you see your art going?',
      answer: 'I want to expand the food forest project. I want to train more artists to work in regenerative spaces. And honestly, I want to see every neighborhood in Puerto Vallarta have murals that tell their own stories—not generic art, but real art from artists who know the community. If I can help make that happen, I\'ve done something meaningful.'
    }
  ],
  projectTitle: 'Indigo Azul: Art Meets Regeneration',
  projectDescription: 'Rudy\'s ongoing collaboration with the Indigo Azul food forest project in Paso de Guayabo represents the intersection of artistic practice and ecological regeneration. As a volunteer, he\'s helped transform a land revitalization effort into a cultural gathering space.',
  projectHighlights: [
    {
      icon: '🌱',
      title: 'Food Forest Design',
      description: 'Visual mapping and mural installations that guide visitors through indigenous and native plant systems.'
    },
    {
      icon: '🎨',
      title: 'Community Workshops',
      description: 'Teaching local youth art as a tool for ecological stewardship and cultural identity.'
    },
    {
      icon: '🤝',
      title: 'Volunteer Commitment',
      description: 'Hundreds of donated hours creating beautiful spaces that serve both art and agriculture.'
    }
  ],
  cultureCenterTitle: 'The Puerto Vallarta Cultural Center: Changing the Game',
  cultureCenterDescription: 'Founded to support and amplify the work of local artists, the Puerto Vallarta Cultural Center provides residencies, public commissions, exhibition space, and direct financial support. For artists like Rudy, it\'s been transformative—creating the conditions for public art to thrive not as decoration, but as essential cultural infrastructure. The Center also connects artists with community projects, NGOs, and regional initiatives, making it possible for artists to build sustainable careers rooted in social impact.'
};

const interviewEs = {
  title: 'Rudy Diaz: Arte, Comunidad y el Malecón',
  subtitle: 'Un artista que transforma los espacios públicos de Puerto Vallarta y construye el futuro a través de la colaboración, los murales y la agricultura regenerativa.',
  storyTitle: 'El Artista en el Malecón',
  story: [
    'Rudy Diaz ha visto transformarse Puerto Vallarta en la última década. Lo que comenzó como pintura en las aceras ha evolucionado hacia un movimiento: uno donde los artistas locales reclaman el Malecón, la Zona Romántica y los muros del barrio como lienzos para historias que importan.',
    'Creciendo en Puerto Vallarta, Rudy sintió la tensión entre el turismo y la comunidad. "Ves esta costa hermosa," reflexiona, "pero los locales a menudo no ven sus propias historias reflejadas." Esa tensión encendió su misión: crear arte que pertenezca al pueblo, no solo a los visitantes.',
    'Hoy es conocido por murales a gran escala que celebran la identidad mexicana, la imaginería indígena y temas ambientales. Pero su trabajo va mucho más allá de la pintura. Como voluntario del proyecto Indigo Azul en Paso de Guayabo, Rudy ha donado cientos de horas creando instalaciones de arte y dirigiendo talleres de murales en un bosque de alimentos que se está convirtiendo en un faro para la agricultura regenerativa en la región.',
    'El Centro Cultural de Puerto Vallarta—un nuevo centro para residencias artísticas, exposiciones y comisiones públicas—ha sido instrumental en dar a artistas como Rudy la infraestructura para prosperar. "Creen en nosotros," dice Rudy simplemente. "Nos dan los muros, los recursos y el permiso para soñar más grande."'
  ],
  interviewTitle: 'En Conversación con Rudy',
  questions: [
    {
      question: '¿Cuándo supiste que eras artista, y qué te motivó a trabajar específicamente en espacios públicos?',
      answer: 'Tenía siete años cuando mi abuelo me llevó a ver un mural famoso en la Ciudad de México. Recuerdo estar parado ahí, viendo esta pintura masiva en una pared ordinaria, y pensé: el arte podría ser para todos, no solo en museos. Para la adolescencia, estaba saliendo a escondidas para pintar. Pero el verdadero punto de quiebre fue cuando el Centro Cultural abrió sus puertas. No solo me dejaron pintar, me invitaron a liderar. Ese cambio de "artista trabajando solo" a "artista al servicio de la comunidad" lo cambió todo.'
    },
    {
      question: '¿Cómo eliges qué historias contar a través de tu trabajo? ¿Cuál es la relación entre tus murales y los lugares donde viven?',
      answer: 'Paso tiempo en un barrio. Hablo con la gente. Escucho las historias que importan: las de resiliencia, de ancestría, de lo que los locales quieren que el mundo vea. Un mural en el Malecón no es para impresionar a turistas; es sobre el orgullo local. Cuando pinté la pieza en Calle Olas Altas, incorporé imaginería de comunidades indígenas que tienen raíces en esta región. Ese mural les pertenece a ellos.'
    },
    {
      question: 'Cuéntanos sobre tu trabajo con Indigo Azul y el bosque de alimentos en Paso de Guayabo.',
      answer: 'Indigo Azul es especial porque combina todo lo que me importa: arte, ecología y comunidad. El bosque de alimentos es este experimento increíble en agricultura regenerativa: árboles frutales, plantas nativas, gente aprendiendo a cultivar su propio alimento. Mi rol ha sido crear marcadores visuales y espacios de reunión dentro de él. Hemos pintado murales que representan la historia del bosque de alimentos, y he dirigido talleres enseñando a jóvenes a verse a sí mismos como artistas y custodios de la tierra. No se trata solo de la imagen final; se trata del proceso, de que las personas descubran su propia creatividad.'
    },
    {
      question: '¿Qué significa el Centro Cultural para la comunidad artística de Puerto Vallarta?',
      answer: 'Antes, los artistas estaban dispersos, compitiendo por fragmentos de espacio en muros. El Centro ha centralizado la oportunidad: no solo galerías, sino comisiones, residencias y mentoría. Nos están pagando a artistas jóvenes. Nos están conectando entre nosotros. Por primera vez, ser artista en Puerto Vallarta se siente sostenible. Puedo enfocarme en mi trabajo en lugar de trabajar en tres otros empleos solo para sobrevivir. Eso importa.'
    },
    {
      question: '¿Qué sigue para ti? ¿Hacia dónde ves ir tu arte?',
      answer: 'Quiero expandir el proyecto del bosque de alimentos. Quiero entrenar a más artistas para trabajar en espacios regenerativos. Y honestamente, quiero ver que cada barrio de Puerto Vallarta tenga murales que cuenten sus propias historias: no arte genérico, sino arte real de artistas que conocen la comunidad. Si puedo ayudar a que eso suceda, he hecho algo significativo.'
    }
  ],
  projectTitle: 'Indigo Azul: Donde el Arte se Encuentra con la Regeneración',
  projectDescription: 'La colaboración continua de Rudy con el proyecto del bosque de alimentos Indigo Azul en Paso de Guayabo representa la intersección de la práctica artística y la regeneración ecológica. Como voluntario, ha ayudado a transformar un esfuerzo de revitalización de tierras en un espacio de reunión cultural.',
  projectHighlights: [
    {
      icon: '🌱',
      title: 'Diseño del Bosque de Alimentos',
      description: 'Mapeo visual e instalaciones de murales que guían a los visitantes a través de sistemas de plantas indígenas y nativas.'
    },
    {
      icon: '🎨',
      title: 'Talleres Comunitarios',
      description: 'Enseñar a la juventud local el arte como herramienta para la administración ecológica e identidad cultural.'
    },
    {
      icon: '🤝',
      title: 'Compromiso de Voluntario',
      description: 'Cientos de horas donadas creando espacios hermosos que sirven tanto al arte como a la agricultura.'
    }
  ],
  cultureCenterTitle: 'El Centro Cultural de Puerto Vallarta: Cambiando el Juego',
  cultureCenterDescription: 'Fundado para apoyar y amplificar el trabajo de artistas locales, el Centro Cultural de Puerto Vallarta proporciona residencias, comisiones públicas, espacio de exposición y apoyo financiero directo. Para artistas como Rudy, ha sido transformador: crear las condiciones para que el arte público prospere no como decoración, sino como infraestructura cultural esencial. El Centro también conecta a artistas con proyectos comunitarios, ONG e iniciativas regionales, haciendo posible que los artistas construyan carreras sostenibles arraigadas en el impacto social.'
};

export default RudyDiazFeature;
