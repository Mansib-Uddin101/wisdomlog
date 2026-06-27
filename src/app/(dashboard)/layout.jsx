import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navbar />

      {/* Main Dashboard Wrapper */}
      <div className="flex flex-1 overflow-hidden pb-16 md:pb-0">
        
        {/* 1. Desktop Sidebar (Hidden on mobile, visible on md+) */}
        <aside className="w-64 bg-white border-r border-gray-200 flex-col justify-between hidden md:flex">
          <div className="px-4 py-6 space-y-1">
            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              User Dashboard
            </p>
            
            <nav className="space-y-1 mt-4">
              <Link href="/add" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                <span className="mr-3">➕</span> Add Pet
              </Link>
              
              <Link href="/listings" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="mr-3">🐾</span> Listings
              </Link>
              
              <Link href="/requests" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="mr-3">📋</span> My Requests
              </Link>
            </nav>
          </div>
        </aside>

        {/* Dynamic Inner Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-10 bg-slate-50">
          <div>
            {children} 
          </div>
        </main>

      </div>

      {/* 2. Mobile Bottom Navigation (Visible on mobile, hidden on md+) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 md:hidden z-50 shadow-lg">
        <Link href="/add" className="flex flex-col items-center justify-center text-xs font-medium text-gray-600 py-1 w-full">
          <span className="text-lg">➕</span>
          <span className="mt-0.5">Add Pet</span>
        </Link>
        
        <Link href="/listings" className="flex flex-col items-center justify-center text-xs font-medium text-gray-600 py-1 w-full">
          <span className="text-lg">🐾</span>
          <span className="mt-0.5">Listings</span>
        </Link>
        
        <Link href="/requests" className="flex flex-col items-center justify-center text-xs font-medium text-gray-600 py-1 w-full">
          <span className="text-lg">📋</span>
          <span className="mt-0.5">Requests</span>
        </Link>
      </nav>

    </div>
  );
}