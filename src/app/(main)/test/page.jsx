import React from 'react';
import Link from 'next/link'; // Or react-router-dom Link

export default function AddPetDashboard() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* 1. Top Navbar (Kept for branding & user profile as seen in image_447704.png) */}
      

      {/* 2. Main Dashboard Wrapper */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 flex-col justify-between hidden md:flex">
          <div className="px-4 py-6 space-y-1">
            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              User Dashboard
            </p>
            
            <nav className="space-y-1 mt-4">
              <Link href="/dashboard/add-pet" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg bg-orange-50 text-orange-600">
                <span className="mr-3">➕</span> Add Pet
              </Link>
              
              <Link href="/dashboard/my-pets" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors">
                <span className="mr-3">🐾</span> My Pets
              </Link>
              
              <Link href="/dashboard/my-requests" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors">
                <span className="mr-3">📋</span> My Requests
              </Link>
            </nav>
          </div>
          
        </aside>

        {/* Main Content Pane */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 bg-slate-50">
          <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
            
            {/* Form Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Add New Pet</h1>
              <p className="text-sm text-gray-500 mt-1">Share details to list a pet for adoption.</p>
            </div>

            {/* Form Fields from image_447704.png go here */}
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pet Name *</label>
                  <input type="text" placeholder="e.g., Luna" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Species *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option>Select Species</option>
                    <option>Dog</option>
                    <option>Cat</option>
                  </select>
                </div>
              </div>

              {/* Rest of the form rows (Breed, Age, Gender, Health Status, etc.) */}
              
              <div className="pt-4">
                <button type="submit" className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg shadow-sm transition-colors">
                  Publish Pet Listing
                </button>
              </div>
            </form>

          </div>
        </main>

      </div>
    </div>
  );
}