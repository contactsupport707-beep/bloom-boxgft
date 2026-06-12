import React, { useState, useEffect } from 'react';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Product } from '../types';
import { LazyImage } from './LazyImage';

const ProductCard = ({ product }: { product: Product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = (product.images && product.images.length > 0) 
     ? product.images 
     : (product.image ? [product.image] : ['__NO_IMAGE__']);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 3000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [images.length]);

  return (
    <div className="group flex flex-col cursor-pointer h-full overflow-hidden">
      <div className="relative aspect-[4/5] md:aspect-square overflow-hidden bg-royal-card mb-3 border border-royal-gold/10 shrink-0">
        
        {product.originalPrice && product.originalPrice > product.price && (
          <div className="absolute top-2 left-2 z-10 bg-royal-gold text-royal-bg text-[8px] uppercase font-bold tracking-widest px-2 py-1">
            Sale
          </div>
        )}

        <div className="absolute top-2 right-2 w-7 h-7 bg-royal-bg/90 rounded-full flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm border border-royal-gold/20">
           <Heart size={12} className="text-royal-gold" />
        </div>

        <div className="absolute bottom-2 left-2 right-2 flex justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity">
           <button className="w-full bg-royal-bg/90 hover:bg-royal-gold hover:text-royal-bg text-royal-gold py-2 text-[9px] uppercase tracking-widest font-bold transition flex justify-center items-center gap-2 shadow-sm border border-royal-gold/20">
             <ShoppingBag size={12} /> Add
           </button>
        </div>
        
        <div className="absolute inset-0">
          {images.map((imgSrc, idx) => (
            <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentImageIndex ? 'opacity-100 z-0' : 'opacity-0 -z-10'}`}>
              <LazyImage
                src={imgSrc} 
                alt={product.name} 
                className="w-full h-full object-cover"
                containerClassName="w-full h-full"
              />
            </div>
          ))}
        </div>
        
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            {images.map((_, idx) => (
               <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-royal-gold' : 'bg-royal-gold/30'}`}></div>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex flex-col flex-1 justify-between mt-1">
        <div className="flex flex-col mb-1">
          <div className="flex justify-between items-start gap-2 mb-1 min-h-[32px]">
            <p className="text-[10px] uppercase font-bold tracking-tight text-royal-gold-light line-clamp-2 leading-snug flex-1 text-ellipsis overflow-hidden">{product.name}</p>
            <div className="flex items-center text-[9px] font-bold text-royal-bg bg-royal-gold px-1.5 py-0.5 rounded-sm shrink-0 mt-0.5">
              {product.rating}
              <Star size={8} className="ml-0.5" fill="currentColor" />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-end">
          <p className="text-[11px] font-medium text-royal-gold tracking-tighter">
            ₹{product.price.toLocaleString()}
          </p>
          {product.originalPrice && (
            <p className="text-[9px] text-royal-gold/50 line-through tracking-tighter">
              ₹{product.originalPrice.toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
