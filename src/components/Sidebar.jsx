"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Settings, HelpCircle, Menu, ChevronLeft } from "lucide-react";

const menuItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help", href: "/help", icon: HelpCircle },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div 
      className={`fixed top-0 left-0 h-screen bg-slate-900 text-white flex flex-col border-r border-slate-800 transition-all duration-300 z-50 ${
        isExpanded ? "w-64" : "w-16"
      }`}
    >
      {/* Sidebar Header & Toggle Button */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
        {isExpanded && <span className="font-bold text-xl tracking-wider pl-2">MY APP</span>}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors mx-auto"
          aria-label="Toggle Sidebar"
        >
          {isExpanded ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-6 px-2 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center rounded-lg text-sm font-medium transition-all duration-200 group ${
                isExpanded ? "px-4 py-3 space-x-3" : "p-3 justify-center"
              } ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              
              {/* Hide text dynamically, maintain a tooltip fallback when collapsed if desired */}
              {isExpanded ? (
                <span className="transition-opacity duration-200 opacity-100 whitespace-nowrap">
                  {item.name}
                </span>
              ) : (
                <span className="absolute left-20 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center truncate">
        {isExpanded ? "© 2026 Company" : "©"}
      </div>
    </div>
  );
}