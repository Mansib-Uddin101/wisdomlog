'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { BookOpen, Award, Bookmark, ArrowRight, Heart, Calendar, User } from 'lucide-react'
import Banner from '@/components/Banner' // Adjust path based on your file tree

export default function HomePage() {
  // Mock data for the dynamic states (Replace with your server API fetch calls via useEffect)
  const [featuredLessons, setFeaturedLessons] = useState([])
  const [topContributors, setTopContributors] = useState([])
  const [mostSavedLessons, setMostSavedLessons] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching data from your backend endpoints
    const fetchHomeData = async () => {
      try {
        // Example mock array for Featured Lessons (Marked as isFeatured by admin)
        setFeaturedLessons([
          {
            _id: '1',
            title: 'Embracing Failure as a Redirect, Not a Dead End',
            description: 'How losing my first major client forced me to re-evaluate my business operations and ultimately scale bigger.',
            category: 'Career',
            emotionalTone: 'Motivational',
            creatorName: 'Afridi Rahman',
            creatorImage: '',
            createdAt: '2026-06-15',
            likesCount: 142,
            accessLevel: 'Free'
          },
          {
            _id: '2',
            title: 'The Art of Active Listening in Hard Conversations',
            description: 'A breakthrough realization about relationship building: waiting for your turn to speak is not listening.',
            category: 'Relationships',
            emotionalTone: 'Realization',
            creatorName: 'Tasnim Sultana',
            creatorImage: '',
            createdAt: '2026-06-20',
            likesCount: 98,
            accessLevel: 'Premium'
          },
          {
            _id: '3',
            title: 'Setting Invisible Boundaries for Mental Clarity',
            description: 'Protecting your personal energy field without being confrontational. Lessons from a year of deep mindfulness.',
            category: 'Mindset',
            emotionalTone: 'Gratitude',
            creatorName: 'Zayan Ahmed',
            creatorImage: '',
            createdAt: '2026-06-28',
            likesCount: 230,
            accessLevel: 'Free'
          }
        ])

        // Example mock array for Top Contributors (Most lessons created recently)
        setTopContributors([
          { id: 'u1', name: 'Zayan Ahmed', count: 14, image: '', roleBadge: 'Gold Contributor' },
          { id: 'u2', name: 'Afridi Rahman', count: 11, image: '', roleBadge: 'Silver Contributor' },
          { id: 'u3', name: 'Tasnim Sultana', count: 9, image: '', roleBadge: 'Mentor' },
          { id: 'u4', name: 'Nabila Islam', count: 7, image: '', roleBadge: 'Writer' }
        ])

        // Example mock array for Most Saved Lessons (Highest favorites count)
        setMostSavedLessons([
          { _id: 'm1', title: '10 Things I Wish I Knew Before Turning 25', savesCount: 1420, category: 'Personal Growth' },
          { _id: 'm2', title: 'Why Saying "No" Safely Doubled My Office Productivity', savesCount: 984, category: 'Career' },
          { _id: 'm3', title: 'Mistakes Learned: Investing in Trends vs Fundamentals', savesCount: 876, category: 'Mistakes Learned' }
        ])

        setLoading(false)
      } catch (error) {
        console.error("Error fetching homepage data", error)
        setLoading(false)
      }
    }

    fetchHomeData()
  }, [])

  // Framer-motion layout animation variants for Section Entrance
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  }

  const staggerContainer = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  }

  // Static Section Data: 4 Benefit Cards (Why Learning From Life Matters)
  const benefits = [
    {
      title: "Prevents Repeated Mistakes",
      desc: "Documenting errors turns passing regrets into structural mental maps, keeping you from repeating loop-traps."
    },
    {
      title: "Encourages Mindful Reflection",
      desc: "Slowing down to catalog insights acts as an emotional filter, converting raw experiences into grounded self-awareness."
    },
    {
      title: "Builds a Legacy of Growth",
      desc: "Your personal archive forms a digital history profile of how your core values, identity, and perspective changed."
    },
    {
      title: "Elevates Collective Wisdom",
      desc: "Sharing your breakthroughs can act as the precise blueprint or shortcut a peer needs to overcome their struggle."
    }
  ]

  return (
    <div className="space-y-24 pb-24 bg-white min-h-screen">
      {/* 1. Hero Banner Section */}
      <Banner />

      {/* 2. Dynamic Featured Life Lessons Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center md:text-left md:flex md:items-end md:justify-between mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-[#1E293B] tracking-tight">
              Featured <span className="text-[#0F766E]">Insights</span>
            </h2>
            <p className="text-slate-500 mt-2 text-sm sm:text-base"> Handpicked, high-value reflections selected by our editorial curators. </p>
          </div>
          <Link href="/public-lessons" className="hidden md:flex items-center text-sm font-bold text-[#0F766E] hover:text-[#14B8A6] transition-colors gap-1 mt-4 md:mt-0">
            Browse full library <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map((n) => <div key={n} className="h-64 bg-slate-100 rounded-xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredLessons.map((lesson) => (
              <div key={lesson._id} className="bg-white border border-slate-100 shadow-sm rounded-xl p-6 flex flex-col justify-between hover:shadow-md transition-all duration-300 group min-h-[280px]">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold px-3 py-1 bg-slate-100 rounded-full text-slate-600">
                      {lesson.category}
                    </span>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      lesson.accessLevel === 'Premium' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-50 text-[#0F766E]'
                    }`}>
                      {lesson.accessLevel === 'Premium' ? 'Premium ⭐' : 'Free'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#1E293B] group-hover:text-[#0F766E] transition-colors line-clamp-2">
                    {lesson.title}
                  </h3>
                  <p className="text-slate-500 text-sm mt-2 line-clamp-3 leading-relaxed">
                    {lesson.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1 font-medium text-slate-600">
                    <User className="w-3.5 h-3.5 text-[#0F766E]" /> {lesson.creatorName}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> {lesson.likesCount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 3. Static Section: Why Learning From Life Matters (Animated via framer-motion) */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="w-full bg-emerald-50/50 py-20 border-y border-slate-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-[#1E293B] tracking-tight">
              Why Learning From <span className="text-[#0F766E]">Life Matters</span>
            </h2>
            <p className="text-slate-500 mt-3 text-sm sm:text-base">
              Experience isn't just what happens to you—it's what you build out of what happens to you. Here is why logging milestones alters your future path.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="bg-white p-6 rounded-xl shadow-2xl shadow-slate-100/50 border border-slate-100 flex flex-col min-h-[220px]"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#0F766E] flex items-center justify-center font-bold text-lg mb-4">
                  0{index + 1}
                </div>
                <h3 className="text-base font-bold text-[#1E293B] mb-2">{benefit.title}</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mt-auto">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 4. Extra Dynamic Sections (Two-Column Layout Stack) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Dynamic Subsection A: Top Contributors */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <h2 className="text-2xl font-extrabold text-[#1E293B] tracking-tight flex items-center gap-2">
              <Award className="text-[#0F766E] w-6 h-6" /> Contributors of the Week
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1"> Authors sharing the highest volume of impactful logs recently. </p>
          </div>

          <div className="bg-white border border-slate-100 rounded-xl divide-y divide-slate-100 overflow-hidden shadow-sm">
            {loading ? (
              [1, 2, 3, 4].map((n) => <div key={n} className="h-16 bg-slate-50 animate-pulse" />)
            ) : (
              topContributors.map((author, index) => (
                <div key={author.id} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-sm text-slate-400 w-4">{index + 1}</span>
                    <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-[#0F766E]">
                      {author.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1E293B]">{author.name}</h4>
                      <p className="text-[11px] font-medium text-[#14B8A6]">{author.roleBadge}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2.5 py-1 rounded bg-emerald-50 text-[#0F766E] font-bold text-xs">
                      {author.count} Logs
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Dynamic Subsection B: Most Saved Lessons */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <h2 className="text-2xl font-extrabold text-[#1E293B] tracking-tight flex items-center gap-2">
              <Bookmark className="text-[#0F766E] w-6 h-6" /> Most Saved Wisdom
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1"> High-impact realizations pinned and bookmarked most by our community members. </p>
          </div>

          <div className="space-y-4">
            {loading ? (
              [1, 2, 3].map((n) => <div key={n} className="h-20 bg-slate-50 rounded-xl animate-pulse" />)
            ) : (
              mostSavedLessons.map((lesson) => (
                <div key={lesson._id} className="p-5 border border-slate-100 rounded-xl bg-white flex items-center justify-between hover:border-[#14B8A6]/40 transition-all group shadow-sm">
                  <div className="space-y-1 pr-4">
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-[#0F766E]">
                      {lesson.category}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-[#1E293B] group-hover:text-[#0F766E] transition-colors line-clamp-1">
                      {lesson.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400 text-xs font-bold shrink-0 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                    <Bookmark className="w-3.5 h-3.5 text-[#14B8A6] fill-[#14B8A6]" />
                    <span className="text-slate-600">{lesson.savesCount} saves</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </section>
    </div>
  )
}