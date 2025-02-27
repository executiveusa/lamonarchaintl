
"use client";

import React, { useState, useRef, ElementRef } from "react";
import * as RadixSlider from "@radix-ui/react-slider";
import { Volume1, VolumeX } from "lucide-react";

interface VolumeSliderProps {
  initialVolume?: number;
  onChange?: (volume: number) => void;
  className?: string;
}

const VolumeSlider: React.FC<VolumeSliderProps> = ({ 
  initialVolume = 50, 
  onChange,
  className = ""
}) => {
  const [volume, setVolume] = useState(initialVolume);
  const ref = useRef<ElementRef<typeof RadixSlider.Root>>(null);

  const handleVolumeChange = (values: number[]) => {
    const newVolume = Math.floor(values[0]);
    setVolume(newVolume);
    if (onChange) {
      onChange(newVolume);
    }
  };

  const isMuted = volume === 0;

  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <button 
        onClick={() => handleVolumeChange([isMuted ? 50 : 0])}
        className="focus:outline-none"
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5 text-monarca-terracotta" />
        ) : (
          <Volume1 className="h-5 w-5 text-monarca-gray" />
        )}
      </button>

      <RadixSlider.Root
        ref={ref}
        value={[volume]}
        onValueChange={handleVolumeChange}
        step={1}
        min={0}
        max={100}
        className="relative flex w-full max-w-[150px] grow cursor-grab touch-none select-none items-center py-4 active:cursor-grabbing"
      >
        <RadixSlider.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-muted">
          <RadixSlider.Range className="absolute h-full bg-monarca-terracotta" />
        </RadixSlider.Track>
        <RadixSlider.Thumb className="block h-4 w-4 rounded-full bg-monarca-terracotta shadow-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" />
      </RadixSlider.Root>
    </div>
  );
};

export default VolumeSlider;
