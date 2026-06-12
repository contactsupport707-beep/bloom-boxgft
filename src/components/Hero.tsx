import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import LiveBackground from './LiveBackground';
import { motion } from 'framer-motion';

const slides = [
  {
    id: 1,
    title: 'Luxury Gift Hampers',
    subtitle: 'Curated elegance for your special ones.',
  },
  {
    id: 2,
    title: 'Birthday Collections',
    subtitle: 'Make their day unforgettable.',
  },
  {
    id: 3,
    title: 'Wedding Hampers',
    subtitle: 'Celebrate love with premium curation.',
  }
];

const Hero = () => {
  return (
    <section className="w-full relative min-h-[100vh] md:min-h-[70vh] lg:h-[768px] flex items-center overflow-hidden bg-royal-bg">
      {/* Animated Live Background for the overall section */}
      <motion.div 
        animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-royal-gold via-royal-bg to-royal-bg"
        style={{ backgroundSize: '200% 200%' }}
      />
      
      <div className="absolute inset-0 flex flex-col md:flex-row w-full h-full">
        <div className="w-full md:w-1/2 h-[60vh] md:h-full z-10 relative bg-royal-bg/40 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none">
          <Swiper
            modules={[Autoplay, EffectFade, Navigation, Pagination]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={1000}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, el: '.swiper-pagination-custom' }}
            navigation={false}
            loop={true}
            className="h-full w-full"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id} className="h-full w-full">
                <div className="h-full flex flex-col justify-center px-8 md:px-20 py-10 md:py-0 overflow-hidden">
                  <span className="text-[11px] uppercase tracking-[0.3em] font-semibold mb-3 block text-royal-gold">New Arrivals</span>
                  <h2 className="text-4xl md:text-5xl font-serif italic mb-4 leading-[1.1] tracking-tight text-royal-gold-light break-words">
                    {slide.title}
                  </h2>
                  <p className="text-[13px] text-royal-gold-light/70 mb-8 max-w-sm leading-relaxed line-clamp-3 md:line-clamp-none">
                    {slide.subtitle} Elegantly curated collections for those who appreciate the finer things. Every box tells a story of craftsmanship and celebration.
                  </p>
                  <button className="w-max px-8 py-4 bg-royal-gold text-royal-bg text-[11px] uppercase tracking-widest font-bold hover:bg-royal-gold-light transition-colors shadow-xl shadow-black/30 shrink-0">
                    Shop Collection
                  </button>
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-pagination-custom absolute bottom-12 left-8 md:left-20 z-50 flex gap-2"></div>
          </Swiper>
        </div>

        {/* Live background showcase on the right / background on mobile */}
        <div className="relative w-full md:w-1/2 h-[40vh] md:h-full border-t md:border-t-0 md:border-l border-royal-gold/10 z-0 md:z-10 bg-royal-bg overflow-hidden pointer-events-none md:pointer-events-auto">
          <LiveBackground />
          <div className="hidden md:block absolute top-8 right-8 z-20 text-[10px] uppercase font-bold tracking-widest text-royal-gold/60">
            Cinematic Showcase
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
