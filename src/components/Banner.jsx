'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { BookOpen, Lightbulb, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im'

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Slide data configured explicitly for WisdomLog
  const slides = [
    {
      id: 1,
      tag: "Preserve Your Journey",
      title: "Every experience holds a",
      highlight: "valuable lesson",
      description: "Document your personal growth, setbacks, and triumphs. Store your life's most meaningful realizations safely in WisdomLog's secure, community-driven vault.",
      cta: "Browse Lessons",
      link: "/public-lessons",
      icon: <BookOpen className="ml-2 w-5 h-5" />,
      bg: "bg-emerald-50/50"
    },
    {
      id: 2,
      tag: "Share The Wisdom",
      title: "Help others navigate their",
      highlight: "own paths",
      description: "Your past mistakes and victories can be the exact advice someone else needs today. Contribute to a growing community-sourced library of human experience.",
      cta: "Share a Lesson",
      link: "/dashboard/add-lesson",
      icon: <Lightbulb className="ml-2 w-5 h-5" />,
      bg: "bg-slate-50"
    },
    {
      id: 3,
      tag: "Premium Insights",
      title: "Unlock exclusive and profound",
      highlight: "life strategies",
      description: "Upgrade to Premium for lifetime access to deeply personal, high-value reflections shared by our top contributors and verified mentors.",
      cta: "Upgrade Now",
      link: "/pricing",
      icon: <Star className="ml-2 w-5 h-5" />,
      bg: "bg-[#F0FDF4]"
    }
  ]

  // Auto-play slider logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))

  return (
    <section className="max-w-7xl mx-auto rounded-2xl mt-6 sm:mt-8 relative overflow-hidden shadow-sm border border-slate-100">
      
      {/* Slider Container */}
      <div 
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className={`w-full flex-shrink-0 ${slide.bg} py-16 lg:py-28 px-6 sm:px-12`}>
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-6">
              
              <span className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wider text-[#0F766E] uppercase bg-white px-4 py-1.5 rounded-full shadow-sm">
                <ImQuotesLeft className='text-[10px]' />
                {slide.tag}
                <ImQuotesRight className='text-[10px]'/>
              </span>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1E293B] tracking-tight leading-tight">
                {slide.title} <br className="hidden md:block"/>
                <span className="text-[#0F766E] italic font-serif relative inline-block mt-2">
                  {slide.highlight}
                  {/* Decorative accent underline */}
                  <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-[#14B8A6]/30 rounded-full"></span>
                </span>
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                {slide.description}
              </p>

              <div className="pt-4">
                <Link href={slide.link}>
                  <button className="flex items-center justify-center bg-[#0F766E] hover:bg-[#0d665f] active:bg-[#0a4f4a] hover:scale-105 text-white font-semibold px-8 py-3.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
                    {slide.cta} {slide.icon}
                  </button>
                </Link>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Manual Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 text-slate-800 hover:bg-white hover:text-[#0F766E] shadow-sm backdrop-blur-sm transition-all hidden sm:block"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 text-slate-800 hover:bg-white hover:text-[#0F766E] shadow-sm backdrop-blur-sm transition-all hidden sm:block"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slider Indicators (Dots) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === index 
                ? "w-8 h-2.5 bg-[#0F766E]" 
                : "w-2.5 h-2.5 bg-slate-300 hover:bg-[#14B8A6]"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </section>
  )
}

export default Banner