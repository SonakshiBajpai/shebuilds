import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#A866FF] to-[#6F3CFF] font-poppins">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to Ellemate!</h1>
          <p className="text-[#E9DDFB] text-lg">Your profile is complete. Let's find your perfect co-living match!</p>
        </div>

        {/* Success Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile Setup Complete!</h2>
            <p className="text-gray-600 mb-8">
              Great job! We've collected all your preferences and personality insights. 
              Our matching algorithm is now working to find your ideal co-living partners.
            </p>

            {/* Next Steps */}
            <div className="space-y-4">
              <div className="bg-[#E9DDFB] p-4 rounded-lg text-left">
                <h3 className="font-semibold text-[#7D3EFF] mb-2">What happens next?</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• We'll analyze your preferences and personality</li>
                  <li>• Find compatible matches in your preferred city</li>
                  <li>• Send you personalized recommendations</li>
                  <li>• Help you connect with potential roommates</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button className="flex-1 bg-gradient-to-r from-[#A866FF] to-[#6F3CFF] text-white font-semibold py-3 px-6 rounded-lg hover:from-[#A353F2] hover:to-[#7D3EFF] transition-all duration-200">
                  View My Matches
                </button>
                <button className="flex-1 border-2 border-[#7D3EFF] text-[#7D3EFF] font-semibold py-3 px-6 rounded-lg hover:bg-[#7D3EFF] hover:text-white transition-all duration-200">
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Back to Home */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link 
                href="/"
                className="text-[#7D3EFF] hover:text-[#A353F2] font-medium transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 