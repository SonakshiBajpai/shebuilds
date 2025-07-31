'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

// Mock matches data
const mockMatches = [
  {
    id: 1,
    name: "Priya Sharma",
    age: 24,
    profession: "UX Designer",
    city: "Koramangala, Bangalore",
    compatibility: 92,
    avatar: "/api/placeholder/300/400",
    sharedTraits: ["Early Bird", "Very Clean", "No Smoking"],
    bio: "Love reading, yoga, and cooking healthy meals. Looking for a peaceful roommate who values cleanliness.",
    interests: ["Reading", "Yoga", "Cooking", "Photography"],
    lifestyle: {
      cleanliness: 5,
      sleepTime: 22, // 10 PM
      visitorTolerance: 2
    }
  },
  {
    id: 2,
    name: "Ananya Patel",
    age: 26,
    profession: "Marketing Manager",
    city: "Indiranagar, Bangalore",
    compatibility: 88,
    avatar: "/api/placeholder/300/400",
    sharedTraits: ["Social Drinker", "Moderate Clean", "Guest Friendly"],
    bio: "Fitness enthusiast and movie lover. Enjoy having friends over occasionally and exploring the city.",
    interests: ["Fitness", "Movies", "Travel", "Dancing"],
    lifestyle: {
      cleanliness: 3,
      sleepTime: 23, // 11 PM
      visitorTolerance: 4
    }
  },
  {
    id: 3,
    name: "Meera Gupta",
    age: 23,
    profession: "Data Analyst",
    city: "HSR Layout, Bangalore",
    compatibility: 85,
    avatar: "/api/placeholder/300/400",
    sharedTraits: ["Night Owl", "Clean", "Quiet Environment"],
    bio: "Bookworm and music lover. Prefer quiet evenings and minimal disturbances. Love deep conversations.",
    interests: ["Books", "Music", "Photography", "Writing"],
    lifestyle: {
      cleanliness: 4,
      sleepTime: 24, // 12 AM
      visitorTolerance: 1
    }
  },
  {
    id: 4,
    name: "Kavya Singh",
    age: 25,
    profession: "Software Engineer",
    city: "Electronic City, Bangalore",
    compatibility: 90,
    avatar: "/api/placeholder/300/400",
    sharedTraits: ["Tech Enthusiast", "Clean", "Work from Home"],
    bio: "Tech geek who loves coding and gaming. Looking for someone who respects work-from-home schedules.",
    interests: ["Coding", "Gaming", "Tech", "Coffee"],
    lifestyle: {
      cleanliness: 4,
      sleepTime: 23.5, // 11:30 PM
      visitorTolerance: 2
    }
  },
  {
    id: 5,
    name: "Rhea Kapoor",
    age: 27,
    profession: "Graphic Designer",
    city: "Whitefield, Bangalore",
    compatibility: 87,
    avatar: "/api/placeholder/300/400",
    sharedTraits: ["Creative", "Moderate Clean", "Pet Lover"],
    bio: "Creative soul with a love for art and design. Have a cat and love animals. Enjoy creative collaborations.",
    interests: ["Art", "Design", "Pets", "Nature"],
    lifestyle: {
      cleanliness: 3,
      sleepTime: 22.5, // 10:30 PM
      visitorTolerance: 3
    }
  }
];

interface Filters {
  cleanliness: number;
  sleepTime: number;
  visitorTolerance: number;
}

