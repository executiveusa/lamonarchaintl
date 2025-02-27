
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  overlay?: boolean;
  centered?: boolean;
  smallPadding?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  imageUrl,
  overlay = true,
  centered = true,
  smallPadding = false,
}) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  
  useEffect(() => {
    // Add animation classes after the component mounts
    if (titleRef.current) {
      titleRef.current.classList.add('animate-fade-in-up');
    }
    if (subtitleRef.current && subtitle) {
      subtitleRef.current.classList.add('animate-fade-in-up');
    }
  }, [subtitle]);
  
  return (
    <header 
      className={cn(
        "relative",
        smallPadding ? "py-16" : "py-28", 
        imageUrl ? "text-white" : "text-monarca-black"
      )}
    >
      {/* Background image if provided */}
      {imageUrl && (
        <>
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          {overlay && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/40" />
          )}
        </>
      )}
      
      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className={cn(
          "max-w-4xl",
          centered ? "mx-auto text-center" : "ml-0 text-left"
        )}>
          <h1 
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-medium mb-4 opacity-0 tracking-wider uppercase"
          >
            {title}
          </h1>
          
          {subtitle && (
            <p 
              ref={subtitleRef}
              className="text-lg md:text-xl opacity-0 delay-100 max-w-2xl mx-auto"
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
