'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock rooms data
const mockRooms = [
  {
    id: 1,
    title: "Premium Single Room - East Wing",
    type: "Single Room",
    floor: 3,
    floorType: "Mid Floor",
    window: "Large East-facing Window",
    windowType: "lots-of-windows",
    lightType: "bright",
    rent: 25000,
    deposit: 50000,
    amenities: ["Private Bathroom", "Study Desk", "Wardrobe", "AC", "Balcony Access"],
    images: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
    availability: "Available Now",
    description: "Spacious single room with excellent natural light and city view. Perfect for professionals who value privacy and comfort.",
    features: {
      area: "150 sq ft",
      furnished: true,
      parking: "Available",
      wifi: "High-speed included"
    },
    location: "Koramangala, Bangalore",
    nearbyFacilities: ["Metro Station - 5 min", "Shopping Mall - 10 min", "Hospital - 15 min"],
    isRecommended: true
  },
  {
    id: 2,
    title: "Cozy Twin Sharing - North Wing",
    type: "Twin Sharing",
    floor: 2,
    floorType: "Low Floor",
    window: "North-facing Window",
    windowType: "some-windows",
    lightType: "moderate",
    rent: 15000,
    deposit: 30000,
    amenities: ["Shared Bathroom", "Study Area", "Wardrobe", "Fan", "Common Balcony"],
    images: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
    availability: "Available from Jan 15",
    description: "Comfortable twin sharing room ideal for building friendships while maintaining personal space.",
    features: {
      area: "120 sq ft",
      furnished: true,
      parking: "Shared",
      wifi: "High-speed included"
    },
    location: "Indiranagar, Bangalore",
    nearbyFacilities: ["Bus Stop - 2 min", "Gym - 5 min", "Cafe - 8 min"],
    isRecommended: false
  },
  {
    id: 3,
    title: "Luxury Single Room - Top Floor",
    type: "Single Room",
    floor: 8,
    floorType: "High Floor",
    window: "Panoramic Windows",
    windowType: "lots-of-windows",
    lightType: "bright",
    rent: 32000,
    deposit: 64000,
    amenities: ["Private Bathroom", "Study Desk", "Walk-in Closet", "AC", "Private Balcony", "City View"],
    images: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
    availability: "Available Now",
    description: "Premium single room with stunning city views and luxury amenities. Perfect for those who want the best.",
    features: {
      area: "200 sq ft",
      furnished: true,
      parking: "Dedicated spot",
      wifi: "Premium high-speed"
    },
    location: "HSR Layout, Bangalore",
    nearbyFacilities: ["Metro Station - 8 min", "Tech Park - 10 min", "Mall - 12 min"],
    isRecommended: false
  },
  {
    id: 4,
    title: "Budget Twin Sharing - Ground Floor",
    type: "Twin Sharing",
    floor: 0,
    floorType: "Ground Floor",
    window: "Garden View Window",
    windowType: "some-windows",
    lightType: "moderate",
    rent: 12000,
    deposit: 24000,
    amenities: ["Shared Bathroom", "Study Corner", "Wardrobe", "Fan", "Garden Access"],
    images: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
    availability: "Available from Feb 1",
    description: "Affordable twin sharing room with direct garden access. Great for nature lovers on a budget.",
    features: {
      area: "100 sq ft",
      furnished: true,
      parking: "Limited",
      wifi: "Standard included"
    },
    location: "Electronic City, Bangalore",
    nearbyFacilities: ["Bus Stop - 3 min", "Market - 7 min", "Park - 5 min"],
    isRecommended: false
  },
  {
    id: 5,
    title: "Executive Single Room - West Wing",
    type: "Single Room",
    floor: 5,
    floorType: "Mid Floor",
    window: "West-facing Bay Window",
    windowType: "lots-of-windows",
    lightType: "bright",
    rent: 28000,
    deposit: 56000,
    amenities: ["Private Bathroom", "Work Station", "Walk-in Closet", "AC", "Sunset View"],
    images: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
    availability: "Available Now",
    description: "Executive single room with beautiful sunset views and professional workspace setup.",
    features: {
      area: "180 sq ft",
      furnished: true,
      parking: "Available",
      wifi: "High-speed included"
    },
    location: "Whitefield, Bangalore",
    nearbyFacilities: ["IT Hub - 5 min", "Mall - 15 min", "Airport - 45 min"],
    isRecommended: true
  }
];

