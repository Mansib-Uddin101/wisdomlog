import Link from 'next/link'
import { Lock, Calendar } from 'lucide-react'

export default function LessonCard({ lesson, isPremiumUser }) {
  // Check if premium locked content needs blurring out for a free-tier user
  const isLocked = lesson.accessLevel === 'Premium' && !isPremiumUser

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md flex flex-col overflow-hidden h-full">
      
      {/* Upper Content Frame */}
      <div className="p-6 flex flex-col flex-grow relative">
        
        {/* Badges and Access Tier Indicators */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 uppercase tracking-wider">
            {lesson.category}
          </span>
          
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider ${
            lesson.accessLevel === 'Premium' 
              ? 'bg-amber-100 text-amber-800 border border-amber-200' 
              : 'bg-emerald-100 text-emerald-800'
          }`}>
            {lesson.accessLevel === 'Premium' && <span className="text-xs">⭐</span>}
            {lesson.accessLevel}
          </span>
        </div>

        {/* Lesson Metadata & Content Block */}
        <div className={`flex-grow flex flex-col transition-all duration-300 ${isLocked ? 'blur-[5px] select-none pointer-events-none' : ''}`}>
          <h3 className="text-xl font-bold text-[#1E293B] group-hover:text-[#0F766E] transition-colors line-clamp-2 mb-2">
            {lesson.title}
          </h3>
          
          <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-4 flex-grow">
            {lesson.description}
          </p>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-500">
             {lesson.emotionalTone}
            </span>
          </div>
        </div>

        {/* Absolute Overlay Container for Blurred Premium Paywall */}
        {isLocked && (
          <div className="absolute inset-0 bg-white/40 flex flex-col items-center justify-center p-6 text-center z-10">
            <div className="bg-amber-50 p-3 rounded-full border border-amber-200 mb-3 shadow-sm text-amber-600">
              <Lock className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-[#1E293B] mb-1">Premium Lesson</p>
            <p className="text-xs text-slate-600 mb-4 max-w-[180px]">Upgrade your layout to view this insight</p>
            <Link 
              href="/pricing"
              className="text-xs font-semibold bg-[#0F766E] text-white px-4 py-2 rounded-xl hover:bg-[#14B8A6] transition-colors shadow-sm"
            >
              Upgrade to Premium
            </Link>
          </div>
        )}

        {/* Footer Info Area - Aligned neatly across grid rows */}
        <div className="border-t border-slate-100 pt-4 mt-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* User Avatar */}
            <img 
              src={lesson.creator.photo} 
              alt={lesson.creator.name} 
              className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100"
            />
            <div className="text-left">
              <p className="text-xs font-semibold text-slate-800 line-clamp-1">{lesson.creator.name}</p>
              <div className="flex items-center text-[10px] text-slate-400 gap-1 mt-0.5">
                <Calendar className="w-3 h-3" />
                <span>{lesson.createdAt}</span>
              </div>
            </div>
          </div>

          {/* Action Trigger Button */}
          {!isLocked && (
            <Link 
              href={`/public-lessons/${lesson._id}`}
              className="text-xs font-bold text-[#0F766E] hover:text-[#14B8A6] inline-flex items-center gap-1 transition-colors group/btn py-1.5"
            >
              See Details
              <span className="transform translate-x-0 group-hover/btn:translate-x-0.5 transition-transform">→</span>
            </Link>
          )}
        </div>

      </div>
    </div>
  )
}