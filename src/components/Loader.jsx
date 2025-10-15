import React from 'react';

const Loader = () => {
  const spinFast = {
    animation: 'spin 1s linear infinite',
  };
  const spinReverseMedium = {
    animation: 'spinReverse 2.5s linear infinite',
  };
  const spinSlow = {
    animation: 'spin 4s linear infinite',
  };

  return (
    <>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spinReverse {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
      `}</style>

      <div className="relative flex flex-col items-center justify-center h-screen bg-white text-gray-700 overflow-hidden">
        
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 
                        opacity-30 blur-3xl" style={{ animation: 'spin 20s linear infinite' }}></div>

        {/* Spinner Container */}
        <div className="relative flex items-center justify-center">
          {/* Outer Spinner */}
          <div
            className="w-20 h-20 border-4 border-blue-300 border-t-transparent rounded-full shadow-lg"
            style={spinSlow}
          ></div>

          {/* Middle Spinner */}
          <div
            className="absolute w-16 h-16 border-4 border-purple-400 border-l-transparent rounded-full"
            style={spinReverseMedium}
          ></div>

          {/* Inner Spinner */}
          <div
            className="absolute w-12 h-12 border-4 border-pink-400 border-b-transparent rounded-full"
            style={spinFast}
          ></div>
        </div>

        {/* Loading Text */}
        <p className="relative mt-6 text-sm font-semibold text-blue-700 animate-pulse">
          Loading, please wait...
        </p>
      </div>
    </>
  );
};

export default Loader;
