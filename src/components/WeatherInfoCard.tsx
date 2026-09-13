
import React from "react";
import { Sun, Wind, Droplets } from "lucide-react";
import { useLanguageStore } from "@/services/articleService";

const WeatherInfoCard = () => {
  const { language } = useLanguageStore();
  const isEn = language === 'en';

  return (
    <div className="bg-monarca-black/90 backdrop-blur-md text-white rounded-xl p-3 shadow-lg border border-white/10 text-xs">
      <div className="flex items-center justify-between mb-1.5">
        <div>
          <div className="font-bold text-sm leading-tight">{isEn ? 'Mexico City' : 'CDMX'}</div>
          <div className="text-white/50 text-xs">{isEn ? 'Mexico' : 'México'}</div>
        </div>
        <div className="text-right">
          <div className="font-black text-xl text-monarca-amber">26°</div>
          <div className="text-white/50">{isEn ? 'Sunny' : 'Soleado'}</div>
        </div>
      </div>
      <div className="flex items-center justify-between text-white/60 pt-1.5 border-t border-white/10">
        <span className="flex items-center gap-1"><Sun className="h-3 w-3 text-monarca-amber" /> UV 6</span>
        <span className="flex items-center gap-1"><Wind className="h-3 w-3" /> 12km/h</span>
        <span className="flex items-center gap-1"><Droplets className="h-3 w-3" /> 45%</span>
      </div>
    </div>
  );
};

export default WeatherInfoCard;
