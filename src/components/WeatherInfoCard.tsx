
import React from "react";
import { Sun, CloudRain, Cloud, CloudSnow, Snowflake } from "lucide-react";

const WeatherInfoCard = () => {
  return (
    <div className="max-w-md p-4 rounded-lg bg-white text-gray-800 border shadow-md scale-[0.39] transform origin-top-right">
      <div className="flex justify-between space-x-4">
        <div className="flex flex-col items-center">
          <Sun className="w-14 h-14 p-1 text-yellow-500" />
          <h1 className="text-base font-semibold">Stockholm</h1>
        </div>
        <span className="font-bold text-5xl">14°</span>
      </div>
      <div className="flex justify-between mt-4 space-x-2 text-gray-600">
        <div className="flex flex-col items-center space-y-1">
          <span className="uppercase text-xs">wed</span>
          <CloudRain className="w-5 h-5" />
          <span className="text-xs">11°</span>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <span className="uppercase text-xs">thu</span>
          <Cloud className="w-5 h-5" />
          <span className="text-xs">17°</span>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <span className="uppercase text-xs">fri</span>
          <Cloud className="w-5 h-5" />
          <span className="text-xs">8°</span>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <span className="uppercase text-xs">sat</span>
          <Snowflake className="w-5 h-5" />
          <span className="text-xs">-2°</span>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <span className="uppercase text-xs">sun</span>
          <Cloud className="w-5 h-5" />
          <span className="text-xs">4°</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfoCard;
