'use client';
import React, { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const sessionData = authClient.useSession();
  const user = sessionData.data?.user;
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      {/* Profile Management Header */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-8 items-start">
        <img src={user?.image || '/placeholder.png'} alt="Profile" className="w-32 h-32 rounded-2xl object-cover border-4 border-slate-50 shadow-sm" />
        
        <div className="flex-1 w-full">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-[#1E293B] flex items-center gap-2">
                {user?.name || 'User'}
                {user?.isPremium && <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-md font-bold">Premium ⭐</span>}
              </h1>
              <p className="text-slate-500">{user?.email}</p>
            </div>
            <button onClick={() => setIsEditing(!isEditing)} className="text-sm font-medium text-[#0F766E] hover:bg-[#0F766E]/10 px-4 py-2 rounded-lg transition-colors">
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
          </div>

          <div className="flex gap-6 text-sm text-slate-600 mb-6">
            <p><strong className="text-[#1E293B] text-lg">12</strong> Created</p>
            <p><strong className="text-[#1E293B] text-lg">34</strong> Saved</p>
          </div>

          {isEditing && (
            <form onSubmit={handleUpdate} className="space-y-4 max-w-md border-t border-slate-100 pt-6">
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-1">Display Name</label>
                <input type="text" defaultValue={user?.name} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#0F766E]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-1">Photo URL</label>
                <input type="url" defaultValue={user?.image} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#0F766E]" />
              </div>
              <button type="submit" className="bg-[#0F766E] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#14B8A6] transition-colors">Save Changes</button>
            </form>
          )}
        </div>
      </div>

      {/* Public Lessons Grid */}
      <div>
        <h2 className="text-xl font-bold text-[#1E293B] mb-4">My Public Lessons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card Placeholder - Map your actual LessonCard component here */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <span className="text-xs font-semibold text-[#0F766E] bg-[#0F766E]/10 px-2 py-1 rounded-md">Personal Growth</span>
            <h3 className="font-bold text-[#1E293B] mt-3 text-lg">The Value of Patience</h3>
            <p className="text-slate-500 text-sm mt-2 line-clamp-2">Learning to wait for the right moment is one of the hardest things in a fast paced world...</p>
          </div>
        </div>
      </div>
    </div>
  );
}