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
    avatar: "/profile1.jpg",
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
    avatar: "/profile2.jpg",
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
    avatar: "/profile3.jpg",
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
    avatar: "/profile4.jpg",
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
    avatar: "/profile5.jpg",
    sharedTraits: ["Creative", "Moderate Clean", "Pet Lover"],
    bio: "Creative soul with a love for art and design. Have a cat and love animals. Enjoy creative collaborations.",
    interests: ["Art", "Design", "Pets", "Nature"],
    lifestyle: {
      cleanliness: 3,
      sleepTime: 22.5, // 10:30 PM
      visitorTolerance: 3
    }
  },
  {
    id: 6,
    name: "Simran Malhotra",
    age: 24,
    profession: "Content Writer",
    city: "Jayanagar, Bangalore",
    compatibility: 89,
    avatar: "/profile1.jpg",
    sharedTraits: ["Early Bird", "Clean", "Bookworm"],
    bio: "Freelance writer with a passion for storytelling. Love quiet mornings with coffee and good books.",
    interests: ["Writing", "Literature", "Coffee", "Podcasts"],
    lifestyle: {
      cleanliness: 4,
      sleepTime: 22, // 10 PM
      visitorTolerance: 2
    }
  },
  {
    id: 7,
    name: "Aisha Ahmed",
    age: 25,
    profession: "Product Manager",
    city: "Marathahalli, Bangalore",
    compatibility: 91,
    avatar: "/profile2.jpg",
    sharedTraits: ["Organized", "Social", "Fitness Lover"],
    bio: "Product manager by day, fitness enthusiast by evening. Love hosting dinner parties and trying new cuisines.",
    interests: ["Product Strategy", "Fitness", "Cooking", "Networking"],
    lifestyle: {
      cleanliness: 5,
      sleepTime: 22.5, // 10:30 PM
      visitorTolerance: 4
    }
  },
  {
    id: 8,
    name: "Pooja Reddy",
    age: 23,
    profession: "Fashion Designer",
    city: "Brigade Road, Bangalore",
    compatibility: 84,
    avatar: "/profile3.jpg",
    sharedTraits: ["Creative", "Night Owl", "Fashion Forward"],
    bio: "Fashion designer with an eye for aesthetics. Love late-night brainstorming and creating beautiful spaces.",
    interests: ["Fashion", "Interior Design", "Sketching", "Shopping"],
    lifestyle: {
      cleanliness: 3,
      sleepTime: 24.5, // 12:30 AM
      visitorTolerance: 3
    }
  },
  {
    id: 9,
    name: "Nisha Gupta",
    age: 26,
    profession: "Financial Analyst",
    city: "Richmond Town, Bangalore",
    compatibility: 86,
    avatar: "/profile4.jpg",
    sharedTraits: ["Punctual", "Clean", "Investment Savvy"],
    bio: "Numbers person with a love for financial planning. Enjoy peaceful evenings and smart money conversations.",
    interests: ["Finance", "Investing", "Excel", "Economics"],
    lifestyle: {
      cleanliness: 5,
      sleepTime: 22, // 10 PM
      visitorTolerance: 1
    }
  },
  {
    id: 10,
    name: "Tanya Sharma",
    age: 24,
    profession: "Digital Marketer",
    city: "MG Road, Bangalore",
    compatibility: 88,
    avatar: "/profile5.jpg",
    sharedTraits: ["Social Media Savvy", "Trendy", "Extrovert"],
    bio: "Digital marketing expert who loves staying on top of trends. Great at planning fun outings and social events.",
    interests: ["Social Media", "Trends", "Parties", "Branding"],
    lifestyle: {
      cleanliness: 3,
      sleepTime: 23.5, // 11:30 PM
      visitorTolerance: 4
    }
  },
  {
    id: 11,
    name: "Anjali Mishra",
    age: 27,
    profession: "HR Manager",
    city: "JP Nagar, Bangalore",
    compatibility: 83,
    avatar: "/profile1.jpg",
    sharedTraits: ["People Person", "Organized", "Conflict Resolver"],
    bio: "HR professional who loves connecting with people. Great at managing household dynamics and resolving issues.",
    interests: ["Psychology", "Team Building", "Meditation", "Volunteering"],
    lifestyle: {
      cleanliness: 4,
      sleepTime: 22.5, // 10:30 PM
      visitorTolerance: 3
    }
  },
  {
    id: 12,
    name: "Shreya Iyer",
    age: 25,
    profession: "Research Scientist",
    city: "Banashankari, Bangalore",
    compatibility: 92,
    avatar: "/profile2.jpg",
    sharedTraits: ["Intellectual", "Detail-Oriented", "Quiet"],
    bio: "Research scientist with a curious mind. Love deep discussions about science and maintaining a distraction-free environment.",
    interests: ["Science", "Research", "Documentaries", "Chess"],
    lifestyle: {
      cleanliness: 5,
      sleepTime: 23, // 11 PM
      visitorTolerance: 1
    }
  },
  {
    id: 13,
    name: "Divya Joshi",
    age: 24,
    profession: "Yoga Instructor",
    city: "Malleswaram, Bangalore",
    compatibility: 90,
    avatar: "/profile3.jpg",
    sharedTraits: ["Health Conscious", "Early Bird", "Zen"],
    bio: "Certified yoga instructor who believes in mindful living. Love early morning routines and healthy lifestyle choices.",
    interests: ["Yoga", "Meditation", "Healthy Cooking", "Spirituality"],
    lifestyle: {
      cleanliness: 4,
      sleepTime: 21.5, // 9:30 PM
      visitorTolerance: 2
    }
  },
  {
    id: 14,
    name: "Riya Agarwal",
    age: 26,
    profession: "Event Planner",
    city: "Cunningham Road, Bangalore",
    compatibility: 85,
    avatar: "/profile4.jpg",
    sharedTraits: ["Creative", "Social", "Detail-Oriented"],
    bio: "Event planner who loves bringing people together. Excellent at organizing and creating memorable experiences.",
    interests: ["Event Planning", "Decoration", "Networking", "Parties"],
    lifestyle: {
      cleanliness: 4,
      sleepTime: 23, // 11 PM
      visitorTolerance: 5
    }
  },
  {
    id: 15,
    name: "Priyanka Nair",
    age: 23,
    profession: "Architecture Student",
    city: "Sadashivanagar, Bangalore",
    compatibility: 87,
    avatar: "/profile5.jpg",
    sharedTraits: ["Creative", "Design Minded", "Study Focused"],
    bio: "Architecture student with an eye for design. Love creating beautiful, functional spaces and working on creative projects.",
    interests: ["Architecture", "Design", "Sketching", "Museums"],
    lifestyle: {
      cleanliness: 3,
      sleepTime: 24, // 12 AM
      visitorTolerance: 2
    }
  },
  {
    id: 16,
    name: "Ishita Verma",
    age: 25,
    profession: "Travel Blogger",
    city: "Hebbal, Bangalore",
    compatibility: 88,
    avatar: "/profile1.jpg",
    sharedTraits: ["Adventurous", "Social Media Savvy", "Culturally Curious"],
    bio: "Full-time travel blogger documenting hidden gems around India. Love meeting new people and sharing stories from the road.",
    interests: ["Travel", "Photography", "Culture", "Food"],
    lifestyle: {
      cleanliness: 3,
      sleepTime: 23.5, // 11:30 PM
      visitorTolerance: 4
    }
  },
  {
    id: 17,
    name: "Sneha Rao",
    age: 24,
    profession: "Clinical Psychologist",
    city: "Vasanth Nagar, Bangalore",
    compatibility: 91,
    avatar: "/profile2.jpg",
    sharedTraits: ["Empathetic", "Good Listener", "Wellness Focused"],
    bio: "Clinical psychologist passionate about mental health awareness. Love meaningful conversations and creating a supportive environment.",
    interests: ["Psychology", "Mental Health", "Books", "Mindfulness"],
    lifestyle: {
      cleanliness: 4,
      sleepTime: 22, // 10 PM
      visitorTolerance: 2
    }
  },
  {
    id: 18,
    name: "Aarya Desai",
    age: 22,
    profession: "Dance Instructor",
    city: "RT Nagar, Bangalore",
    compatibility: 86,
    avatar: "/profile3.jpg",
    sharedTraits: ["Energetic", "Creative", "Fitness Oriented"],
    bio: "Professional dance instructor specializing in contemporary and Bollywood. Love staying active and bringing joy through movement.",
    interests: ["Dance", "Fitness", "Music", "Choreography"],
    lifestyle: {
      cleanliness: 3,
      sleepTime: 22.5, // 10:30 PM
      visitorTolerance: 3
    }
  },
  {
    id: 19,
    name: "Kriti Bhargava",
    age: 26,
    profession: "Environmental Scientist",
    city: "Yelahanka, Bangalore",
    compatibility: 89,
    avatar: "/profile4.jpg",
    sharedTraits: ["Eco-Conscious", "Research Minded", "Nature Lover"],
    bio: "Environmental scientist working on sustainable solutions. Passionate about green living and making a positive impact on the planet.",
    interests: ["Environment", "Sustainability", "Hiking", "Gardening"],
    lifestyle: {
      cleanliness: 5,
      sleepTime: 21.5, // 9:30 PM
      visitorTolerance: 2
    }
  },
  {
    id: 20,
    name: "Sakshi Kulkarni",
    age: 24,
    profession: "Software Developer",
    city: "Brookefield, Bangalore",
    compatibility: 93,
    avatar: "/profile5.jpg",
    sharedTraits: ["Tech Savvy", "Problem Solver", "Coffee Addict"],
    bio: "Full-stack developer with a passion for creating user-friendly applications. Love coding late into the night with good coffee.",
    interests: ["Programming", "Technology", "Gaming", "Startups"],
    lifestyle: {
      cleanliness: 4,
      sleepTime: 24, // 12 AM
      visitorTolerance: 2
    }
  },
  {
    id: 21,
    name: "Aditi Jain",
    age: 25,
    profession: "Chef",
    city: "Frazer Town, Bangalore",
    compatibility: 84,
    avatar: "/profile1.jpg",
    sharedTraits: ["Culinary Expert", "Creative", "Social"],
    bio: "Professional chef specializing in fusion cuisine. Love experimenting with flavors and hosting dinner parties for friends.",
    interests: ["Cooking", "Food Photography", "Wine Tasting", "Hospitality"],
    lifestyle: {
      cleanliness: 4,
      sleepTime: 23, // 11 PM
      visitorTolerance: 4
    }
  },
  {
    id: 22,
    name: "Vaishnavi Singh",
    age: 23,
    profession: "Medical Student",
    city: "Rajajinagar, Bangalore",
    compatibility: 90,
    avatar: "/profile2.jpg",
    sharedTraits: ["Studious", "Compassionate", "Disciplined"],
    bio: "Final year medical student with dreams of becoming a pediatrician. Dedicated to studies but love unwinding with good music.",
    interests: ["Medicine", "Healthcare", "Music", "Volunteering"],
    lifestyle: {
      cleanliness: 5,
      sleepTime: 22, // 10 PM
      visitorTolerance: 1
    }
  },
  {
    id: 23,
    name: "Tanvi Kapoor",
    age: 27,
    profession: "Art Curator",
    city: "UB City, Bangalore",
    compatibility: 87,
    avatar: "/profile3.jpg",
    sharedTraits: ["Artistic", "Cultured", "Well-Traveled"],
    bio: "Art curator at a contemporary gallery. Love discovering emerging artists and organizing cultural events around the city.",
    interests: ["Art", "Exhibitions", "Culture", "History"],
    lifestyle: {
      cleanliness: 4,
      sleepTime: 23.5, // 11:30 PM
      visitorTolerance: 3
    }
  },
  {
    id: 24,
    name: "Nandini Reddy",
    age: 24,
    profession: "Journalist",
    city: "Church Street, Bangalore",
    compatibility: 85,
    avatar: "/profile4.jpg",
    sharedTraits: ["Curious", "Well-Informed", "Social Justice Advocate"],
    bio: "Investigative journalist passionate about social issues. Love staying informed about current events and meaningful discussions.",
    interests: ["Journalism", "Current Affairs", "Writing", "Social Issues"],
    lifestyle: {
      cleanliness: 3,
      sleepTime: 24.5, // 12:30 AM
      visitorTolerance: 3
    }
  },
  {
    id: 25,
    name: "Sanya Agarwal",
    age: 26,
    profession: "Fitness Trainer",
    city: "Whitefield, Bangalore",
    compatibility: 92,
    avatar: "/profile5.jpg",
    sharedTraits: ["Health Focused", "Motivational", "Early Riser"],
    bio: "Certified fitness trainer and nutrition coach. Believe in healthy living and love helping others achieve their fitness goals.",
    interests: ["Fitness", "Nutrition", "Yoga", "Outdoor Activities"],
    lifestyle: {
      cleanliness: 4,
      sleepTime: 21, // 9 PM
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
  const [likedMatches, setLikedMatches] = useState<number[]>([]);
  const [skippedMatches, setSkippedMatches] = useState<number[]>([]);
  const [savedMatches, setSavedMatches] = useState<number[]>([]);
  const [actionFeedback, setActionFeedback] = useState<{
    show: boolean;
    type: 'like' | 'skip' | 'save';
    message: string;
  }>({ show: false, type: 'like', message: '' });
  const cardRef = useRef<HTMLDivElement>(null);

  const currentMatch = matches[currentMatchIndex];

  const handleAction = (action: 'like' | 'skip' | 'save') => {
    if (!currentMatch) return;

    // Update respective state based on action
    switch (action) {
      case 'like':
        setLikedMatches(prev => [...prev, currentMatch.id]);
        setActionFeedback({
          show: true,
          type: 'like',
          message: `You liked ${currentMatch.name}!`
        });
        break;
      case 'skip':
        setSkippedMatches(prev => [...prev, currentMatch.id]);
        setActionFeedback({
          show: true,
          type: 'skip',
          message: `${currentMatch.name} skipped`
        });
        break;
      case 'save':
        setSavedMatches(prev => [...prev, currentMatch.id]);
        setActionFeedback({
          show: true,
          type: 'save',
          message: `${currentMatch.name} saved for later!`
        });
        break;
    }

    // Hide feedback after 2 seconds
    setTimeout(() => {
      setActionFeedback({ show: false, type: 'like', message: '' });
    }, 2000);
    
    // Move to next match
    setTimeout(() => {
    if (currentMatchIndex < matches.length - 1) {
      setCurrentMatchIndex(currentMatchIndex + 1);
    } else {
        // No more matches - could reset or show completion
      setCurrentMatchIndex(0); // Reset for demo
    }
    
    // Reset drag state
    setDragOffset({ x: 0, y: 0 });
    setIsDragging(false);
    }, 500); // Small delay for better UX
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
      <div className="min-h-screen relative font-poppins flex items-center justify-center">
        {/* Background Images - Responsive */}
        {/* Desktop Background */}
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
          style={{
            backgroundImage: "url('/dashboard-background.jpg')"
          }}
        >
          <div className="absolute inset-0 bg-black/15"></div>
        </div>
        
        {/* Mobile Background */}
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat block md:hidden"
          style={{
            backgroundImage: "url('/auth-background.jpg')"
          }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="relative z-10 text-center">
          <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-2xl" style={{
            textShadow: '0 4px 12px rgba(0, 0, 0, 0.9), 0 2px 4px rgba(0, 0, 0, 0.7)'
          }}>No More Matches!</h2>
          <p className="text-white text-lg mb-6 drop-shadow-xl" style={{
            textShadow: '0 3px 8px rgba(0, 0, 0, 0.9), 0 1px 3px rgba(0, 0, 0, 0.7)'
          }}>Check back later for new potential roommates.</p>
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
    <div className="min-h-screen relative font-poppins">
      {/* Background Images - Responsive */}
      {/* Desktop Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
        style={{
          backgroundImage: "url('/dashboard-background.jpg')"
        }}
      >
        <div className="absolute inset-0 bg-black/15"></div>
      </div>
      
      {/* Mobile Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat block md:hidden"
        style={{
          backgroundImage: "url('/auth-background.jpg')"
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Header - Floating */}
      <div className="relative z-10 bg-white/90 backdrop-blur-md rounded-2xl mx-4 mt-6 mb-2 shadow-xl border border-white/30 sticky top-6 z-40">
        <div className="px-6 py-4">
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
              <span className="text-sm text-gray-600 font-medium hidden sm:block">
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

      {/* Desktop Layout */}
      <div className="relative z-10 hidden lg:block">
        <div className="container mx-auto px-6 py-6">
          <div className="grid grid-cols-12 gap-8 max-w-7xl mx-auto">
            {/* Left Sidebar - Match Queue */}
            <div className="col-span-3">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/30 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Match Queue</h3>
                <div className="space-y-3">
                  {matches.slice(currentMatchIndex + 1, currentMatchIndex + 4).map((match, idx) => {
                    const isLiked = likedMatches.includes(match.id);
                    const isSaved = savedMatches.includes(match.id);
                    const isSkipped = skippedMatches.includes(match.id);
                    
                    return (
                      <div key={match.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="relative">
                          <img 
                            src={match.avatar} 
                            alt={match.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          {(isLiked || isSaved || isSkipped) && (
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center">
                              {isLiked && (
                                <div className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                  </svg>
                                </div>
                              )}
                              {isSaved && (
                                <div className="bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                  </svg>
                                </div>
                              )}
                              {isSkipped && (
                                <div className="bg-gray-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{match.name}</p>
                          <p className="text-xs text-gray-500">{match.compatibility}% match</p>
                        </div>
                      </div>
                    );
                  })}
                  {matches.length - currentMatchIndex <= 1 && (
                    <p className="text-sm text-gray-500 text-center py-4">No more matches in queue</p>
                  )}
                </div>
              </div>

              {/* Match Statistics */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/30">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Your Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Matches</span>
                    <span className="text-sm font-semibold text-gray-900">{matches.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Avg Compatibility</span>
                    <span className="text-sm font-semibold text-green-600">
                      {Math.round(matches.reduce((acc, match) => acc + match.compatibility, 0) / matches.length)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Viewed Today</span>
                    <span className="text-sm font-semibold text-gray-900">{currentMatchIndex + 1}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      <span className="text-sm text-gray-600">Liked</span>
                    </div>
                    <span className="text-sm font-semibold text-green-600">{likedMatches.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                      <span className="text-sm text-gray-600">Saved</span>
                    </div>
                    <span className="text-sm font-semibold text-yellow-600">{savedMatches.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="text-sm text-gray-600">Skipped</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-600">{skippedMatches.length}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Center - Main Match Card */}
            <div className="col-span-6 flex justify-center">
              <div className="w-full max-w-lg">
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
                {/* Right Swipe - Like */}
                <div 
                  className={`absolute top-8 left-8 px-6 py-3 rounded-xl font-bold text-xl transition-all duration-200 shadow-lg ${
                    dragOffset.x > 50 
                      ? 'opacity-100 bg-gradient-to-r from-green-500 to-green-600 text-white scale-110' 
                      : 'opacity-60 bg-white/90 text-gray-700 scale-100 border-2 border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    <span>LIKE</span>
                  </div>
                  <div className="text-xs font-normal mt-1 opacity-90">Swipe right →</div>
                </div>
                
                {/* Left Swipe - Skip */}
                <div 
                  className={`absolute top-8 right-8 px-6 py-3 rounded-xl font-bold text-xl transition-all duration-200 shadow-lg ${
                    dragOffset.x < -50 
                      ? 'opacity-100 bg-gradient-to-r from-red-500 to-red-600 text-white scale-110' 
                      : 'opacity-60 bg-white/90 text-gray-700 scale-100 border-2 border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>SKIP</span>
                  </div>
                  <div className="text-xs font-normal mt-1 opacity-90">← Swipe left</div>
                </div>
                
                {/* Drag Direction Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                  <div className="bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                    {Math.abs(dragOffset.x) > 50 
                      ? (dragOffset.x > 0 ? 'Release to LIKE →' : '← Release to SKIP')
                      : 'Keep swiping...'
                    }
                  </div>
                </div>
              </>
            )}

            {/* Profile Image */}
            <div className="h-1/2 relative overflow-hidden">
              <img 
                src={currentMatch.avatar} 
                alt={currentMatch.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Profile Info */}
            <div className="h-1/2 p-4 flex flex-col">
              <div className="flex-1 overflow-y-auto">
                {/* Basic Info */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{currentMatch.name}</h2>
                    <p className="text-gray-600 text-sm">{currentMatch.profession}, {currentMatch.age}</p>
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
                <div className="flex items-center text-gray-600 mb-3">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm">{currentMatch.city}</span>
                </div>

                {/* Shared Traits */}
                <div className="mb-3">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Top Shared Traits</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentMatch.sharedTraits.map((trait, idx) => (
                      <span key={idx} className="bg-[#E9DDFB] text-[#7D3EFF] text-xs font-medium px-2 py-1 rounded-full">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-gray-700 line-clamp-3">{currentMatch.bio}</p>
              </div>

              {/* View Profile Button - Fixed at bottom */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <button className="w-full bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                  View Full Profile
                </button>
              </div>
            </div>
          </div>

          {/* Next Card Preview */}
          {currentMatchIndex < matches.length - 1 && (
            <div 
              className="absolute inset-0 bg-white rounded-2xl shadow-lg -z-10"
              style={{ transform: 'scale(0.95) translateY(10px)' }}
            >
              {/* Preview of next match */}
              <div className="h-1/2 relative overflow-hidden">
                <img 
                  src={matches[currentMatchIndex + 1].avatar} 
                  alt={matches[currentMatchIndex + 1].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
              <div className="h-1/2 p-4 flex flex-col justify-center">
                <h3 className="text-lg font-bold text-gray-900">{matches[currentMatchIndex + 1].name}</h3>
                <p className="text-gray-600 text-sm">{matches[currentMatchIndex + 1].profession}, {matches[currentMatchIndex + 1].age}</p>
                <div className="flex items-center mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm font-semibold text-green-600">{matches[currentMatchIndex + 1].compatibility}% Match</span>
                </div>
              </div>
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
           <div className="text-center text-gray-600 text-sm space-y-2">
             <div className="flex items-center justify-center space-x-6">
               <div className="flex items-center space-x-2">
                 <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                 </svg>
                 <span>← Skip</span>
               </div>
               <div className="flex items-center space-x-2">
                 <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                 </svg>
                 <span>Save</span>
               </div>
               <div className="flex items-center space-x-2">
                 <span>Like →</span>
                 <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                 </svg>
               </div>
             </div>
             <p className="text-xs text-gray-500">Swipe or tap buttons • Saved matches in your profile</p>
           </div>
              </div>
            </div>

            {/* Right Sidebar - Profile Details & Tips */}
            <div className="col-span-3">
              {/* Extended Profile Info */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/30 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Profile Details</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Interests</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentMatch.interests.map((interest, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Lifestyle</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Cleanliness</span>
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className={`w-2 h-2 rounded-full ${
                              i < currentMatch.lifestyle.cleanliness ? 'bg-[#7D3EFF]' : 'bg-gray-200'
                            }`}></div>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Sleep Time</span>
                        <span className="text-gray-900">{formatSleepTime(currentMatch.lifestyle.sleepTime)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Guest Friendly</span>
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className={`w-2 h-2 rounded-full ${
                              i < currentMatch.lifestyle.visitorTolerance ? 'bg-[#7D3EFF]' : 'bg-gray-200'
                            }`}></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Match Tips */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/30">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Conversation Starters</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-gradient-to-r from-[#7D3EFF]/10 to-[#A866FF]/10 rounded-lg">
                    <p className="text-sm text-gray-700">"I see you're into {currentMatch.interests[0].toLowerCase()}! What got you started?"</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-[#7D3EFF]/10 to-[#A866FF]/10 rounded-lg">
                    <p className="text-sm text-gray-700">"How do you like living in {currentMatch.city.split(',')[0]}?"</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-[#7D3EFF]/10 to-[#A866FF]/10 rounded-lg">
                    <p className="text-sm text-gray-700">"What's your experience been like as a {currentMatch.profession.toLowerCase()}?"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="relative z-10 lg:hidden">
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
                   {/* Right Swipe - Like */}
                <div 
                     className={`absolute top-8 left-8 px-4 py-2 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg ${
                       dragOffset.x > 50 
                         ? 'opacity-100 bg-gradient-to-r from-green-500 to-green-600 text-white scale-110' 
                         : 'opacity-60 bg-white/90 text-gray-700 scale-100 border-2 border-gray-200'
                  }`}
                >
                     <div className="flex items-center space-x-2">
                       <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                       </svg>
                       <span>LIKE</span>
                </div>
                     <div className="text-xs font-normal mt-1 opacity-90">Swipe right →</div>
                   </div>
                   
                   {/* Left Swipe - Skip */}
                <div 
                     className={`absolute top-8 right-8 px-4 py-2 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg ${
                       dragOffset.x < -50 
                         ? 'opacity-100 bg-gradient-to-r from-red-500 to-red-600 text-white scale-110' 
                         : 'opacity-60 bg-white/90 text-gray-700 scale-100 border-2 border-gray-200'
                  }`}
                >
                     <div className="flex items-center space-x-2">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                       </svg>
                       <span>SKIP</span>
                     </div>
                     <div className="text-xs font-normal mt-1 opacity-90">← Swipe left</div>
                   </div>
                   
                   {/* Drag Direction Indicator */}
                   <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                     <div className="bg-black/80 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                       {Math.abs(dragOffset.x) > 50 
                         ? (dragOffset.x > 0 ? 'Release to LIKE →' : '← Release to SKIP')
                         : 'Keep swiping...'
                       }
                     </div>
                </div>
              </>
            )}

            {/* Profile Image */}
            <div className="h-1/2 relative overflow-hidden">
              <img 
                src={currentMatch.avatar} 
                alt={currentMatch.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Profile Info */}
            <div className="h-1/2 p-4 flex flex-col">
              <div className="flex-1 overflow-y-auto">
                {/* Basic Info */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{currentMatch.name}</h2>
                    <p className="text-gray-600 text-sm">{currentMatch.profession}, {currentMatch.age}</p>
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
                <div className="flex items-center text-gray-600 mb-3">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm">{currentMatch.city}</span>
                </div>

                {/* Shared Traits */}
                <div className="mb-3">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Top Shared Traits</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentMatch.sharedTraits.map((trait, idx) => (
                      <span key={idx} className="bg-[#E9DDFB] text-[#7D3EFF] text-xs font-medium px-2 py-1 rounded-full">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-gray-700 line-clamp-3">{currentMatch.bio}</p>
              </div>

              {/* View Profile Button - Fixed at bottom */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <button className="w-full bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                  View Full Profile
                </button>
              </div>
            </div>
          </div>

          {/* Next Card Preview */}
          {currentMatchIndex < matches.length - 1 && (
            <div 
              className="absolute inset-0 bg-white rounded-2xl shadow-lg -z-10"
              style={{ transform: 'scale(0.95) translateY(10px)' }}
            >
                {/* Preview of next match */}
                <div className="h-1/2 relative overflow-hidden">
                  <img 
                    src={matches[currentMatchIndex + 1].avatar} 
                    alt={matches[currentMatchIndex + 1].name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10"></div>
                </div>
                <div className="h-1/2 p-4 flex flex-col justify-center">
                  <h3 className="text-lg font-bold text-gray-900">{matches[currentMatchIndex + 1].name}</h3>
                  <p className="text-gray-600 text-sm">{matches[currentMatchIndex + 1].profession}, {matches[currentMatchIndex + 1].age}</p>
                  <div className="flex items-center mt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm font-semibold text-green-600">{matches[currentMatchIndex + 1].compatibility}% Match</span>
                  </div>
                </div>
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
          <div className="text-center text-gray-600 text-sm space-y-2">
            <div className="flex items-center justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>← Skip</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                <span>Save</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>Like →</span>
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500">Swipe or tap buttons • Saved matches in your profile</p>
          </div>
        </div>
      </div>

      {/* Action Feedback Overlay - Minimalistic */}
      {actionFeedback.show && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
          <div className={`px-4 py-2 rounded-full shadow-lg backdrop-blur-md border transform transition-all duration-300 ${
            actionFeedback.type === 'like' 
              ? 'bg-green-500/90 text-white border-green-400/50 scale-105' 
              : actionFeedback.type === 'skip'
              ? 'bg-red-500/90 text-white border-red-400/50 scale-105'
              : 'bg-yellow-500/90 text-white border-yellow-400/50 scale-105'
          }`}>
            <div className="flex items-center space-x-2">
              {actionFeedback.type === 'like' ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              ) : actionFeedback.type === 'skip' ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              )}
              <span className="text-sm font-medium">{actionFeedback.message}</span>
            </div>
          </div>
        </div>
      )}

      {/* Filters Modal */}
      {showFilters && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          onMouseDown={(e) => e.stopPropagation()}
          onMouseMove={(e) => e.stopPropagation()}
          onMouseUp={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          <div 
            className="bg-white/95 backdrop-blur-md rounded-t-3xl sm:rounded-2xl w-full max-w-md max-h-[85vh] sm:max-h-[80vh] overflow-y-auto shadow-2xl border-t border-white/20 sm:border border-white/30"
            onMouseDown={(e) => e.stopPropagation()}
            onMouseMove={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
          >
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