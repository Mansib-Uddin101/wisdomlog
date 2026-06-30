'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Edit2, Trash2, Eye, Loader2, Lock, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import UpdateLessonModal from '@/components/UpdateLessonModal';

export default function MyLessons() {
  const [editingLesson, setEditingLesson] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // New state for the custom delete modal
  const [lessonToDelete, setLessonToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Get current user session from Better Auth
  const { data: sessionData, isPending } = authClient.useSession();
  const user = sessionData?.user;

  // Note: Adjust this check based on how your user schema defines premium status
  const isPremiumUser = user?.plan === 'premium' || user?.isPremium;

  // 1. Fetch data from MongoDB
  const fetchMyLessons = useCallback(async () => {
    if (!user?.id) return;

    setIsLoading(true); // Ensure loading state is handled
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/lessons`);

      if (!response.ok) throw new Error('Failed to fetch lessons.');

      const data = await response.json();
      const userLessons = data.filter(lesson => lesson.creatorId === user.id);
      setLessons(userLessons);
    } catch (error) {
      toast.error(error.message || 'Something went wrong fetching your lessons.');
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);
  useEffect(() => {
    if (!isPending && user) {
      fetchMyLessons();
    } else if (!isPending && !user) {
      setIsLoading(false);
    }
  }, [user, isPending, fetchMyLessons]);

  // 2. Handle Quick Updates (Visibility & Access Level)
  const handleQuickUpdate = async (id, field, value) => {
    try {

      const { data: tokenData } = await authClient.token()
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/lessons/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${tokenData?.token}`
        },
        body: JSON.stringify({ [field]: value })
      });

      if (!response.ok) throw new Error(`Failed to update ${field}.`);

      // Update local state instantly
      setLessons((prev) =>
        prev.map((lesson) =>
          lesson._id === id ? { ...lesson, [field]: value } : lesson
        )
      );
      toast.success(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully.`);
    } catch (error) {
      toast.error(error.message || `Failed to update ${field}.`);
    }
  };

  // 3. Handle Document Deletion (Modal confirmed)
  const confirmDelete = async () => {
    if (!lessonToDelete) return;
    setIsDeleting(true);

    try {
      const { data: tokenData } = await authClient.token()

      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/lessons/${lessonToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${tokenData?.token}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete lesson.');

      setLessons((prev) => prev.filter((lesson) => lesson._id !== lessonToDelete));
      toast.success('Lesson deleted successfully.');
    } catch (error) {
      toast.error(error.message || 'Failed to delete the lesson.');
    } finally {
      setIsDeleting(false);
      setLessonToDelete(null); // Close the modal
    }
  };

  // 4. Render Loading State
  if (isLoading || isPending) {
    return (
      <div className="flex justify-center items-center h-64 bg-white rounded-2xl border border-slate-100 shadow-sm">
        <Loader2 className="w-8 h-8 animate-spin text-[#0F766E]" />
      </div>
    );
  }

  return (
    <>
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm overflow-hidden relative z-0">
        <h1 className="text-2xl font-bold text-[#1E293B] mb-6">My Published Lessons</h1>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100 text-sm text-slate-500 uppercase tracking-wider">
                <th className="pb-4 font-medium">Title</th>
                <th className="pb-4 font-medium">Date</th>
                <th className="pb-4 font-medium">Settings</th>
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

                    {/* Title */}
                    <td className="py-4 font-medium text-[#1E293B] max-w-[200px] truncate pr-4">
                      {lesson.title}
                    </td>

                    {/* Date */}
                    <td className="py-4 text-slate-600">
                      {lesson.createdAt ? new Date(lesson.createdAt).toLocaleDateString() : 'N/A'}
                    </td>

                    {/* Settings (Visibility & Access) */}
                    <td className="py-4 flex flex-col gap-2">
                      <select
                        value={lesson.visibility || 'Public'}
                        onChange={(e) => handleQuickUpdate(lesson._id, 'visibility', e.target.value)}
                        className={`text-xs px-2 py-1.5 rounded-md font-medium border outline-none cursor-pointer transition-colors ${lesson.visibility === 'Private'
                          ? 'bg-slate-100 text-slate-700 border-slate-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                          }`}
                      >
                        <option value="Public">🌍 Public</option>
                        <option value="Private">🔒 Private</option>
                      </select>

                      <div className="relative group w-max">
                        <select
                          value={lesson.accessLevel || 'Free'}
                          onChange={(e) => handleQuickUpdate(lesson._id, 'accessLevel', e.target.value)}
                          disabled={!isPremiumUser}
                          className={`text-xs px-2 py-1.5 rounded-md font-medium border outline-none transition-colors ${!isPremiumUser ? 'cursor-not-allowed opacity-60 bg-slate-50 border-slate-100' : 'cursor-pointer'
                            } ${lesson.accessLevel === 'Premium'
                              ? 'bg-amber-50 text-amber-700 border-amber-100'
                              : isPremiumUser ? 'bg-blue-50 text-blue-700 border-blue-100' : ''
                            }`}
                        >
                          <option value="Free">🆓 Free</option>
                          <option value="Premium">⭐ Premium</option>
                        </select>

                        {!isPremiumUser && (
                          <div className="absolute hidden group-hover:block bottom-full left-0 mb-1 w-48 p-2 bg-slate-800 text-white text-[10px] rounded shadow-lg z-10">
                            <Lock size={10} className="inline mr-1 mb-0.5" />
                            Upgrade to Premium to lock lessons.
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Stats */}
                    <td className="py-4 text-slate-600">
                      <div className="flex flex-col gap-1 text-xs">
                        <span>👍 {lesson.likesCount || 0} Likes</span>
                        <span>🔖 {lesson.favoritesCount || 0} Saves</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/public-lessons/${lesson._id}`}
                          className="p-2 text-slate-400 hover:text-[#0F766E] transition-colors bg-white rounded-lg border border-slate-200"
                          title="View Lesson"
                        >
                          <Eye size={16} />
                        </Link>

                        <button
                          onClick={() => setEditingLesson(lesson)}
                          className="p-2 text-slate-400 hover:text-blue-600 transition-colors bg-white rounded-lg border border-slate-200"
                        >
                          <Edit2 size={16} />
                        </button>

                        {/* Triggers Modal instead of window.confirm */}
                        <button
                          onClick={() => setLessonToDelete(lesson._id)}
                          className="p-2 text-slate-400 hover:text-red-600 transition-colors bg-white rounded-lg border border-slate-200"
                          title="Delete Lesson"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
      </div>

      {/* Delete Confirmation Modal */}
      {lessonToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Delete Lesson?</h3>
              <p className="text-sm text-slate-500 mb-6">
                Are you sure you want to permanently delete this lesson? This action cannot be undone.
              </p>

              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setLessonToDelete(null)}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2.5 rounded-xl font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="flex-1 flex justify-center items-center px-4 py-2.5 rounded-xl font-medium text-white bg-red-600 hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {isDeleting ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    'Delete'
                  )}
                </button>
              </div>
            </div>
          </div>

        </div>
      )}
      <UpdateLessonModal
        isOpen={!!editingLesson}
        lesson={editingLesson}
        user={user} // Pass the current Better Auth user context
        onClose={() => setEditingLesson(null)}
        onUpdateSuccess={() => {
          fetchMyLessons(); // Re-run your fetch function to get the updated data!
        }}
      />
    </>
  );
}