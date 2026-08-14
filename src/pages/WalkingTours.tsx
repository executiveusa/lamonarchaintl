import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useLanguageStore } from '@/services/articleService';
import { fetchPublishedTours, WalkingTour } from '@/services/tourService';
import { Clock, MapPin, Route } from 'lucide-react';

const WalkingTours = () => {
  const { language } = useLanguageStore();
  const isEn = language === 'en';
  const [tours, setTours] = useState<WalkingTour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetchPublishedTours()
      .then((rows) => { if (mounted) setTours(rows); })
      .catch((error) => {
        console.error('Walking tours loading failed:', error);
        if (mounted) setFailed(true);
      })
      .finally(() => { if (mounted) setIsLoading(false); });
    return () => { mounted = false; };
  }, []);

  return (
    <div className="min-h-screen bg-monarca-cream">
      <Navigation />
      <main className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-monarca-terracotta mb-3">
            <Route className="h-4 w-4" />
            {isEn ? 'La Monarca Walking Tours' : 'Recorridos La Monarca'}
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-monarca-black leading-tight">
            {isEn ? 'Walk the stories behind Puerto Vallarta' : 'Camina las historias detrás de Puerto Vallarta'}
          </h1>
          <p className="text-monarca-gray mt-4 text-lg leading-relaxed">
            {isEn
              ? 'Our routes are built from places we have researched, visited, interviewed, or otherwise verified. We do not publish scraped tour inventory.'
              : 'Nuestras rutas se construyen con lugares que hemos investigado, visitado, entrevistado o verificado de otra manera. No publicamos inventario de tours extraído automáticamente.'}
          </p>
        </div>

        {isLoading && <p className="text-monarca-gray">{isEn ? 'Loading verified routes…' : 'Cargando rutas verificadas…'}</p>}

        {!isLoading && failed && (
          <div className="bg-white border border-monarca-amber/20 rounded-xl p-6 text-monarca-gray">
            {isEn ? 'Tours are not available yet. The route database still needs to be verified.' : 'Los recorridos aún no están disponibles. La base de rutas todavía debe verificarse.'}
          </div>
        )}

        {!isLoading && !failed && tours.length === 0 && (
          <div className="bg-white border border-monarca-amber/20 rounded-xl p-8 max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-monarca-black">
              {isEn ? 'The first route is being built from real interviews and verified places.' : 'La primera ruta se está construyendo a partir de entrevistas reales y lugares verificados.'}
            </h2>
            <p className="text-monarca-gray mt-3">
              {isEn
                ? 'We will open bookings only after the route, stops, timing, meeting point, and operating details have been tested in the real world.'
                : 'Abriremos reservaciones únicamente después de probar en el mundo real la ruta, las paradas, los tiempos, el punto de encuentro y la operación.'}
            </p>
            <Link to="/guia" className="inline-block mt-5 text-monarca-terracotta font-semibold hover:underline">
              {isEn ? 'Explore La Guía Monarca meanwhile →' : 'Mientras tanto, explora La Guía Monarca →'}
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tours.map((tour) => (
            <article key={tour.id} className="bg-white border border-monarca-amber/20 rounded-xl p-6">
              <div className="flex items-center gap-4 text-xs text-monarca-gray mb-3">
                {tour.neighborhood && <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{tour.neighborhood}</span>}
                {tour.duration_minutes && <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{tour.duration_minutes} min</span>}
              </div>
              <h2 className="font-display text-2xl font-bold text-monarca-black">{isEn ? tour.title_en : tour.title_es}</h2>
              <p className="text-monarca-gray mt-3">{isEn ? tour.description_en : tour.description_es}</p>
              {(tour.price_mxn != null || tour.price_usd != null) && (
                <p className="mt-4 font-semibold text-monarca-black">
                  {tour.price_mxn != null ? `$${tour.price_mxn} MXN` : ''}
                  {tour.price_mxn != null && tour.price_usd != null ? ' · ' : ''}
                  {tour.price_usd != null ? `$${tour.price_usd} USD` : ''}
                </p>
              )}
              {tour.booking_url ? (
                <a href={tour.booking_url} target="_blank" rel="noreferrer" className="inline-block mt-5 text-monarca-terracotta font-semibold hover:underline">
                  {isEn ? 'View booking details →' : 'Ver detalles de reserva →'}
                </a>
              ) : (
                <span className="inline-block mt-5 text-sm text-monarca-gray">
                  {isEn ? 'Booking not open yet' : 'Reservaciones aún no abiertas'}
                </span>
              )}
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WalkingTours;
