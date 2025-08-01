'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

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

interface UserProfile extends OnboardingData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  uid?: string;
  profilePicture: string;
  joinDate: string;
  profileCompletion: number;
  isVerified: boolean;
  lastActive: string;
}

interface ProfileContextType {
  profile: UserProfile | null;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updateFromOnboarding: (onboardingData: OnboardingData) => void;
  uploadProfilePicture: (file: File) => Promise<string>;
  isLoading: boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize profile from localStorage or create default
  useEffect(() => {
    const savedProfile = localStorage.getItem('ellemate_profile');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setProfile(parsedProfile);
      } catch (error) {
        console.error('Error parsing saved profile:', error);
        createDefaultProfile();
      }
    } else {
      createDefaultProfile();
    }
    setIsLoading(false);
  }, []);

  const createDefaultProfile = () => {
    const defaultProfile: UserProfile = {
      id: 'user_' + Date.now(),
      name: 'User',
      email: 'user@example.com',
      profilePicture: '',
      joinDate: new Date().toISOString(),
      profileCompletion: 15, // Basic info only
      isVerified: false,
      lastActive: new Date().toISOString(),
      
      // Onboarding data - empty initially
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
        openness: 3,
      },
      roomType: '',
      floorPreference: '',
      windowPreference: '',
      lightPreference: '',
      verifiedOnly: true,
    };
    setProfile(defaultProfile);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!profile) return;
    
    const updatedProfile = { ...profile, ...updates };
    updatedProfile.lastActive = new Date().toISOString();
    
    // Calculate profile completion
    updatedProfile.profileCompletion = calculateProfileCompletion(updatedProfile);
    
    setProfile(updatedProfile);
    
    try {
      localStorage.setItem('ellemate_profile', JSON.stringify(updatedProfile));
    } catch (error) {
      console.error('Error saving profile to localStorage:', error);
      
      // If localStorage quota exceeded, try saving without profile picture
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        console.warn('LocalStorage quota exceeded. Saving profile without picture.');
        const profileWithoutPicture = { ...updatedProfile, profilePicture: '' };
        try {
          localStorage.setItem('ellemate_profile', JSON.stringify(profileWithoutPicture));
          // Update the state to reflect that picture wasn't saved
          setProfile(profileWithoutPicture);
        } catch (fallbackError) {
          console.error('Failed to save even without profile picture:', fallbackError);
        }
      }
    }
  };

  const updateFromOnboarding = (onboardingData: OnboardingData) => {
    if (!profile) return;
    
    const updatedProfile: UserProfile = {
      ...profile,
      ...onboardingData,
      profileCompletion: 100, // Complete after onboarding
      lastActive: new Date().toISOString(),
    };
    
    setProfile(updatedProfile);
    
    try {
      localStorage.setItem('ellemate_profile', JSON.stringify(updatedProfile));
    } catch (error) {
      console.error('Error saving profile to localStorage:', error);
      
      // If localStorage quota exceeded, try saving without profile picture
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        console.warn('LocalStorage quota exceeded. Saving profile without picture.');
        const profileWithoutPicture = { ...updatedProfile, profilePicture: '' };
        try {
          localStorage.setItem('ellemate_profile', JSON.stringify(profileWithoutPicture));
          // Update the state to reflect that picture wasn't saved
          setProfile(profileWithoutPicture);
        } catch (fallbackError) {
          console.error('Failed to save even without profile picture:', fallbackError);
        }
      }
    }
  };

  const uploadProfilePicture = async (file: File): Promise<string> => {
    // Mock file upload - in real app, this would upload to cloud storage
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        updateProfile({ profilePicture: result });
        resolve(result);
      };
      reader.readAsDataURL(file);
    });
  };

  const calculateProfileCompletion = (profile: UserProfile): number => {
    const fields = [
      profile.name,
      profile.email,
      profile.age,
      profile.currentCity,
      profile.profession,
      profile.preferredCity,
      profile.sleepSchedule,
      profile.cleanliness,
      profile.guestPolicy,
      profile.foodHabits,
      profile.drinking,
      profile.smoking,
      profile.roomType,
      profile.floorPreference,
      profile.windowPreference,
      profile.lightPreference,
    ];
    
    const completedFields = fields.filter(field => field && field.toString().trim() !== '').length;
    const personalityCompleted = Object.values(profile.personality).every(val => val > 0) ? 1 : 0;
    const safetyCompleted = profile.verifiedOnly !== undefined ? 1 : 0;
    
    const totalFields = fields.length + 1 + 1; // +1 for personality, +1 for safety
    const completedTotal = completedFields + personalityCompleted + safetyCompleted;
    
    return Math.round((completedTotal / totalFields) * 100);
  };

  return (
    <ProfileContext.Provider value={{
      profile,
      updateProfile,
      updateFromOnboarding,
      uploadProfilePicture,
      isLoading,
    }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
} 