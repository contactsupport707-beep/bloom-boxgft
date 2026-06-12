import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSEO } from '../hooks/useSEO';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  useSEO({
    title: isLogin ? 'Customer Login' : 'Create Premium Membership',
    description: 'Sign in to access your custom corporate orders and saved luxury hamper setups, or register to join the prestigious Bloom & Box circle of gifts.',
    keywords: 'member login, customer lobby, register, membership benefits'
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-serif text-gray-900">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your details to access your Bloom & Box account.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-sm sm:rounded-sm sm:px-10 border border-gray-100">
            <form className="space-y-6" action="#" method="POST">
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="mt-1">
                    <input id="name" name="name" type="text" required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm" />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input id="email" name="email" type="email" autoComplete="email" required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input id="password" name="password" type="password" autoComplete="current-password" required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm" />
                </div>
              </div>

              {isLogin && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox"
                      className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded" />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-gray-600 hover:text-black">
                      Forgot your password?
                    </a>
                  </div>
                </div>
              )}

              <div>
                <button type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-sm shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                  {isLogin ? 'Sign in' : 'Create Account'}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-sm shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
