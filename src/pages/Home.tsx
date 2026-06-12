import React, { useState } from 'react';
import PromoBar from '../components/PromoBar';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import EditorsPicks from '../components/EditorsPicks';
import Trending from '../components/Trending';
import Reviews from '../components/Reviews';
import Footer from '../components/Footer';
import ProductCatalog from '../components/ProductCatalog';
import { useSEO } from '../hooks/useSEO';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useSEO({
    title: 'Luxury Gift Hampers & Premium Gifting',
    description: 'Bloom & Box offers custom hand-crafted corporate gift collections, artisanal chocolate hampers, gourmet champagne baskets, and elegant flower boxes delivered pristine.',
    keywords: 'luxury hampers, boutique florist, gourmet gift baskets, flower boxes, corporate gifts, premium presents'
  });

  return (
    <div className="min-h-screen bg-royal-bg">
      <PromoBar />
      <Navbar />
      <main>
        <Hero />
        <EditorsPicks onSelectCategory={setSelectedCategory} />
        <Trending />
        <ProductCatalog selectedCategory={selectedCategory} />
        <Reviews />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
