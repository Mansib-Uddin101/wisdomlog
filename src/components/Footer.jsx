'use client'
import React from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'
import Logo from './Logo'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-[#FCF9F4] text-slate-700 border-t border-slate-200/60">
      <div className="container mx-auto px-6 py-12 md:py-16">
        
        {/* Main Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-200">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <Link href="/" className="text-2xl font-bold text-slate-800 tracking-tight">
              <Logo/>
            </Link>
            <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
              Your ultimate companion for all things pet care. Providing expert guides, curated resources, and premium literature for every pet owner.
            </p>
            
            {/* Native SVG Social Icons (Safe from Build Errors) */}
            <div className="flex space-x-4 pt-2">
              {/* Facebook */}
              <a href="#" className="p-2 bg-white rounded-full text-slate-500 hover:text-[#A76E43] hover:shadow-sm transition-all border border-slate-100" aria-label="Facebook">
                <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="p-2 bg-white rounded-full text-slate-500 hover:text-[#A76E43] hover:shadow-sm transition-all border border-slate-100" aria-label="Instagram">
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              {/* X / Twitter */}
              <a href="#" className="p-2 bg-white rounded-full text-slate-500 hover:text-[#A76E43] hover:shadow-sm transition-all border border-slate-100" aria-label="Twitter">
                <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 flex flex-col space-y-3">
            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">Explore</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="hover:text-[#A76E43] transition-colors">Home</Link></li>
              <li><Link href="/books" className="hover:text-[#A76E43] transition-colors">All Books</Link></li>
              <li><Link href="/about" className="hover:text-[#A76E43] transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-[#A76E43] transition-colors">Pet Blog</Link></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="lg:col-span-2 flex flex-col space-y-3">
            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">Support</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/faq" className="hover:text-[#A76E43] transition-colors">FAQs</Link></li>
              <li><Link href="/contact" className="hover:text-[#A76E43] transition-colors">Contact Support</Link></li>
              <li><Link href="/privacy" className="hover:text-[#A76E43] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#A76E43] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

    

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-slate-500">
          <div>
            &copy; {currentYear} PetBuddy. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <span className="flex items-center gap-1.5"><Phone size={14} /> +1 (555) 123-4567</span>
            <span className="flex items-center gap-1.5"><Mail size={14} /> hello@petbuddy.com</span>
            <span className="flex items-center gap-1.5"><MapPin size={14} /> San Francisco, CA</span>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer