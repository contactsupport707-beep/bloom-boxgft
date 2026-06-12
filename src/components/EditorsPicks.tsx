import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Category } from '../types';
import { LazyImage } from './LazyImage';

const fetchCategories = async (): Promise<Category[]> => {
  const { data } = await axios.get('/api/categories');
  return data.categories;
};

const EditorsPicks = ({ onSelectCategory }: { onSelectCategory?: (category: string | null) => void }) => {
  const { data: categories, isLoading } = useQuery({ queryKey: ['categories'], queryFn: fetchCategories });

  const handleCategoryClick = (categoryName: string) => {
    if (onSelectCategory) {
      onSelectCategory(categoryName);
      const grid = document.getElementById('product-grid-section');
      if (grid) {
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section className="py-12 bg-royal-bg border-t border-royal-gold/10 px-6 lg:px-10 flex flex-col justify-center flex-none">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-royal-gold">Categories</h3>
        <span 
          className="text-[10px] uppercase tracking-widest opacity-50 underline cursor-pointer text-royal-gold-light hover:opacity-100 transition-opacity"
          onClick={() => handleCategoryClick('')}
        >
          View All
        </span>
      </div>

      {isLoading ? (
         <div className="flex space-x-4 overflow-hidden py-2">
            {[1,2,3,4].map(i => (
               <div key={i} className="flex-1 min-w-[200px] bg-royal-card animate-pulse h-24 rounded-lg"></div>
            ))}
         </div>
      ) : (
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1.5}
          breakpoints={{
            640: { slidesPerView: 2.5 },
            768: { slidesPerView: 3.5 },
            1024: { slidesPerView: 4 },
          }}
          className="w-full"
        >
          {categories?.map((cat) => (
            <SwiperSlide key={cat._id}>
              <div 
                className="flex-1 bg-royal-card h-24 rounded-lg flex items-center px-4 border border-royal-gold/10 hover:bg-royal-card/80 transition-colors cursor-pointer group"
                onClick={() => handleCategoryClick(cat.name)}
              >
                <div className="w-14 h-14 bg-royal-bg rounded-full flex items-center justify-center border border-royal-gold/20 mr-4 shadow-sm overflow-hidden flex-shrink-0 text-xl relative">
                  {cat.image ? (
                     <LazyImage src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110" containerClassName="absolute inset-0 w-full h-full" />
                  ) : (
                     <span className="text-royal-gold">{cat.icon || '✨'}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-royal-gold-light truncate">{cat.name}</p>
                  <p className="text-[9px] text-royal-gold/60 truncate">{cat.count} Collections</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default EditorsPicks;
