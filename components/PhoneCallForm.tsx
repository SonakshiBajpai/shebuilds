"use client";

import { useState } from "react";

export default function PhoneCallForm() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("IN"); // Default to India
  const [isLoading, setIsLoading] = useState(false);
  const [callStatus, setCallStatus] = useState<"idle" | "calling" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const countries = [
    { code: "IN", name: "India 🇮🇳", prefix: "+91", format: "+91 XXXXX XXXXX", length: 10 },
    { code: "US", name: "United States 🇺🇸", prefix: "+1", format: "+1 (XXX) XXX-XXXX", length: 10 },
    { code: "CA", name: "Canada 🇨🇦", prefix: "+1", format: "+1 (XXX) XXX-XXXX", length: 10 },
  ];

  const getCurrentCountry = () => countries.find(c => c.code === country) || countries[0];

  const formatPhoneNumber = (value: string, countryCode: string) => {
    // Remove all non-digits
    const phoneNumber = value.replace(/\D/g, "");
    const currentCountry = countries.find(c => c.code === countryCode) || countries[0];
    
    if (countryCode === "IN") {
      // Format as +91 XXXXX XXXXX
      if (phoneNumber.length >= 10) {
        const formatted = phoneNumber.slice(0, 10);
        return `+91 ${formatted.slice(0, 5)} ${formatted.slice(5, 10)}`;
      }
    } else {
      // Format as +1 (XXX) XXX-XXXX for US/Canada
      if (phoneNumber.length >= 10) {
        const formatted = phoneNumber.slice(0, 10);
        return `+1 (${formatted.slice(0, 3)}) ${formatted.slice(3, 6)}-${formatted.slice(6, 10)}`;
      }
    }
    
    return phoneNumber;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value, country);
    setPhoneNumber(formatted);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = e.target.value;
    setCountry(newCountry);
    // Reformat existing phone number for new country
    if (phoneNumber) {
      const digitsOnly = phoneNumber.replace(/\D/g, "");
      const formatted = formatPhoneNumber(digitsOnly, newCountry);
      setPhoneNumber(formatted);
    }
  };

  const getMinLength = () => {
    const currentCountry = getCurrentCountry();
    if (currentCountry.code === "IN") return 14; // "+91 XXXXX XXXXX"
    return 14; // "+1 (XXX) XXX-XXXX"
  };

  const getCleanPhoneNumber = () => {
    // Extract only the actual phone number digits, excluding country code
    const allDigits = phoneNumber.replace(/\D/g, "");
    
    if (country === "IN") {
      // For India, remove the "91" prefix if present
      if (allDigits.startsWith("91") && allDigits.length === 12) {
        return allDigits.substring(2); // Return last 10 digits
      }
      return allDigits; // If no prefix, return as is
    } else {
      // For US/Canada, remove the "1" prefix if present
      if (allDigits.startsWith("1") && allDigits.length === 11) {
        return allDigits.substring(1); // Return last 10 digits
      }
      return allDigits; // If no prefix, return as is
    }
  };

  const handleStartCall = async () => {
    const minLength = getMinLength();
    const cleanPhone = getCleanPhoneNumber();
    
    console.log("Validation check:", { 
      phoneNumber, 
      cleanPhone, 
      country, 
      phoneLength: phoneNumber.length, 
      minLength,
      cleanPhoneLength: cleanPhone.length 
    });
    
    if (!phoneNumber || phoneNumber.length < minLength) {
      setMessage(`Please enter a valid ${getCurrentCountry().name.split(' ')[0]} phone number`);
      return;
    }
    
    if (cleanPhone.length !== 10) {
      setMessage(`Phone number must be exactly 10 digits (currently ${cleanPhone.length} digits)`);
      return;
    }

    setIsLoading(true);
    setCallStatus("calling");
    setMessage("Initiating call...");

    try {
      console.log("Sending to backend:", { phoneNumber: cleanPhone, countryCode: country });
      
      const response = await fetch("/api/start-call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: cleanPhone,
          countryCode: country,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setCallStatus("success");
        setMessage("📞 Call initiated! You should receive a call from our AI assistant within 30 seconds.");
      } else {
        setCallStatus("error");
        setMessage(data.error || "Failed to initiate call. Please try again.");
      }
    } catch (error) {
      setCallStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setCallStatus("idle");
    setMessage("");
    setPhoneNumber("");
    setCountry("IN"); // Reset to India default
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📞</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              AI Phone Interview
            </h1>
            <p className="text-gray-600 text-lg">
              Get called by our AI assistant to complete your roommate preferences 🇮🇳 🇺🇸 🇨🇦
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">How it works:</h3>
            <div className="space-y-2 text-blue-800">
              <div className="flex items-center space-x-3">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                <span>Select your country (India 🇮🇳, US 🇺🇸, or Canada 🇨🇦)</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                <span>Enter your phone number</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                <span>Click "Call Me Now" button</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                <span>Receive a call from our AI assistant within 30 seconds</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">5</span>
                <span>Answer 20 questions about your roommate preferences</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">6</span>
                <span>Your profile gets automatically populated!</span>
              </div>
            </div>
          </div>

                     {callStatus === "idle" && (
             <div className="space-y-6">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   Country
                 </label>
                 <select
                   value={country}
                   onChange={handleCountryChange}
                   className="w-full px-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-gray-900 bg-white"
                 >
                   {countries.map((c) => (
                     <option key={c.code} value={c.code}>
                       {c.name} ({c.prefix})
                     </option>
                   ))}
                 </select>
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   Phone Number
                 </label>
                 <input
                   type="tel"
                   value={phoneNumber}
                   onChange={handlePhoneChange}
                   placeholder={getCurrentCountry().format}
                   className="w-full px-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-gray-900 bg-white"
                   maxLength={20}
                 />
                 <p className="text-sm text-gray-500 mt-1">
                   {getCurrentCountry().name.split(' ')[0]} numbers only. Standard call rates may apply.
                 </p>
               </div>

              <button
                onClick={handleStartCall}
                disabled={!phoneNumber || phoneNumber.length < 14}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 px-6 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                📞 Call Me Now
              </button>
            </div>
          )}

          {callStatus === "calling" && (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Initiating Call...</h3>
              <p className="text-gray-600">Please keep your phone nearby. You'll receive a call shortly.</p>
            </div>
          )}

          {callStatus === "success" && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-green-600">Call Initiated Successfully!</h3>
              <p className="text-gray-600 text-lg">{message}</p>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">
                  <strong>💡 Pro tip:</strong> Answer the call and speak clearly. The AI is friendly and will guide you through each question naturally.
                </p>
              </div>

              <button
                onClick={resetForm}
                className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Start Another Call
              </button>
            </div>
          )}

          {callStatus === "error" && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-red-600">Call Failed</h3>
              <p className="text-gray-600">{message}</p>
              
              <button
                onClick={resetForm}
                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          <div className="mt-8 text-center space-y-4">
            <p className="text-sm text-gray-500">
              🔒 Your phone number is secure and only used for this call
            </p>
            
            {/* Debug Section - Only show in development */}
            {process.env.NODE_ENV === 'development' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-yellow-800 mb-2">🔧 Debug Tools</h4>
                <button
                  onClick={async () => {
                    try {
                      const response = await fetch("/api/test-endpoint", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ testUrl: "https://omnidim.io" })
                      });
                      const result = await response.json();
                      console.log("Connectivity test result:", result);
                      alert(`Test result: ${result.reachable ? 'Reachable ✅' : 'Not reachable ❌'}\nURL: ${result.url}\nDetails: ${result.message || result.error}`);
                    } catch (err) {
                      console.error("Test failed:", err);
                      alert("Test failed - check console for details");
                    }
                  }}
                  className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded hover:bg-yellow-200 transition-colors"
                >
                  Test API Connectivity
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 