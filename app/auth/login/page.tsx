'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProfile } from '../../contexts/ProfileContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { profile } = useProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      console.log('User signed in successfully:', user.uid);
      
      // Redirect based on profile completion
      if (profile && profile.profileCompletion >= 100) {
        router.push('/dashboard');
      } else {
        router.push('/onboarding');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      
      // Handle specific Firebase errors
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Invalid email or password');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later');
      } else {
        setError('Invalid email or password');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative font-poppins">
      {/* Background Images - Responsive */}
      {/* Desktop Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
        style={{
          backgroundImage: "url('/auth-background-desktop.jpg')"
        }}
      >
        {/* Light overlay to maintain vibrancy while ensuring text readability */}
        <div className="absolute inset-0 bg-black/25"></div>
      </div>
      
      {/* Mobile Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat block md:hidden"
        style={{
          backgroundImage: "url('/auth-background.jpg')"
        }}
      >
        {/* Light overlay to maintain vibrancy while ensuring text readability */}
        <div className="absolute inset-0 bg-black/25"></div>
      </div>

      {/* Desktop Layout (lg+) */}
      <div className="hidden lg:block relative z-10 min-h-screen">
        <div className="container mx-auto px-8 min-h-screen flex items-center">
          <div className="grid grid-cols-2 gap-16 xl:gap-24 w-full max-w-7xl mx-auto items-center">
            {/* Left Side - Branding & Features */}
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl xl:text-6xl font-extrabold text-white mb-6 drop-shadow-2xl leading-tight" style={{
                  textShadow: '0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(168, 102, 255, 0.6), 0 4px 8px rgba(0, 0, 0, 0.8)',
                  WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)'
                }}>Welcome Back to Ellemate</h1>
                <p className="text-xl xl:text-2xl text-white font-medium drop-shadow-lg" style={{
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 255, 255, 0.3)'
                }}>Your journey to the perfect roommate continues</p>
              </div>
              
              {/* Feature Highlights */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Smart Matching Algorithm</h3>
                    <p className="text-white/80">Find compatible roommates based on lifestyle, preferences, and personality traits</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8v-4a1 1 0 011-1h2a1 1 0 011 1v4m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Premium Room Selection</h3>
                    <p className="text-white/80">Browse verified accommodations with detailed amenities and transparent pricing</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Safe & Secure Platform</h3>
                    <p className="text-white/80">Verified profiles and secure communication for peace of mind</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Login Form */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-lg">
                <div className="text-center mb-8">
                  <h2 className="text-4xl xl:text-5xl font-bold text-white mb-4 drop-shadow-lg">Sign In</h2>
                  <p className="text-white/90 text-xl drop-shadow-lg">Access your account</p>
                </div>
                
                <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-10 xl:p-12 border border-white/30">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                        {error}
                      </div>
                    )}

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none transition-colors text-gray-900 bg-white"
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    {/* Password Field */}
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none transition-colors text-gray-900 bg-white"
                        placeholder="Enter your password"
                        required
                      />
                    </div>

                    {/* Login Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-[#A866FF] to-[#6F3CFF] text-white font-semibold py-3 px-4 rounded-lg hover:from-[#A353F2] hover:to-[#7D3EFF] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>
                  </form>

                  {/* Footer Links */}
                  <div className="mt-6 text-center space-y-4">
                    <p className="text-sm text-gray-600">
                      Don't have an account?{' '}
                      <Link href="/auth/signup" className="text-[#7D3EFF] hover:text-[#A866FF] font-medium transition-colors underline">
                        Sign up here
                      </Link>
                    </p>
                    <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                      ← Back to home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout (< lg) */}
      <div className="lg:hidden relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 drop-shadow-2xl leading-tight" style={{
              textShadow: '0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(168, 102, 255, 0.6), 0 4px 8px rgba(0, 0, 0, 0.8)',
              WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)'
            }}>Welcome Back</h1>
            <p className="text-white text-base sm:text-lg font-medium drop-shadow-lg" style={{
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 255, 255, 0.3)'
            }}>Sign in to your account</p>
          </div>

          {/* Login Form */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Email Field */}
              <div>
                <label htmlFor="email-mobile" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email-mobile"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none transition-colors text-gray-900 bg-white"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password-mobile" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password-mobile"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none transition-colors text-gray-900 bg-white"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#A866FF] to-[#6F3CFF] text-white font-semibold py-3 px-4 rounded-lg hover:from-[#A353F2] hover:to-[#7D3EFF] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-6 text-center space-y-4">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link href="/auth/signup" className="text-[#7D3EFF] hover:text-[#A866FF] font-medium transition-colors underline">
                  Sign up here
                </Link>
              </p>
              <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                ← Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 