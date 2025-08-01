'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProfile } from '../contexts/ProfileContext';
import VoicePreferenceForm from '../../components/VoicePreferenceForm';
import { db, auth } from '../firebase/config';
import { doc, setDoc } from 'firebase/firestore';

interface OnboardingData {
  // Basic Details
  age: string;
  currentCity: string;
  profession: string;
  preferredCity: string;
  profilePicture: string;
  
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
  const { updateFromOnboarding } = useProfile();
  
  const [formData, setFormData] = useState<OnboardingData>({
    age: '',
    currentCity: '',
    profession: '',
    preferredCity: '',
    profilePicture: '',
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
      // Save onboarding data to profile context (existing functionality)
      updateFromOnboarding(formData);
      console.log('Onboarding data saved:', formData);
      
      // Try to save to Firebase Firestore (optional - won't block if it fails)
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          // Prepare the payload by adding onboarded: true and timestamp
          const onboardingPayload = {
            ...formData,
            onboarded: true,
            timestamp: Date.now(),
            completedAt: new Date().toISOString()
          };
          
          // Write/merge the object under users/{uid} in Firebase Firestore Database
          const userRef = doc(db, 'users', currentUser.uid);
          await setDoc(userRef, onboardingPayload);
          
          console.log('✅ Onboarding data saved to Firebase Firestore for user:', currentUser.uid);
        } else {
          console.warn('⚠️ No authenticated user found, skipping Firebase Database save');
        }
      } catch (firebaseError) {
        console.warn('⚠️ Firebase save failed (but continuing):', firebaseError);
        // Continue with the process even if Firebase fails
      }
      
