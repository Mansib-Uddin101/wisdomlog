'use client';
import React from 'react';
import { Trash2, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

export default function MyFavorites() {

  const handleRemove = () => {
    toast.success('Removed from favorites.');
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-[#1E293B]">My Favorites</h1>
        
        {/* Filters */}
        <div className="flex gap-3 w-full sm:w-auto">
          <select className="px-3 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:border-[#0F766E]">
            <option value="">All Categories</option>
            <option value="Mindset">Mindset</option>
          </select>
          <select className="px-3 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:border-[#0F766E]">
            <option value="">All Tones</option>
            <option value="Motivational">Motivational</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-100 text-sm text-slate-500 uppercase tracking-wider">
              <th className="pb-4 font-medium">Lesson</th>
              <th className="pb-4 font-medium">Category / Tone</th>
              <th className="pb-4 font-medium">Author</th>
              <th className="pb-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-slate-600">
            <tr className="border-b border-slate-50 hover:bg-slate-50/50">
              <td className="py-4 font-medium text-[#1E293B]">Overcoming Burnout</td>
              <td className="py-4">Career • <span className="text-amber-600">Realization</span></td>
              <td className="py-4">Jane Doe</td>
              <td className="py-4 flex justify-end gap-2">
                <button className="p-2 text-slate-400 hover:text-[#0F766E] border border-slate-200 rounded-lg"><ExternalLink size={16}/></button>
                <button onClick={handleRemove} className="p-2 text-slate-400 hover:text-red-600 border border-slate-200 rounded-lg"><Trash2 size={16}/></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}