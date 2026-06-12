import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
// Import placeholders for other routes, we'll create them next
import Login from './pages/Login';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/admin/AdminDashboard';
import WhatsAppWidget from './components/WhatsAppWidget';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
      <WhatsAppWidget />
    </>
  );
}
