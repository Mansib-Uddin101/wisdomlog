'use client';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import { ShieldCheck, Loader2 } from 'lucide-react';

export default function AdminProfile() {
  const sessionData = authClient.useSession();
  const user = sessionData.data?.user;
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Local state to immediately reflect profile updates in the UI
  const [profileData, setProfileData] = useState({
    name: '',
    image: ''
  });

  // Sync initial user data when session loads
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        image: user.image || ''
      });
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const userId = user?.id || user?._id; // Fallback depending on your auth provider's object structure
    
    if (!userId) {
      toast.error("User identification missing.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData(e.target);
    const updatedName = formData.get('name');
    const updatedImage = formData.get('image');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: updatedName, image: updatedImage }),
      });

      if (!res.ok) throw new Error('Failed to update profile information');

      // Update local state to reflect the new image/name instantly
      setProfileData({ name: updatedName, image: updatedImage });
      
      toast.success('Admin profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error(error.message || 'Could not update profile.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-[#0F766E]/10" />
        
        <div className="relative z-10 flex flex-col items-center">
          <img 
            src={profileData.image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'} 
            alt="Admin Profile" 
            className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-md mb-4" 
          />
          <h2 className="text-3xl font-bold text-[#1E293B] mb-2 flex items-center gap-2 justify-center">
            {profileData.name || 'Admin User'}
            <span className="bg-[#0F766E] text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
              <ShieldCheck className="w-3 h-3" /> Admin
            </span>
          </h2>
          <p className="text-slate-500 mb-6">{user?.email || 'admin@wisdomlog.com'}</p>

          <button 
            onClick={() => setIsEditing(!isEditing)} 
            className="text-sm font-medium bg-[#1E293B] hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl transition-all"
          >
            {isEditing ? 'Cancel Edit' : 'Edit Profile'}
          </button>
        </div>
      </div>

      {isEditing && (
        <form onSubmit={handleUpdate} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="font-bold text-[#1E293B] mb-4">Update Details</h3>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Display Name</label>
            <input 
              type="text" 
              name="name"
              defaultValue={profileData.name} 
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] outline-none" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Profile Photo URL</label>
            <input 
              type="url" 
              name="image"
              defaultValue={profileData.image} 
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] outline-none" 
            />
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-[#0F766E] hover:bg-[#14B8A6] text-white font-medium py-3 rounded-xl transition-colors flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Saving...</>
            ) : (
              'Save Changes'
            )}
          </button>
        </form>
      )}
    </div>
  );
}