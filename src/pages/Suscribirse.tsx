import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useLanguageStore } from '@/services/articleService';
import { Check } from 'lucide-react';

const tiers = {
  es: [
    {
      id: 'lector',
      name: 'Lector',
      price: 'Gratis',
      period: '',
      description: 'Para quienes quieren mantenerse informados',
      color: '#9bc1bc',
      highlighted: false,
      features: [
        '5 artículos completos por mes',
        'Acceso a noticias de portada',
        'Newsletter semanal',
        'Listado básico en el Directorio',
      ],
      cta: 'Registrarse Gratis',
      href: '/auth',
    },
    {
      id: 'creador',
      name: 'Creador',
      price: '$9.99',
      period: '/mes',
      description: 'Para empresarias y líderes LATAM',
      color: '#ed6a5a',
      highlighted: true,
      features: [
        'Artículos ilimitados',
        'Lectura por voz (Mercury 2™)',
        'Newsletter diario exclusivo',
        'Acceso al archivo completo',
        'Listado premium en el Directorio',
        'Sin anuncios',
      ],
      cta: 'Comenzar Prueba Gratuita',
      href: '/auth?plan=creador',
    },
    {
      id: 'empresario',
      name: 'Empresario',
      price: '$29.99',
      period: '/mes',
      description: 'Para negocios que quieren visibilidad máxima',
      color: '#d4af37',
      highlighted: false,
      features: [
        'Todo lo del plan Creador',
        'Chat con artículos via IA',
        'Acceso prioritario a Esferas™',
        'Listado destacado en el Directorio (posición 1–10)',
        'Contenido exclusivo de líderes LATAM',
        'Soporte directo por WhatsApp',
        'Panel de analíticas de negocio',
      ],
      cta: 'Hablar con SYNTHIA™',
      href: '/auth?plan=empresario',
    },
  ],
  en: [
    {
      id: 'lector',
      name: 'Reader',
      price: 'Free',
      period: '',
      description: 'For those who want to stay informed',
      color: '#9bc1bc',
      highlighted: false,
      features: [
        '5 full articles per month',
        'Front page news access',
        'Weekly newsletter',
        'Basic Directory listing',
      ],
      cta: 'Sign Up Free',
      href: '/auth',
    },
    {
      id: 'creador',
      name: 'Creator',
      price: '$9.99',
      period: '/mo',
      description: 'For LATAM entrepreneurs and leaders',
      color: '#ed6a5a',
      highlighted: true,
      features: [
        'Unlimited articles',
        'Voice reading (Mercury 2™)',
        'Exclusive daily newsletter',
        'Full archive access',
        'Premium Directory listing',
        'Ad-free experience',
      ],
      cta: 'Start Free Trial',
      href: '/auth?plan=creador',
    },
    {
      id: 'empresario',
      name: 'Business',
      price: '$29.99',
      period: '/mo',
      description: 'For businesses seeking maximum visibility',
      color: '#d4af37',
      highlighted: false,
      features: [
        'Everything in Creator',
        'AI-powered article chat',
        'Priority Spheres™ access',
        'Featured Directory listing (top 1–10)',
        'Exclusive LATAM leader content',
        'WhatsApp direct support',
        'Business analytics dashboard',
      ],
      cta: 'Talk to SYNTHIA™',
      href: '/auth?plan=empresario',
    },
  ],
};

const Suscribirse: React.FC = () => {
  const { language } = useLanguageStore();
  const plans = tiers[language] ?? tiers.es;

  return (
    <div className="min-h-screen bg-monarca-cream">
      <Navigation />

      <main className="container mx-auto px-6 py-16 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-monarca-terracotta mb-3">
            {language === 'en' ? 'Subscription Plans' : 'Planes de Suscripción'}
          </p>
          <h1 className="text-4xl md:text-5xl font-display font-black text-monarca-black mb-4 tracking-tight">
            {language === 'en' ? 'Read Without Limits' : 'Lee Sin Límites'}
          </h1>
          <p className="text-monarca-black/60 text-lg max-w-xl mx-auto">
            {language === 'en'
              ? 'Positive bilingual journalism from Mexico — artists, community, youth, and culture. A Kupari Media publication. Cancel anytime.'
              : 'Periodismo bilingüe positivo de México — artistas, comunidad, juventud y cultura. Una publicación de Kupari Media. Cancela cuando quieras.'}
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-lg border bg-white flex flex-col ${
                plan.highlighted
                  ? 'border-monarca-terracotta shadow-md'
                  : 'border-black/10'
              }`}
              style={{ position: 'relative' }}
            >
              {plan.highlighted && (
                <div
                  className="absolute -top-px left-6 right-6 h-0.5 rounded-full"
                  style={{ background: plan.color }}
                />
              )}
              <div className="p-6 flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-bold text-monarca-black">{plan.name}</h2>
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: plan.color }}
                  />
                </div>
                <p className="text-sm text-monarca-black/50 mb-5">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-black text-monarca-black tracking-tight">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm text-monarca-black/50 ml-1">{plan.period}</span>
                  )}
                </div>
                <ul className="space-y-3">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-monarca-black/80">
                      <Check className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: plan.color }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 pt-0">
                <Link
                  to={plan.href}
                  className={`block text-center py-2.5 px-4 rounded-md text-sm font-bold transition-colors ${
                    plan.highlighted
                      ? 'bg-monarca-terracotta text-white hover:bg-monarca-orange'
                      : 'border border-black/20 text-monarca-black hover:bg-monarca-black/5'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ note */}
        <div className="text-center">
          <p className="text-sm text-monarca-black/50">
            {language === 'en'
              ? 'All plans include access to the Kupuri Directory™. Annual billing saves 20%.'
              : 'Todos los planes incluyen acceso al Directorio Kupuri™. Facturación anual ahorra 20%.'}
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Suscribirse;
