import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('/api/auth/admin-login', { username, password });
      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.token);
        onLogin();
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-serif text-black uppercase tracking-widest">
          Admin Portal
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-black/5 sm:rounded-sm sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
               <div className="bg-red-50 text-red-500 p-3 text-xs uppercase tracking-wide font-bold text-center border border-red-100">
                  {error}
               </div>
            )}
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-black mb-1">
                Admin Username
              </label>
              <div className="mt-1">
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-black/20 rounded-sm focus:outline-none focus:border-black sm:text-sm text-black" 
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-black mb-1">
                Password
              </label>
              <div className="mt-1">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-black/20 rounded-sm focus:outline-none focus:border-black sm:text-sm text-black" 
                />
              </div>
            </div>

            <div>
              <button 
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-sm shadow-sm text-[11px] uppercase tracking-widest font-bold text-white bg-black hover:bg-zinc-800 transition"
              >
                {loading ? 'Authenticating...' : 'Secure Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
