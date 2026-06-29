'use client'

import React, { useState } from 'react'
import { Heart, Bookmark, Flag, X } from 'lucide-react'
import { FacebookShareButton, TwitterShareButton, FacebookIcon, XIcon } from 'react-share'
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

export default function InteractionButtons({ initialLikes, isLoggedIn }) {
  const userData = authClient.useSession();
  const currentUser = userData.data?.user;
  // const currentUserId=currentUser._id
  const currentUserId="efr3"
  const [likes, setLikes] = useState(initialLikes)
  const [isSaved, setIsSaved] = useState(false)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [reportReason, setReportReason] = useState('')

  const hasLiked = likes.includes(currentUserId)

  const handleLike = () => {
    if (!currentUser) return toast.error('Please log in to like')
    setLikes(hasLiked ? likes.filter(id => id !== currentUserId) : [...likes, currentUserId])
  }

  const submitReport = () => {
    alert(`Report submitted for reason: ${reportReason}`)
    setIsReportModalOpen(false)
    setReportReason('')
  }

  return (
    <>
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${hasLiked ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
          >
            <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
            {hasLiked ? 'Liked' : 'Like'}
          </button>

          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${isSaved ? 'bg-amber-50 text-amber-600 border border-amber-200' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            {isSaved ? 'Saved' : 'Save'}
          </button>
        </div>

        <div className="flex gap-2 items-center">
          <div className="flex gap-1">
            <FacebookShareButton url={'https://wisdomlog.com'}>
              <FacebookIcon size={36} round className="hover:opacity-80 transition-opacity" />
            </FacebookShareButton>
            <TwitterShareButton url={'https://wisdomlog.com'}>
              <XIcon size={36} round className="hover:opacity-80 transition-opacity" />
            </TwitterShareButton>
          </div>

          <button
            onClick={() => setIsReportModalOpen(true)}
            className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors ml-2"
            title="Report Lesson"
          >
            <Flag className="w-5 h-5" />
          </button>
        </div>
      </div>

      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center border-b border-slate-100 p-4">
              <h3 className="font-bold text-lg text-[#1E293B]">Report Lesson</h3>
              <button onClick={() => setIsReportModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <select
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                className="w-full border border-slate-200 rounded-xl p-3 text-slate-700 text-sm"
              >
                <option value="">Select a reason...</option>
                <option value="Spam">Spam or self-promotion</option>
                <option value="Inappropriate">Inappropriate content</option>
              </select>
              <div className="flex justify-end gap-3 pt-4">
                <button onClick={() => setIsReportModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-600">Cancel</button>
                <button onClick={submitReport} disabled={!reportReason} className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-xl disabled:opacity-50">Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}