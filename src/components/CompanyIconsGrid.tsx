
import React from "react";
import { useLanguageStore } from "@/services/articleService";

const partners = [
  { name: "Kupari Media", tagline_en: "Publisher", tagline_es: "Editorial", color: "#D35400" },
  { name: "Barrio Santa María", tagline_en: "Our Roots", tagline_es: "Nuestras Raíces", color: "#1A1A1A" },
  { name: "Puerto Vallarta", tagline_en: "Issue 1 City", tagline_es: "Ciudad Edición 1", color: "#2980B9" },
  { name: "La Labyrinha", tagline_en: "CDMX", tagline_es: "CDMX", color: "#27AE60" },
  { name: "Directorio Kupuri™", tagline_en: "Business Network", tagline_es: "Red de Negocios", color: "#8E44AD" },
];

const CompanyIconsGrid = () => {
  const { language } = useLanguageStore();
  const isEn = language === 'en';

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {partners.map((partner, i) => (
        <div
          key={i}
          className="bg-white rounded-xl border border-black/5 p-5 flex flex-col items-center text-center hover:shadow-md transition-shadow"
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mb-3 flex-shrink-0"
            style={{ backgroundColor: partner.color }}
          >
            {partner.name.charAt(0)}
          </div>
          <div className="font-semibold text-monarca-black text-sm leading-tight">{partner.name}</div>
          <div className="text-monarca-gray text-xs mt-0.5">
            {isEn ? partner.tagline_en : partner.tagline_es}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompanyIconsGrid;
