import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-green-50 flex flex-col justify-center items-center z-50">
      {/* Logo */}
      <img 
        src="/img/favicon_114x114.png" 
        alt="Logo" 
        className="w-24 h-24 mb-6 animate-spin-slow" 
      />

      {/* Loader Animation: Moving Caravan */}
      <div className="flex items-center space-x-3">
        <span className="text-5xl animate-bounce">🚐</span>
        <span className="text-5xl animate-bounce delay-150">🏕️</span>
        <span className="text-5xl animate-bounce delay-300">🌳</span>
      </div>

      {/* Loader Text */}
      <p className="mt-6 text-xl font-semibold text-green-700 animate-pulse text-center max-w-md">
        Discovering hidden gems &amp; cozy homestays in the heart of nature... 🌿🌄
      </p>

      {/* Animated Loading Dots */}
      <div className="mt-4 flex space-x-2">
        <span className="w-3 h-3 bg-green-700 rounded-full animate-bounce delay-75"></span>
        <span className="w-3 h-3 bg-green-700 rounded-full animate-bounce delay-150"></span>
        <span className="w-3 h-3 bg-green-700 rounded-full animate-bounce delay-300"></span>
      </div>
    </div>
  );
};

export default Loader;
