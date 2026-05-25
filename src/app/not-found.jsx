'use client';

import React from 'react';
import Link from 'next/link';
import { BiSad } from 'react-icons/bi';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center bg-slate-50 font-sans">
      
      {/* Visual Indicator Container */}
      <div className="relative mb-8 flex items-center justify-center">
        {/* Giant styled background numbers */}
        <h1 className="text-9xl font-extrabold text-slate-200 select-none tracking-widest">
          404
        </h1>
        
      </div>

      {/* Main Error Messages */}
      <h2 className="text-3xl font-extrabold text-gray-800 sm:text-4xl mb-3">
        Oops! Page Not Found
      </h2>
      
      <p className="max-w-md text-base text-gray-500 mb-8 leading-relaxed">
        The pet or page you are looking for might have been adopted by another loving family, renamed, or simply wandered off into the yard.
      </p>

      {/* Interactive Navigation Triggers */}
      <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
        {/* Primary Action Button (Theme Orange) */}
        <Link 
          href="/"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#D66237] hover:bg-[#b94e27] text-white font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm text-center"
        >
          Back to Home
        </Link>

        {/* Secondary Action Button (Theme Dark Blue Outline) */}
        <Link 
          href="/all" 
          className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#315579] text-[#315579] font-bold text-sm transition-all duration-300 hover:bg-slate-100 hover:scale-105 active:scale-95 text-center"
        >
          Browse Pets
        </Link>
      </div>

      {/* Small playful badge detail */}
      <div className="mt-12 inline-flex items-center gap-2 bg-amber-50 text-amber-800 text-xs font-bold px-4 py-1.5 rounded-full border border-amber-200/50">
        🐾 Lost? Let's help you get back to the pack!
      </div>

    </div>
  );
};

export default NotFound;