interface Filters {
  type: string;
  priceRange: [number, number];
  floor: string;
  availability: string;
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState(mockRooms);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<typeof mockRooms[0] | null>(null);
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    type: 'all',
    priceRange: [10000, 35000],
    floor: 'all',
    availability: 'all'
  });

  const handleExpressInterest = (room: typeof mockRooms[0]) => {
    setSelectedRoom(room);
    setShowInterestModal(true);
  };

  const submitInterest = () => {
    console.log('Interest expressed for room:', selectedRoom?.id);
    setShowInterestModal(false);
    setSelectedRoom(null);
    // Here you would typically send the interest to your backend
  };

  const applyFilters = () => {
    let filteredRooms = mockRooms;

    if (filters.type !== 'all') {
      filteredRooms = filteredRooms.filter(room => room.type === filters.type);
    }

    filteredRooms = filteredRooms.filter(room => 
      room.rent >= filters.priceRange[0] && room.rent <= filters.priceRange[1]
    );

    if (filters.floor !== 'all') {
      filteredRooms = filteredRooms.filter(room => room.floorType === filters.floor);
    }

    setRooms(filteredRooms);
    setShowFilters(false);
  };

  const resetFilters = () => {
    setFilters({
      type: 'all',
      priceRange: [10000, 35000],
      floor: 'all',
      availability: 'all'
    });
    setRooms(mockRooms);
    setShowFilters(false);
  };

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
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Available Rooms</h1>
                <p className="text-sm text-gray-600 hidden sm:block">Find your perfect living space</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500 hidden sm:block">
                {rooms.length} rooms available
              </span>
              <button
                onClick={() => setShowFilters(true)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Recommended Rooms */}
        {rooms.some(room => room.isRecommended) && (
          <div className="mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Recommended for You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {rooms.filter(room => room.isRecommended).map((room) => (
                <RoomCard key={room.id} room={room} onExpressInterest={handleExpressInterest} isRecommended />
              ))}
            </div>
          </div>
        )}

        {/* All Rooms */}
        <div className="mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
            {rooms.some(room => room.isRecommended) ? 'All Rooms' : 'Available Rooms'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} onExpressInterest={handleExpressInterest} />
          ))}
        </div>

        {rooms.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8v-4a1 1 0 011-1h2a1 1 0 011 1v4m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No rooms match your filters</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria</p>
            <button
              onClick={resetFilters}
              className="bg-gradient-to-r from-[#A866FF] to-[#6F3CFF] text-white font-semibold py-2 px-6 rounded-lg hover:from-[#A353F2] hover:to-[#7D3EFF] transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Filter Rooms</h2>
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
                {/* Room Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Room Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['all', 'Single Room', 'Twin Sharing'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setFilters({ ...filters, type })}
                        className={`p-3 border-2 rounded-lg text-sm font-medium transition-all ${
                          filters.type === type
                            ? 'border-[#7D3EFF] bg-[#7D3EFF]/10 text-[#7D3EFF]'
                            : 'border-gray-200 text-gray-700 hover:border-[#7D3EFF]'
                        }`}
                      >
                        {type === 'all' ? 'All Types' : type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Price Range: ₹{filters.priceRange[0].toLocaleString()} - ₹{filters.priceRange[1].toLocaleString()}
                  </label>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-500">Minimum</label>
                      <input
                        type="range"
                        min="10000"
                        max="35000"
                        step="1000"
                        value={filters.priceRange[0]}
                        onChange={(e) => setFilters({ 
                          ...filters, 
                          priceRange: [parseInt(e.target.value), filters.priceRange[1]] 
                        })}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Maximum</label>
                      <input
                        type="range"
                        min="10000"
                        max="35000"
                        step="1000"
                        value={filters.priceRange[1]}
                        onChange={(e) => setFilters({ 
                          ...filters, 
                          priceRange: [filters.priceRange[0], parseInt(e.target.value)] 
                        })}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                  </div>
                </div>

                {/* Floor Preference Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Floor Preference</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['all', 'Ground Floor', 'Low Floor', 'Mid Floor', 'High Floor'].map((floor) => (
                      <button
                        key={floor}
                        onClick={() => setFilters({ ...filters, floor })}
                        className={`p-3 border-2 rounded-lg text-sm font-medium transition-all ${
                          filters.floor === floor
                            ? 'border-[#7D3EFF] bg-[#7D3EFF]/10 text-[#7D3EFF]'
                            : 'border-gray-200 text-gray-700 hover:border-[#7D3EFF]'
                        }`}
                      >
                        {floor === 'all' ? 'Any Floor' : floor}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-8">
                <button
                  onClick={resetFilters}
                  className="flex-1 border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Reset
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

      {/* Express Interest Modal */}
      {showInterestModal && selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Express Interest</h2>
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900">{selectedRoom.title}</h3>
              <p className="text-gray-600">₹{selectedRoom.rent.toLocaleString()}/month</p>
              <p className="text-sm text-gray-500 mt-2">
                By expressing interest, the property owner will be notified and may contact you with more details.
              </p>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowInterestModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitInterest}
                className="flex-1 bg-gradient-to-r from-[#A866FF] to-[#6F3CFF] text-white font-semibold py-3 px-4 rounded-lg hover:from-[#A353F2] hover:to-[#7D3EFF] transition-all"
              >
                Express Interest
              </button>
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
      `}</style>
    </div>
  );
}

function RoomCard({ 
  room, 
  onExpressInterest, 
  isRecommended = false 
}: { 
  room: typeof mockRooms[0], 
  onExpressInterest: (room: typeof mockRooms[0]) => void,
  isRecommended?: boolean
}) {
  return (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${
      isRecommended ? 'ring-2 ring-[#A866FF] ring-opacity-50' : ''
    }`}>
      {isRecommended && (
        <div className="bg-gradient-to-r from-[#A866FF] to-[#6F3CFF] text-white text-center py-2">
          <span className="text-sm font-semibold">✨ Recommended for You</span>
        </div>
      )}
      
      {/* Room Image */}
      <div className="h-48 bg-gradient-to-br from-[#A866FF] to-[#6F3CFF] flex items-center justify-center">
        <div className="text-white text-center">
          <svg className="w-16 h-16 mx-auto mb-2 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8v-4a1 1 0 011-1h2a1 1 0 011 1v4m-4 0h4" />
          </svg>
          <p className="text-sm opacity-80">{room.type}</p>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {/* Room Title & Price */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 text-sm sm:text-base truncate">{room.title}</h3>
            <p className="text-xs sm:text-sm text-gray-600">{room.location}</p>
          </div>
          <div className="text-right ml-3">
            <p className="text-lg sm:text-xl font-bold text-[#7D3EFF]">₹{room.rent.toLocaleString()}</p>
            <p className="text-xs text-gray-500">per month</p>
          </div>
        </div>

        {/* Room Details */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-xs sm:text-sm">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8v-4a1 1 0 011-1h2a1 1 0 011 1v4m-4 0h4" />
            </svg>
            <span className="text-gray-600">Floor {room.floor}</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="text-gray-600">{room.window}</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {room.amenities.slice(0, 3).map((amenity, idx) => (
              <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                {amenity}
              </span>
            ))}
            {room.amenities.length > 3 && (
              <span className="text-xs text-gray-500">+{room.amenities.length - 3} more</span>
            )}
          </div>
        </div>

        {/* Availability */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              room.availability === 'Available Now' ? 'bg-green-500' : 'bg-yellow-500'
            }`}></div>
            <span className="text-xs sm:text-sm text-gray-600">{room.availability}</span>
          </div>
          <span className="text-xs text-gray-500">{room.features.area}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            disabled
            className="flex-1 bg-gray-100 text-gray-400 font-medium py-2 px-3 rounded-lg cursor-not-allowed text-sm"
            title="Booking will be available soon"
          >
            Book Now
          </button>
          <button
            onClick={() => onExpressInterest(room)}
            className="flex-1 bg-gradient-to-r from-[#A866FF] to-[#6F3CFF] text-white font-medium py-2 px-3 rounded-lg hover:from-[#A353F2] hover:to-[#7D3EFF] transition-all text-sm"
          >
            Express Interest
          </button>
        </div>
      </div>
    </div>
  );
} 