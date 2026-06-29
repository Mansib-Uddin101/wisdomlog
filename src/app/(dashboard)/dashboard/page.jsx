'use client';
import React, { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BookOpen, Heart, TrendingUp } from 'lucide-react';

const chartData = [
  { name: 'Week 1', lessons: 2 },
  { name: 'Week 2', lessons: 3 },
  { name: 'Week 3', lessons: 1 },
  { name: 'Week 4', lessons: 5 },
];

export default function DashboardOverview() {
  const sessionData = authClient.useSession();
  const user = sessionData.data?.user;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#1E293B]">Dashboard Overview</h1>
      
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="bg-[#0F766E]/10 p-4 rounded-xl text-[#0F766E]">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">Total Lessons</p>
            <p className="text-2xl font-bold text-[#1E293B]">12</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="bg-[#0F766E]/10 p-4 rounded-xl text-[#0F766E]">
            <Heart size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">Saved Favorites</p>
            <p className="text-2xl font-bold text-[#1E293B]">34</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="bg-[#0F766E]/10 p-4 rounded-xl text-[#0F766E]">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">Weekly Streak</p>
            <p className="text-2xl font-bold text-[#1E293B]">3 Days</p>
          </div>
        </div>
      </div>

      {/* Analytics Chart */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h2 className="text-lg font-semibold text-[#1E293B] mb-6">Reflection Activity (This Month)</h2>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} allowDecimals={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Line type="monotone" dataKey="lessons" stroke="#0F766E" strokeWidth={3} dot={{ fill: '#0F766E', strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}