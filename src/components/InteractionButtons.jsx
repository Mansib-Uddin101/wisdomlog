'use client'

import React, { useState, useEffect } from 'react'
import { Heart, Bookmark, Flag, X } from 'lucide-react'
import { FacebookShareButton, TwitterShareButton, FacebookIcon, XIcon } from 'react-share'
import toast from 'react-hot-toast'
import { authClient } from '@/lib/auth-client'

export default function InteractionButtons({ initialLikes = [], lessonId }) {
  const { data: session } = authClient.useSession()
  const currentUser = session?.user
  
  // Safely grab the user ID (adjust depending on if your DB uses id or _id)
  const currentUserId = currentUser?.id || currentUser?._id 

  // States
  const [likes, setLikes] = useState(Array.isArray(initialLikes) ? initialLikes : [])
  const [isSaved, setIsSaved] = useState(false)
  const [isSaving, setIsSaving] = useState(false) // Locks button during POST
  const [isCheckingSaved, setIsCheckingSaved] = useState(true) // Locks button during initial GET
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [reportReason, setReportReason] = useState('')

  const hasLiked = currentUserId ? likes.includes(currentUserId) : false

  // 1. Verify Initial Saved State
  useEffect(() => {
    const checkSavedStatus = async () => {
      if (!currentUserId || !lessonId) {
        setIsCheckingSaved(false)
        return
      }

      try {
        // Replace this URL with your actual endpoint for checking a user's favorite
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/favorites/check?lessonId=${lessonId}&userId=${currentUserId}`)
        
        if (response.ok) {
          const data = await response.json()
          // Assuming your API returns { isSaved: true/false }
          setIsSaved(data.isSaved) 
        }
      } catch (error) {
        console.error("Failed to verify saved status:", error)
      } finally {
        setIsCheckingSaved(false)
      }
    }

    checkSavedStatus()
  }, [currentUserId, lessonId])

  // 2. Handle Like Toggle
  const handleLike = () => {
    if (!currentUserId) return toast.error('Please log in to like')
    
    // Note: You likely need an API call here to persist the like to the database!
    setLikes(hasLiked ? likes.filter(id => id !== currentUserId) : [...likes, currentUserId])
  }

  // 3. Handle Save (with locking)
  const handleSave = async () => {
    if (!currentUserId) return toast.error('Please log in to save')
    if (isSaving || isCheckingSaved) return // Prevent spam clicking

    setIsSaving(true)

    const favoriteData = {
      lessonId,
      userId: currentUserId,
      savedAt: new Date().toISOString()
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/favorites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(favoriteData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Server responded with status ${response.status}`)
      }

      // Update UI state upon success
      setIsSaved(true)
      toast.success("Lesson saved successfully!")
      console.log("Data saved successfully:", favoriteData)

    } catch (error) {
      // Fixed toast argument misuse
      const errorMessage = error instanceof Error ? error.message : "Failed to save lesson"
      toast.error(errorMessage)
      console.error("Submission Error:", error)
    } finally {
      setIsSaving(false) // Unlock the button
    }
  }

  const submitReport = () => {
    if (!reportReason) return toast.error("Please select a reason")
    
    toast.success(`Report submitted for reason: ${reportReason}`)
    setIsReportModalOpen(false)
    setReportReason('')
  }

  return (
    <>
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-2">
          
          {/* Like Button */}
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              hasLiked 
                ? 'bg-rose-50 text-rose-600 border border-rose-200' 
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
            {hasLiked ? 'Liked' : 'Like'}
          </button>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={isSaving || isCheckingSaved || isSaved} // Lock if saving, checking, or already saved
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              isSaved 
                ? 'bg-amber-50 text-amber-600 border border-amber-200 opacity-80 cursor-not-allowed' 
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200 disabled:opacity-50'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            {isCheckingSaved ? 'Checking...' : isSaving ? 'Saving...' : isSaved ? 'Saved' : 'Save'}
          </button>
        </div>

        {/* Share & Report Section */}
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

      {/* Report Modal */}
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
                className="w-full border border-slate-200 rounded-xl p-3 text-slate-700 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select a reason...</option>
                <option value="Spam">Spam or self-promotion</option>
                <option value="Inappropriate">Inappropriate content</option>
              </select>
              <div className="flex justify-end gap-3 pt-4">
                <button 
                  onClick={() => setIsReportModalOpen(false)} 
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={submitReport} 
                  disabled={!reportReason} 
                  className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-xl disabled:opacity-50 hover:bg-red-700 transition-colors"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}