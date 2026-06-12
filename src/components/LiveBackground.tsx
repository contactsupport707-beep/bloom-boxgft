import React from 'react';
import { motion } from 'framer-motion';

const LiveBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full bg-black overflow-hidden pointer-events-none">
      <motion.img 
        src="https://images.unsplash.com/photo-1572454591674-2739f30d8c40?auto=format&fit=crop&q=80&w=2000"
        srcSet="https://images.unsplash.com/photo-1572454591674-2739f30d8c40?auto=format&fit=crop&q=80&w=640 640w, https://images.unsplash.com/photo-1572454591674-2739f30d8c40?auto=format&fit=crop&q=80&w=1024 1024w, https://images.unsplash.com/photo-1572454591674-2739f30d8c40?auto=format&fit=crop&q=80&w=2000 2000w"
        sizes="100vw"
        loading="lazy"
        alt="Premium Flower Hamper Background"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ filter: 'blur(20px)', scale: 1.1 }}
        animate={{ 
          filter: 'blur(0px)',
          scale: [1.1, 1.15, 1.1],
        }}
        transition={{ 
          filter: { duration: 1.5, ease: "easeOut" },
          scale: { duration: 25, ease: "linear", repeat: Infinity }
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
    </div>
  );
};

export default LiveBackground;
