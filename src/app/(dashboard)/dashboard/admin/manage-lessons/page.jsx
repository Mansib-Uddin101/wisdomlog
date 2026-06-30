'use client';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Star, CheckCircle, Trash2, Filter, Loader2 } from 'lucide-react';

export default function ManageLessons() {
  const [lessons, setLessons] = useState([]);
  const [stats, setStats] = useState({ publicCount: 0, privateCount: 0 });
  const [categoryFilter, setCategoryFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, lessonId: null });

  // 1. Fetch Lessons Data & Stats
  useEffect(() => {
    const fetchLessonsData = async () => {

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/lessons`);
        if (!res.ok) throw new Error('Failed to fetch lessons data');
        const data = await res.json();


        setLessons(data || []);
        setStats({
          publicCount: data.publicCount || 0,
          privateCount: data.privateCount || 0,
        });
      } catch (error) {
        toast.error(error.message || 'Error loading lessons.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLessonsData();
  }, []);

  // 2. Toggle Featured Status
  const handleFeature = async (lessonId, currentFeaturedStatus) => {
    try {
      const { data: tokenData } = await authClient.token()
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/lessons/${lessonId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${tokenData?.token}`
        },
        body: JSON.stringify({ isFeatured: !currentFeaturedStatus }),
      });

      if (!res.ok) throw new Error('Failed to update featured status');

      setLessons(lessons.map(l => l._id === lessonId ? { ...l, isFeatured: !currentFeaturedStatus } : l));
      toast.success(!currentFeaturedStatus ? 'Lesson marked as Featured!' : 'Lesson removed from Featured.');
    } catch (error) {
      toast.error(error.message || 'Could not update featured status.');
    }
  };

  // 3. Mark Content as Reviewed
  const handleReview = async (lessonId) => {
    try {
      const { data: tokenData } = await authClient.token()
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/lessons/${lessonId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${tokenData?.token}`
        },
        body: JSON.stringify({ isReviewed: true }),
      });

      if (!res.ok) throw new Error('Failed to update review status');

      setLessons(lessons.map(l => l._id === lessonId ? { ...l, isReviewed: true } : l));
      toast.success('Lesson marked as Reviewed.');
    } catch (error) {
      toast.error(error.message || 'Could not update review status.');
    }
  };

  // 4. Confirm and Delete Lesson
  const confirmDelete = async () => {
    try {
      const { data: tokenData } = await authClient.token()
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/lessons/${deleteModal.lessonId}`, {
        method: 'DELETE',

      });

      if (!res.ok) throw new Error('Failed to delete lesson');

      // Update UI state locally
      const deletedLesson = lessons.find(l => l._id === deleteModal.lessonId);
      if (deletedLesson) {
        setStats(prev => ({
          publicCount: deletedLesson.visibility === 'public' ? prev.publicCount - 1 : prev.publicCount,
          privateCount: deletedLesson.visibility === 'private' ? prev.privateCount - 1 : prev.privateCount,
        }));
      }

      setLessons(lessons.filter(l => l._id !== deleteModal.lessonId));
      toast.success('Lesson deleted.');
    } catch (error) {
      toast.error(error.message || 'Could not delete lesson.');
    } finally {
      setDeleteModal({ isOpen: false, lessonId: null });
    }
  };

  // Filter lessons dynamic array logic
  const filteredLessons = categoryFilter
    ? lessons.filter(l => l.category?.toLowerCase() === categoryFilter.toLowerCase())
    : lessons;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-[#1E293B]">Manage Lessons</h1>
        <div className="flex gap-4">
          <div className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm text-slate-600">
            Public: <span className="font-bold text-[#0F766E]">{stats.publicCount}</span>
          </div>
          <div className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm text-slate-600">
            Private: <span className="font-bold text-[#1E293B]">{stats.privateCount}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-4 h-4 text-slate-500" />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm text-slate-700 outline-none focus:ring-2 focus:ring-[#0F766E]/20"
        >
          <option value="">All Categories</option>
          <option value="wisdom">Wisdom</option>
          <option value="life">Life Lessons</option>
          <option value="tech">Technology</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-slate-600">
              <th className="p-4 font-medium">Title</th>
              <th className="p-4 font-medium">Creator</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <tr>
                <td colSpan="4" className="p-8 text-center text-slate-500">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin text-[#0F766E]" /> Loading lessons...
                  </div>
                </td>
              </tr>
            ) : filteredLessons.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-8 text-center text-slate-500">
                  No lessons found matching this criteria.
                </td>
              </tr>
            ) : (
              filteredLessons.map((lesson) => (
                <tr key={lesson._id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-[#1E293B]">{lesson.title}</td>
                  <td className="p-4 text-slate-600">{lesson.creatorName || lesson.creatorEmail || 'Anonymous'}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${lesson.visibility === 'public'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-slate-100 text-slate-600'
                      }`}>
                      {lesson.visibility === 'public' ? 'Public' : 'Private'}
                    </span>
                    {lesson.isReviewed && (
                      <span className="ml-2 px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-bold uppercase">
                        Reviewed
                      </span>
                    )}
                  </td>
                  <td className="p-4 flex items-center justify-end gap-3">
                    <button
                      onClick={() => handleFeature(lesson._id, lesson.isFeatured)}
                      className={`p-2 rounded-lg transition-colors ${lesson.isFeatured ? 'text-amber-500 bg-amber-50' : 'text-slate-400 hover:bg-slate-50'
                        }`}
                      title={lesson.isFeatured ? "Remove from Featured" : "Make Featured"}
                    >
                      <Star className="w-5 h-5 fill-current" />
                    </button>
                    <button
                      onClick={() => handleReview(lesson._id)}
                      disabled={lesson.isReviewed}
                      className={`p-2 rounded-lg transition-colors ${lesson.isReviewed ? 'text-slate-300 cursor-not-allowed' : 'text-[#0F766E] hover:bg-[#0F766E]/10'
                        }`}
                      title="Mark Reviewed"
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setDeleteModal({ isOpen: true, lessonId: lesson._id })}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Lesson"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-xl font-bold text-[#1E293B] mb-2">Delete Lesson?</h3>
            <p className="text-slate-500 mb-6 text-sm">Are you sure you want to permanently delete this content? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteModal({ isOpen: false, lessonId: null })}
                className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white font-medium hover:bg-red-700 rounded-lg transition-colors"
              >
                Delete Lesson
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}