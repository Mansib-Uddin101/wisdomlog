import React from 'react';
import { PawPrint } from 'lucide-react';

export default function Logo() {
  return (
    <div className={`flex items-center`}>
      <span className="text-3xl font-extrabold tracking-tight text-[#315579]">
        Pet
      </span>
      <span className="text-3xl font-extrabold tracking-tight text-[#D66237]">
      Buddy
      </span>
      
      <PawPrint 
        className="m-1 w-8 h-8 text-[#D66237] transform rotate-12 stroke-[2.5]" 
        fill="currentColor" 
      />
    </div>
  );
}