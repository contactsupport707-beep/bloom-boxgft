import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Product, Category } from '../../types';
import { Plus, Edit2, Trash2, Image as ImageIcon, Video, X } from 'lucide-react';

const AdminProducts = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'categories' | 'products'>('categories');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const [editingProduct, setEditingProduct] = useState<Product | Partial<Product> | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | Partial<Category> | null>(null);

  // Data endpoints
  const { data: categories, isLoading: catLoading } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await axios.get('/api/categories');
      return data.categories;
    }
  });

  const { data: products, isLoading: prodLoading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await axios.get('/api/products');
      return data.products;
    }
  });

  // Mutations
  const saveProductMutation = useMutation({
    mutationFn: async (product: Partial<Product>) => {
      if (product._id) return axios.put(`/api/products/${product._id}`, product);
      return axios.post('/api/products', product);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setEditingProduct(null);
    }
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => axios.delete(`/api/products/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] })
  });

  const saveCategoryMutation = useMutation({
    mutationFn: async (category: Partial<Category>) => {
      if (category._id) return axios.put(`/api/categories/${category._id}`, category);
      return axios.post('/api/categories', category);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setEditingCategory(null);
    }
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: async (id: string) => axios.delete(`/api/categories/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] })
  });

  // Handlers for Multiple Media Uploads
  const handleMultipleFilesChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'images' | 'videos') => {
    if (e.target.files && editingProduct) {
      const files = Array.from(e.target.files);
      
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
           setEditingProduct((prev: any) => {
             if (!prev) return prev;
             const newList = [...(prev[type] || []), reader.result as string];
             if (type === 'images' && !prev.image && newList.length > 0) {
                 return { ...prev, [type]: newList, image: newList[0] }; // set first image as main
             }
             return { ...prev, [type]: newList };
           });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeMedia = (type: 'images' | 'videos', index: number) => {
     setEditingProduct((prev: any) => {
        if (!prev) return prev;
        const newList = [...(prev[type] || [])];
        newList.splice(index, 1);
        if (type === 'images' && prev.image === prev[type][index]) {
            return { ...prev, [type]: newList, image: newList.length > 0 ? newList[0] : '' };
        }
        return { ...prev, [type]: newList };
     });
  };

  const handleCategoryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     if (e.target.files && e.target.files[0]) {
       const reader = new FileReader();
       reader.onloadend = () => setEditingCategory(prev => prev ? { ...prev, image: reader.result as string } : null);
       reader.readAsDataURL(e.target.files[0]);
     }
  };

  if (catLoading || prodLoading) return <div className="p-8">Loading data...</div>;

  return (
    <div className="p-8">
      <div className="flex gap-8 border-b border-black/10 mb-8">
        <button 
           onClick={() => { setActiveTab('categories'); setSelectedCategory(null); setEditingProduct(null); }}
           className={`pb-4 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'categories' ? 'border-b-2 border-black text-black' : 'text-zinc-500 hover:text-black'}`}
        >
           Categories
        </button>
        <button 
           onClick={() => setActiveTab('products')}
           className={`pb-4 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'products' ? 'border-b-2 border-black text-black' : 'text-zinc-500 hover:text-black'}`}
        >
           All Products
        </button>
      </div>

      {activeTab === 'categories' && !selectedCategory && !editingCategory && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-serif">Manage Categories</h2>
            <button onClick={() => setEditingCategory({ name: '', image: '', count: 0 })} className="bg-black text-white px-4 py-2 text-[11px] uppercase tracking-widest font-bold flex items-center gap-2">
              <Plus size={14} /> Add Category
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories?.map(cat => (
              <div key={cat._id} className="bg-white border border-black/5 overflow-hidden flex flex-col group cursor-pointer" onClick={() => setSelectedCategory(cat.name)}>
                <div className="h-32 bg-zinc-100 flex items-center justify-center relative">
                  {cat.image ? <img src={cat.image} className="w-full h-full object-cover" /> : <ImageIcon size={32} className="text-zinc-400" />}
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={(e) => { e.stopPropagation(); setEditingCategory(cat); }} className="bg-white p-1.5 shadow-sm rounded-sm hover:text-blue-500"><Edit2 size={12} /></button>
                    <button onClick={(e) => { e.stopPropagation(); if (confirm('Delete category?')) deleteCategoryMutation.mutate(cat._id); }} className="bg-white p-1.5 shadow-sm rounded-sm hover:text-red-500"><Trash2 size={12} /></button>
                  </div>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <h3 className="font-bold text-xs uppercase tracking-wide">{cat.name}</h3>
                  <span className="text-[10px] text-zinc-500">{products?.filter(p => p.category === cat.name).length || 0} items</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'categories' && editingCategory && (
        <div className="bg-white p-6 border border-black/5 text-black max-w-2xl">
          <h2 className="text-xl font-serif mb-6">{editingCategory._id ? 'Edit Category' : 'Add Category'}</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold mb-2">Category Name</label>
              <input type="text" value={editingCategory.name || ''} onChange={e => setEditingCategory({...editingCategory, name: e.target.value})} className="w-full border border-black/20 px-3 py-2 text-sm focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold mb-2">Category Image / Banner</label>
              <div className="flex items-center gap-4">
                 {editingCategory.image && <img src={editingCategory.image} className="w-20 h-20 object-cover border border-black/10" />}
                 <input type="file" accept="image/*" onChange={handleCategoryImageChange} className="text-sm" />
              </div>
            </div>
          </div>
          <div className="mt-8 flex gap-4">
            <button onClick={() => saveCategoryMutation.mutate(editingCategory)} className="bg-black text-white px-6 py-2 text-[11px] uppercase tracking-widest font-bold">Save</button>
            <button onClick={() => setEditingCategory(null)} className="border border-black px-6 py-2 text-[11px] uppercase tracking-widest font-bold">Cancel</button>
          </div>
        </div>
      )}

      {(activeTab === 'products' || selectedCategory) && !editingProduct && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
               {selectedCategory && (
                 <button onClick={() => setSelectedCategory(null)} className="text-[10px] text-zinc-500 hover:text-black mb-2 uppercase tracking-widest">
                   &larr; Back to Categories
                 </button>
               )}
               <h2 className="text-xl font-serif">
                 {selectedCategory ? `Products in "${selectedCategory}"` : 'All Products'}
               </h2>
            </div>
            <button onClick={() => setEditingProduct({ name: '', price: 0, category: selectedCategory || categories?.[0]?.name || '', image: '', images: [], videos: [] })} className="bg-black text-white px-4 py-2 text-[11px] uppercase tracking-widest font-bold flex items-center gap-2">
              <Plus size={14} /> Add Product
            </button>
          </div>
          
          <div className="bg-white border border-black/5">
            <table className="min-w-full text-black text-sm">
              <thead className="bg-zinc-50 border-b border-black/5">
                <tr>
                  <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-[10px]">Product</th>
                  {!selectedCategory && <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-[10px]">Category</th>}
                  <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-[10px]">Price</th>
                  <th className="px-6 py-4 text-right font-bold uppercase tracking-wider text-[10px]">Media</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {products?.filter(p => !selectedCategory || p.category === selectedCategory).map(product => (
                  <tr key={product._id} className="border-b border-black/5 hover:bg-zinc-50 transition">
                    <td className="px-6 py-4 flex items-center gap-4">
                       <img src={product.image || product.images?.[0]} className="w-10 h-10 object-cover bg-zinc-100 border border-black/5" />
                       <span className="font-bold text-xs">{product.name}</span>
                    </td>
                    {!selectedCategory && <td className="px-6 py-4 text-[11px] text-zinc-600 uppercase tracking-wide">{product.category}</td>}
                    <td className="px-6 py-4 text-[11px]">₹{product.price.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex items-center justify-end gap-3 text-zinc-400">
                          <div className="flex items-center gap-1" title={`${product.images?.length || 0} images`}><ImageIcon size={14} /> <span className="text-[10px]">{product.images?.length || 0}</span></div>
                          <div className="flex items-center gap-1" title={`${product.videos?.length || 0} videos`}><Video size={14} /> <span className="text-[10px]">{product.videos?.length || 0}</span></div>
                       </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <button onClick={() => setEditingProduct(product)} className="text-zinc-500 hover:text-black mr-4 transition"><Edit2 size={14} /></button>
                       <button onClick={() => { if (confirm('Delete product?')) deleteProductMutation.mutate(product._id); }} className="text-zinc-500 hover:text-red-600 transition"><Trash2 size={14} /></button>
                    </td>
                  </tr>
                ))}
                {products?.filter(p => !selectedCategory || p.category === selectedCategory).length === 0 && (
                   <tr><td colSpan={5} className="px-6 py-8 text-center text-zinc-500 text-xs">No products found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {editingProduct && (
        <div className="bg-white p-8 border border-black/5 text-black">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-serif">{editingProduct._id ? 'Edit Product' : 'Add Product'}</h2>
            <button onClick={() => setEditingProduct(null)} className="text-zinc-400 hover:text-black"><X size={24} /></button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold mb-2">Product Name</label>
                <input type="text" value={editingProduct.name || ''} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} className="w-full border border-black/20 px-3 py-2 text-sm focus:outline-none focus:border-black" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold mb-2">Category</label>
                <select value={editingProduct.category || ''} onChange={e => setEditingProduct({...editingProduct, category: e.target.value})} className="w-full border border-black/20 px-3 py-2 text-sm focus:outline-none focus:border-black bg-white">
                   <option value="">Select Category</option>
                   {categories?.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold mb-2">Price (₹)</label>
                  <input type="number" value={editingProduct.price || 0} onChange={e => setEditingProduct({...editingProduct, price: Number(e.target.value)})} className="w-full border border-black/20 px-3 py-2 text-sm focus:outline-none focus:border-black" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold mb-2">Original Price (₹)</label>
                  <input type="number" value={editingProduct.originalPrice || ''} onChange={e => setEditingProduct({...editingProduct, originalPrice: Number(e.target.value)})} className="w-full border border-black/20 px-3 py-2 text-sm focus:outline-none focus:border-black" />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <input type="checkbox" id="isTrending" checked={editingProduct.isTrending || false} onChange={e => setEditingProduct({...editingProduct, isTrending: e.target.checked})} className="w-4 h-4 text-black border-black/20 rounded focus:ring-black" />
                <label htmlFor="isTrending" className="text-[10px] uppercase tracking-wider font-bold">Trending Collection (Show on frontpage)</label>
              </div>
            </div>
            
            <div className="space-y-6">
               <div>
                 <label className="block text-[10px] uppercase tracking-wider font-bold mb-2">Product Images ({editingProduct.images?.length || 0})</label>
                 <div className="flex flex-wrap gap-2 mb-2">
                    {editingProduct.images?.map((img, idx) => (
                       <div key={idx} className="relative w-16 h-16 border border-black/10 group">
                          <img src={img} className="w-full h-full object-cover" />
                          <button onClick={() => removeMedia('images', idx)} className="absolute top-0 right-0 bg-red-500 text-white p-0.5 opacity-0 group-hover:opacity-100 transition"><X size={10} /></button>
                       </div>
                    ))}
                    <label className="w-16 h-16 border border-black/10 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-50 transition text-zinc-400 hover:text-black">
                       <Plus size={16} />
                       <input type="file" accept="image/*" multiple className="hidden" onChange={e => handleMultipleFilesChange(e, 'images')} />
                    </label>
                 </div>
                 <p className="text-[9px] text-zinc-500 uppercase tracking-widest">Select multiple images. First image acts as cover.</p>
               </div>

               <div>
                 <label className="block text-[10px] uppercase tracking-wider font-bold mb-2">Product Videos ({editingProduct.videos?.length || 0})</label>
                 <div className="flex flex-wrap gap-2 mb-2">
                    {editingProduct.videos?.map((vid, idx) => (
                       <div key={idx} className="relative w-16 h-16 border border-black/10 group bg-zinc-100 flex items-center justify-center">
                          <Video size={20} className="text-zinc-400" />
                          <button onClick={() => removeMedia('videos', idx)} className="absolute top-0 right-0 bg-red-500 text-white p-0.5 opacity-0 group-hover:opacity-100 transition"><X size={10} /></button>
                       </div>
                    ))}
                    <label className="w-16 h-16 border border-black/10 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-50 transition text-zinc-400 hover:text-black">
                       <Plus size={16} />
                       <input type="file" accept="video/*" multiple className="hidden" onChange={e => handleMultipleFilesChange(e, 'videos')} />
                    </label>
                 </div>
               </div>
            </div>
          </div>

          <div className="mt-8 flex gap-4 pt-6 border-t border-black/5">
            <button onClick={() => saveProductMutation.mutate(editingProduct)} className="bg-black text-white px-8 py-3 text-[11px] uppercase tracking-widest font-bold hover:bg-zinc-800 transition" disabled={saveProductMutation.isPending}>
              {saveProductMutation.isPending ? 'Saving...' : 'Save Product'}
            </button>
            <button onClick={() => setEditingProduct(null)} className="border border-black px-8 py-3 text-[11px] text-black uppercase tracking-widest font-bold hover:bg-zinc-50 transition">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
