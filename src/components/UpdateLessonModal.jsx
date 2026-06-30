'use client';
import React, { useState } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function UpdateLessonModal({ lesson, isOpen, onClose, onUpdateSuccess, user }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If modal is closed or no lesson is provided, render nothing
  if (!isOpen || !lesson) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formElements = e.target.elements;
    const updatedData = {
      title: formElements.title.value,
      description: formElements.story.value,
      category: formElements.category.value,
      emotionalTone: formElements.tone.value, // Make sure this matches your DB schema
      visibility: formElements.visibility.value,
      accessLevel: formElements.accessLevel.value,
    };

    try {
      const { data: tokenData } = await authClient.token()
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/lessons/${lesson._id}`, {
        method: 'PATCH', // Using PATCH for partial updates
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${tokenData?.token}`
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error('Failed to update the lesson.');

      toast.success('Life lesson updated successfully!');
      onUpdateSuccess(); // Trigger parent component to re-fetch/update the list
      onClose(); // Close the modal
    } catch (error) {
      toast.error(error.message || "Failed to update lesson.");
      console.error("Update Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-xl relative border border-slate-100">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-bold text-[#1E293B] mb-6">Update Life Lesson</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Lesson Title</label>
              <input 
                name="title" 
                required 
                type="text" 
                defaultValue={lesson.title}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] transition-all" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Full Insight / Story</label>
              <textarea 
                name="story" 
                required 
                rows="6" 
                defaultValue={lesson.description}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] transition-all"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Category</label>
                <select 
                  name="category" 
                  required 
                  defaultValue={lesson.category}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E]"
                >
                  <option value="Personal Growth">Personal Growth</option>
                  <option value="Career">Career</option>
                  <option value="Relationships">Relationships</option>
                  <option value="Mindset">Mindset</option>
                  <option value="Mistakes Learned">Mistakes Learned</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Emotional Tone</label>
                <select 
                  name="tone" 
                  required 
                  defaultValue={lesson.emotionalTone}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E]"
                >
                  <option value="Motivational">Motivational</option>
                  <option value="Sad">Sad</option>
                  <option value="Realization">Realization</option>
                  <option value="Gratitude">Gratitude</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Visibility</label>
                <select 
                  name="visibility" 
                  defaultValue={lesson.visibility}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>
              </div>

              <div className="relative group">
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Access Level</label>
                <select
                  name="accessLevel"
                  defaultValue={lesson.accessLevel}
                  disabled={!user?.isPremium}
                  className={`w-full px-4 py-3 rounded-xl border border-slate-200 bg-white ${!user?.isPremium ? 'opacity-60 cursor-not-allowed bg-slate-50' : ''}`}
                >
                  <option value="Free">Free</option>
                  {user?.isPremium && <option value="Premium">Premium</option>}
                </select>
                {!user?.isPremium && (
                  <div className="absolute top-0 right-0 hidden group-hover:block bg-[#1E293B] text-white text-xs px-2 py-1 rounded shadow-lg -translate-y-8 pointer-events-none">
                    Upgrade to Premium to create paid lessons.
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-slate-100">
              <button 
                type="button" 
                onClick={onClose}
                className="w-full sm:w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-3 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button 
                disabled={isSubmitting} 
                type="submit" 
                className="w-full sm:w-2/3 bg-[#0F766E] hover:bg-[#14B8A6] disabled:bg-slate-300 text-white font-medium py-3 rounded-xl transition-all shadow-sm"
              >
                {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}