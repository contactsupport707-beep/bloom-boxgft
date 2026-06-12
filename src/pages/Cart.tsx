import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem } from '../types';
import { LazyImage } from '../components/LazyImage';
import { useSEO } from '../hooks/useSEO';

const mockCart: CartItem[] = [
  {
    _id: '1',
    name: 'The Royal Truffle Collection',
    price: 3499,
    category: 'Luxury Hampers',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800',
    quantity: 1,
    rating: 4.8,
    reviews: 124
  },
  {
    _id: '4',
    name: 'Velvet Rose & Macaron Set',
    price: 1899,
    category: 'Flower & Gift Combos',
    image: 'https://images.unsplash.com/photo-1543168256-418811576931?auto=format&fit=crop&q=80&w=800',
    quantity: 2,
    rating: 4.7,
    reviews: 210
  }
];

const Cart = () => {
  const [items, setItems] = useState<CartItem[]>(mockCart);

  useSEO({
    title: 'Your Shopping Cart',
    description: 'Review your selected luxury hampers, boutique gift sets, and floral configurations. Your premium choices are preserved in your secure high-end cart.',
    keywords: 'shopping cart, basket, checkout prep, luxury order'
  });

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 999 ? 0 : 150;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <h1 className="text-3xl font-serif text-black mb-8">Shopping Cart</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-6">Your cart is currently empty.</p>
            <Link to="/" className="bg-black text-white px-8 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-gray-800 transition">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <div className="border border-gray-200 shadow-sm rounded-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th scope="col" className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th scope="col" className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {items.map((item) => (
                      <tr key={item._id}>
                        <td className="px-6 py-6 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-20 w-16 flex-shrink-0 bg-gray-100 rounded-sm overflow-hidden relative">
                              <LazyImage src={item.image} alt={item.name} className="h-full w-full object-cover" containerClassName="absolute inset-0 w-full h-full" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{item.name}</div>
                              <div className="text-sm text-gray-500">{item.category}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                          ₹{item.price.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex items-center justify-center gap-3">
                            <button className="text-gray-400 hover:text-black">
                              <Minus size={16} />
                            </button>
                            <span className="text-sm text-black w-4 text-center">{item.quantity}</span>
                            <button className="text-gray-400 hover:text-black">
                              <Plus size={16} />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-gray-400 hover:text-red-500 transition">
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-gray-50 border border-gray-200 rounded-sm p-6">
                <h2 className="text-lg font-serif mb-6 border-b border-gray-200 pb-4">Order Summary</h2>
                
                <div className="flex flex-col gap-4 text-sm mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">{shipping === 0 ? 'Free' : `₹${shipping.toLocaleString()}`}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-8">
                  <span className="text-base font-medium">Total</span>
                  <span className="text-xl font-medium">₹{total.toLocaleString()}</span>
                </div>
                
                <Link to="/checkout" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-sm shadow-sm text-xs uppercase tracking-widest font-semibold text-white bg-black hover:bg-gray-800 transition">
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
