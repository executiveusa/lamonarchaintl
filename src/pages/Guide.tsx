import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useLanguageStore } from '@/services/articleService';
import { fetchPublishedVerifiedPlaces, Place } from '@/services/placeService';
import { ExternalLink, Instagram, MapPin, ShieldCheck } from 'lucide-react';

const Guide = () => {
  const { language } = useLanguageStore();
  const isEn = language === 'en';
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    fetchPublishedVerifiedPlaces()
      .then((rows) => {
        if (mounted) setPlaces(rows);
      })
      .catch((err) => {
        console.error('Guide loading failed:', err);
        if (mounted) setError(isEn ? 'We could not load the verified guide.' : 'No pudimos cargar la guía verificada.');
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [isEn]);

  return (
    <div className="min-h-screen bg-monarca-cream text-monarca-black">
      <Navigation />
      <main>
        <section className="border-b border-monarca-amber/20 bg-white">
          <div className="container mx-auto px-6 py-14 max-w-5xl">
            <div className="max-w-3xl">
              <span className="text-xs font-black uppercase tracking-[0.22em] text-monarca-terracotta">
                {isEn ? 'La Guía Monarca' : 'La Guía Monarca'}
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-bold mt-3 leading-tight">
                {isEn ? 'Places we have actually checked.' : 'Lugares que realmente hemos verificado.'}
              </h1>
              <p className="text-monarca-gray text-lg mt-5 leading-relaxed">
                {isEn
                  ? 'A small, editorial guide to Puerto Vallarta and nearby communities. We publish a place only after its basic identity and current information have been checked.'
                  : 'Una guía editorial y selectiva de Puerto Vallarta y comunidades cercanas. Publicamos un lugar únicamente después de revisar su identidad y su información actual.'}
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-12 max-w-5xl">
          {isLoading && (
            <p className="text-monarca-gray">{isEn ? 'Loading verified places…' : 'Cargando lugares verificados…'}</p>
          )}

          {error && <p className="text-red-700">{error}</p>}

          {!isLoading && !error && places.length === 0 && (
            <div className="border border-monarca-amber/30 bg-white rounded-lg p-8 max-w-2xl">
              <ShieldCheck className="h-6 w-6 text-monarca-terracotta mb-3" />
              <h2 className="font-display text-2xl font-bold">
                {isEn ? 'The first verified places are being prepared.' : 'Estamos preparando los primeros lugares verificados.'}
              </h2>
              <p className="text-monarca-gray mt-2">
                {isEn
                  ? 'We will not fill this guide with scraped or unverified listings just to make it look full.'
                  : 'No llenaremos esta guía con listados copiados o sin verificar solo para que parezca completa.'}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {places.map((place) => {
              const verifiedDate = place.last_checked_at || place.verified_at;
              const description = isEn ? place.description_en || place.description_es : place.description_es || place.description_en;

              return (
                <article key={place.id} className="bg-white border border-monarca-amber/20 rounded-lg p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-display text-2xl font-bold">{place.name}</h2>
                      <p className="text-sm text-monarca-gray flex items-center gap-1 mt-1">
                        <MapPin className="h-4 w-4" />
                        {[place.neighborhood, place.city].filter(Boolean).join(' · ')}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-green-800 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      {isEn ? 'Verified' : 'Verificado'}
                    </span>
                  </div>

                  {description && <p className="text-monarca-gray mt-4 leading-relaxed">{description}</p>}
                  {place.address && <p className="text-sm mt-4">{place.address}</p>}

                  <div className="flex flex-wrap gap-4 mt-5 text-sm">
                    {place.website_url && (
                      <a href={place.website_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-monarca-terracotta hover:underline">
                        {isEn ? 'Website' : 'Sitio web'} <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {place.instagram_url && (
                      <a href={place.instagram_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-monarca-terracotta hover:underline">
                        Instagram <Instagram className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>

                  {verifiedDate && (
                    <p className="text-xs text-monarca-gray/70 mt-5">
                      {isEn ? 'Last checked' : 'Última verificación'}: {new Date(verifiedDate).toLocaleDateString(isEn ? 'en-US' : 'es-MX')}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Guide;
