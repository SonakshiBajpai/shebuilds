'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useProfile } from '../contexts/ProfileContext';

// Mock matches based on user preferences
const generateMatches = (profile: any) => {
  const baseMatches = [
    {
      id: 1,
      name: "Priya Sharma",
      age: 24,
      profession: "UX Designer",
      avatar: "/profile1.jpg",
      location: "Koramangala, Bangalore",
      personality: { extroversion: 4, agreeableness: 4, conscientiousness: 5 }
    },
    {
      id: 2,
      name: "Ananya Patel",
      age: 26,
      profession: "Marketing Manager",
      avatar: "/profile2.jpg",
      location: "Indiranagar, Bangalore",
      personality: { extroversion: 5, agreeableness: 4, conscientiousness: 4 }
    },
    {
      id: 3,
      name: "Kavya Reddy",
      age: 23,
      profession: "Data Analyst",
      avatar: "/profile3.jpg",
      location: "HSR Layout, Bangalore",
      personality: { extroversion: 3, agreeableness: 5, conscientiousness: 5 }
    }
  ];

  return baseMatches.map(match => {
    // Calculate compatibility based on personality and preferences
    const personalityMatch = calculatePersonalityMatch(profile.personality, match.personality);
    const locationMatch = match.location.toLowerCase().includes(profile.preferredCity?.toLowerCase() || '') ? 20 : 0;
    const compatibility = Math.min(95, Math.max(65, personalityMatch + locationMatch));
    
    // Generate shared traits based on profile
    const sharedTraits = generateSharedTraits(profile, match);
    
    return {
      ...match,
      compatibility: Math.round(compatibility),
      sharedTraits
    };
  });
};

const calculatePersonalityMatch = (userPersonality: any, matchPersonality: any) => {
  const traits = ['extroversion', 'agreeableness', 'conscientiousness'];
  let totalMatch = 0;
  
  traits.forEach(trait => {
    const diff = Math.abs(userPersonality[trait] - matchPersonality[trait]);
    totalMatch += Math.max(0, 20 - (diff * 4)); // Max 20 points per trait
  });
  
  return totalMatch;
};

const generateSharedTraits = (profile: any, match: any) => {
  const possibleTraits = [
    'Early Bird', 'Night Owl', 'Clean & Organized', 'Fitness Enthusiast',
    'Cooking Lover', 'Movie Buff', 'Book Reader', 'Travel Enthusiast',
    'Tech Savvy', 'Creative', 'Social', 'Quiet & Peaceful'
  ];
  
  // Select traits based on profile preferences
  const traits = [];
  if (profile.sleepSchedule === 'early-bird') traits.push('Early Bird');
  if (profile.sleepSchedule === 'night-owl') traits.push('Night Owl');
  if (profile.cleanliness === 'very-clean') traits.push('Clean & Organized');
  if (profile.foodHabits === 'vegetarian') traits.push('Cooking Lover');
  
  // Add random traits to make it 3
  while (traits.length < 3) {
    const randomTrait = possibleTraits[Math.floor(Math.random() * possibleTraits.length)];
    if (!traits.includes(randomTrait)) {
      traits.push(randomTrait);
    }
  }
  
  return traits.slice(0, 3);
};



