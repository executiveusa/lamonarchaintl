
import React from "react";
import { Sun, CloudRain, Cloud, CloudSnow, Snowflake } from "lucide-react";

const WeatherInfoCard = () => {
  return (
    <div className="max-w-md p-8 rounded-lg bg-white text-gray-800 border shadow-md">
      <div className="flex justify-between space-x-8">
        <div className="flex flex-col items-center">
          <Sun className="w-24 h-24 p-2 text-yellow-500" />
          <h1 className="text-xl font-semibold">Stockholm</h1>
        </div>
        <span className="font-bold text-8xl">14°</span>
      </div>
      <div className="flex justify-between mt-8 space-x-4 text-gray-600">
        <div className="flex flex-col items-center space-y-1">
          <span className="uppercase">wed</span>
          <CloudRain className="w-8 h-8" />
          <span>11°</span>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <span className="uppercase">thu</span>
          <Cloud className="w-8 h-8" />
          <span>17°</span>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <span className="uppercase">fri</span>
          <Cloud className="w-8 h-8" />
          <span>8°</span>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <span className="uppercase">sat</span>
          <Snowflake className="w-8 h-8" />
          <span>-2°</span>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <span className="uppercase">sun</span>
          <Cloud className="w-8 h-8" />
          <span>4°</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfoCard;
