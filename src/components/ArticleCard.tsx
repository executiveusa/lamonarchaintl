
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  date: string;
  index?: number;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  excerpt,
  imageUrl,
  category,
  date,
  index = 0,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Lazy load images and add animation when they come into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.disconnect();
      }
    };
  }, []);
  
  // Simulates image loading effect
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setImageLoaded(true);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible]);
  
  // Calculate animation delay based on index
  const animationDelay = (index % 5) * 100;
  
  return (
    <div 
      ref={cardRef} 
      className={cn(
        "article-card flex flex-col h-full",
        isVisible ? 'opacity-100 animate-fade-in-up' : 'opacity-0',
      )}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Image container */}
      <div className="relative overflow-hidden h-60">
        {/* Blurred placeholder */}
        <div 
          className={cn(
            "absolute inset-0 bg-monarca-cream transition-opacity duration-500", 
            imageLoaded ? "opacity-0" : "opacity-100"
          )}
          style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(20px)' }}
        />
        
        {/* Actual image */}
        <img 
          src={imageUrl}
          alt={title}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-500", 
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Category badge */}
        <div className="absolute top-4 left-4 bg-monarca-terracotta/90 text-white text-xs uppercase tracking-wider py-1 px-2 rounded">
          {category}
        </div>
      </div>
      
      {/* Content */}
      <div className="flex flex-col flex-grow p-6">
        <div className="text-monarca-gray text-sm mb-2">{date}</div>
        <h3 className="text-xl font-medium mb-2 transition-colors duration-300 hover:text-monarca-terracotta">
          {title}
        </h3>
        <p className="text-monarca-gray/90 text-sm flex-grow">{excerpt}</p>
        <a 
          href="#" 
          className="mt-4 inline-flex items-center text-monarca-terracotta hover:text-monarca-orange transition-colors duration-300"
        >
          Leer más
          <svg 
            className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ArticleCard;
