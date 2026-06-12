import React, { useState } from 'react';
import { X } from 'lucide-react';

const PromoBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="h-8 bg-royal-card text-royal-gold text-[10px] flex items-center justify-center tracking-[0.2em] uppercase font-medium relative z-50 border-b border-royal-gold/10">
      <div className="w-full text-center px-8 truncate">
        ✨ Free Shipping on Orders Above ₹999 | Premium Luxury Hampers Available
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="text-royal-gold/80 hover:text-royal-gold absolute right-4 transition-colors p-1"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default PromoBar;