      // Simulate API call (existing functionality)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to dashboard (existing functionality)
      router.push('/dashboard');
    } catch (error) {
      console.error('❌ Error submitting onboarding data:', error);
      // Still redirect to dashboard even if there's an error
      router.push('/dashboard');
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
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      {/* Mobile Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat block md:hidden"
        style={{
          backgroundImage: "url('/auth-background.jpg')"
        }}
      >
        {/* Light overlay to maintain vibrancy while ensuring text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Desktop Layout (lg+) */}
      <div className="hidden lg:block relative z-10 h-screen overflow-hidden">
        <div className="container mx-auto px-8 h-full flex items-center py-8">
          <div className="grid grid-cols-2 gap-12 xl:gap-16 w-full max-w-7xl mx-auto items-center h-full">
            {/* Left Side - Progress & Features */}
            <div className="space-y-6 h-full flex flex-col justify-center">
              <div>
                <h1 className="text-4xl xl:text-5xl font-extrabold text-white mb-4 drop-shadow-2xl leading-tight" style={{
                  textShadow: '0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(168, 102, 255, 0.6), 0 4px 8px rgba(0, 0, 0, 0.8)',
                  WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)'
                }}>Complete Your Profile</h1>
                <p className="text-lg xl:text-xl text-white font-medium drop-shadow-lg mb-6" style={{
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 255, 255, 0.3)'
                }}>Help us find your perfect co-living match</p>
              </div>

              {/* Progress Section */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                <h3 className="text-lg font-bold text-white mb-3">Your Progress</h3>
                <div className="space-y-3">
                  {STEPS.map((step, index) => (
                    <div key={step} className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index <= currentStep 
                          ? 'bg-white text-[#7D3EFF]' 
                          : 'bg-white/30 text-white'
                      }`}>
                        {index + 1}
                      </div>
                      <span className={`text-sm font-medium ${
                        index <= currentStep ? 'text-white' : 'text-white/60'
                      }`}>{step}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <div className="w-full bg-white/30 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-white to-gray-100 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                    />
                  </div>
                  <p className="text-white/80 text-xs mt-2">
                    Step {currentStep + 1} of {STEPS.length} • {Math.round(((currentStep + 1) / STEPS.length) * 100)}% Complete
                  </p>
                </div>
              </div>
              
              {/* Feature Highlights */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white mb-1">Smart Matching</h4>
                    <p className="text-white/80 text-sm">Find compatible roommates based on your preferences</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white mb-1">Privacy First</h4>
                    <p className="text-white/80 text-sm">Your information is secure and only shared with verified matches</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white mb-1">Instant Results</h4>
                    <p className="text-white/80 text-sm">Get matched as soon as you complete your profile</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Form Content */}
            <div className="h-full flex items-center justify-center">
              <div className="w-full max-w-xl h-full max-h-full flex items-center">
                <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 xl:p-8 border border-white/30 w-full max-h-[85vh] flex flex-col">
                  <div className="flex-1 overflow-y-auto" style={{ minHeight: 0 }}>
                    {renderStepContent()}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-6 gap-4 flex-shrink-0">
                    <button
                      onClick={prevStep}
                      disabled={currentStep === 0}
                      className="px-5 py-2.5 text-[#7D3EFF] font-medium rounded-lg border border-[#7D3EFF] hover:bg-[#7D3EFF] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>

                    {currentStep === STEPS.length - 1 ? (
                      <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="px-6 py-2.5 bg-gradient-to-r from-[#A866FF] to-[#6F3CFF] text-white font-semibold rounded-lg hover:from-[#A353F2] hover:to-[#7D3EFF] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? 'Submitting...' : 'Complete Profile'}
                      </button>
                    ) : (
                      <button
                        onClick={nextStep}
                        className="px-5 py-2.5 bg-gradient-to-r from-[#A866FF] to-[#6F3CFF] text-white font-semibold rounded-lg hover:from-[#A353F2] hover:to-[#7D3EFF] transition-all"
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

            {/* Mobile Layout (< lg) */}
      <div className="lg:hidden relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-2xl leading-tight" style={{
            textShadow: '0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(168, 102, 255, 0.6), 0 4px 8px rgba(0, 0, 0, 0.8)',
            WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)'
          }}>Complete Your Profile</h1>
          <p className="text-white text-base sm:text-lg font-medium drop-shadow-lg" style={{
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 255, 255, 0.3)'
          }}>Help us find your perfect co-living match</p>
        </div>

        {/* Progress Bar - Mobile Optimized */}
        <div className="max-w-4xl mx-auto mb-6 sm:mb-8">
          {/* Mobile Progress - Simplified */}
          <div className="block sm:hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-base font-bold text-[#7D3EFF] shadow-lg">
                  {currentStep + 1}
                </div>
                <div className="ml-4">
                  <div className="text-white font-bold text-base" style={{
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 255, 255, 0.4)',
                    WebkitTextStroke: '0.5px rgba(255, 255, 255, 0.3)'
                  }}>{STEPS[currentStep]}</div>
                  <div className="text-white font-medium text-sm" style={{
                    textShadow: '0 2px 6px rgba(0, 0, 0, 0.8), 0 0 15px rgba(255, 255, 255, 0.3)'
                  }}>Step {currentStep + 1} of {STEPS.length}</div>
                </div>
              </div>
            </div>
            <div className="w-full bg-white/30 rounded-full h-3 shadow-inner">
              <div 
                className="bg-gradient-to-r from-white to-gray-100 h-3 rounded-full transition-all duration-300 shadow-sm"
                style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Tablet Progress - Full (sm to lg) */}
          <div className="hidden sm:block lg:hidden">
            <div className="flex items-center justify-between mb-4 w-full">
              {STEPS.map((step, index) => (
                <div key={step} className="flex items-center flex-1 justify-center">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-base font-bold shadow-lg flex-shrink-0 ${
                      index <= currentStep 
                        ? 'bg-white text-[#7D3EFF]' 
                        : 'bg-white/30 text-white border-2 border-white/50'
                    }`}>
                      {index + 1}
                    </div>
                    <span className={`ml-3 text-sm lg:text-base font-bold ${
                      index <= currentStep ? 'text-white' : 'text-white/80'
                    }`} style={{
                      textShadow: index <= currentStep 
                        ? '0 2px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 255, 255, 0.4), 0 0 40px rgba(168, 102, 255, 0.3)'
                        : '0 2px 6px rgba(0, 0, 0, 0.8), 0 0 15px rgba(255, 255, 255, 0.2)',
                      WebkitTextStroke: '0.5px rgba(255, 255, 255, 0.3)'
                    }}>
                      {step}
                    </span>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div className={`flex-1 h-1 ml-4 mr-2 rounded-full ${
                      index < currentStep ? 'bg-gradient-to-r from-white to-gray-100 shadow-sm' : 'bg-white/30'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="w-full bg-white/30 rounded-full h-3 shadow-inner">
              <div 
                className="bg-gradient-to-r from-white to-gray-100 h-3 rounded-full transition-all duration-300 shadow-sm"
                style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-2xl mx-auto px-4 sm:px-0">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-white/20">
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
  const [previewImage, setPreviewImage] = useState<string>(formData.profilePicture || '');
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);

  const handleVoiceFormUpdate = (voiceData: any) => {
    console.log('Voice form data received:', voiceData);
    // Map voice data to onboarding form structure
    const mappedData: Partial<OnboardingData> = {};
    
    // Basic details
    if (voiceData.age) mappedData.age = voiceData.age;
    if (voiceData.currentCity) mappedData.currentCity = voiceData.currentCity;
    if (voiceData.profession) mappedData.profession = voiceData.profession;
    if (voiceData.preferredCity) mappedData.preferredCity = voiceData.preferredCity;
    
    // Lifestyle preferences
    if (voiceData.sleepSchedule) mappedData.sleepSchedule = voiceData.sleepSchedule;
    if (voiceData.cleanliness) mappedData.cleanliness = voiceData.cleanliness;
    if (voiceData.guestPolicy) mappedData.guestPolicy = voiceData.guestPolicy;
    if (voiceData.foodHabits) mappedData.foodHabits = voiceData.foodHabits;
    if (voiceData.drinking) mappedData.drinking = voiceData.drinking;
    if (voiceData.smoking) mappedData.smoking = voiceData.smoking;
    
    // Personality (if present)
    if (voiceData.personality) {
      mappedData.personality = {
        extroversion: voiceData.personality.extroversion || formData.personality.extroversion,
        agreeableness: voiceData.personality.agreeableness || formData.personality.agreeableness,
        conscientiousness: voiceData.personality.conscientiousness || formData.personality.conscientiousness,
        neuroticism: voiceData.personality.neuroticism || formData.personality.neuroticism,
        openness: voiceData.personality.openness || formData.personality.openness
      };
    }
    
    // Room preferences
    if (voiceData.roomType) mappedData.roomType = voiceData.roomType;
    if (voiceData.floorPreference) mappedData.floorPreference = voiceData.floorPreference;
    if (voiceData.windowPreference) mappedData.windowPreference = voiceData.windowPreference;
    if (voiceData.lightPreference) mappedData.lightPreference = voiceData.lightPreference;
    
    // Safety preferences
    if (voiceData.verifiedOnly !== undefined) mappedData.verifiedOnly = voiceData.verifiedOnly;
    
    // Update the form data
    updateFormData(mappedData);
    
    // Show success message and close voice assistant
    setTimeout(() => {
      setShowVoiceAssistant(false);
      alert('🎉 Voice preferences saved! Your form has been populated with your responses.');
    }, 1000);
  };

  const compressImage = (file: File, maxWidth: number = 400, quality: number = 0.8): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions while maintaining aspect ratio
        let { width, height } = img;
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxWidth) {
            width = (width * maxWidth) / height;
            height = maxWidth;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid image file (JPEG, PNG, or WebP)');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      try {
        // Compress image to reduce localStorage usage
        const compressedImageUrl = await compressImage(file, 400, 0.8);
        setPreviewImage(compressedImageUrl);
        updateFormData({ profilePicture: compressedImageUrl });
      } catch (error) {
        console.error('Error compressing image:', error);
        alert('Error processing image. Please try again.');
      }
    }
  };

  return (
    <div className="space-y-6">
      {showVoiceAssistant ? (
        <div className="h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Voice Assistant</h3>
            <button
              onClick={() => setShowVoiceAssistant(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <VoicePreferenceForm onFormUpdate={handleVoiceFormUpdate} />
        </div>
      ) : (
        <>
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Basic Details</h2>
            <p className="text-sm sm:text-base text-gray-600">Tell us a bit about yourself</p>
            
            {/* AI Assistant Options */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4 items-center justify-center">
              <button
                onClick={() => setShowVoiceAssistant(true)}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium flex items-center justify-center space-x-2"
              >
                <span>🎤</span>
                <span>Use Voice Assistant</span>
              </button>
              
              <span className="text-gray-400 hidden sm:block">or</span>
              
              <button
                onClick={() => window.open('/phone', '_blank')}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium flex items-center justify-center space-x-2"
              >
                <span>📞</span>
                <span>Get AI Phone Call</span>
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mt-2 text-center max-w-md mx-auto">
              Skip the typing! Use our AI assistant to complete your preferences by voice on the web or get called on your phone.
            </p>
          </div>

      {/* Profile Picture Upload */}
      <div className="flex flex-col items-center mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-4">Profile Picture</label>
        <div className="relative">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-gray-200 bg-gray-100 flex items-center justify-center">
            {previewImage ? (
              <img 
                src={previewImage} 
                alt="Profile preview" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center">
                <svg className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <p className="text-xs text-gray-500">Add Photo</p>
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            title="Upload profile picture"
          />
          <div className="absolute -bottom-1 -right-1 bg-[#7D3EFF] rounded-full p-2 border-2 border-white shadow-lg">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center max-w-xs">
          Upload a clear photo of yourself. This helps potential roommates recognize you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => updateFormData({ age: e.target.value })}
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none touch-manipulation text-gray-900 bg-white"
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
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none touch-manipulation text-gray-900 bg-white"
            placeholder="e.g., Mumbai"
          />
        </div>

        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Profession</label>
          <input
            type="text"
            value={formData.profession}
            onChange={(e) => updateFormData({ profession: e.target.value })}
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none touch-manipulation text-gray-900 bg-white"
            placeholder="e.g., Software Engineer"
          />
        </div>

        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Preferred City</label>
          <input
            type="text"
            value={formData.preferredCity}
            onChange={(e) => updateFormData({ preferredCity: e.target.value })}
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none touch-manipulation text-gray-900 bg-white"
            placeholder="e.g., Bangalore"
          />
        </div>
      </div>
        </>
      )}
    </div>
  );
}

function LifestylePreferencesStep({ formData, updateFormData }: { formData: OnboardingData, updateFormData: (updates: Partial<OnboardingData>) => void }) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Lifestyle Preferences</h2>
        <p className="text-sm sm:text-base text-gray-600">Help us understand your daily habits</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sleep Schedule</label>
          <select
            value={formData.sleepSchedule}
            onChange={(e) => updateFormData({ sleepSchedule: e.target.value })}
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none touch-manipulation text-gray-900 bg-white"
          >
            <option value="">Select sleep schedule</option>
            <option value="early-bird">Early Bird (Sleep by 10 PM)</option>
            <option value="night-owl">Night Owl (Sleep after 12 AM)</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cleanliness Level</label>
          <select
            value={formData.cleanliness}
            onChange={(e) => updateFormData({ cleanliness: e.target.value })}
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none touch-manipulation text-gray-900 bg-white"
          >
            <option value="">Select cleanliness level</option>
            <option value="very-clean">Very Clean</option>
            <option value="moderately-clean">Moderately Clean</option>
            <option value="casual">Casual</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Guest Policy</label>
          <select
            value={formData.guestPolicy}
            onChange={(e) => updateFormData({ guestPolicy: e.target.value })}
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none touch-manipulation text-gray-900 bg-white"
          >
            <option value="">Select guest policy</option>
            <option value="no-guests">No Guests</option>
            <option value="occasional">Occasional Guests</option>
            <option value="frequent">Frequent Guests</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Food Habits</label>
          <select
            value={formData.foodHabits}
            onChange={(e) => updateFormData({ foodHabits: e.target.value })}
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none touch-manipulation text-gray-900 bg-white"
          >
            <option value="">Select food habits</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="non-vegetarian">Non-Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="no-preference">No Preference</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Drinking</label>
          <select
            value={formData.drinking}
            onChange={(e) => updateFormData({ drinking: e.target.value })}
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none touch-manipulation text-gray-900 bg-white"
          >
            <option value="">Select drinking preference</option>
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
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none touch-manipulation text-gray-900 bg-white"
          >
            <option value="">Select smoking preference</option>
            <option value="never">Never</option>
            <option value="occasionally">Occasionally</option>
            <option value="regularly">Regularly</option>
          </select>
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
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Room Preferences</h2>
        <p className="text-sm sm:text-base text-gray-600">What's your ideal living space?</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
          <select
            value={formData.roomType}
            onChange={(e) => updateFormData({ roomType: e.target.value })}
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none touch-manipulation text-gray-900 bg-white"
          >
            <option value="">Select room type</option>
            <option value="single">Single Room</option>
            <option value="twin-sharing">Twin Sharing</option>
            <option value="no-preference">No Preference</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Floor Preference</label>
          <select
            value={formData.floorPreference}
            onChange={(e) => updateFormData({ floorPreference: e.target.value })}
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none touch-manipulation text-gray-900 bg-white"
          >
            <option value="">Select floor preference</option>
            <option value="ground">Ground Floor</option>
            <option value="low">Low Floor (1-3)</option>
            <option value="mid">Mid Floor (4-7)</option>
            <option value="high">High Floor (8+)</option>
            <option value="no-preference">No Preference</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Window Preference</label>
          <select
            value={formData.windowPreference}
            onChange={(e) => updateFormData({ windowPreference: e.target.value })}
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none touch-manipulation text-gray-900 bg-white"
          >
            <option value="">Select window preference</option>
            <option value="lots-of-windows">Lots of Windows</option>
            <option value="some-windows">Some Windows</option>
            <option value="minimal-windows">Minimal Windows</option>
            <option value="no-preference">No Preference</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Natural Light</label>
          <select
            value={formData.lightPreference}
            onChange={(e) => updateFormData({ lightPreference: e.target.value })}
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-[#7D3EFF] outline-none touch-manipulation text-gray-900 bg-white"
          >
            <option value="">Select light preference</option>
            <option value="bright">Bright & Airy</option>
            <option value="moderate">Moderate Light</option>
            <option value="dim">Dim & Cozy</option>
            <option value="no-preference">No Preference</option>
          </select>
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