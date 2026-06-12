import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AppSettings } from '../types';
import { LazyImage } from '../components/LazyImage';
import { useSEO } from '../hooks/useSEO';

const fetchSettings = async (): Promise<AppSettings> => {
   const { data } = await axios.get('/api/settings');
   return data;
};

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod'>('upi');
  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard');
  const { data: settings } = useQuery({ queryKey: ['settings'], queryFn: fetchSettings });

  useSEO({
    title: 'Secure Checkout',
    description: 'Provide pristine shipping details and customize delivery options for your Bloom & Box gourmet gift boxes or hand-wrapped flower setups.',
    keywords: 'secure checkout, billing address, express courier, same-day delivery, luxury packaging'
  });

  // Currently hardcoded to 3499 as per original code for simplicity. 
  // In a real app, this would come from a Cart context.
  const subtotal = 3499; 
  
  const getShippingCost = () => {
     if (deliveryMethod === 'express') return 399;
     if (subtotal > 999) return 0;
     return 199;
  };

  const shippingCost = getShippingCost();
  const total = subtotal + shippingCost;

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 font-sans">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-6 lg:px-10 py-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Side: Shipping & Payment */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-8">
          
          <div className="bg-white p-8 shadow-sm border border-black/5 rounded-sm">
            <h2 className="text-xl font-serif text-black mb-6">Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold mb-2">First Name</label>
                  <input type="text" className="w-full border border-black/20 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-black" />
               </div>
               <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold mb-2">Last Name</label>
                  <input type="text" className="w-full border border-black/20 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-black" />
               </div>
               <div className="md:col-span-2">
                  <label className="block text-[11px] uppercase tracking-wider font-bold mb-2">Address</label>
                  <input type="text" className="w-full border border-black/20 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-black" />
               </div>
               <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold mb-2">City</label>
                  <input type="text" className="w-full border border-black/20 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-black" />
               </div>
               <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold mb-2">PIN Code</label>
                  <input type="text" className="w-full border border-black/20 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-black" />
               </div>
               <div className="md:col-span-2">
                  <label className="block text-[11px] uppercase tracking-wider font-bold mb-2">Mobile Number</label>
                  <input type="tel" className="w-full border border-black/20 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-black" />
               </div>
            </div>
          </div>

          <div className="bg-white p-8 shadow-sm border border-black/5 rounded-sm">
            <h2 className="text-xl font-serif text-black mb-6">Delivery Options</h2>
            
            <div className="space-y-4">
              <label className={`block border p-6 cursor-pointer rounded-sm transition ${deliveryMethod === 'standard' ? 'border-black bg-zinc-50' : 'border-black/10'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      name="delivery" 
                      value="standard" 
                      checked={deliveryMethod === 'standard'}
                      onChange={() => setDeliveryMethod('standard')}
                      className="h-4 w-4 text-black focus:ring-black" 
                    />
                    <span className="ml-3 font-bold text-xs uppercase tracking-wide">Standard Delivery</span>
                  </div>
                  <span className="font-bold text-xs">{subtotal > 999 ? 'Free' : '₹199'}</span>
                </div>
                <div className="mt-2 pl-7 text-xs text-zinc-500">
                  Estimated delivery in 3-5 days. Free for orders over ₹999.
                </div>
              </label>

              <label className={`block border p-6 cursor-pointer rounded-sm transition ${deliveryMethod === 'express' ? 'border-black bg-zinc-50' : 'border-black/10'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      name="delivery" 
                      value="express" 
                      checked={deliveryMethod === 'express'}
                      onChange={() => setDeliveryMethod('express')}
                      className="h-4 w-4 text-black focus:ring-black" 
                    />
                    <span className="ml-3 font-bold text-xs uppercase tracking-wide">Express Delivery</span>
                  </div>
                  <span className="font-bold text-xs">₹399</span>
                </div>
                <div className="mt-2 pl-7 text-xs text-zinc-500">
                  Estimated delivery in 2 days.
                </div>
              </label>
            </div>
          </div>

          <div className="bg-white p-8 shadow-sm border border-black/5 rounded-sm">
            <h2 className="text-xl font-serif text-black mb-6">Payment Method</h2>
            
            <div className="space-y-4">
              <label className={`block border p-6 cursor-pointer rounded-sm transition ${paymentMethod === 'upi' ? 'border-black bg-zinc-50' : 'border-black/10'}`}>
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="upi" 
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="h-4 w-4 text-black focus:ring-black" 
                  />
                  <span className="ml-3 font-bold text-xs uppercase tracking-wide">UPI Payment (GPay, PhonePe, Paytm)</span>
                </div>
                {paymentMethod === 'upi' && (
                  <div className="mt-6 pl-7 text-sm text-zinc-600">
                    <p className="mb-4">Scan the QR code below or use the UPI ID to pay. After payment, upload the screenshot of the transaction.</p>
                    <div className="bg-white p-6 border border-black/10 rounded-sm w-max mb-6">
                      <div className="w-40 h-40 bg-zinc-100 flex items-center justify-center font-mono text-xs text-zinc-500 mb-4 border border-black/10 overflow-hidden">
                        {settings?.payment?.qrCodeImage ? (
                           <div className="relative w-full h-full">
                             <LazyImage src={settings.payment.qrCodeImage} alt="QR Scanner" className="w-full h-full object-contain" containerClassName="absolute inset-0 w-full h-full" />
                           </div>
                        ) : (
                           'QR_SCANNER'
                        )}
                      </div>
                      <p className="font-mono font-medium text-center text-black tracking-tight">{settings?.payment?.upiId || 'bloomandbox@ybl'}</p>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold mb-2">Upload Payment Screenshot</label>
                      <input type="file" className="text-sm block w-full text-zinc-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-sm file:border-0
                        file:text-xs file:font-bold file:uppercase file:tracking-widest
                        file:bg-black file:text-white
                        hover:file:bg-zinc-800 transition-colors" />
                    </div>
                  </div>
                )}
              </label>

              <label className={`block border p-6 cursor-pointer rounded-sm transition ${paymentMethod === 'cod' ? 'border-black bg-zinc-50' : 'border-black/10'}`}>
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="cod" 
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="h-4 w-4 text-black focus:ring-black" 
                  />
                  <span className="ml-3 font-bold text-xs uppercase tracking-wide">Cash on Delivery</span>
                </div>
                {paymentMethod === 'cod' && (
                  <div className="mt-4 pl-7 text-sm text-red-600 bg-red-50/50 p-4 rounded-sm border border-red-100 flex items-start">
                    <span className="mr-3">⚠️</span>
                    <p>Cash on Delivery is currently unavailable. Please choose UPI Payment to continue.</p>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="bg-white p-8 shadow-sm border border-black/5 rounded-sm sticky top-24">
            <h2 className="text-xl font-serif text-black mb-6">Order Summary</h2>
            
            <div className="flex flex-col gap-4 mb-6 border-b border-black/10 pb-6">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-16 bg-zinc-100 border border-black/5 rounded-sm">
                    <LazyImage src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800" alt="Product" className="w-full h-full object-cover" containerClassName="absolute inset-0 w-full h-full" />
                    <span className="absolute -top-2 -right-2 bg-black text-white w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold z-10">1</span>
                  </div>
                  <span className="text-xs uppercase tracking-wide font-bold">The Royal Truffle Collection</span>
                </div>
                <span className="font-medium text-black">₹{subtotal.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 text-sm mb-6 pb-6 border-b border-black/10">
              <div className="flex justify-between">
                <span className="text-zinc-500">Subtotal</span>
                <span className="font-medium text-black">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Shipping</span>
                <span className="font-medium text-black">{shippingCost === 0 ? 'Free' : `₹${shippingCost}`}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-8">
              <span className="text-sm font-bold uppercase tracking-widest text-black">Total</span>
              <span className="text-2xl font-serif text-black">₹{total.toLocaleString()}</span>
            </div>
            
            <button 
              disabled={paymentMethod === 'cod'}
              className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-sm shadow-sm text-[11px] uppercase tracking-widest font-bold text-white transition ${paymentMethod === 'cod' ? 'bg-zinc-300 cursor-not-allowed' : 'bg-black hover:bg-zinc-800'}`}>
              Place Order
            </button>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