export default function DashboardPage() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [editForm, setEditForm] = useState<{
    name?: string;
    profession?: string;
    currentCity?: string;
    age?: string;
  }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { profile, updateProfile, uploadProfilePicture, isLoading } = useProfile();

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen relative flex items-center justify-center font-poppins">
        {/* Background Images - Responsive - Full Coverage */}
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
          style={{
            backgroundImage: "url('/auth-background-desktop.jpg')"
          }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat block md:hidden"
          style={{
            backgroundImage: "url('/auth-background.jpg')"
          }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        <div className="relative z-10 text-center bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7D3EFF] mx-auto mb-4"></div>
          <p className="text-gray-900 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  const matches = generateMatches(profile);

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        await uploadProfilePicture(file);
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      }
    }
  };

  const handleEditProfile = () => {
    setEditForm({
      name: profile.name,
      profession: profile.profession,
      currentCity: profile.currentCity,
      age: profile.age
    });
    setShowEditProfile(true);
  };

  const handleSaveProfile = () => {
    updateProfile(editForm);
    setShowEditProfile(false);
  };

  return (
    <div className="min-h-screen relative font-poppins">
      {/* Background Images - Responsive - Full Coverage */}
      {/* Desktop Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
        style={{
          backgroundImage: "url('/auth-background-desktop.jpg')"
        }}
      >
        {/* Light overlay for better readability */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      {/* Mobile Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat block md:hidden"
        style={{
          backgroundImage: "url('/auth-background.jpg')"
        }}
      >
        {/* Light overlay for better readability */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
             {/* Header - Floating */}
       <div className="bg-white/90 backdrop-blur-md rounded-2xl mx-4 mt-6 mb-2 shadow-xl border border-white/30 sticky top-6 z-40">
                 <div className="px-6 py-4">
           <div className="flex items-center justify-between w-full">
             {/* Left side - Profile and Welcome */}
             <div className="flex items-center space-x-3 flex-shrink-0">
               <div className="relative">
                 {profile.profilePicture ? (
                   <img
                     src={profile.profilePicture}
                     alt={profile.name}
                     className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                   />
                 ) : (
                   <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#A866FF] to-[#6F3CFF] flex items-center justify-center">
                     <span className="text-white font-bold text-sm sm:text-base">
                       {profile.name.charAt(0).toUpperCase()}
                     </span>
                   </div>
                 )}
               </div>
               <div className="hidden sm:block">
                 <h1 className="text-2xl font-extrabold text-gray-900">
                   Welcome back, {profile.name}!
                 </h1>
                 <p className="text-sm text-gray-600">
                   {profile.profession} in {profile.currentCity}
                 </p>
               </div>
               <div className="block sm:hidden">
                 <h1 className="text-lg font-extrabold text-gray-900">
                   {profile.name}
                 </h1>
                 <p className="text-xs text-gray-600">{profile.profileCompletion}%</p>
               </div>
             </div>
             
             {/* Right side - Navigation Buttons */}
             <div className="flex items-center space-x-3">
               <div className="hidden sm:flex items-center space-x-3">
                 <Link 
                   href="/matches" 
                   className="bg-gradient-to-r from-[#A866FF] to-[#6F3CFF] text-white px-4 py-2 rounded-lg font-medium text-sm hover:from-[#A353F2] hover:to-[#7D3EFF] transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                 >
                   Find Matches
                 </Link>
                 <Link 
                   href="/rooms" 
                   className="bg-white/90 backdrop-blur-sm text-[#7D3EFF] border border-[#7D3EFF]/20 px-4 py-2 rounded-lg font-medium text-sm hover:bg-[#7D3EFF] hover:text-white transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                 >
                   Browse Rooms
                 </Link>
                                                 <Link 
                 href="/safety" 
                 className="bg-white/90 backdrop-blur-sm text-[#7D3EFF] border border-[#7D3EFF]/20 px-4 py-2 rounded-lg font-medium text-sm hover:bg-[#7D3EFF] hover:text-white transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
               >
                 Safety
               </Link>
               <Link 
                 href="/voice" 
                 className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center space-x-1"
               >
                 <span>🎤</span>
                 <span>Voice</span>
               </Link>
               <Link 
                 href="/phone" 
                 className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center space-x-1"
               >
                 <span>📞</span>
                 <span>Call Me</span>
               </Link>
                <Link 
                  href="/community" 
                  className="bg-white/90 backdrop-blur-sm text-[#7D3EFF] border border-[#7D3EFF]/20 px-4 py-2 rounded-lg font-medium text-sm hover:bg-[#7D3EFF] hover:text-white transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Community
                </Link>
               </div>
               
               <button
                 onClick={() => setShowMobileMenu(!showMobileMenu)}
                 className="sm:hidden bg-white/90 backdrop-blur-sm border border-gray-200 p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-white transition-all duration-200 shadow-md"
               >
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                 </svg>
               </button>
             </div>
           </div>
          
                     {/* Mobile Menu */}
           {showMobileMenu && (
             <div className="sm:hidden mt-4 pt-4 border-t border-white/20">
               <div className="flex flex-col space-y-3 px-2">
                 <Link 
                   href="/matches" 
                   className="bg-gradient-to-r from-[#A866FF] to-[#6F3CFF] text-white px-4 py-3 rounded-lg font-medium text-sm text-center hover:from-[#A353F2] hover:to-[#7D3EFF] transition-all duration-200 shadow-md"
                 >
                   Find Matches
                 </Link>
                 <Link 
                   href="/rooms" 
                   className="bg-white/90 backdrop-blur-sm text-[#7D3EFF] border border-[#7D3EFF]/20 px-4 py-3 rounded-lg font-medium text-sm text-center hover:bg-[#7D3EFF] hover:text-white transition-all duration-200 shadow-md"
                 >
                   Browse Rooms
                 </Link>
                                                 <Link 
                 href="/safety" 
                 className="bg-white/90 backdrop-blur-sm text-[#7D3EFF] border border-[#7D3EFF]/20 px-4 py-3 rounded-lg font-medium text-sm text-center hover:bg-[#7D3EFF] hover:text-white transition-all duration-200 shadow-md"
               >
                 Safety
               </Link>
               <Link 
                 href="/voice" 
                 className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-lg font-medium text-sm text-center hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md flex items-center justify-center space-x-1"
               >
                 <span>🎤</span>
                 <span>Voice Assistant</span>
               </Link>
               <Link 
                 href="/phone" 
                 className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-3 rounded-lg font-medium text-sm text-center hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md flex items-center justify-center space-x-1"
               >
                 <span>📞</span>
                 <span>AI Phone Call</span>
               </Link>
                <Link 
                  href="/community" 
                  className="bg-white/90 backdrop-blur-sm text-[#7D3EFF] border border-[#7D3EFF]/20 px-4 py-3 rounded-lg font-medium text-sm text-center hover:bg-[#7D3EFF] hover:text-white transition-all duration-200 shadow-md"
                >
                  Community
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hidden file input for profile picture */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

             {/* Main Content */}
       <div className="relative z-10 container mx-auto px-4 py-6 space-y-4 sm:space-y-6 lg:space-y-8">
        
                          {/* Profile Overview Card */}
         <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/30 relative overflow-hidden">
           {/* Decorative Background Elements */}
           <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#A866FF]/10 to-[#6F3CFF]/10 rounded-full blur-3xl"></div>
           <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#7D3EFF]/10 to-[#A353F2]/10 rounded-full blur-2xl"></div>
           
           <div className="relative z-10">
             <div className="flex items-center justify-between mb-6 sm:mb-8">
               <div className="flex items-center space-x-3">
                 <div className="w-2 h-8 bg-gradient-to-b from-[#A866FF] to-[#6F3CFF] rounded-full"></div>
                 <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Profile Overview</h2>
               </div>
               <button
                 onClick={handleEditProfile}
                 className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-[#A866FF]/10 to-[#6F3CFF]/10 text-[#7D3EFF] hover:from-[#A866FF]/20 hover:to-[#6F3CFF]/20 font-medium text-sm px-4 py-2 rounded-xl border border-[#7D3EFF]/20 transition-all duration-200 hover:scale-105"
               >
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                 </svg>
                 <span>Edit Profile</span>
               </button>
             </div>
             
             <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
               {/* Profile Picture & Name Section */}
               <div className="lg:col-span-1 text-center lg:text-left">
                 <div className="relative inline-block mb-4">
                   {profile.profilePicture ? (
                     <img
                       src={profile.profilePicture}
                       alt={profile.name}
                       className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover mx-auto lg:mx-0 cursor-pointer hover:scale-105 transition-all duration-300 shadow-xl ring-4 ring-white/50"
                       onClick={handleProfilePictureClick}
                     />
                   ) : (
                     <div 
                       className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-[#A866FF] to-[#6F3CFF] flex items-center justify-center mx-auto lg:mx-0 cursor-pointer hover:scale-105 transition-all duration-300 shadow-xl ring-4 ring-white/50"
                       onClick={handleProfilePictureClick}
                     >
                       <span className="text-white font-bold text-2xl sm:text-3xl">
                         {profile.name.charAt(0).toUpperCase()}
                       </span>
                     </div>
                   )}
                   <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-[#A866FF] to-[#6F3CFF] rounded-xl flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform duration-200" onClick={handleProfilePictureClick}>
                     <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                     </svg>
                   </div>
                 </div>
                 <h3 className="font-bold text-gray-900 text-lg sm:text-xl mb-1">{profile.name}</h3>
                 <p className="text-sm sm:text-base text-gray-600 mb-4">{profile.profession}</p>
                 
                 {/* Profile Completion */}
                 <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/40">
                   <div className="flex items-center justify-between mb-2">
                     <span className="text-sm font-medium text-gray-700">Profile Complete</span>
                     <span className="text-lg font-bold text-[#7D3EFF]">{profile.profileCompletion}%</span>
                   </div>
                   <div className="w-full bg-gray-200/60 rounded-full h-3 overflow-hidden">
                     <div 
                       className="bg-gradient-to-r from-[#A866FF] to-[#6F3CFF] h-3 rounded-full transition-all duration-500 shadow-sm"
                       style={{ width: `${profile.profileCompletion}%` }}
                     />
                   </div>
                   <div className="flex items-center justify-center mt-3 space-x-2">
                     {profile.isVerified ? (
                       <>
                         <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                           <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                         </svg>
                         <span className="text-sm font-medium text-green-600">Verified Account</span>
                       </>
                     ) : (
                       <>
                         <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
                         </svg>
                         <span className="text-sm font-medium text-amber-600">Pending Verification</span>
                       </>
                     )}
                   </div>
                 </div>
               </div>
               
               {/* Information Grid */}
               <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {/* Basic Info */}
                 <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-3 border border-white/40">
                   <div className="flex items-center space-x-2 mb-2">
                     <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                       <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                       </svg>
                     </div>
                     <h4 className="font-semibold text-gray-900 text-base">Basic Info</h4>
                   </div>
                   <div className="space-y-1.5">
                     <div className="flex items-center justify-between">
                       <span className="text-gray-500 text-sm">Age:</span>
                       <span className="text-gray-900 font-medium text-base">{profile.age || 'Not set'}</span>
                     </div>
                     <div className="flex items-center justify-between">
                       <span className="text-gray-500 text-sm">From:</span>
                       <span className="text-gray-900 font-medium text-base truncate max-w-20">{profile.currentCity || 'Not set'}</span>
                     </div>
                     <div className="flex items-center justify-between">
                       <span className="text-gray-500 text-sm">Moving:</span>
                       <span className="text-gray-900 font-medium text-base truncate max-w-20">{profile.preferredCity || 'Not set'}</span>
                     </div>
                     <div className="flex items-center justify-between">
                       <span className="text-gray-500 text-sm">Profession:</span>
                       <span className="text-gray-900 font-medium text-base truncate max-w-20">{profile.profession || 'Not set'}</span>
                     </div>
                     <div className="flex items-center justify-between">
                       <span className="text-gray-500 text-sm">Verified:</span>
                       <span className={`text-base font-medium ${profile.isVerified ? 'text-green-600' : 'text-gray-500'}`}>
                         {profile.isVerified ? '✓ Verified' : 'Pending'}
                       </span>
                     </div>
                   </div>
                 </div>
                 
                 {/* Preferences */}
                 <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-3 border border-white/40">
                   <div className="flex items-center space-x-2 mb-2">
                     <div className="w-7 h-7 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                       <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                       </svg>
                     </div>
                     <h4 className="font-semibold text-gray-900 text-base">Preferences</h4>
                   </div>
                   <div className="space-y-1.5">
                     <div className="flex items-center justify-between">
                       <span className="text-gray-500 text-sm">Room Type:</span>
                       <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-medium">
                         {profile.roomType || 'Any type'}
                       </span>
                     </div>
                     <div className="flex items-center justify-between">
                       <span className="text-gray-500 text-sm">Cleanliness:</span>
                       <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                         {profile.cleanliness || 'Any level'}
                       </span>
                     </div>
                     <div className="flex items-center justify-between">
                       <span className="text-gray-500 text-sm">Schedule:</span>
                       <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                         {profile.sleepSchedule || 'Flexible'}
                       </span>
                     </div>
                     <div className="flex items-center justify-between">
                       <span className="text-gray-500 text-sm">Guests:</span>
                       <span className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-medium">
                         {profile.guestPolicy || 'Open'}
                       </span>
                     </div>
                     <div className="flex items-center justify-between">
                       <span className="text-gray-500 text-sm">Food:</span>
                       <span className="text-sm bg-pink-100 text-pink-800 px-2 py-1 rounded-full font-medium">
                         {profile.foodHabits || 'Flexible'}
                       </span>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
             
             {/* Mobile Edit Button */}
             <div className="sm:hidden mt-6 pt-6 border-t border-white/30">
               <button
                 onClick={handleEditProfile}
                 className="w-full bg-gradient-to-r from-[#A866FF] to-[#6F3CFF] text-white font-semibold py-3 px-6 rounded-2xl hover:from-[#A353F2] hover:to-[#7D3EFF] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
               >
                 Edit Profile
               </button>
             </div>
           </div>
         </div>

                 {/* Roommate Matches */}
         <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-xl border border-white/20">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Your Matches</h2>
            <Link 
              href="/matches"
              className="text-[#7D3EFF] hover:text-[#6F3CFF] font-medium text-sm"
            >
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {matches.map((match) => (
              <div key={match.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={match.avatar}
                    alt={match.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                      {match.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">
                      {match.profession}, {match.age}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg sm:text-xl font-bold text-[#7D3EFF]">
                      {match.compatibility}%
                    </div>
                    <div className="text-xs text-gray-500">match</div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-xs sm:text-sm text-gray-600 mb-2">Shared interests:</p>
                  <div className="flex flex-wrap gap-1">
                    {match.sharedTraits.map((trait, idx) => (
                      <span key={idx} className="text-xs bg-[#7D3EFF]/10 text-[#7D3EFF] px-2 py-1 rounded-full">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500 truncate flex-1 mr-2">
                    📍 {match.location}
                  </p>
                  <button className="bg-[#7D3EFF] text-white text-xs font-medium py-1 px-3 rounded-full hover:bg-[#6F3CFF] transition-colors">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile CTA */}
          <div className="sm:hidden mt-4 pt-4 border-t border-gray-200">
            <Link
              href="/matches"
              className="block w-full bg-gradient-to-r from-[#A866FF] to-[#6F3CFF] text-white font-semibold py-3 px-4 rounded-lg text-center hover:from-[#A353F2] hover:to-[#7D3EFF] transition-all"
            >
              Find More Matches
            </Link>
          </div>
        </div>

                 {/* Room Suggestion */}
         <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-xl border border-white/20">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Recommended Room</h2>
            <Link 
              href="/rooms"
              className="text-[#7D3EFF] hover:text-[#6F3CFF] font-medium text-sm"
            >
              Browse All
            </Link>
          </div>
          
          <div className="border border-gray-200 rounded-xl p-4 sm:p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-2">
                  Premium Single Room - {profile.preferredCity || 'Bangalore'}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Based on your preferences: {profile.roomType || 'Single Room'}, {profile.cleanliness || 'Clean environment'}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {profile.windowPreference || 'Good lighting'}
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {profile.floorPreference || 'Mid floor'}
                  </span>
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                    Verified Property
                  </span>
                </div>
              </div>
              <div className="text-right ml-4">
                <div className="text-xl sm:text-2xl font-bold text-[#7D3EFF]">₹28,000</div>
                <div className="text-xs sm:text-sm text-gray-500">per month</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 bg-[#7D3EFF] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#6F3CFF] transition-colors">
                Express Interest
              </button>
              <button className="flex-1 border border-[#7D3EFF] text-[#7D3EFF] font-semibold py-2 px-4 rounded-lg hover:bg-[#7D3EFF] hover:text-white transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>

                 

                 {/* Safety Tips Banner */}
         <div className="bg-gradient-to-r from-red-50/95 to-orange-50/95 backdrop-blur-sm border border-red-200/50 rounded-2xl p-4 sm:p-6 shadow-xl">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-red-900 text-sm sm:text-base mb-2">Safety First!</h3>
              <p className="text-red-800 text-xs sm:text-sm mb-3">
                Always meet potential roommates in public places first and trust your instincts.
              </p>
              <Link 
                href="/safety"
                className="inline-flex items-center space-x-1 text-red-700 hover:text-red-900 font-medium text-xs sm:text-sm"
              >
                <span>View Safety Guidelines</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditProfile && (
                 <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
           <div className="bg-white/95 backdrop-blur-sm rounded-2xl w-full max-w-md p-6 shadow-2xl border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
              <button
                onClick={() => setShowEditProfile(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={editForm.name || ''}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-transparent text-gray-900 bg-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Profession</label>
                <input
                  type="text"
                  value={editForm.profession || ''}
                  onChange={(e) => setEditForm({ ...editForm, profession: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-transparent text-gray-900 bg-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current City</label>
                <input
                  type="text"
                  value={editForm.currentCity || ''}
                  onChange={(e) => setEditForm({ ...editForm, currentCity: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-transparent text-gray-900 bg-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  value={editForm.age || ''}
                  onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-transparent text-gray-900 bg-white"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowEditProfile(false)}
                className="flex-1 border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="flex-1 bg-[#7D3EFF] text-white font-medium py-2 px-4 rounded-lg hover:bg-[#6F3CFF] transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 