export default function MatchesPage() {
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [matches, setMatches] = useState(mockMatches);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    cleanliness: 3,
    sleepTime: 23,
    visitorTolerance: 3
  });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const currentMatch = matches[currentMatchIndex];

  const handleAction = (action: 'like' | 'skip' | 'save') => {
    console.log(`${action} - ${currentMatch?.name}`);
    
    // Move to next match
    if (currentMatchIndex < matches.length - 1) {
      setCurrentMatchIndex(currentMatchIndex + 1);
    } else {
      // No more matches
      setCurrentMatchIndex(0); // Reset for demo
    }
    
    // Reset drag state
    setDragOffset({ x: 0, y: 0 });
    setIsDragging(false);
  };

  const handleDragStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setDragStart({ x: clientX, y: clientY });
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    
    const deltaX = clientX - dragStart.x;
    const deltaY = clientY - dragStart.y;
    
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    
    const threshold = 100;
    
    if (Math.abs(dragOffset.x) > threshold) {
      if (dragOffset.x > 0) {
        handleAction('like');
      } else {
        handleAction('skip');
      }
    } else {
      // Snap back
      setDragOffset({ x: 0, y: 0 });
    }
    
    setIsDragging(false);
  };

  const applyFilters = () => {
    // Mock filter application
    console.log('Applying filters:', filters);
    setShowFilters(false);
  };

  const formatSleepTime = (time: number) => {
    const hours = Math.floor(time);
    const minutes = (time - hours) * 60;
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return `${displayHours}:${minutes === 0 ? '00' : '30'} ${period}`;
  };

  if (!currentMatch) {
    return (
      <div className="min-h-screen bg-gray-50 font-poppins flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No More Matches!</h2>
          <p className="text-gray-600 mb-6">Check back later for new potential roommates.</p>
          <Link 
            href="/dashboard"
            className="bg-gradient-to-r from-[#A866FF] to-[#6F3CFF] text-white font-semibold py-3 px-6 rounded-lg hover:from-[#A353F2] hover:to-[#7D3EFF] transition-all"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Find Your Match</h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500 hidden sm:block">
                {currentMatchIndex + 1} of {matches.length}
              </span>
              <button
                onClick={() => setShowFilters(true)}
                className="p-2 text-gray-600 hover:text-[#7D3EFF] transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Match Card */}
        <div className="relative mb-6" style={{ height: '70vh', minHeight: '500px' }}>
          <div
            ref={cardRef}
            className="absolute inset-0 bg-white rounded-2xl shadow-xl overflow-hidden cursor-grab active:cursor-grabbing"
            style={{
              transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${dragOffset.x / 10}deg)`,
              transition: isDragging ? 'none' : 'transform 0.3s ease-out'
            }}
            onMouseDown={(e) => handleDragStart(e.clientX, e.clientY)}
            onMouseMove={(e) => handleDragMove(e.clientX, e.clientY)}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={(e) => handleDragStart(e.touches[0].clientX, e.touches[0].clientY)}
            onTouchMove={(e) => handleDragMove(e.touches[0].clientX, e.touches[0].clientY)}
            onTouchEnd={handleDragEnd}
          >
            {/* Swipe Indicators */}
            {isDragging && (
              <>
                <div 
                  className={`absolute top-8 left-8 px-4 py-2 rounded-lg font-bold text-lg transition-opacity ${
                    dragOffset.x > 50 ? 'opacity-100 bg-green-500 text-white' : 'opacity-30 bg-gray-200 text-gray-500'
                  }`}
                >
                  LIKE
                </div>
                <div 
                  className={`absolute top-8 right-8 px-4 py-2 rounded-lg font-bold text-lg transition-opacity ${
                    dragOffset.x < -50 ? 'opacity-100 bg-red-500 text-white' : 'opacity-30 bg-gray-200 text-gray-500'
                  }`}
                >
                  SKIP
                </div>
              </>
            )}

            {/* Profile Image */}
            <div className="h-1/2 bg-gradient-to-br from-[#A866FF] to-[#6F3CFF] flex items-center justify-center">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
                <span className="text-4xl font-bold text-[#7D3EFF]">
                  {currentMatch.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="h-1/2 p-6 flex flex-col">
              <div className="flex-1">
                {/* Basic Info */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{currentMatch.name}</h2>
                    <p className="text-gray-600">{currentMatch.profession}, {currentMatch.age}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-lg font-bold text-green-600">{currentMatch.compatibility}%</span>
                    </div>
                    <p className="text-xs text-gray-500">Match</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center text-gray-600 mb-4">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm">{currentMatch.city}</span>
                </div>

                {/* Shared Traits */}
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Top Shared Traits</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentMatch.sharedTraits.map((trait, idx) => (
                      <span key={idx} className="bg-[#E9DDFB] text-[#7D3EFF] text-xs font-medium px-3 py-1 rounded-full">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-gray-700 mb-4 line-clamp-2">{currentMatch.bio}</p>
              </div>

              {/* View Profile Button */}
              <button className="w-full bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                View Full Profile
              </button>
            </div>
          </div>

          {/* Next Card Preview */}
          {currentMatchIndex < matches.length - 1 && (
            <div 
              className="absolute inset-0 bg-white rounded-2xl shadow-lg -z-10"
              style={{ transform: 'scale(0.95) translateY(10px)' }}
            >
              <div className="h-1/2 bg-gradient-to-br from-gray-300 to-gray-400"></div>
              <div className="h-1/2 bg-gray-50"></div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-6 mb-6">
          <button
            onClick={() => handleAction('skip')}
            className="w-14 h-14 bg-white border-2 border-red-200 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 hover:border-red-300 transition-all shadow-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            onClick={() => handleAction('save')}
            className="w-14 h-14 bg-white border-2 border-yellow-200 rounded-full flex items-center justify-center text-yellow-500 hover:bg-yellow-50 hover:border-yellow-300 transition-all shadow-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>

          <button
            onClick={() => handleAction('like')}
            className="w-14 h-14 bg-white border-2 border-green-200 rounded-full flex items-center justify-center text-green-500 hover:bg-green-50 hover:border-green-300 transition-all shadow-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Swipe Instructions */}
        <div className="text-center text-gray-500 text-sm">
          <p>Swipe right to like • Swipe left to skip</p>
          <p className="mt-1">Or use the buttons below</p>
        </div>
      </div>

      {/* Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Smart Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Cleanliness Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Cleanliness Level: {filters.cleanliness}/5
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={filters.cleanliness}
                    onChange={(e) => setFilters({ ...filters, cleanliness: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Relaxed</span>
                    <span>Very Clean</span>
                  </div>
                </div>

                {/* Sleep Time Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Sleep Time: {formatSleepTime(filters.sleepTime)}
                  </label>
                  <input
                    type="range"
                    min="21"
                    max="26"
                    step="0.5"
                    value={filters.sleepTime}
                    onChange={(e) => setFilters({ ...filters, sleepTime: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>9:00 PM</span>
                    <span>2:00 AM</span>
                  </div>
                </div>

                {/* Visitor Tolerance Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Visitor Tolerance: {filters.visitorTolerance}/5
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={filters.visitorTolerance}
                    onChange={(e) => setFilters({ ...filters, visitorTolerance: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>No Visitors</span>
                    <span>Very Welcome</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-8">
                <button
                  onClick={() => setShowFilters(false)}
                  className="flex-1 border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={applyFilters}
                  className="flex-1 bg-gradient-to-r from-[#A866FF] to-[#6F3CFF] text-white font-semibold py-3 px-4 rounded-lg hover:from-[#A353F2] hover:to-[#7D3EFF] transition-all"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(to right, #A866FF, #6F3CFF);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(to right, #A866FF, #6F3CFF);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
} 