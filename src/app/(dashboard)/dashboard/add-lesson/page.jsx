'use client';
import React, { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

export default function AddLesson() {
  const sessionData = authClient.useSession();
  const user = sessionData.data?.user;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Manually construct the JavaScript object from form elements
    const formElements = e.target.elements;
    const dataObject = {
      title: formElements.title.value,
      description: formElements.story.value,
      category: formElements.category.value,
      tone: formElements.tone.value,
      visibility: formElements.visibility.value,
      accessLevel: formElements.accessLevel.value,
      likes: [],
      likesCount: 0,
      isFeatured: false,
      isReviewed: false,
      creatorId: user?.id,
      creator: {
        name: user?.name,
        photoURL: user?.image
      },
      featuredImage: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800",
      createdAt: new Date().toISOString()
    };

    // 3. Console log the variable
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/lessons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataObject),
      });

    } catch (error) {
      toast.error("Submission Error:", error);
      console.error("Submission Error:", error);
    }


    // Simulate API call
    setTimeout(() => {
      toast.success('Life lesson published successfully!');
      setIsSubmitting(false);
      e.target.reset();
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm">
      <h1 className="text-2xl font-bold text-[#1E293B] mb-6">Add New Life Lesson</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">Lesson Title</label>
          <input name="title" required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] transition-all" placeholder="E.g., The value of patience in career growth" />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">Full Insight / Story</label>
          <textarea name="story" required rows="6" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] transition-all" placeholder="Share your experience..."></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#1E293B] mb-2">Category</label>
            <select name="category" required className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E]">
              <option value="">Select Category</option>
              <option value="Personal Growth">Personal Growth</option>
              <option value="Career">Career</option>
              <option value="Relationships">Relationships</option>
              <option value="Mindset">Mindset</option>
              <option value="Mistakes Learned">Mistakes Learned</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1E293B] mb-2">Emotional Tone</label>
            <select name="tone" required className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E]">
              <option value="">Select Tone</option>
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
            <select name="visibility" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white">
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>

          <div className="relative group">
            <label className="block text-sm font-medium text-[#1E293B] mb-2">Access Level</label>
            <select
              name="accessLevel"
              disabled={!user?.isPremium}
              className={`w-full px-4 py-3 rounded-xl border border-slate-200 bg-white ${!user?.isPremium ? 'opacity-60 cursor-not-allowed bg-slate-50' : ''}`}
            >
              <option value="Free">Free</option>
              {user?.isPremium && <option value="Premium">Premium</option>}
            </select>
            {!user?.isPremium && (
              <div className="absolute top-0 right-0 hidden group-hover:block bg-[#1E293B] text-white text-xs px-2 py-1 rounded shadow-lg -translate-y-8">
                Upgrade to Premium to create paid lessons.
              </div>
            )}
          </div>
        </div>

        <button disabled={isSubmitting} type="submit" className="w-full bg-[#0F766E] hover:bg-[#14B8A6] disabled:bg-slate-300 text-white font-medium py-3 rounded-xl transition-all shadow-sm">
          {isSubmitting ? 'Publishing...' : 'Publish Lesson'}
        </button>
      </form>
    </div>
  );
}