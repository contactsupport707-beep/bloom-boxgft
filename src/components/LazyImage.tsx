import React, { useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className = '', containerClassName = '', ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Auto-generate srcset for Unsplash images for responsive image sets
  let srcSet;
  if (src && typeof src === 'string' && src.includes('images.unsplash.com')) {
    const baseUrl = src.split('&w=')[0].split('?')[0] + '?auto=format&fit=crop&q=80';
    srcSet = `${baseUrl}&w=320 320w, ${baseUrl}&w=640 640w, ${baseUrl}&w=1024 1024w, ${baseUrl}&w=2000 2000w`;
  }

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      <div 
        className={`absolute inset-0 bg-royal-card flex items-center justify-center transition-opacity duration-700 ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} 
      >
        <div className="w-10 h-10 rounded-full border border-royal-gold/20 flex flex-col items-center justify-center relative">
           <div className="absolute inset-0 border-t border-royal-gold rounded-full animate-spin"></div>
        </div>
      </div>
      
      {hasError && (
        <div className="absolute inset-0 bg-royal-card border border-royal-gold/10 flex flex-col items-center justify-center px-4 text-center z-10 transition-opacity duration-500">
           <span className="font-serif italic text-royal-gold text-sm mb-1 opacity-60">Bloom & Box</span>
           <span className="text-[7px] uppercase tracking-widest text-royal-gold/40">Image Unavailable</span>
        </div>
      )}

      {src && !hasError && (
        <img
          src={src}
          alt={alt}
          srcSet={srcSet}
          sizes="(max-width: 640px) 320px, (max-width: 1024px) 640px, 1024px"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setHasError(true);
            setIsLoaded(true);
          }}
          className={`${className} transition-all duration-700 ${isLoaded ? 'scale-100 blur-0' : 'scale-105 blur-sm'}`}
          {...props}
        />
      )}
    </div>
  );
};
