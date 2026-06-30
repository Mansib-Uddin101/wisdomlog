'use client';
import React, { useState, useEffect } from 'react';
import { Trash2, ExternalLink, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';

export default function MyFavorites() {
  const { data: sessionData, isPending } = authClient.useSession();
  const user = sessionData?.user;

  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter States
  const [categoryFilter, setCategoryFilter] = useState('');
  const [toneFilter, setToneFilter] = useState('');

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFavoriteId, setSelectedFavoriteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // 1. Fetch User's Favorites & Populate Lesson Data
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user?.id) return;
      
      try {        
        const { data: tokenData } = await authClient.token()
        // Fetch raw favorites list for the specific user
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/favorites?userId=${user.id}`, {
          headers: {
            headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${tokenData?.token}`
          }
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch favorites.');
        const rawFavorites = await response.json();
        
        // Map through the raw favorites and fetch the lesson details for each lessonId
        const populatedFavorites = await Promise.all(
          rawFavorites.map(async (fav) => {
            console.log(fav);
            
            try {
              const lessonResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/lessons/${fav.lessonId}`);
              
              if (!lessonResponse.ok) return null; // Skip if lesson was deleted
              
              const lessonData = await lessonResponse.json();
              
              // Merge the raw favorite doc (so we keep the favorite _id for deletion) 
              // with the fetched lesson details
              return { 
                favoriteId: fav._id, 
                savedAt: fav.savedAt,
                lesson: lessonData 
              };
            } catch (err) {
              console.log(err);
              return null;
            }
          })
        );

        // Filter out any nulls (in case a saved lesson was deleted by its creator)
        setFavorites(populatedFavorites.filter(Boolean));
      } catch (error) {
        toast.error(error.message || 'Something went wrong fetching your favorites.');
      } finally {
        setIsLoading(false);
      }
    };

    if (!isPending) {
      if (user) {
        fetchFavorites();
      } else {
        setIsLoading(false);
      }
    }
  }, [user, isPending]);
  
  // Open modal step
  const triggerRemoveConfirm = (favoriteId) => {
    setSelectedFavoriteId(favoriteId);
    setIsModalOpen(true);
  };

  // 2. Handle Removal from Favorites
  const handleRemove = async () => {
    if (!selectedFavoriteId) return;
    setIsDeleting(true);
    
    try {
      const { data: tokenData } = await authClient.token()
      // We pass the specific Favorite document _id to delete it
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/favorites/${selectedFavoriteId}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${tokenData?.token}`
        }
      });

      if (!response.ok) throw new Error('Failed to remove favorite.');

      // Instantly remove the deleted favorite from the UI state
      setFavorites((prev) => prev.filter((fav) => fav.favoriteId !== selectedFavoriteId));
      toast.success('Removed from favorites.');
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.message || 'Failed to remove from favorites.');
    } finally {
      setIsDeleting(false);
      setSelectedFavoriteId(null);
    }
  };

  // 3. Dynamic Filtering Logic
  const filteredFavorites = favorites.filter((fav) => {
    const matchesCategory = categoryFilter ? fav.lesson.category === categoryFilter : true;
    const matchesTone = toneFilter ? fav.lesson.emotionalTone === toneFilter : true;
    return matchesCategory && matchesTone;
  });

  // 4. Render Loading State
  if (isLoading || isPending) {
    return (
      <div className="flex justify-center items-center h-64 bg-white rounded-2xl border border-slate-100 shadow-sm">
        <Loader2 className="w-8 h-8 animate-spin text-[#0F766E]" />
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm overflow-hidden relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-[#1E293B]">My Favorites</h1>
        
        {/* Dynamic Filters */}
        <div className="flex gap-3 w-full sm:w-auto">
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] transition-all"
          >
            <option value="">All Categories</option>
            <option value="Personal Growth">Personal Growth</option>
            <option value="Career">Career</option>
            <option value="Relationships">Relationships</option>
            <option value="Mindset">Mindset</option>
            <option value="Mistakes Learned">Mistakes Learned</option>
          </select>
          
          <select 
            value={toneFilter}
            onChange={(e) => setToneFilter(e.target.value)}
            className="px-3 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] transition-all"
          >
            <option value="">All Tones</option>
            <option value="Motivational">Motivational</option>
            <option value="Sad">Sad</option>
            <option value="Realization">Realization</option>
            <option value="Gratitude">Gratitude</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-100 text-sm text-slate-500 uppercase tracking-wider">
              <th className="pb-4 font-medium">Lesson</th>
              <th className="pb-4 font-medium">Category / Tone</th>
              <th className="pb-4 font-medium">Author</th>
              <th className="pb-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-slate-600">
            {filteredFavorites.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-8 text-center text-slate-500">
                  {favorites.length === 0 
                    ? "You haven't saved any lessons to your favorites yet."
                    : "No saved lessons match your current filters."}
                </td>
              </tr>
            ) : (
              filteredFavorites.map((fav) => (
                <tr key={fav.favoriteId} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 font-medium text-[#1E293B] max-w-[200px] truncate">
                    {fav.lesson.title || 'Untitled Lesson'}
                  </td>
                  <td className="py-4">
                    {fav.lesson.category || 'N/A'} • <span className="text-amber-600">{fav.lesson.emotionalTone || 'N/A'}</span>
                  </td>
                  <td className="py-4">
                    {fav.lesson.creator?.name || 'Anonymous'}
                  </td>
                  <td className="py-4 flex justify-end gap-2">
                    {/* Navigate to full lesson details */}
                    <Link 
                      href={`/public-lessons/${fav.lesson._id}`} 
                      className="p-2 text-slate-400 hover:text-[#0F766E] border border-slate-200 rounded-lg transition-colors bg-white"
                      title="View Details"
                    >
                      <ExternalLink size={16}/>
                    </Link>
                    
                    {/* Remove from favorites button triggers custom modal */}
                    <button 
                      onClick={() => triggerRemoveConfirm(fav.favoriteId)} 
                      className="p-2 text-slate-400 hover:text-red-600 border border-slate-200 rounded-lg transition-colors bg-white"
                      title="Remove from Favorites"
                    >
                      <Trash2 size={16}/>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl border border-slate-100 max-w-md w-full p-6 space-y-4 transform transition-all scale-100">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-900">Remove from Favorites?</h3>
              <p className="text-sm text-slate-500">
                Are you sure you want to remove this lesson? You can always save it again later if you change your mind.
              </p>
            </div>
            
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => { setIsModalOpen(false); setSelectedFavoriteId(null); }}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:opacity-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleRemove}
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/20 disabled:opacity-50 transition-colors min-w-[80px]"
              >
                {isDeleting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'Remove'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}