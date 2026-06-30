'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { 
  LayoutDashboard, PlusCircle, BookOpen, Heart, 
  User, ShieldAlert, Users, Star, Menu, X 
} from 'lucide-react';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // 1. Fetch Session Context via Better Auth
  const sessionData = authClient.useSession();
  const user = sessionData.data?.user;
  const isLoading = sessionData.isPending;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#0F766E]"></div>
      </div>
    );
  }
  
  // 2. Navigation Link Configurations
  const userLinks = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Add Lesson', href: '/dashboard/add-lesson', icon: PlusCircle },
    { name: 'My Lessons', href: '/dashboard/my-lessons', icon: BookOpen },
    { name: 'My Favorites', href: '/dashboard/my-favorites', icon: Heart },
    { name: 'Profile', href: '/dashboard/profile', icon: User },
  ];

  const adminLinks = [
    { name: 'Admin Overview', href: '/dashboard/admin', icon: ShieldAlert },
    { name: 'Manage Users', href: '/dashboard/admin/manage-users', icon: Users },
    { name: 'Manage Lessons', href: '/dashboard/admin/manage-lessons', icon: BookOpen },
    { name: 'Reported Queue', href: '/dashboard/admin/reported-lessons', icon: Star },
    { name: 'Profile', href: '/dashboard/admin/profile', icon: User },
  ];

  const linksToRender = user?.role === 'admin' ? [...userLinks, ...adminLinks] : userLinks;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-[#1E293B]">
      {/* Mobile Top Navigation Banner */}
      <div className="md:hidden flex items-center justify-between bg-white px-4 py-3 border-b border-slate-100">
        <Link href={"/"} className="font-bold text-lg text-[#0F766E]">WisdomLog</Link>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Core Shell Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-100 p-5 flex flex-col justify-between
        transform transition-transform duration-300 ease-in-out md:relative md:transform-none
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div>
          <div className="hidden md:block mb-8">
            <Link href={"/"} className="font-bold text-lg text-[#0F766E]">WisdomLog</Link>
            <p className="text-xs text-slate-400 mt-1">Dashboard Management Panel</p>
          </div>

          <nav className="space-y-1">
            {linksToRender.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                    active 
                      ? 'bg-[#0F766E]/10 text-[#0F766E]' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-[#0F766E]'
                  }`}
                >
                  <Icon size={18} className={active ? 'text-[#0F766E]' : 'text-slate-400'} />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Footer Profile Badge */}
        {user && (
          <div className="border-t border-slate-100 pt-4 mt-4 flex items-center gap-3">
            <img src={user.image || '/avatar-placeholder.png'} alt="Profile" className="w-10 h-10 rounded-full object-cover bg-slate-100" />
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <span className={`inline-block text-[10px] px-2 py-0.5 font-bold rounded-md mt-0.5 ${
                user.isPremium ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
              }`}>
                {user.isPremium ? 'Premium ⭐' : 'Free Tier'}
              </span>
            </div>
          </div>
        )}
      </aside>

      {/* Main Panel Content Body */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}