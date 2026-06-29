'use client';
import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Eye, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';

export default function MyLessons() {
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Get current user session from Better Auth
  const { data: sessionData, isPending } = authClient.useSession();
  const user = sessionData?.user;

  // 1. Fetch data from MongoDB when the component mounts
  useEffect(() => {
    const fetchMyLessons = async () => {
      if (!user?.id) return;
      
      try {
        // Replace with your actual backend URL or use environment variables
        const backendUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8000';
        
        // Fetch all lessons (or ideally an endpoint like /lessons/user/:id)
        const response = await fetch(`${backendUrl}/lessons`);
        if (!response.ok) throw new Error('Failed to fetch lessons.');
        
        const data = await response.json();
        
        // Filter to only show lessons created by the logged-in user
        const userLessons = data.filter(lesson => lesson.creatorId === user.id);
        setLessons(userLessons);
      } catch (error) {
        toast.error(error.message || 'Something went wrong fetching your lessons.');
      } finally {
        setIsLoading(false);
      }
    };

    if (!isPending) {
      if (user) {
        fetchMyLessons();
      } else {
        setIsLoading(false);
      }
    }
  }, [user, isPending]);

  // 2. Handle Document Deletion
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this lesson?')) {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8000';
        
        // Call your backend delete endpoint (ensure you have this route created in Express)
        const response = await fetch(`${backendUrl}/lessons/${id}`, {
          method: 'DELETE',
          // Optional: Pass token if your route is protected by verifyToken middleware
          headers: {
            'Authorization': `Bearer ${sessionData?.token?.value || ''}`
          }
        });

        if (!response.ok) throw new Error('Failed to delete lesson.');

        // Instantly remove the deleted lesson from the UI state
        setLessons((prev) => prev.filter((lesson) => lesson._id !== id));
        toast.success('Lesson deleted successfully.');
      } catch (error) {
        toast.error(error.message || 'Failed to delete the lesson.');
      }
    }
  };

  // 3. Render Loading State
  if (isLoading || isPending) {
    return (
      <div className="flex justify-center items-center h-64 bg-white rounded-2xl border border-slate-100 shadow-sm">
        <Loader2 className="w-8 h-8 animate-spin text-[#0F766E]" />
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <h1 className="text-2xl font-bold text-[#1E293B] mb-6">My Published Lessons</h1>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-slate-100 text-sm text-slate-500 uppercase tracking-wider">
              <th className="pb-4 font-medium">Title</th>
              <th className="pb-4 font-medium">Date</th>
              <th className="pb-4 font-medium">Visibility</th>
              <th className="pb-4 font-medium">Stats</th>
              <th className="pb-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {lessons.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-8 text-center text-slate-500">
                  You haven't published any lessons yet.
                </td>
              </tr>
            ) : (
              lessons.map((lesson) => (
                <tr key={lesson._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 font-medium text-[#1E293B] max-w-[200px] truncate">
                    {lesson.title}
                  </td>
                  <td className="py-4 text-slate-600">
                    {/* Assuming you have a createdAt field, format it safely */}
                    {lesson.createdAt ? new Date(lesson.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="py-4 flex gap-2 items-center">
                    {/* Visibility Badge */}
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${lesson.visibility === 'Public' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
                      {lesson.visibility || 'Public'}
                    </span>
                    {/* Access Level Badge */}
                    {lesson.accessLevel === 'Premium' && (
                      <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-amber-100 text-amber-700">
                        ⭐ Premium
                      </span>
                    )}
                  </td>
                  <td className="py-4 text-slate-600">
                    {lesson.likesCount || 0} Likes • {lesson.favoritesCount || 0} Saves
                  </td>
                  <td className="py-4 flex items-center justify-end gap-2">
                    {/* View Details Link */}
                    <Link href={`/public-lessons/${lesson._id}`} className="p-2 text-slate-400 hover:text-[#0F766E] transition-colors bg-white rounded-lg border border-slate-200">
                      <Eye size={16}/>
                    </Link>
                    
                    {/* Update Lesson Link */}
                    <Link href={`/dashboard/update-lesson/${lesson._id}`} className="p-2 text-slate-400 hover:text-blue-600 transition-colors bg-white rounded-lg border border-slate-200">
                      <Edit2 size={16}/>
                    </Link>
                    
                    {/* Delete Action */}
                    <button onClick={() => handleDelete(lesson._id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors bg-white rounded-lg border border-slate-200">
                      <Trash2 size={16}/>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}