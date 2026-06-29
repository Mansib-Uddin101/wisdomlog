'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Calendar, Clock, Eye, Heart, Bookmark, Flag, 
  Share2, Lock, User, ChevronRight, X 
} from 'lucide-react'
import { 
  FacebookShareButton, TwitterShareButton, LinkedinShareButton,
  FacebookIcon, TwitterIcon, LinkedinIcon 
} from 'react-share'

// Dummy Data mapped to your MongoDB Collections schema
const DUMMY_LESSON = {
  _id: 'lesson_101',
  title: 'The Power of Pausing: Why Hustle Culture is a Trap',
  description: 'For years, I tied my self-worth directly to my output. If I wasn’t working, I was failing. But after a severe burnout at 26, I realized that relentless forward motion without reflection is just running in circles. Learning to pause, breathe, and evaluate my direction changed not only my career trajectory but my entire relationship with myself. Here is how you can implement strategic pauses in your daily routine...',
  category: 'Mindset',
  emotionalTone: 'Realization',
  visibility: 'Public',
  accessLevel: 'Free',
  featuredImage: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1200',
  createdAt: '2026-06-20',
  updatedAt: '2026-06-25',
  creator: {
    _id: 'user_05',
    name: 'Elena Rostova',
    photoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    totalLessons: 12
  },
  likes: ['user_99', 'user_88'],
  likesCount: 1240,
  favoritesCount: 342,
  comments: [
    { _id: 'c1', user: { name: 'David K.' }, text: 'This hit home for me. Thank you.', createdAt: '2 days ago' },
    { _id: 'c2', user: { name: 'Sarah J.' }, text: 'Strategic pauses are a game changer.', createdAt: '1 day ago' }
  ]
}

