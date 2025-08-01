'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProfile } from '../../contexts/ProfileContext';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { updateProfile } = useProfile();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      // Update profile with basic signup info
      updateProfile({
        name: formData.name,
        email: formData.email,
        profileCompletion: 25, // Basic info completed
      });
      
      console.log('Signup attempt:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to onboarding after successful signup
      router.push('/onboarding');
    } catch (err) {
      setError('Something went wrong. Please try again.');
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
        <div className="container mx-auto px-8 min-h-screen flex items-center py-12">
          <div className="grid grid-cols-2 gap-16 xl:gap-24 w-full max-w-7xl mx-auto items-center">
            {/* Left Side - Branding & Features */}
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl xl:text-6xl font-extrabold text-white mb-6 drop-shadow-2xl leading-tight" style={{
                  textShadow: '0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(168, 102, 255, 0.6), 0 4px 8px rgba(0, 0, 0, 0.8)',
                  WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)'
                }}>Join Ellemate Community</h1>
                <p className="text-xl xl:text-2xl text-white font-medium drop-shadow-lg" style={{
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 255, 255, 0.3)'
                }}>Start your journey to finding the perfect roommate</p>
              </div>
              
              {/* Feature Highlights */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Personalized Matching</h3>
                    <p className="text-white/80">Complete detailed profile to get matched with compatible roommates who share your lifestyle</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Secure Communication</h3>
                    <p className="text-white/80">Connect safely with potential roommates through our verified platform with built-in messaging</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Premium Experience</h3>
                    <p className="text-white/80">Access to exclusive accommodations and priority support for the best roommate experience</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Signup Form */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-lg">
                <div className="text-center mb-8">
                  <h2 className="text-4xl xl:text-5xl font-bold text-white mb-4 drop-shadow-lg">Create Account</h2>
                  <p className="text-white/90 text-xl drop-shadow-lg">Join our community today</p>
                </div>
                
                <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 xl:p-10 border border-white/30 max-h-[75vh] overflow-y-auto">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                        {error}
                      </div>
                    )}

                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none transition-colors text-gray-900 bg-white"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none transition-colors text-gray-900 bg-white"
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        id="phone"  
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none transition-colors text-gray-900 bg-white"
                        placeholder="Enter your phone number"
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
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none transition-colors text-gray-900 bg-white"
                        placeholder="Create a password"
                        required
                        minLength={6}
                      />
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password
                      </label>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none transition-colors text-gray-900 bg-white"
                        placeholder="Confirm your password"
                        required
                        minLength={6}
                      />
                    </div>

                    {/* Sign Up Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-[#A866FF] to-[#6F3CFF] text-white font-semibold py-3 px-4 rounded-lg hover:from-[#A353F2] hover:to-[#7D3EFF] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Creating Account...' : 'Create Account'}
                    </button>
                  </form>

                  {/* Footer Links */}
                  <div className="mt-6 text-center space-y-4">
                    <p className="text-sm text-gray-600">
                      Already have an account?{' '}
                      <Link href="/auth/login" className="text-[#7D3EFF] hover:text-[#A866FF] font-medium transition-colors underline">
                        Sign in here
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
            }}>Create Account</h1>
            <p className="text-white text-base sm:text-lg font-medium drop-shadow-lg" style={{
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 255, 255, 0.3)'
            }}>Join us and get started today</p>
          </div>

          {/* Signup Form */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Name Field */}
              <div>
                <label htmlFor="name-mobile" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  id="name-mobile"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none transition-colors text-gray-900 bg-white"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email-mobile" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email-mobile"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none transition-colors text-gray-900 bg-white"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone-mobile" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  id="phone-mobile"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none transition-colors text-gray-900 bg-white"
                  placeholder="Enter your phone number"
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
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none transition-colors text-gray-900 bg-white"
                  placeholder="Create a password"
                  required
                  minLength={6}
                />
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword-mobile" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword-mobile"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none transition-colors text-gray-900 bg-white"
                  placeholder="Confirm your password"
                  required
                  minLength={6}
                />
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#A866FF] to-[#6F3CFF] text-white font-semibold py-3 px-4 rounded-lg hover:from-[#A353F2] hover:to-[#7D3EFF] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-6 text-center space-y-4">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-[#7D3EFF] hover:text-[#A866FF] font-medium transition-colors underline">
                  Sign in here
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