import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const reviews = [
  {
    id: 1,
    name: 'Priya Sharma',
    date: 'March 14, 2026',
    rating: 5,
    text: 'Absolutely stunning presentation. The Royal Truffle Collection made for the perfect anniversary gift. The attention to detail is truly unmatched.',
  },
  {
    id: 2,
    name: 'Ananya Desai',
    date: 'February 28, 2026',
    rating: 5,
    text: 'I ordered the Midnight Elegance Box for my husband, and he was blown away. The combination of flowers and premium chocolates was exquisite.',
  },
  {
    id: 3,
    name: 'Rahul Varma',
    date: 'January 10, 2026',
    rating: 4,
    text: 'A beautifully packaged gift that arrived exactly on time. The express delivery option is a lifesaver for last-minute luxury gifting.',
  }
];

const Reviews = () => {
  return (
    <section className="py-24 bg-royal-card border-t border-royal-gold/10 flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <span className="text-[11px] uppercase tracking-[0.3em] font-semibold block text-royal-gold mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-serif italic text-royal-gold-light">
            Our Customers' Experiences
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-royal-bg p-8 border border-royal-gold/20 shadow-sm text-center"
            >
              <div className="flex justify-center mb-4 text-royal-gold">
                {[...Array(5)].map((_, idx) => (
                  <Star 
                    key={idx} 
                    size={14} 
                    fill={idx < review.rating ? 'currentColor' : 'none'} 
                    className={idx < review.rating ? 'text-royal-gold' : 'text-royal-gold/30'}
                  />
                ))}
              </div>
              <p className="text-[13px] text-royal-gold-light/80 italic leading-relaxed mb-6 font-serif">
                "{review.text}"
              </p>
              <div className="text-[10px] uppercase font-bold tracking-widest text-royal-gold-light">
                {review.name}
              </div>
              <div className="text-[9px] text-royal-gold/60 mt-1 uppercase tracking-widest">
                {review.date}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
