'use client'

import { useState } from 'react'
import LessonCard from '@/components/LessonCard'

// Dummy Data mapped perfectly to your exact MongoDB Collection Key Fields
const DUMMY_LESSONS = [
  {
    _id: 'lesson_01',
    title: 'Embracing Failure in Your Early 20s',
    description: 'Bouncing back from a failed startup taught me more about resilience and operations than a standard business degree ever could.',
    category: 'Mistakes Learned',
    emotionalTone: 'Realization',
    visibility: 'Public',
    accessLevel: 'Free',
    likes: ['user_99', 'user_88'],
    likesCount: 2,
    isFeatured: true,
    isReviewed: true,
    creatorId: 'user_01',
    // Expanded object for visual rendering matching creatorId references
    creator: {
      name: 'Alex Rivera',
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
    },
    createdAt: '2026-06-15'
  },
  {
    _id: 'lesson_02',
    title: 'The Art of Relentless Prioritization',
    description: 'How protecting your time relentlessly and learning to say a polite "no" shifts your long-term professional growth vector completely.',
    category: 'Career',
    emotionalTone: 'Motivational',
    visibility: 'Public',
    accessLevel: 'Premium',
    likes: ['user_77'],
    likesCount: 1,
    isFeatured: false,
    isReviewed: true,
    creatorId: 'user_02',
    creator: {
      name: 'Sarah Jenkins',
      photoURL: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150'
    },
    createdAt: '2026-06-22'
  },
  {
    _id: 'lesson_03',
    title: 'Finding Joy in Constant Transitions',
    description: 'Life moves incredibly fast. Learning to sit gracefully with severe uncertainty is a massive emotional victory that pays dividends.',
    category: 'Personal Growth',
    emotionalTone: 'Gratitude',
    visibility: 'Public',
    accessLevel: 'Free',
    likes: [],
    likesCount: 0,
    isFeatured: true,
    isReviewed: true,
    creatorId: 'user_03',
    creator: {
      name: 'Marcus Chen',
      photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    },
    createdAt: '2026-06-28'
  }
]

export default function PublicLessonsPage() {
  // Simulate standard user session state (Toggle to see premium content unblurred)
  const [isCurrentUserPremium, setIsCurrentUserPremium] = useState(false)
  
  // Challenge 1 States: Search + Filter + Sort Controls
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [tone, setTone] = useState('')
  const [sort, setSort] = useState('newest')

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Heading Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-[#1E293B] tracking-tight sm:text-5xl">
            Browse Public Life Lessons
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Anyone can explore publicly shared wisdom, mindful reflection entries, and gathered life lessons.
          </p>
          
          
        </div>

        {/* Challenge 1: Functional Search, Filtering, and Sorting Panel Layout */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-10 flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="w-full lg:w-1/3">
            <input
              type="text"
              placeholder="Search by title, story keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F766E] text-slate-700 text-sm"
            />
          </div>
          
          <div className="w-full lg:w-2/3 flex flex-wrap sm:flex-nowrap gap-3 justify-end">
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="w-full sm:w-auto px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
            >
              <option value="">All Categories</option>
              <option value="Personal Growth">Personal Growth</option>
              <option value="Career">Career</option>
              <option value="Relationships">Relationships</option>
              <option value="Mindset">Mindset</option>
              <option value="Mistakes Learned">Mistakes Learned</option>
            </select>

            <select 
              value={tone} 
              onChange={(e) => setTone(e.target.value)}
              className="w-full sm:w-auto px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
            >
              <option value="">All Emotional Tones</option>
              <option value="Motivational">Motivational</option>
              <option value="Sad">Sad</option>
              <option value="Realization">Realization</option>
              <option value="Gratitude">Gratitude</option>
            </select>

            <select 
              value={sort} 
              onChange={(e) => setSort(e.target.value)}
              className="w-full sm:w-auto px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
            >
              <option value="newest">Newest First</option>
              <option value="most-saved">Most Saved</option>
            </select>
          </div>
        </div>

        {/* Responsive Grid Layout - Strict Equal Height Settings Applied */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {DUMMY_LESSONS.map((lesson) => (
            <LessonCard 
              key={lesson._id} 
              lesson={lesson} 
              isPremiumUser={isCurrentUserPremium} 
            />
          ))}
        </div>

        {/* Challenge 3: One-Page Pagination Shell */}
        <div className="mt-12 flex justify-center items-center gap-2">
          <button disabled className="px-4 py-2 bg-slate-200 text-slate-400 rounded-xl cursor-not-allowed text-xs font-semibold">
            Previous
          </button>
          <button className="px-4 py-2 bg-[#0F766E] text-white rounded-xl text-xs font-semibold hover:bg-[#14B8A6] transition-colors shadow-sm">
            1
          </button>
          <button disabled className="px-4 py-2 bg-slate-200 text-slate-400 rounded-xl cursor-not-allowed text-xs font-semibold">
            Next
          </button>
        </div>

      </div>
    </div>
  )
}