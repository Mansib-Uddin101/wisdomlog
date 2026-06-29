import React from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-[#FCF9F4] text-slate-700 border-t border-slate-200/60 mt-20">
      <div className="w-5/6 mx-auto py-12 md:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-200">
          
          {/* Brand & Platform Description */}
          <div className="lg:col-span-6 flex flex-col space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-extrabold tracking-tight text-[#1E293B]">
                Wisdom<span className="text-[#0F766E]">Log</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              A community-driven platform built to store, preserve, and share meaningful life lessons, personal growth snapshots, and collective wisdom gathered over time.
            </p>
            
            {/* Social Links (Maintaining modern branding) */}
            <div className="flex space-x-3 pt-2">
              <a href="#" className="p-2 bg-white rounded-full text-slate-400 hover:text-[#0F766E] hover:border-emerald-200 hover:shadow-sm transition-all border border-slate-100" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="p-2 bg-white rounded-full text-slate-400 hover:text-[#0F766E] hover:border-emerald-200 hover:shadow-sm transition-all border border-slate-100" aria-label="Instagram">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              {/* Modernized X Logo explicitly required by design rules */}
              <a href="#" className="p-2 bg-white rounded-full text-slate-400 hover:text-[#0F766E] hover:border-emerald-200 hover:shadow-sm transition-all border border-slate-100" aria-label="X">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Explicit Project Routes */}
          <div className="lg:col-span-3 flex flex-col space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Explore</h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link href="/" className="hover:text-[#0F766E] transition-colors">Home</Link></li>
              <li><Link href="/public-lessons" className="hover:text-[#0F766E] transition-colors">Public Lessons</Link></li>
              <li><Link href="/pricing" className="hover:text-[#0F766E] transition-colors">Pricing & Upgrades</Link></li>
            </ul>
          </div>

          {/* Column 3: Platform Legal Agreements */}
          <div className="lg:col-span-3 flex flex-col space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Support & Legal</h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link href="/privacy" className="hover:text-[#0F766E] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#0F766E] transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Metadata & Contacts */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-slate-400 font-medium">
          <div>
            &copy; {currentYear} WisdomLog. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-slate-500">
            <span className="flex items-center gap-1.5"><Phone size={14} className="text-slate-400" /> +1 (555) 766-0123</span>
            <span className="flex items-center gap-1.5"><Mail size={14} className="text-slate-400" /> support@wisdomlog.com</span>
            <span className="flex items-center gap-1.5"><MapPin size={14} className="text-slate-400" /> Chattogram, Bangladesh</span>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer