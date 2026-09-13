import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguageStore } from '@/services/articleService';
import { subscribeToNewsletter } from '@/services/submissionService';
import { toast } from 'sonner';

const NewsletterSubscription: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { language } = useLanguageStore();

  const translations = {
    title: language === 'en' ? 'Subscribe to our newsletter' : 'Suscríbete a nuestro boletín',
    description: language === 'en'
      ? 'Receive new stories, print-edition updates, and selected announcements from La Monarca Internacional.'
      : 'Recibe nuevas historias, novedades de la edición impresa y anuncios seleccionados de La Monarca Internacional.',
    placeholder: language === 'en' ? 'Enter your email' : 'Ingresa tu correo electrónico',
    button: language === 'en' ? 'Subscribe' : 'Suscribirse',
    privacy: language === 'en'
      ? 'We use your email only for La Monarca publication updates.'
      : 'Usamos tu correo únicamente para novedades de La Monarca.'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      toast.error(language === 'en' ? 'Please enter a valid email address' : 'Por favor ingresa un correo electrónico válido');
      return;
    }

    try {
      setIsSubmitting(true);
      await subscribeToNewsletter(email, language);
      toast.success(language === 'en' ? 'Subscription saved.' : 'Suscripción guardada.');
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription failed:', error);
      toast.error(language === 'en' ? 'We could not save your subscription. Please try again.' : 'No pudimos guardar tu suscripción. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-xl mx-auto px-4 md:px-8">
        <div className="space-y-3 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 mx-auto text-monarca-gray/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
          </svg>
          <h3 className="text-3xl font-display font-medium text-monarca-black">{translations.title}</h3>
          <p className="text-monarca-gray leading-relaxed">{translations.description}</p>
        </div>
        <div className="mt-6">
          <form onSubmit={handleSubmit} className="items-center justify-center sm:flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={translations.placeholder}
              className="text-monarca-gray w-full p-3 rounded-md border outline-none focus:border-monarca-terracotta"
              disabled={isSubmitting}
            />
            <Button type="submit" disabled={isSubmitting} className="w-full mt-3 bg-monarca-terracotta hover:bg-monarca-orange sm:mt-0 sm:ml-3 sm:w-auto">
              {isSubmitting ? (language === 'en' ? 'Saving…' : 'Guardando…') : translations.button}
            </Button>
          </form>
          <p className="mt-3 mx-auto text-center max-w-lg text-[15px] text-monarca-gray">{translations.privacy}</p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSubscription;
