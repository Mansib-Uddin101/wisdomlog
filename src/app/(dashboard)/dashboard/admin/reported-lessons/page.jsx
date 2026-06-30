'use client';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { AlertTriangle, Trash2, X, Loader2 } from 'lucide-react';
import { authClient } from '@/lib/auth-client';

export default function ReportedLessons() {

  const [reportedLessons, setReportedLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, lessonId: null });
  const [reasonsModal, setReasonsModal] = useState({ isOpen: false, data: null });

  // 1. Fetch Reported Lessons on Mount
  useEffect(() => {
    const fetchReportedLessons = async () => {
      const { data: tokenData } = await authClient.token()

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/lessons-reports`, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${tokenData?.token}`
          }
        });
        if (!res.ok) throw new Error('Failed to fetch reported lessons data');
        const data = await res.json();
        setReportedLessons(data);
      } catch (error) {
        toast.error(error.message || 'Error loading reported lessons.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReportedLessons();
  }, []);

  // 2. Delete Lesson Permanently
  const confirmDelete = async () => {
    try {
      const { data: tokenData } = await authClient.token()

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/lessons/${deleteModal.lessonId}`, {
        method: 'DELETE',
        authorization: `Bearer ${tokenData?.token}`
      });

      if (!res.ok) throw new Error('Failed to delete flagged lesson');

      const res2 = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/lessons-reports/${deleteModal.reportId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${tokenData?.token}`
          }
      });

      if (!res2.ok) throw new Error('Failed to delete flagged lesson');

      // Update UI by removing the deleted lesson
      setReportedLessons(reportedLessons.filter(l => l._id !== deleteModal.reportId));
      toast.success('Reported lesson completely removed.');
    } catch (error) {
      toast.error(error.message || 'Could not delete lesson.');
    } finally {
      setDeleteModal({ isOpen: false, lessonId: null });
    }
  };

  // 3. Ignore Reports (Clear them and keep lesson live)
  const handleIgnore = async (reportId) => {
    try {
      console.log(reportId);

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/lessons-reports/${reportId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to clear report');

      // Remove from the moderation queue visually
      setReportedLessons(reportedLessons.filter(l => l._id !== reportId));
      toast.success('Reports cleared. Lesson kept live.');
    } catch (error) {
      toast.error(error.message || 'Could not process ignore action.');
    }
  };

  const openReasonsModal = (reports) => {
    setReasonsModal({
      isOpen: true,
      data: reports || [],
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 relative">
      <h1 className="text-3xl font-bold text-[#1E293B]">Reported Lessons</h1>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-slate-600">
              <th className="p-4 font-medium">Lesson Title</th>
              <th className="p-4 font-medium">Details</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <tr>
                <td colSpan="4" className="p-8 text-center text-slate-500">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin text-[#0F766E]" /> Loading flagged content...
                  </div>
                </td>
              </tr>
            ) : reportedLessons.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-8 text-center text-slate-500">
                  No reported lessons at this time. Great job!
                </td>
              </tr>
            ) : (
              reportedLessons.map((lesson) => (


                <tr key={lesson._id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-[#1E293B]">{lesson.title}</td>
                  <td className="p-4">
                    <button
                      onClick={() => openReasonsModal(reportedLessons)}
                      className="text-sm font-medium text-[#0F766E] hover:underline"
                    >
                      View Reasons
                    </button>
                  </td>
                  <td className="p-4 flex items-center justify-end gap-3">
                    <button
                      onClick={() => handleIgnore(lesson._id)}
                      className="px-4 py-2 text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                      Ignore
                    </button>
                    <button
                      onClick={() => setDeleteModal({ isOpen: true, lessonId: lesson.lessonId, reportId: lesson._id })}
                      className="px-4 py-2 text-sm font-medium bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
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
            <h3 className="text-xl font-bold text-[#1E293B] mb-2">Delete Flagged Lesson?</h3>
            <p className="text-slate-500 mb-6 text-sm">Are you sure you want to permanently delete this lesson? This action cannot be undone.</p>
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

      {/* View Reasons Modal */}
      {reasonsModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl relative max-h-[80vh] flex flex-col">
            <button
              onClick={() => setReasonsModal({ isOpen: false, data: null })}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-[#1E293B] mb-4">Report Details</h3>

            <div className="space-y-4 overflow-y-auto pr-2">
              {reasonsModal.data?.length > 0 ? (
                reasonsModal.data.map((report, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="text-sm font-bold text-[#1E293B] mb-1">{report.reporterUserI || 'Anonymous User'}</p>
                    <p className="text-sm text-slate-600">{report.reason || 'No specific reason provided.'}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">No report details available.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}