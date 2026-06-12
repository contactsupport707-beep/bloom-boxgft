import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-royal-card border-t border-royal-gold/20 flex flex-col flex-none mt-auto">
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-royal-gold-light">
        
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-serif tracking-widest uppercase font-bold mb-6 text-royal-gold">Bloom & Box</h3>
          <p className="text-royal-gold-light/60 text-[11px] leading-relaxed mb-6">
            Curating luxury gifting experiences with premium hampers, floral arrangements, and personalized keepsakes for every celebration.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-royal-gold-light/40 hover:text-royal-gold transition"><Instagram size={16} /></a>
            <a href="#" className="text-royal-gold-light/40 hover:text-royal-gold transition"><Facebook size={16} /></a>
            <a href="#" className="text-royal-gold-light/40 hover:text-royal-gold transition"><Twitter size={16} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-6 text-royal-gold">Explore</h4>
          <ul className="flex flex-col gap-3 text-[11px] text-royal-gold-light/60">
            <li><Link to="/" className="hover:text-royal-gold transition">Shop All</Link></li>
            <li><Link to="/" className="hover:text-royal-gold transition">Our Story</Link></li>
            <li><Link to="/" className="hover:text-royal-gold transition">Corporate Gifting</Link></li>
            <li><Link to="/" className="hover:text-royal-gold transition">Track Order</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-6 text-royal-gold">Customer Care</h4>
          <ul className="flex flex-col gap-3 text-[11px] text-royal-gold-light/60">
            <li><Link to="/" className="hover:text-royal-gold transition">Contact Us</Link></li>
            <li><Link to="/" className="hover:text-royal-gold transition">FAQ</Link></li>
            <li><Link to="/" className="hover:text-royal-gold transition">Shipping Policy</Link></li>
            <li><Link to="/" className="hover:text-royal-gold transition">Returns & Exchanges</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-6 text-royal-gold">Stay Inspired</h4>
          <p className="text-royal-gold-light/60 text-[11px] mb-4">
            Subscribe to receive exclusive offers and gifting inspiration.
          </p>
          <form className="flex z-0 relative">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-transparent border-b border-royal-gold/30 text-[11px] py-2 px-0 w-full focus:outline-none focus:border-royal-gold transition text-royal-gold-light placeholder-royal-gold/40"
            />
            <button type="submit" className="text-[10px] uppercase tracking-[0.2em] font-bold ml-4 text-royal-gold hover:text-royal-gold-light transition">
              Subscribe
            </button>
          </form>
        </div>

      </div>

      <div className="h-12 bg-royal-bg border-t border-royal-gold/10 flex flex-col sm:flex-row items-center justify-between px-6 lg:px-10 text-[9px] uppercase tracking-widest text-royal-gold-light/40 w-full">
        <div>© {new Date().getFullYear()} Bloom & Box Luxury Gifting</div>
        <div className="flex space-x-6 mt-2 sm:mt-0">
          <Link to="/" className="hover:text-royal-gold transition-colors">Instagram</Link>
          <Link to="/" className="hover:text-royal-gold transition-colors">WhatsApp Support</Link>
          <Link to="/admin" className="hover:text-royal-gold transition-colors font-bold text-royal-gold">Admin Panel</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
