import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ProductCard from './ProductCard';
import { Product } from '../types';

const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get('/api/products');
  return data.products;
};

const Trending = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  return (
    <section className="py-12 px-6 lg:px-10 border-t border-royal-gold/10 bg-royal-bg flex flex-col lg:flex-row lg:space-x-12 overflow-hidden flex-none">
      <div className="w-full lg:w-48 shrink-0 mb-8 lg:mb-0">
        <h3 className="text-xl font-serif italic mb-1 text-royal-gold">Trending Now</h3>
        <p className="text-[10px] text-royal-gold-light/70 leading-relaxed mb-6 max-w-xs">Most loved gifts from our curated seasonal catalog.</p>
        <div className="hidden lg:flex space-x-2">
          <button className="w-8 h-8 rounded-full border border-royal-gold/20 flex items-center justify-center text-royal-gold hover:bg-royal-gold hover:text-royal-bg transition">
             &larr;
          </button>
          <button className="w-8 h-8 rounded-full border border-royal-gold/20 flex items-center justify-center text-royal-gold hover:bg-royal-gold hover:text-royal-bg transition">
             &rarr;
          </button>
        </div>
        <button className="mt-8 border-b border-royal-gold pb-1 text-[10px] uppercase tracking-widest font-bold text-royal-gold hover:opacity-70 transition">
          View Collection
        </button>
      </div>

      <div className="flex-1 w-full overflow-hidden">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => (
              <div key={i} className="animate-pulse">
                <div className="bg-royal-card h-32 md:h-48 mb-3 rounded-sm border border-royal-gold/10"></div>
                <div className="bg-royal-card/50 h-3 w-2/3 mb-2"></div>
                <div className="bg-royal-card/50 h-3 w-1/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products?.filter(p => p.isTrending).slice(0, 4).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Trending;
