import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Users, Settings, Image as ImageIcon, Box, LogOut, LayoutList } from 'lucide-react';
import AdminProducts from './AdminProducts';
import AdminSettings from './AdminSettings';
import { AdminLogin } from './AdminLogin';
import { useSEO } from '../../hooks/useSEO';

const AdminSidebar = ({ onLogout }: { onLogout: () => void }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const links = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={18} /> },
    { name: 'Orders', path: '/admin/orders', icon: <ShoppingBag size={18} /> },
    { name: 'Products & Categories', path: '/admin/products', icon: <Box size={18} /> },
    { name: 'Customers', path: '/admin/customers', icon: <Users size={18} /> },
    { name: 'Visual Editor', path: '/admin/editor', icon: <ImageIcon size={18} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={18} /> },
  ];

  return (
    <div className="w-64 bg-black text-white h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6">
        <h2 className="text-2xl font-serif text-white tracking-tight">Bloom & Box</h2>
        <p className="text-[10px] text-zinc-400 mt-1 uppercase tracking-[0.2em] font-semibold">Admin Panel</p>
      </div>
      <div className="flex-1 py-6">
        <nav className="flex flex-col gap-1 px-4">
          {links.map(link => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-sm text-sm transition ${isActive(link.path) ? 'bg-white text-black font-medium' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'}`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-zinc-800">
        <button onClick={onLogout} className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-400 hover:text-white transition w-full text-left">
          <LogOut size={18} />
          Secure Logout
        </button>
      </div>
    </div>
  );
};

const DashboardHome = () => (
  <div className="p-8">
    <h1 className="text-2xl font-serif mb-8 text-black">Dashboard Overview</h1>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {[ 
        { label: 'Total Revenue', value: '₹1,24,500' },
        { label: 'Total Orders', value: '156' },
        { label: 'Active Products', value: '42' },
        { label: 'Pending Payments', value: '8' },
      ].map((stat, i) => (
        <div key={i} className="bg-white p-6 rounded-sm border border-black/5">
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-2">{stat.label}</p>
          <p className="text-3xl font-serif text-black">{stat.value}</p>
        </div>
      ))}
    </div>
    <div className="bg-white p-6 rounded-sm border border-black/5 h-96 flex items-center justify-center text-zinc-400 text-sm">
      <p>Revenue Chart Placeholder</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useSEO({
    title: 'Management Dashboard',
    description: 'Bloom & Box internal administrative workspace.',
    robots: 'noindex, nofollow'
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    navigate('/admin');
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#F9F9F7] flex">
      <AdminSidebar onLogout={handleLogout} />
      <div className="flex-1 ml-64 overflow-y-auto h-screen">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/orders" element={<div className="p-8"><h1 className="text-2xl font-serif text-black">Orders Management</h1></div>} />
          <Route path="/products" element={<AdminProducts />} />
          <Route path="/settings" element={<AdminSettings />} />
          <Route path="/editor" element={<div className="p-8"><h1 className="text-2xl font-serif mb-4 text-black">Visual CMS Editor</h1><p className="text-sm text-zinc-500">Drag and drop functionality will be implemented here.</p></div>} />
          <Route path="/customers" element={<div className="p-8"><h1 className="text-2xl font-serif text-black">Customers Dashboard</h1></div>} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
