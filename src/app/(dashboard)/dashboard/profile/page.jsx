'use client';
import React, { useState, useEffect } from 'react';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { Loader2, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { data: sessionData, isPending } = authClient.useSession();
  const user = sessionData?.user;
  
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Data States
  const [publicLessons, setPublicLessons] = useState([]);
  const [createdCount, setCreatedCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // 1. Fetch User Stats and Public Lessons
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user?.id) return;
      
      try {
        
        // Fetch all lessons and filter for the user
        const lessonsRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/lessons`);
        if (lessonsRes.ok) {
          const allLessons = await lessonsRes.json();
          
          // Count total created by this user
          const userLessons = allLessons.filter(l => l.creatorId === user.id);
          setCreatedCount(userLessons.length);
          
          // Get only PUBLIC lessons created by this user, sorted by newest first
          const userPublicLessons = userLessons
            .filter(l => l.visibility === 'Public')
            .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)); // Sort Newest first
            
          setPublicLessons(userPublicLessons);
        }

        // Fetch total saved favorites for this user
        const favoritesRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/favorites?userId=${user.id}`);
        if (favoritesRes.ok) {
          const favoritesData = await favoritesRes.json();
          setSavedCount(favoritesData.length || 0);
        }
        
      } catch (error) {
        toast.error('Failed to load profile data.');
      } finally {
        setIsLoadingData(false);
      }
    };

    if (!isPending && user) {
      fetchProfileData();
    }
  }, [user, isPending]);

  // 2. Handle Profile Update via Better Auth
  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    
    const formElements = e.target.elements;
    const newName = formElements.name.value;
    const newImage = formElements.image.value;

    try {
      // Better Auth built-in function to update user profile
      const { data, error } = await authClient.updateUser({
        name: newName,
        image: newImage
      });

      if (error) throw new Error(error.message);

      toast.success('Profile updated successfully!');
      setIsEditing(false);
      // Note: The UI will auto-update because authClient.useSession tracks changes!
    } catch (error) {
      toast.error(error.message || 'Failed to update profile.');
    } finally {
      setIsUpdating(false);
    }
  };

  // 3. Render Loading State
  if (isPending || isLoadingData) {
    return (
      <div className="flex justify-center items-center h-64 bg-white rounded-2xl border border-slate-100 shadow-sm">
        <Loader2 className="w-8 h-8 animate-spin text-[#0F766E]" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Profile Management Header */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-8 items-start relative overflow-hidden">
        
        {/* Profile Image */}
        <img 
          src={user?.image || 'https://ui-avatars.com/api/?name=' + (user?.name || 'User') + '&background=0F766E&color=fff'} 
          alt="Profile" 
          className="w-32 h-32 rounded-2xl object-cover border-4 border-slate-50 shadow-sm z-10" 
        />
        
        <div className="flex-1 w-full z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#1E293B] flex items-center gap-2">
                {user?.name || 'User'}
                {/* Premium Badge */}
                {user?.isPremium && (
                  <span className="bg-amber-100 text-amber-700 text-xs px-2.5 py-1 rounded-md font-bold shadow-sm">
                    Premium ⭐
                  </span>
                )}
              </h1>
              {/* User Email (Strictly non-editable) */}
              <p className="text-slate-500 mt-1">{user?.email}</p>
            </div>
            
            <button 
              onClick={() => setIsEditing(!isEditing)} 
              className="text-sm font-medium text-[#0F766E] hover:bg-[#0F766E]/10 px-4 py-2 rounded-lg transition-colors border border-transparent hover:border-[#0F766E]/20 self-start sm:self-center"
            >
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
          </div>

          {/* Stats Bar */}
          <div className="flex gap-8 text-sm text-slate-600 mb-6 bg-slate-50 p-4 rounded-xl inline-flex w-full sm:w-auto">
            <p className="flex flex-col"><strong className="text-[#1E293B] text-xl">{createdCount}</strong> Lessons Created</p>
            <div className="w-px bg-slate-200"></div>
            <p className="flex flex-col"><strong className="text-[#1E293B] text-xl">{savedCount}</strong> Lessons Saved</p>
          </div>

          {/* Edit Form Drawer */}
          {isEditing && (
            <form onSubmit={handleUpdate} className="space-y-4 max-w-md border-t border-slate-100 pt-6 animate-in slide-in-from-top-2">
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-1">Display Name</label>
                <input 
                  name="name"
                  type="text" 
                  required
                  defaultValue={user?.name} 
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] transition-all" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-1">Photo URL</label>
                <input 
                  name="image"
                  type="url" 
                  defaultValue={user?.image} 
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] transition-all" 
                />
              </div>
              <button 
                type="submit" 
                disabled={isUpdating}
                className="bg-[#0F766E] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#14B8A6] disabled:bg-slate-300 transition-colors shadow-sm"
              >
                {isUpdating ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          )}
        </div>
        
        {/* Background Decorative Graphic */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
      </div>

      {/* Public Lessons Grid */}
      <div>
        <h2 className="text-xl font-bold text-[#1E293B] mb-6">My Public Lessons</h2>
        
        {publicLessons.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-sm">
            <p className="text-slate-500 mb-4">You haven't published any public lessons yet.</p>
            <Link href="/dashboard/add-lesson" className="text-[#0F766E] font-medium hover:underline">
              Create your first lesson →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicLessons.map((lesson) => (
              <div key={lesson._id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full relative overflow-hidden group">
                
                {/* Access Level Badge */}
                {lesson.accessLevel === 'Premium' && (
                  <div className="absolute top-4 right-4 bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded shadow-sm z-10">
                    Premium ⭐
                  </div>
                )}
                
                <span className="text-xs font-semibold text-[#0F766E] bg-[#0F766E]/10 px-2 py-1 rounded-md w-max">
                  {lesson.category || 'Uncategorized'}
                </span>
                
                <h3 className="font-bold text-[#1E293B] mt-3 text-lg">{lesson.title}</h3>
                
                <p className="text-slate-500 text-sm mt-2 line-clamp-2 flex-grow">
                  {lesson.description}
                </p>
                
                <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    {lesson.createdAt ? new Date(lesson.createdAt).toLocaleDateString() : 'Recently'}
                  </span>
                  
                  <Link 
                    href={`/public-lessons/${lesson._id}`} 
                    className="flex items-center gap-1 text-sm font-medium text-[#0F766E] group-hover:text-[#14B8A6] transition-colors"
                  >
                    Details <ExternalLink size={14}/>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}