'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface OnboardingData {
  // Basic Details
  age: string;
  currentCity: string;
  profession: string;
  preferredCity: string;
  
  // Lifestyle Preferences
  sleepSchedule: string;
  cleanliness: string;
  guestPolicy: string;
  foodHabits: string;
  drinking: string;
  smoking: string;
  
  // Personality Style
  personality: {
    extroversion: number;
    agreeableness: number;
    conscientiousness: number;
    neuroticism: number;
    openness: number;
  };
  
  // Room Preferences
  roomType: string;
  floorPreference: string;
  windowPreference: string;
  lightPreference: string;
  
  // Safety Preferences
  verifiedOnly: boolean;
}

const STEPS = [
  'Basic Details',
  'Lifestyle Preferences', 
  'Personality Style',
  'Room Preferences',
  'Safety Preferences'
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const [formData, setFormData] = useState<OnboardingData>({
    age: '',
    currentCity: '',
    profession: '',
    preferredCity: '',
    sleepSchedule: '',
    cleanliness: '',
    guestPolicy: '',
    foodHabits: '',
    drinking: '',
    smoking: '',
    personality: {
      extroversion: 3,
      agreeableness: 3,
      conscientiousness: 3,
      neuroticism: 3,
      openness: 3
    },
    roomType: '',
    floorPreference: '',
    windowPreference: '',
    lightPreference: '',
    verifiedOnly: true
  });

  const updateFormData = (updates: Partial<OnboardingData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const updatePersonality = (trait: keyof OnboardingData['personality'], value: number) => {
    setFormData(prev => ({
      ...prev,
      personality: {
        ...prev.personality,
        [trait]: value
      }
    }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // TODO: Send data to backend API
      console.log('Onboarding data:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Error submitting onboarding data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <BasicDetailsStep formData={formData} updateFormData={updateFormData} />;
      case 1:
        return <LifestylePreferencesStep formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <PersonalityStyleStep formData={formData} updatePersonality={updatePersonality} />;
      case 3:
        return <RoomPreferencesStep formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <SafetyPreferencesStep formData={formData} updateFormData={updateFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#A866FF] to-[#6F3CFF] font-poppins">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Complete Your Profile</h1>
          <p className="text-[#E9DDFB] text-sm">Help us find your perfect co-living match</p>
        </div>

        {/* Progress Bar - Mobile Optimized */}
        <div className="max-w-4xl mx-auto mb-6 sm:mb-8">
          {/* Mobile Progress - Simplified */}
          <div className="block sm:hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-bold text-[#7D3EFF]">
                  {currentStep + 1}
                </div>
                <div className="ml-3">
                  <div className="text-white font-medium text-sm">{STEPS[currentStep]}</div>
                  <div className="text-white/70 text-xs">Step {currentStep + 1} of {STEPS.length}</div>
                </div>
              </div>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Desktop Progress - Full */}
          <div className="hidden sm:block">
            <div className="flex items-center justify-between mb-4 overflow-x-auto">
              {STEPS.map((step, index) => (
                <div key={step} className="flex items-center flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= currentStep 
                      ? 'bg-white text-[#7D3EFF]' 
                      : 'bg-white/20 text-white/60'
                  }`}>
                    {index + 1}
                  </div>
                  <span className={`ml-2 text-sm font-medium whitespace-nowrap ${
                    index <= currentStep ? 'text-white' : 'text-white/60'
                  }`}>
                    {step}
                  </span>
                  {index < STEPS.length - 1 && (
                    <div className={`w-8 sm:w-12 h-0.5 mx-2 sm:mx-4 ${
                      index < currentStep ? 'bg-white' : 'bg-white/20'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-2xl mx-auto px-4 sm:px-0">
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
            {renderStepContent()}

            {/* Navigation Buttons - Mobile Optimized */}
            <div className="flex flex-col sm:flex-row justify-between mt-6 sm:mt-8 gap-3 sm:gap-0">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="order-2 sm:order-1 px-6 py-3 sm:py-2 text-[#7D3EFF] font-medium rounded-lg border border-[#7D3EFF] hover:bg-[#7D3EFF] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
              >
                Previous
              </button>

              {currentStep === STEPS.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="order-1 sm:order-2 px-8 py-3 sm:py-2 bg-gradient-to-r from-[#A866FF] to-[#6F3CFF] text-white font-semibold rounded-lg hover:from-[#A353F2] hover:to-[#7D3EFF] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                >
                  {isLoading ? 'Submitting...' : 'Complete Profile'}
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  className="order-1 sm:order-2 px-6 py-3 sm:py-2 bg-gradient-to-r from-[#A866FF] to-[#6F3CFF] text-white font-semibold rounded-lg hover:from-[#A353F2] hover:to-[#7D3EFF] transition-all duration-200 touch-manipulation"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Step Components
function BasicDetailsStep({ formData, updateFormData }: { formData: OnboardingData, updateFormData: (updates: Partial<OnboardingData>) => void }) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Basic Details</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => updateFormData({ age: e.target.value })}
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none touch-manipulation"
            placeholder="Enter your age"
            min="18"
            max="100"
          />
        </div>

        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Current City</label>
          <input
            type="text"
            value={formData.currentCity}
            onChange={(e) => updateFormData({ currentCity: e.target.value })}
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none touch-manipulation"
            placeholder="e.g., Mumbai, Delhi"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Profession</label>
          <input
            type="text"
            value={formData.profession}
            onChange={(e) => updateFormData({ profession: e.target.value })}
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none touch-manipulation"
            placeholder="e.g., Software Engineer, Designer"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Preferred City for Co-Living</label>
          <input
            type="text"
            value={formData.preferredCity}
            onChange={(e) => updateFormData({ preferredCity: e.target.value })}
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none touch-manipulation"
            placeholder="e.g., Bangalore, Pune"
          />
        </div>
      </div>
    </div>
  );
}

function LifestylePreferencesStep({ formData, updateFormData }: { formData: OnboardingData, updateFormData: (updates: Partial<OnboardingData>) => void }) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Lifestyle Preferences</h2>
      
      <div className="space-y-4 sm:space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sleep Schedule</label>
          <select
            value={formData.sleepSchedule}
            onChange={(e) => updateFormData({ sleepSchedule: e.target.value })}
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none touch-manipulation"
          >
            <option value="">Select your sleep schedule</option>
            <option value="early-bird">Early Bird (Sleep by 10 PM, Wake by 6 AM)</option>
            <option value="normal">Normal (Sleep by 11 PM, Wake by 7 AM)</option>
            <option value="night-owl">Night Owl (Sleep after 12 AM, Wake after 8 AM)</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cleanliness Level</label>
          <select
            value={formData.cleanliness}
            onChange={(e) => updateFormData({ cleanliness: e.target.value })}
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none touch-manipulation"
          >
            <option value="">Select cleanliness preference</option>
            <option value="very-clean">Very Clean (Everything spotless)</option>
            <option value="clean">Clean (Tidy and organized)</option>
            <option value="moderate">Moderate (Reasonably clean)</option>
            <option value="relaxed">Relaxed (Lived-in feel is okay)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Guest Policy</label>
          <select
            value={formData.guestPolicy}
            onChange={(e) => updateFormData({ guestPolicy: e.target.value })}
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none touch-manipulation"
          >
            <option value="">Select guest policy</option>
            <option value="no-guests">No Guests</option>
            <option value="occasional">Occasional Guests (with notice)</option>
            <option value="frequent">Frequent Guests Welcome</option>
            <option value="overnight-ok">Overnight Guests Okay</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Food Habits</label>
            <select
              value={formData.foodHabits}
              onChange={(e) => updateFormData({ foodHabits: e.target.value })}
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none touch-manipulation"
            >
              <option value="">Select</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="non-vegetarian">Non-Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Drinking</label>
            <select
              value={formData.drinking}
              onChange={(e) => updateFormData({ drinking: e.target.value })}
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none touch-manipulation"
            >
              <option value="">Select</option>
              <option value="never">Never</option>
              <option value="occasionally">Occasionally</option>
              <option value="socially">Socially</option>
              <option value="regularly">Regularly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Smoking</label>
            <select
              value={formData.smoking}
              onChange={(e) => updateFormData({ smoking: e.target.value })}
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none touch-manipulation"
            >
              <option value="">Select</option>
              <option value="never">Never</option>
              <option value="occasionally">Occasionally</option>
              <option value="socially">Socially</option>
              <option value="regularly">Regularly</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

function PersonalityStyleStep({ formData, updatePersonality }: { formData: OnboardingData, updatePersonality: (trait: keyof OnboardingData['personality'], value: number) => void }) {
  const personalityTraits = [
    { key: 'extroversion', label: 'Extroversion', description: 'How outgoing and social are you?' },
    { key: 'agreeableness', label: 'Agreeableness', description: 'How cooperative and trusting are you?' },
    { key: 'conscientiousness', label: 'Conscientiousness', description: 'How organized and disciplined are you?' },
    { key: 'neuroticism', label: 'Emotional Stability', description: 'How calm and emotionally stable are you?' },
    { key: 'openness', label: 'Openness', description: 'How open are you to new experiences?' }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Personality Style</h2>
      <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">Rate yourself on a scale of 1-5 for each trait. This helps us find compatible matches.</p>
      
      <div className="space-y-6 sm:space-y-8">
        {personalityTraits.map((trait) => (
          <div key={trait.key} className="bg-gray-50 p-4 rounded-lg">
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 text-base sm:text-lg">{trait.label}</h3>
              <p className="text-sm text-gray-600 mt-1">{trait.description}</p>
            </div>
            
            {/* Mobile Layout */}
            <div className="block sm:hidden">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Low</span>
                <span>High</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => updatePersonality(trait.key as keyof OnboardingData['personality'], value)}
                    className={`h-12 rounded-lg border-2 font-medium transition-all touch-manipulation ${
                      formData.personality[trait.key as keyof OnboardingData['personality']] === value
                        ? 'bg-[#7D3EFF] border-[#7D3EFF] text-white'
                        : 'border-gray-300 text-gray-600 hover:border-[#7D3EFF] bg-white'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:flex items-center space-x-4">
              <span className="text-sm text-gray-500 w-12">Low</span>
              <div className="flex space-x-2 flex-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => updatePersonality(trait.key as keyof OnboardingData['personality'], value)}
                    className={`w-12 h-12 rounded-full border-2 font-medium transition-all ${
                      formData.personality[trait.key as keyof OnboardingData['personality']] === value
                        ? 'bg-[#7D3EFF] border-[#7D3EFF] text-white'
                        : 'border-gray-300 text-gray-600 hover:border-[#7D3EFF]'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
              <span className="text-sm text-gray-500 w-12">High</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RoomPreferencesStep({ formData, updateFormData }: { formData: OnboardingData, updateFormData: (updates: Partial<OnboardingData>) => void }) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Room Preferences</h2>
      
      <div className="space-y-4 sm:space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Room Type</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {['Single Room', 'Twin Sharing'].map((type) => (
              <button
                key={type}
                onClick={() => updateFormData({ roomType: type })}
                className={`p-4 border-2 rounded-lg text-center font-medium transition-all touch-manipulation ${
                  formData.roomType === type
                    ? 'border-[#7D3EFF] bg-[#7D3EFF]/10 text-[#7D3EFF]'
                    : 'border-gray-200 text-gray-700 hover:border-[#7D3EFF] bg-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Floor Preference</label>
          <select
            value={formData.floorPreference}
            onChange={(e) => updateFormData({ floorPreference: e.target.value })}
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none touch-manipulation"
          >
            <option value="">Select floor preference</option>
            <option value="ground">Ground Floor</option>
            <option value="low">Low Floor (1-3)</option>
            <option value="mid">Mid Floor (4-7)</option>
            <option value="high">High Floor (8+)</option>
            <option value="no-preference">No Preference</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Window Preference</label>
            <select
              value={formData.windowPreference}
              onChange={(e) => updateFormData({ windowPreference: e.target.value })}
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none touch-manipulation"
            >
              <option value="">Select preference</option>
              <option value="lots-of-windows">Lots of Windows</option>
              <option value="some-windows">Some Windows</option>
              <option value="minimal-windows">Minimal Windows</option>
              <option value="no-preference">No Preference</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Light Preference</label>
            <select
              value={formData.lightPreference}
              onChange={(e) => updateFormData({ lightPreference: e.target.value })}
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none touch-manipulation"
            >
              <option value="">Select preference</option>
              <option value="bright">Bright & Airy</option>
              <option value="moderate">Moderate Light</option>
              <option value="dim">Dim & Cozy</option>
              <option value="no-preference">No Preference</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

function SafetyPreferencesStep({ formData, updateFormData }: { formData: OnboardingData, updateFormData: (updates: Partial<OnboardingData>) => void }) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Safety Preferences</h2>
      
      <div className="bg-[#E9DDFB] p-6 rounded-lg">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-6 h-6 bg-[#7D3EFF] rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">Verified Matches Only</h3>
            <p className="text-gray-700 text-sm mb-4">
              We recommend showing only verified matches for your safety. Verified users have completed identity verification and background checks.
            </p>
            <div className="flex items-center space-x-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  checked={formData.verifiedOnly === true}
                  onChange={() => updateFormData({ verifiedOnly: true })}
                  className="sr-only"
                />
                <div className={`w-4 h-4 border-2 rounded-full mr-2 ${
                  formData.verifiedOnly === true ? 'bg-[#7D3EFF] border-[#7D3EFF]' : 'border-gray-300'
                }`}>
                  {formData.verifiedOnly === true && (
                    <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                  )}
                </div>
                <span className="text-sm font-medium text-gray-900">Yes, verified only (Recommended)</span>
              </label>
            </div>
            <div className="flex items-center space-x-4 mt-3">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  checked={formData.verifiedOnly === false}
                  onChange={() => updateFormData({ verifiedOnly: false })}
                  className="sr-only"
                />
                <div className={`w-4 h-4 border-2 rounded-full mr-2 ${
                  formData.verifiedOnly === false ? 'bg-[#7D3EFF] border-[#7D3EFF]' : 'border-gray-300'
                }`}>
                  {formData.verifiedOnly === false && (
                    <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                  )}
                </div>
                <span className="text-sm font-medium text-gray-900">Show all matches</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Safety Tips</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <ul className="list-disc list-inside space-y-1">
                <li>Always meet potential roommates in public places first</li>
                <li>Verify their identity and references before moving in</li>
                <li>Trust your instincts - if something feels off, it probably is</li>
                <li>Keep your personal information private until you're comfortable</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 