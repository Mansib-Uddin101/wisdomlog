'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, ArrowRight } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center bg-slate-50 font-sans">
      
      {/* Visual Indicator Container */}
      <div className="relative mb-6 flex items-center justify-center">
        {/* Giant styled background numbers */}
        <h1 className="text-9xl font-black text-slate-200 select-none tracking-widest">
          404
        </h1>
        {/* Absolute floating stylized icon */}
        <div className="absolute animate-bounce text-[#0F766E] opacity-90">
          <Compass className="w-16 h-16 stroke-[1.5]" />
        </div>
      </div>

      {/* Main Error Messages */}
      <h2 className="text-3xl font-extrabold text-[#1E293B] sm:text-4xl mb-3">
        Profound realization missing!
      </h2>
      
      <p className="max-w-md text-base text-slate-500 mb-8 leading-relaxed">
        The life lesson, growth insight, or specific page you are trying to find doesn't exist, has been archived, or wandered off the path of wisdom.
      </p>

      {/* Interactive Navigation Triggers */}
      <div className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full sm:w-auto">
        {/* Primary Action Button (Deep Emerald) */}
        <Link 
          href="/"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0F766E] hover:bg-[#14B8A6] text-white font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm text-center"
        >
          Back to Home
        </Link>

        {/* Secondary Action Button (Slate Blue Outline) */}
        <Link 
          href="/public-lessons" 
          className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#1E293B] text-[#1E293B] font-bold text-sm transition-all duration-300 hover:bg-slate-100 hover:scale-105 active:scale-95 text-center flex items-center justify-center gap-1.5"
        >
          Browse Public Lessons <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Small playful badge detail */}
      <div className="mt-12 inline-flex items-center gap-2 bg-emerald-50 text-[#0F766E] text-xs font-bold px-4 py-1.5 rounded-full border border-emerald-200/50">
        ✨ Looking for deeper insights? Let's get you back on track!
      </div>

    </div>
  );
};

export default NotFound;