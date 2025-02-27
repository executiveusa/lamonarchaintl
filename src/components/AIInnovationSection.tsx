
import React from 'react';
import Header from '@/components/Header';
import { useLanguageStore } from '@/services/articleService';

const AIInnovationSection: React.FC = () => {
  const { language } = useLanguageStore();

  return (
    <section id="inteligencia-artificial" className="py-20 bg-monarca-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-monarca-terracotta/10 to-transparent"></div>
      <div className="container mx-auto px-6 relative z-10">
        <Header 
          title={language === 'en' ? "AI Innovation Hub" : "Centro de Innovación en IA"}
          subtitle={language === 'en' ? "Mexico's contributions to the global artificial intelligence landscape" : "Contribuciones de México al panorama mundial de la inteligencia artificial"}
          smallPadding
        />
        
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl md:text-3xl font-display font-medium mb-6">
                {language === 'en' ? "Leading the AI Revolution in Latin America" : "Liderando la Revolución de la IA en América Latina"}
              </h3>
              <p className="text-monarca-gray/90 mb-6">
                {language === 'en'
                  ? "Mexico is positioning itself as a leader in artificial intelligence research and development throughout Latin America. With significant investments in education, infrastructure, and startup ecosystems, the country is fostering innovation that addresses unique regional challenges."
                  : "México se está posicionando como líder en investigación y desarrollo de inteligencia artificial en toda América Latina. Con importantes inversiones en educación, infraestructura y ecosistemas de startups, el país está fomentando la innovación que aborda desafíos regionales únicos."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start">
                  <div className="mr-4 p-3 bg-monarca-orange/10 text-monarca-orange rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                      <line x1="6" y1="6" x2="6.01" y2="6"></line>
                      <line x1="6" y1="18" x2="6.01" y2="18"></line>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">
                      {language === 'en' ? "Advanced Research Centers" : "Centros de Investigación Avanzada"}
                    </h4>
                    <p className="text-monarca-gray/80">
                      {language === 'en' 
                        ? "Dedicated facilities developing cutting-edge AI applications in healthcare, agriculture, and urban planning."
                        : "Instalaciones dedicadas que desarrollan aplicaciones de IA de vanguardia en atención médica, agricultura y planificación urbana."}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 p-3 bg-monarca-orange/10 text-monarca-orange rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"></path>
                      <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path>
                      <path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"></path>
                      <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"></path>
                      <path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"></path>
                      <path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"></path>
                      <path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"></path>
                      <path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">
                      {language === 'en' ? "AI Startup Ecosystem" : "Ecosistema de Startups de IA"}
                    </h4>
                    <p className="text-monarca-gray/80">
                      {language === 'en' 
                        ? "A thriving community of entrepreneurs creating innovative AI solutions for global markets."
                        : "Una próspera comunidad de emprendedores que crean soluciones innovadoras de IA para mercados globales."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-xl overflow-hidden shadow-lg h-full">
              <div className="bg-monarca-black text-white p-6">
                <h3 className="text-xl font-medium mb-2">
                  {language === 'en' ? "Key AI Initiatives" : "Iniciativas Clave de IA"}
                </h3>
                <p className="text-white/80 text-sm">
                  {language === 'en' 
                    ? "Ongoing projects transforming Mexico's technological landscape"
                    : "Proyectos en curso que transforman el panorama tecnológico de México"}
                </p>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="pb-4 border-b border-gray-100">
                    <h4 className="font-medium">
                      {language === 'en' ? "National AI Strategy" : "Estrategia Nacional de IA"}
                    </h4>
                    <p className="text-monarca-gray/80 text-sm mt-1">
                      {language === 'en' 
                        ? "Comprehensive policy framework to position Mexico as an AI leader by 2030"
                        : "Marco integral de políticas para posicionar a México como líder en IA para 2030"}
                    </p>
                  </li>
                  <li className="pb-4 border-b border-gray-100">
                    <h4 className="font-medium">
                      {language === 'en' ? "AI4Education Program" : "Programa IA4Educación"}
                    </h4>
                    <p className="text-monarca-gray/80 text-sm mt-1">
                      {language === 'en' 
                        ? "Introducing AI curriculum at all educational levels nationwide"
                        : "Introducción del plan de estudios de IA en todos los niveles educativos a nivel nacional"}
                    </p>
                  </li>
                  <li>
                    <h4 className="font-medium">
                      {language === 'en' ? "AI Ethics Commission" : "Comisión de Ética de IA"}
                    </h4>
                    <p className="text-monarca-gray/80 text-sm mt-1">
                      {language === 'en' 
                        ? "Ensuring responsible AI development and implementation across sectors"
                        : "Garantizando el desarrollo e implementación responsable de IA en todos los sectores"}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIInnovationSection;
