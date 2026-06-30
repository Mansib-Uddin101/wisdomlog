'use client';
import React from 'react';
import { Users, BookOpen, Flag, Activity, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const mockChartData = [
  { name: 'Mon', users: 12, lessons: 5 },
  { name: 'Tue', users: 19, lessons: 8 },
  { name: 'Wed', users: 15, lessons: 12 },
  { name: 'Thu', users: 22, lessons: 15 },
];

export default function AdminDashboardHome() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-[#1E293B]">Platform Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#0F766E]/10 text-[#0F766E] rounded-lg"><Users /></div>
            <div>
              <p className="text-sm text-slate-500">Total Users</p>
              <h3 className="text-2xl font-bold text-[#1E293B]">1,245</h3>
            </div>
          </div>
        </div>
        <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#0F766E]/10 text-[#0F766E] rounded-lg"><BookOpen /></div>
            <div>
              <p className="text-sm text-slate-500">Public Lessons</p>
              <h3 className="text-2xl font-bold text-[#1E293B]">8,432</h3>
            </div>
          </div>
        </div>
        <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 text-red-600 rounded-lg"><Flag /></div>
            <div>
              <p className="text-sm text-slate-500">Flagged Lessons</p>
              <h3 className="text-2xl font-bold text-[#1E293B]">24</h3>
            </div>
          </div>
        </div>
        <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#14B8A6]/10 text-[#14B8A6] rounded-lg"><Activity /></div>
            <div>
              <p className="text-sm text-slate-500">Today's Lessons</p>
              <h3 className="text-2xl font-bold text-[#1E293B]">156</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 border border-slate-100 rounded-2xl shadow-sm h-96">
        <h2 className="text-xl font-bold text-[#1E293B] mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#0F766E]" /> Platform Growth
        </h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockChartData}>
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            <Line type="monotone" dataKey="users" stroke="#0F766E" strokeWidth={3} name="New Users" />
            <Line type="monotone" dataKey="lessons" stroke="#14B8A6" strokeWidth={3} name="New Lessons" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}