import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Heart, Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-40 w-full transition-all duration-300 bg-royal-bg/95 backdrop-blur-md border-b border-royal-gold/20 flex items-center flex-none ${isScrolled ? 'h-16' : 'h-20'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between w-full">
        
        {/* Left Section */}
        <div className="flex items-center space-x-6 w-1/3">
          <button 
            className="lg:hidden p-2 -ml-2 text-royal-gold-light hover:text-royal-gold transition"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
          
          <div className="hidden lg:flex items-center space-x-2 border-b border-royal-gold/30 pb-1 cursor-text w-48 text-royal-gold-light">
            <Search size={16} className="opacity-40" strokeWidth={2} />
            <span className="text-[11px] opacity-40 uppercase tracking-widest font-semibold flex-1 overflow-hidden truncate">Search collection...</span>
          </div>
        </div>

        {/* Center Logo */}
        <div className="flex-shrink-0 flex justify-center w-1/3">
          <Link to="/" className="text-2xl font-serif tracking-[0.25em] uppercase font-bold leading-none text-royal-gold text-center min-w-max">
            Bloom & Box
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-end space-x-6 w-1/3 text-royal-gold-light">
          <Link to="/" className="hover:text-royal-gold transition relative hidden sm:block" aria-label="Wishlist">
            <Heart size={20} strokeWidth={1.5} />
          </Link>
          <Link to="/login" className="hover:text-royal-gold transition" aria-label="User account">
             <User size={20} strokeWidth={1.5} />
          </Link>
          <Link to="/cart" className="hover:text-royal-gold transition relative flex items-center" aria-label="Shopping Cart">
            <ShoppingBag size={20} strokeWidth={1.5} />
            <span className="absolute -top-1 -right-1 bg-royal-gold text-royal-bg text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">0</span>
          </Link>
        </div>

      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-royal-bg border-r border-royal-gold/10 z-50 flex flex-col p-8 overflow-y-auto lg:hidden text-royal-gold-light"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-xl font-serif tracking-[0.2em] text-royal-gold uppercase font-bold">Bloom & Box</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-royal-gold-light hover:text-royal-gold transition-colors">
                  <X size={24} strokeWidth={1.5} />
                </button>
              </div>
              <div className="flex flex-col gap-8 text-[13px] uppercase tracking-[0.15em] font-medium">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-royal-gold transition-colors">Home</Link>
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-royal-gold transition-colors">Shop</Link>
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-royal-gold transition-colors">Categories</Link>
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-royal-gold transition-colors">About Us</Link>
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-royal-gold transition-colors">Contact Us</Link>
              </div>
              
              <div className="mt-auto pt-12 flex flex-col gap-6 border-t border-royal-gold/10">
                 <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 hover:text-royal-gold transition-colors text-[11px] uppercase tracking-widest font-semibold">
                    <User size={16} strokeWidth={1.5} />
                    <span>My Account</span>
                 </Link>
                 <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 hover:text-royal-gold transition-colors text-[11px] uppercase tracking-widest font-semibold">
                    <Heart size={16} strokeWidth={1.5} />
                    <span>Wishlist</span>
                 </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
