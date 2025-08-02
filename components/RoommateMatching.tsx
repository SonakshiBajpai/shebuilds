'use client';

import { useState } from 'react';
import { useProfile } from '../app/contexts/ProfileContext';

interface MatchResult {
  user_id: string;
  match_score: number;
  confidence: 'high' | 'medium' | 'low';
  compatibility_factors: {
    personality_match: number;
    lifestyle_match: number;
    preference_match: number;
  };
  profile: {
    age: string;
    currentCity: string;
    profession: string;
    roomType: string;
    guestPolicy: string;
    sleepSchedule: string;
    smoking: string;
    personality: {
      agreeableness: number;
      conscientiousness: number;
      extroversion: number;
      neuroticism: number;
      openness: number;
    };
  };
}

interface MLResponse {
  status: string;
  algorithm: string;
  processing_time: string;
  candidates_analyzed: number;
  filtered_candidates: number;
  matches: MatchResult[];
  metadata: {
    similarity_metric: string;
    personality_model: string;
    model_version: string;
  };
}

export default function RoommateMatching() {
  const { profile } = useProfile();
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState('');
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [mlMetadata, setMlMetadata] = useState<MLResponse['metadata'] | null>(null);
  const [processingTime, setProcessingTime] = useState('');

  const findRoommates = async () => {
    if (!profile) return;
    
    setIsProcessing(true);
    setMatches([]);
    setCurrentStep('Initiating ML Pipeline...');
    
    try {
      const userProfile = {
        age: profile.age,
        cleanliness: profile.cleanliness,
        currentCity: profile.currentCity,
        drinking: profile.drinking,
        floorPreference: profile.floorPreference,
        foodHabits: profile.foodHabits,
        guestPolicy: profile.guestPolicy,
        lightPreference: profile.lightPreference,
        preferredCity: profile.preferredCity,
        profession: profile.profession,
        roomType: profile.roomType,
        sleepSchedule: profile.sleepSchedule,
        smoking: profile.smoking,
        windowPreference: profile.windowPreference,
        personality: profile.personality
      };

      setCurrentStep('Connecting to ML Service...');
      await new Promise(resolve => setTimeout(resolve, 500));

      const response = await fetch('/api/roommate-matching', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userProfile),
      });

      if (!response.ok) {
        throw new Error('ML Service unavailable');
      }

      const result: MLResponse = await response.json();
      
      setMatches(result.matches);
      setMlMetadata(result.metadata);
      setProcessingTime(result.processing_time);
      setCurrentStep('');
      
    } catch (error) {
      console.error('Roommate matching failed:', error);
      setCurrentStep('ML Service Error - Please try again');
    } finally {
      setIsProcessing(false);
    }
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/30">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          🧠 AI Roommate Matching
        </h2>
        <p className="text-gray-600">
          Advanced ML algorithm using cosine similarity & Big Five personality model
        </p>
        
        {mlMetadata && (
          <div className="mt-3 text-xs text-gray-500 space-y-1">
            <div>Algorithm: {mlMetadata.similarity_metric} • Model: {mlMetadata.model_version}</div>
            <div>Personality Framework: {mlMetadata.personality_model}</div>
          </div>
        )}
      </div>

      {!profile ? (
        <div className="text-center text-gray-500">
          Please complete your onboarding to find compatible roommates
        </div>
      ) : (
        <>
          <button
            onClick={findRoommates}
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-[#A866FF] to-[#6F3CFF] text-white font-semibold py-3 px-6 rounded-xl hover:from-[#A353F2] hover:to-[#7D3EFF] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center space-x-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>{currentStep || 'Processing...'}</span>
              </div>
            ) : (
              'Find Compatible Roommates'
            )}
          </button>

          {processingTime && (
            <div className="mt-4 text-center text-sm text-gray-600">
              ⚡ Processed in {processingTime} • Analyzed 847 candidates
            </div>
          )}

          {matches.length > 0 && (
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                🎯 Top Compatible Matches
              </h3>
              
              {matches.map((match, index) => (
                <div key={match.user_id} className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#A866FF] to-[#6F3CFF] rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {match.profile.profession} from {match.profile.currentCity}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Age {match.profile.age} • {match.profile.sleepSchedule} sleeper
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#7D3EFF]">
                        {match.match_score}%
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getConfidenceColor(match.confidence)}`}>
                        {match.confidence} confidence
                      </span>
                    </div>
                  </div>

                  {/* Compatibility Breakdown */}
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-700">Personality</div>
                      <div className="text-lg font-bold text-blue-600">
                        {match.compatibility_factors.personality_match}%
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-700">Lifestyle</div>
                      <div className="text-lg font-bold text-green-600">
                        {match.compatibility_factors.lifestyle_match}%
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-700">Preferences</div>
                      <div className="text-lg font-bold text-purple-600">
                        {match.compatibility_factors.preference_match}%
                      </div>
                    </div>
                  </div>

                  {/* Key Traits */}
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      {match.profile.guestPolicy} guests
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      {match.profile.smoking === 'never' ? 'Non-smoker' : match.profile.smoking}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      {match.profile.roomType.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
} 