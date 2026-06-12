import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { Product } from '../types';

const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get('/api/products');
  return data.products;
};

const ProductCatalog = ({ selectedCategory }: { selectedCategory?: string | null }) => {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const filteredProducts = products?.filter(p => !selectedCategory || p.category === selectedCategory);

  if (isLoading) {
    return (
      <section id="product-catalog-section" className="py-16 px-6 lg:px-10 bg-royal-bg border-t border-royal-gold/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-royal-gold/10 pb-6 animate-pulse">
          <div>
            <div className="bg-royal-gold/10 h-3 w-48 mb-4"></div>
            <div className="bg-royal-gold/20 h-10 w-64 md:w-96"></div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 gap-y-12">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="animate-pulse flex flex-col h-full bg-transparent">
              <div className="relative aspect-[4/5] bg-royal-card border border-royal-gold/10 overflow-hidden mb-3">
                 <div className="absolute inset-0 bg-gradient-to-tr from-royal-bg via-royal-gold/5 to-royal-bg opacity-50"></div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-royal-gold/10 flex items-center justify-center">
                    <div className="w-1/2 h-1/2 bg-royal-gold/10 rounded-full"></div>
                 </div>
              </div>
              <div className="bg-royal-gold/10 h-3 w-3/4 mb-2"></div>
              <div className="bg-royal-gold/20 h-4 w-1/3"></div>
            </div>
          ))}
        </div>
        </div>
      </section>
    );
  }

  return (
    <section id="product-catalog-section" className="py-16 px-6 lg:px-10 bg-royal-bg border-t border-royal-gold/10 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-royal-gold/10 pb-6">
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-semibold text-royal-gold mb-2">The Complete Selection</h3>
            <h2 className="text-3xl md:text-4xl font-serif italic text-royal-gold-light">
               {selectedCategory ? `${selectedCategory} Collection` : 'Signature Handcrafted Hampers'}
            </h2>
          </div>
          <div className="mt-6 md:mt-0 flex gap-4">
            <span className="text-[10px] uppercase tracking-widest text-royal-gold hover:text-royal-gold-light cursor-pointer transition-colors border-b border-royal-gold pb-0.5">All Gifts</span>
            <span className="text-[10px] uppercase tracking-widest text-royal-gold/50 hover:text-royal-gold cursor-pointer transition-colors">By Occasion</span>
            <span className="text-[10px] uppercase tracking-widest text-royal-gold/50 hover:text-royal-gold cursor-pointer transition-colors">By Recipient</span>
          </div>
        </div>

        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {filteredProducts?.map((product) => (
            <motion.div 
              key={product._id}
              className="h-full"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.4, ease: "easeOut" } }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-16 flex justify-center">
            <button className="px-8 py-3 border border-royal-gold text-royal-gold text-[10px] uppercase tracking-widest font-bold hover:bg-royal-gold hover:text-royal-bg transition-colors">
              Load More
            </button>
        </div>
      </div>
    </section>
  );
};

export default ProductCatalog;
