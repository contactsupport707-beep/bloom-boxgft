import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { AppSettings } from '../../types';

const AdminSettings = () => {
   const queryClient = useQueryClient();
   const { data: settings, isLoading } = useQuery<AppSettings>({
      queryKey: ['settings'],
      queryFn: async () => {
         const { data } = await axios.get('/api/settings');
         return data;
      }
   });

   const paymentMutation = useMutation({
      mutationFn: async (paymentData: AppSettings['payment']) => {
         return axios.put('/api/settings/payment', paymentData);
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['settings'] })
   });

   const whatsappMutation = useMutation({
      mutationFn: async (whatsappData: AppSettings['whatsapp']) => {
         return axios.put('/api/settings/whatsapp', whatsappData);
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['settings'] })
   });

   const [activeTab, setActiveTab] = useState<'payment' | 'whatsapp'>('payment');
   
   const [paymentForm, setPaymentForm] = useState({ upiId: '', qrCodeImage: '' });
   const [whatsappForm, setWhatsappForm] = useState({ number: '', enabled: true });

   useEffect(() => {
      if (settings) {
         setPaymentForm(settings.payment);
         setWhatsappForm(settings.whatsapp);
      }
   }, [settings]);

   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          setPaymentForm(prev => ({ ...prev, qrCodeImage: reader.result as string }));
        }
        reader.readAsDataURL(file);
      }
   };

   if (isLoading) return <div className="p-8">Loading settings...</div>;

   return (
      <div className="p-8">
         <h1 className="text-2xl font-serif text-black mb-8">Platform Settings</h1>
         
         <div className="flex gap-8 border-b border-black/10 mb-8">
            <button 
               onClick={() => setActiveTab('payment')}
               className={`pb-4 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'payment' ? 'border-b-2 border-black text-black' : 'text-zinc-500 hover:text-black'}`}
            >
               Payment details
            </button>
            <button 
               onClick={() => setActiveTab('whatsapp')}
               className={`pb-4 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'whatsapp' ? 'border-b-2 border-black text-black' : 'text-zinc-500 hover:text-black'}`}
            >
               WhatsApp Connection
            </button>
         </div>

         <div className="bg-white p-8 border border-black/5 text-black max-w-3xl">
            {activeTab === 'payment' && (
               <div>
                  <h2 className="text-lg font-serif mb-6">UPI Checkout Details</h2>
                  <div className="space-y-6">
                     <div>
                        <label className="block text-xs uppercase tracking-wider font-bold mb-2">UPI ID</label>
                        <input 
                           type="text" 
                           value={paymentForm.upiId} 
                           onChange={e => setPaymentForm({...paymentForm, upiId: e.target.value})}
                           placeholder="yourid@upi"
                           className="w-full max-w-md border border-black/20 px-4 py-2 text-sm focus:outline-none focus:border-black"
                        />
                     </div>
                     <div>
                        <label className="block text-xs uppercase tracking-wider font-bold mb-2">Checkout QR Code Scanner Image</label>
                        <div className="flex items-start gap-6">
                           <div className="w-32 h-32 bg-zinc-100 border border-black/10 flex items-center justify-center shrink-0">
                              {paymentForm.qrCodeImage ? (
                                 <img src={paymentForm.qrCodeImage} alt="QR Code" className="w-full h-full object-contain" />
                              ) : (
                                 <span className="text-xs text-zinc-400">No image</span>
                              )}
                           </div>
                           <div>
                              <input 
                                 type="file" 
                                 accept="image/*"
                                 onChange={handleImageChange}
                                 className="text-sm mb-2 block"
                              />
                              <p className="text-xs text-zinc-500">Upload the UPI QR code that users will scan at checkout.</p>
                           </div>
                        </div>
                     </div>
                     <button 
                        onClick={() => paymentMutation.mutate(paymentForm)}
                        disabled={paymentMutation.isPending}
                        className="bg-black text-white px-6 py-3 text-xs uppercase tracking-widest font-bold hover:bg-zinc-800 transition"
                     >
                        {paymentMutation.isPending ? 'Saving...' : 'Save Payment Changes'}
                     </button>
                  </div>
               </div>
            )}

            {activeTab === 'whatsapp' && (
               <div>
                  <h2 className="text-lg font-serif mb-6">WhatsApp Support Configuration</h2>
                  <div className="space-y-6">
                     <div>
                        <label className="block text-xs uppercase tracking-wider font-bold mb-2">Enable WhatsApp Chat</label>
                        <label className="flex items-center gap-3 cursor-pointer">
                           <input 
                              type="checkbox" 
                              checked={whatsappForm.enabled} 
                              onChange={e => setWhatsappForm({...whatsappForm, enabled: e.target.checked})}
                              className="w-4 h-4 text-black focus:ring-black border-gray-300 rounded"
                           />
                           <span className="text-sm">Show WhatsApp support button on the website</span>
                        </label>
                     </div>
                     <div>
                        <label className="block text-xs uppercase tracking-wider font-bold mb-2">WhatsApp Business Number</label>
                        <input 
                           type="text" 
                           value={whatsappForm.number} 
                           onChange={e => setWhatsappForm({...whatsappForm, number: e.target.value})}
                           placeholder="+91..."
                           className="w-full max-w-md border border-black/20 px-4 py-2 text-sm focus:outline-none focus:border-black"
                        />
                        <p className="text-xs text-zinc-500 mt-2">Include country code. Example: +919876543210</p>
                     </div>
                     <button 
                        onClick={() => whatsappMutation.mutate(whatsappForm)}
                        disabled={whatsappMutation.isPending}
                        className="bg-black text-white px-6 py-3 text-xs uppercase tracking-widest font-bold hover:bg-zinc-800 transition"
                     >
                        {whatsappMutation.isPending ? 'Saving...' : 'Save WhatsApp Configuration'}
                     </button>
                  </div>
               </div>
            )}
         </div>

      </div>
   );
};

export default AdminSettings;