export default function LessonDetailsPage() {
  // Simulated Auth & User State
  const [currentUser, setCurrentUser] = useState({ _id: 'user_99', isPremium: false, isLoggedIn: true })
  
  // Interaction States
  const [likes, setLikes] = useState(DUMMY_LESSON.likes)
  const [isSaved, setIsSaved] = useState(false)
  const [views, setViews] = useState(0)
  const [commentText, setCommentText] = useState('')
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [reportReason, setReportReason] = useState('')

  // View count simulation
  useEffect(() => {
    setViews(Math.floor(Math.random() * 10000))
  }, [])

  // Derived Access Logic
  const isLocked = DUMMY_LESSON.accessLevel === 'Premium' && !currentUser.isPremium
  const hasLiked = likes.includes(currentUser._id)
  
  // Reading Time Calc (Roughly 200 words per minute)
  const wordCount = DUMMY_LESSON.description.split(' ').length
  const readingTime = Math.ceil(wordCount / 200)

  // Handlers
  const handleLike = () => {
    if (!currentUser.isLoggedIn) return alert('Please log in to like') // Replace with Toast in production
    
    if (hasLiked) {
      setLikes(likes.filter(id => id !== currentUser._id))
    } else {
      setLikes([...likes, currentUser._id])
    }
  }

  const handleSaveToggle = () => {
    if (!currentUser.isLoggedIn) return alert('Please log in to save')
    setIsSaved(!isSaved)
  }

  const submitReport = () => {
    // API Call to /api/reports goes here
    alert(`Report submitted for reason: ${reportReason}`)
    setIsReportModalOpen(false)
    setReportReason('')
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* 1. Lesson Information & Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
          
          {DUMMY_LESSON.featuredImage && (
            <img 
              src={DUMMY_LESSON.featuredImage} 
              alt={DUMMY_LESSON.title} 
              className="w-full h-64 md:h-80 object-cover"
            />
          )}

          <div className="p-6 md:p-10 relative">
            
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold uppercase rounded-md tracking-wider">
                {DUMMY_LESSON.category}
              </span>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-bold uppercase rounded-md tracking-wider">
                {DUMMY_LESSON.emotionalTone}
              </span>
              <span className={`px-3 py-1 text-xs font-bold uppercase rounded-md tracking-wider ${
                DUMMY_LESSON.accessLevel === 'Premium' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
              }`}>
                {DUMMY_LESSON.accessLevel === 'Premium' && '⭐ '} {DUMMY_LESSON.accessLevel}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-[#1E293B] mb-6 leading-tight">
              {DUMMY_LESSON.title}
            </h1>

            {/* Content Body - with Paywall Logic */}
            <div className={`relative ${isLocked ? 'blur-[8px] select-none pointer-events-none' : ''}`}>
              <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-wrap">
                {DUMMY_LESSON.description}
              </p>
            </div>

            {/* Premium Paywall Banner */}
            {isLocked && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/40 backdrop-blur-sm p-6">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 text-center max-w-md">
                  <div className="mx-auto w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4 text-amber-600">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1E293B] mb-2">Premium Lesson</h3>
                  <p className="text-slate-500 mb-6 text-sm">
                    This insight is reserved for WisdomLog Premium members. Upgrade your account to unlock this and all other premium lessons.
                  </p>
                  <Link 
                    href="/dashboard/pricing"
                    className="block w-full bg-[#0F766E] hover:bg-[#14B8A6] text-white font-semibold py-3 rounded-xl transition-colors"
                  >
                    Upgrade to View
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {!isLocked && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Author, Meta, Stats */}
            <div className="space-y-6">
              
              {/* 3. Author Section */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center text-center">
                <img 
                  src={DUMMY_LESSON.creator.photoURL} 
                  alt={DUMMY_LESSON.creator.name} 
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-slate-50 mb-3"
                />
                <h3 className="font-bold text-lg text-[#1E293B]">{DUMMY_LESSON.creator.name}</h3>
                <p className="text-sm text-slate-500 mb-4">{DUMMY_LESSON.creator.totalLessons} Lessons Created</p>
                <Link 
                  href={`/author/${DUMMY_LESSON.creator._id}`}
                  className="text-[#0F766E] bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl text-sm font-semibold transition-colors w-full"
                >
                  View all lessons
                </Link>
              </div>

              {/* 2. Metadata Block */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-800 border-b border-slate-100 pb-2 mb-3">Info</h4>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Created: {DUMMY_LESSON.createdAt}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Eye className="w-4 h-4 text-slate-400" />
                  <span>Visibility: {DUMMY_LESSON.visibility}</span>
                </div>
              </div>

              {/* 4. Stats Section */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex justify-around">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#1E293B]">{likes.length + (DUMMY_LESSON.likesCount - DUMMY_LESSON.likes.length)}</p>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Likes</p>
                </div>
                <div className="text-center border-l border-r border-slate-100 px-4">
                  <p className="text-2xl font-bold text-[#1E293B]">{DUMMY_LESSON.favoritesCount + (isSaved ? 1 : 0)}</p>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Saves</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#1E293B]">{views}</p>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Views</p>
                </div>
              </div>

            </div>

            {/* Right Column: Interactions & Comments */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* 5. Interaction Buttons */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap gap-3 items-center justify-between">
                <div className="flex gap-2">
                  <button 
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      hasLiked ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
                    {hasLiked ? 'Liked' : 'Like'}
                  </button>
                  
                  <button 
                    onClick={handleSaveToggle}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isSaved ? 'bg-amber-50 text-amber-600 border border-amber-200' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    {isSaved ? 'Saved' : 'Save'}
                  </button>
                </div>

                <div className="flex gap-2 items-center">
                  {/* Share Component */}
                  <div className="flex gap-1">
                    <FacebookShareButton url={'https://wisdomlog.com'}>
                      <FacebookIcon size={36} round className="hover:opacity-80 transition-opacity" />
                    </FacebookShareButton>
                    <TwitterShareButton url={'https://wisdomlog.com'}>
                      <TwitterIcon size={36} round className="hover:opacity-80 transition-opacity" />
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

              {/* 6. Comment Section */}
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold text-[#1E293B] mb-6">Discussion ({DUMMY_LESSON.comments.length})</h3>
                
                {currentUser.isLoggedIn ? (
                  <div className="flex gap-4 mb-8">
                    <div className="w-10 h-10 bg-[#0F766E] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      U
                    </div>
                    <div className="flex-grow">
                      <textarea 
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Share your thoughts on this lesson..."
                        className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#0F766E] resize-none h-24 text-sm text-slate-700"
                      />
                      <div className="flex justify-end mt-2">
                        <button className="bg-[#1E293B] hover:bg-slate-800 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors">
                          Post Comment
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-8 text-center text-sm text-slate-600">
                    Please <Link href="/login" className="text-[#0F766E] font-bold hover:underline">log in</Link> to join the discussion.
                  </div>
                )}

                <div className="space-y-6">
                  {DUMMY_LESSON.comments.map(comment => (
                    <div key={comment._id} className="flex gap-4">
                      <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold flex-shrink-0">
                        {comment.user.name.charAt(0)}
                      </div>
                      <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex-grow rounded-tl-none">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-[#1E293B] text-sm">{comment.user.name}</span>
                          <span className="text-xs text-slate-400">{comment.createdAt}</span>
                        </div>
                        <p className="text-slate-700 text-sm">{comment.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* Report Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-slate-100 p-4">
              <h3 className="font-bold text-lg text-[#1E293B]">Report Lesson</h3>
              <button onClick={() => setIsReportModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-slate-600">Why are you reporting this content? Your report is strictly confidential.</p>
              <select 
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-700 text-sm"
              >
                <option value="">Select a reason...</option>
                <option value="Spam">Spam or self-promotion</option>
                <option value="Inappropriate">Inappropriate content</option>
                <option value="Plagiarism">Plagiarism / Stolen work</option>
                <option value="Hate Speech">Hate speech or harassment</option>
              </select>
              
              <div className="flex justify-end gap-3 pt-4">
                <button 
                  onClick={() => setIsReportModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button 
                  onClick={submitReport}
                  disabled={!reportReason}
                  className="px-4 py-2 rounded-xl text-sm font-semibold bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}