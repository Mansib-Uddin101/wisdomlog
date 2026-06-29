'use client'

import { useState, useEffect } from 'react'
import LessonCard from '@/components/LessonCard'
import { authClient } from '@/lib/auth-client'

export default function PublicLessonsPage() {
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const userData = authClient.useSession()
  const user = userData.data?.user

  // Challenge 1 States: Search + Filter + Sort Controls
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [tone, setTone] = useState('')
  const [sort, setSort] = useState('newest')

  // Hardcoded premium flag placeholder since it's referenced in the card props
  const isCurrentUserPremium = user?.isPremium

  // Fetch data from localhost backend
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/lessons`)

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`)
        }

        const data = await response.json()
        setLessons(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchLessons()
  }, [])

  // Optional: Client-side filtering logic based on your states
  const filteredLessons = lessons
    .filter((lesson) => {
      const matchesSearch = lesson.title.toLowerCase().includes(search.toLowerCase()) ||
        lesson.description.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category ? lesson.category === category : true
      const matchesTone = tone ? lesson.emotionalTone === tone : true
      return matchesSearch && matchesCategory && matchesTone
    })
    .sort((a, b) => {
      if (sort === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt)
      }
      if (sort === 'most-saved') {
        return (b.likesCount || 0) - (a.likesCount || 0)
      }
      return 0
    })

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

        {/* Dynamic Content Rendering States */}
        {loading && (
          <div className="text-center py-20 text-slate-500 font-medium">
            Loading wisdom items...
          </div>
        )}

        {error && (
          <div className="text-center py-20 text-red-500 font-medium">
            Error loading lessons: {error}. Make sure your local server is running on port 8000!
          </div>
        )}

        {!loading && !error && filteredLessons.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            No lessons match your active search filters.
          </div>
        )}

        {/* Responsive Grid Layout */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {filteredLessons.map((lesson, idx) => (
              <LessonCard
                key={lesson.title || idx} // Uses title/index since _id was removed
                lesson={lesson}
                isPremiumUser={isCurrentUserPremium}
              />
            ))}
          </div>
        )}

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