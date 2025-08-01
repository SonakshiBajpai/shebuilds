'use client';

import { useState } from 'react';
import Link from 'next/link';

interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  isPrimary: boolean;
}

export default function SafetyPage() {
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    { name: '', relationship: '', phone: '', isPrimary: true }
  ]);
  const [showAddContact, setShowAddContact] = useState(false);
  const [sosTestStatus, setSosTestStatus] = useState<'idle' | 'testing' | 'success'>('idle');
  const [savedStatus, setSavedStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const handleSaveContacts = () => {
    setSavedStatus('saving');
    // Mock save to profile
    setTimeout(() => {
      setSavedStatus('saved');
      setTimeout(() => setSavedStatus('idle'), 2000);
    }, 1000);
  };

  const handleSosTest = () => {
    setSosTestStatus('testing');
    // Mock SOS test
    setTimeout(() => {
      setSosTestStatus('success');
      setTimeout(() => setSosTestStatus('idle'), 3000);
    }, 2000);
  };

  const addEmergencyContact = () => {
    setEmergencyContacts([...emergencyContacts, { name: '', relationship: '', phone: '', isPrimary: false }]);
    setShowAddContact(false);
  };

  const updateContact = (index: number, field: keyof EmergencyContact, value: string | boolean) => {
    const updated = emergencyContacts.map((contact, i) => 
      i === index ? { ...contact, [field]: value } : contact
    );
    setEmergencyContacts(updated);
  };

  const removeContact = (index: number) => {
    if (emergencyContacts.length > 1) {
      setEmergencyContacts(emergencyContacts.filter((_, i) => i !== index));
    }
  };

  const safetyFeatures = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Identity Verification",
      description: "All users undergo thorough identity verification including government ID, phone number, and email verification before joining the platform."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      title: "Background Checks",
      description: "Comprehensive background verification including employment history, rental history, and character references to ensure trustworthy matches."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: "24/7 Emergency Support",
      description: "Round-the-clock emergency helpline and instant SOS alert system to ensure help is always available when you need it most."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Safe Locations",
      description: "All properties are pre-verified for safety standards, proper lighting, security measures, and located in safe neighborhoods."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Privacy Protection",
      description: "Your personal information is encrypted and protected. We never share your data without consent and follow strict privacy protocols."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Community Moderation",
      description: "Active community moderation with reporting systems, conflict resolution support, and immediate action on safety concerns."
    }
  ];

  const safetyTips = [
    "Always meet potential roommates in public places first",
    "Trust your instincts - if something feels wrong, report it immediately",
    "Keep your emergency contacts updated and easily accessible",
    "Inform trusted friends/family about your living arrangements",
    "Use the in-app messaging system for initial communications",
    "Report any suspicious behavior or safety concerns promptly",
    "Keep important documents and valuables secure",
    "Know your building's emergency procedures and exits"
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      {/* Header - Floating */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl mx-4 mt-6 mb-2 shadow-xl border border-white/30 sticky top-6 z-40">
        <div className="px-6 py-4">
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
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Safety & Security</h1>
              <p className="text-sm text-gray-600 hidden sm:block">Your safety is our top priority</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#A866FF] to-[#6F3CFF] rounded-3xl p-6 sm:p-8 text-white">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              How ElleMate Protects You
            </h2>
            <p className="text-lg sm:text-xl opacity-90 leading-relaxed">
              At ElleMate, your safety isn't just a feature—it's our foundation. We've built comprehensive 
              protection measures to ensure you feel secure every step of your co-living journey.
            </p>
          </div>
        </div>

        {/* Safety Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safetyFeatures.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-[#7D3EFF] mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Emergency Contacts Section */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Emergency Contacts</h2>
              <p className="text-gray-600">Add trusted contacts who can be reached in case of emergency</p>
            </div>
            <div className="text-right">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">
                      Contact {index + 1}
                    </span>
                    {contact.isPrimary && (
                      <span className="bg-[#7D3EFF] text-white text-xs px-2 py-1 rounded-full">
                        Primary
                      </span>
                    )}
                  </div>
                  {!contact.isPrimary && emergencyContacts.length > 1 && (
                    <button
                      onClick={() => removeContact(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      value={contact.name}
                      onChange={(e) => updateContact(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-transparent text-gray-900 bg-white"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                    <select
                      value={contact.relationship}
                      onChange={(e) => updateContact(index, 'relationship', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-transparent text-gray-900 bg-white"
                    >
                      <option value="">Select relationship</option>
                      <option value="parent">Parent</option>
                      <option value="sibling">Sibling</option>
                      <option value="friend">Friend</option>
                      <option value="partner">Partner</option>
                      <option value="colleague">Colleague</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={contact.phone}
                      onChange={(e) => updateContact(index, 'phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D3EFF] focus:border-transparent text-gray-900 bg-white"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
              </div>
            ))}

            {!showAddContact && emergencyContacts.length < 3 && (
              <button
                onClick={() => setShowAddContact(true)}
                className="w-full border-2 border-dashed border-gray-300 rounded-xl p-4 text-gray-500 hover:border-[#7D3EFF] hover:text-[#7D3EFF] transition-colors"
              >
                <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Another Emergency Contact
              </button>
            )}

            {showAddContact && (
              <div className="flex space-x-3">
                <button
                  onClick={addEmergencyContact}
                  className="flex-1 bg-[#7D3EFF] text-white font-medium py-2 px-4 rounded-lg hover:bg-[#6F3CFF] transition-colors"
                >
                  Add Contact
                </button>
                <button
                  onClick={() => setShowAddContact(false)}
                  className="flex-1 border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}

            <div className="flex justify-end pt-4">
              <button
                onClick={handleSaveContacts}
                disabled={savedStatus === 'saving'}
                className="bg-gradient-to-r from-[#A866FF] to-[#6F3CFF] text-white font-semibold py-3 px-6 rounded-lg hover:from-[#A353F2] hover:to-[#7D3EFF] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {savedStatus === 'saving' ? 'Saving...' : savedStatus === 'saved' ? 'Saved ✓' : 'Save Contacts'}
              </button>
            </div>
          </div>
        </div>

        {/* SOS Test Section */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Emergency SOS System</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Test your emergency alert system to ensure it works when you need it most. 
              This will send a test notification to your emergency contacts and our support team.
            </p>

            <button
              onClick={handleSosTest}
              disabled={sosTestStatus !== 'idle'}
              className={`relative px-8 py-4 rounded-full font-bold text-lg transition-all ${
                sosTestStatus === 'idle' 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : sosTestStatus === 'testing'
                  ? 'bg-yellow-500 text-white cursor-not-allowed'
                  : 'bg-green-500 text-white cursor-not-allowed'
              }`}
            >
              {sosTestStatus === 'idle' && 'Test SOS Alert'}
              {sosTestStatus === 'testing' && (
                <span className="flex items-center space-x-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Testing...</span>
                </span>
              )}
              {sosTestStatus === 'success' && 'Test Successful ✓'}
            </button>

            {sosTestStatus === 'success' && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 text-sm">
                  ✓ Test alert sent successfully! Your emergency contacts and our support team have been notified.
                </p>
              </div>
            )}

            <div className="mt-6 text-sm text-gray-500">
              <p className="mb-2">
                <strong>Note:</strong> This is a test function. In a real emergency, this would:
              </p>
              <ul className="text-left space-y-1 max-w-md mx-auto">
                <li>• Send SMS/call to your emergency contacts</li>
                <li>• Alert our 24/7 support team</li>
                <li>• Share your location if permission granted</li>
                <li>• Initiate emergency response protocol</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Safety Tips */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Safety Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {safetyTips.map((tip, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-6 h-6 bg-[#7D3EFF] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-r from-[#E9DDFB] to-[#F3F0FF] rounded-2xl p-6 sm:p-8">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Need Help?</h2>
            <p className="text-gray-700 mb-6">
              Our support team is available 24/7 to help with any safety concerns or questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+911234567890"
                className="bg-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors"
              >
                Emergency Helpline
              </a>
              <a
                href="mailto:safety@ellemate.com"
                className="bg-[#7D3EFF] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#6F3CFF] transition-colors"
              >
                Contact Safety Team
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 