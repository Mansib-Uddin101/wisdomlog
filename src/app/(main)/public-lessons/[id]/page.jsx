import React from 'react'
import Link from 'next/link'
import { Calendar, Eye, Lock } from 'lucide-react'
import InteractionButtons from '@/components/InteractionButtons'
import CommentSection from '@/components/CommentSection'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export default async function LessonDetailsPage({ params }) {
  const { id } = await params
  const session = await auth.api.getSession({
    headers: await headers()
  })
  const user = session.data?.user

  // 1. Fetch lesson and comments simultaneously from your local API routes
  const [lessonRes, commentsRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/lessons/${id}`, { cache: 'no-store' }),
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments?lessonId=${id}`, { cache: 'no-store', }) // Adjust route if your API matches another pattern
  ])

  if (!lessonRes.ok) {
    return <div className="p-10 text-center text-red-500">Lesson not found.</div>
  }

  const lesson = await lessonRes.json()
  // Fallback to empty array if comments route fails or returns empty
  const comments = commentsRes.ok ? await commentsRes.json() : []
  const isLocked = user?.isPremium
  console.log(lesson.creatorId);
  const date = new Date(lesson.createdAt)
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  const published = new Intl.DateTimeFormat('en-US', options).format(date);
  console.log(published);
  

  // Simulated Current Session Auth


  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Lesson Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
          {lesson.featuredImage && (
            <img
              src={lesson.featuredImage}
              alt={lesson.title}
              className="w-full h-64 md:h-80 object-cover"
            />
          )}

          <div className="p-6 md:p-10 relative">
            {/* Badges mapped to your new database fields */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold uppercase rounded-md tracking-wider">
                {lesson.category}
              </span>
              <span className="px-3 py-1 bg-rose-50 text-rose-700 border border-rose-100 text-xs font-bold uppercase rounded-md tracking-wider">
                {lesson.emotionalTone}
              </span>
              <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold uppercase rounded-md tracking-wider">
                {lesson.accessLevel}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-[#1E293B] mb-6 leading-tight">
              {lesson.title}
            </h1>

            <div className={`relative ${isLocked ? 'blur-sm select-none pointer-events-none' : ''}`}>
              <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-wrap">
                {lesson.description}
              </p>
            </div>

            {isLocked && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/40 backdrop-blur-sm p-6">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 text-center max-w-md">
                  <Lock className="w-6 h-6 mx-auto mb-4 text-amber-600" />
                  <h3 className="text-xl font-bold text-[#1E293B] mb-2">Premium Lesson</h3>
                  <Link href="/dashboard/pricing" className="block w-full bg-[#0F766E] text-white py-3 rounded-xl">
                    Upgrade to View
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {!isLocked && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Creator Profile Card */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center text-center">
                <img
                  src={lesson.creator?.photoURL || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'}
                  alt="Creator"
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-slate-50 mb-3"
                />
                <h3 className="font-bold text-lg text-[#1E293B]">{lesson.creator?.name || 'Anonymous Creator'}</h3>
                <Link href={`/author/${lesson.creatorId}`} className="text-[#0F766E] bg-emerald-50 px-4 py-2 rounded-xl text-sm font-semibold w-full mt-2 block">
                  View Author Profile
                </Link>
              </div>

              {/* Meta Data */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-800 border-b border-slate-100 pb-2 mb-3">Info</h4>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Published: {published}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Eye className="w-4 h-4 text-slate-400" />
                  <span>Visibility: {lesson.visibility}</span>
                </div>
              </div>

              {/* Counter Metrics */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex justify-around">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#1E293B]">{lesson.likesCount || 0}</p>
                  <p className="text-xs font-semibold text-slate-500 uppercase">Likes</p>
                </div>
                <div className="text-center border-l border-slate-100 pl-6">
                  <p className="text-2xl font-bold text-[#1E293B]">{comments.length}</p>
                  <p className="text-xs font-semibold text-slate-500 uppercase">Comments</p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2 space-y-6">
              <InteractionButtons
                initialLikes={lesson.likes || []}
                lessonId={id}

                lesson={lesson}
              />

              {/* Pass the dynamic comments fetched straight from your collection endpoint */}
              <CommentSection
                comments={comments}
                lessonId={id}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}