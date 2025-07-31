import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden font-poppins">
      {/* Animated GIF Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/background.gif')"
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-2xl mx-auto bg-black/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
            <span className="block relative">
              {/* White text stroke for contrast */}
              <span className="absolute inset-0 font-extrabold text-white opacity-30 blur-sm">
                ELLEMATE
              </span>
              {/* Main gradient text */}
              <span className="relative bg-gradient-to-r from-[#A866FF] via-[#8B5CF6] to-[#6F3CFF] bg-clip-text text-transparent font-extrabold" style={{
                WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)',
                textShadow: '0 0 20px rgba(168, 102, 255, 0.5), 0 0 40px rgba(111, 60, 255, 0.3)'
              }}>
                ELLEMATE
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-200 mb-3 leading-relaxed font-medium">
            Personalized Co-Living Matching System
          </p>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-white mb-12 leading-relaxed font-light bg-gradient-to-r from-orange-200 to-yellow-200 bg-clip-text text-transparent">
            Minimal Input, Maximum Harmony. Your Safety, Our Priority.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/auth/signup"
              className="group relative px-8 py-4 bg-gradient-to-r from-[#A866FF] to-[#6F3CFF] text-white font-semibold rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 min-w-[200px]"
            >
              <span className="relative z-10">Find Your Match</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#A353F2] to-[#7D3EFF] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            <Link
              href="/auth/login"
              className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full text-lg border-2 border-white/20 transition-all duration-300 hover:bg-white/20 hover:border-white/40 hover:scale-105 min-w-[200px]"
            >
              Sign In
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-16 flex flex-col sm:flex-row gap-8 justify-center items-center text-gray-300">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#A866FF] rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Safe & Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#6F3CFF] rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Perfect Matches</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#A353F2] rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Harmony Guaranteed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements for Visual Appeal */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-[#A866FF]/20 to-[#6F3CFF]/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-[#6F3CFF]/20 to-[#A353F2]/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-20 w-16 h-16 bg-gradient-to-r from-[#A353F2]/20 to-[#7D3EFF]/20 rounded-full blur-xl animate-pulse delay-500"></div>
    </div>
  );
}
