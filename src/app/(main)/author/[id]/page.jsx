'use client';
import React, { useState, useEffect } from 'react';
import { Loader2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function AuthorPage() {
  const params = useParams();
  const authorId = params.id;

  // Data States
  const [author, setAuthor] = useState(null);
  const [publicLessons, setPublicLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Author's Info and Public Lessons
  useEffect(() => {
    const fetchAuthorData = async () => {
      if (!authorId) return;

      try {

        const { data: tokenData } = await authClient.token()

        const userRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${authorId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${tokenData?.token}`
            },
          }
        );
        if (userRes.ok) {
          const userData = await userRes.json();
          setAuthor(userData);
        }

        // 2. Fetch All Lessons and Filter by Author
        const lessonsRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/lessons`);
        if (lessonsRes.ok) {
          const allLessons = await lessonsRes.json();

          // Get only PUBLIC lessons created by this author, sorted by newest first
          const authorPublicLessons = allLessons
            .filter(l => l.creatorId === authorId && l.visibility === 'Public')
            .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

          setPublicLessons(authorPublicLessons);

          // Fallback: If the backend user endpoint failed but we found lessons, 
          // extract the author's basic info from their lesson object
          if (!userRes.ok && authorPublicLessons.length > 0) {
            setAuthor({
              name: authorPublicLessons[0].creator?.name || 'Anonymous',
              image: authorPublicLessons[0].creator?.photoURL || '',
            });
          }
        }
      } catch (error) {
        console.error('Failed to load author data.', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthorData();
  }, [authorId]);

  // Loading State
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-[#0F766E]" />
      </div>
    );
  }

  // Not Found State
  if (!author && publicLessons.length === 0) {
    return (
      <div className="max-w-4xl mx-auto mt-12 bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-sm">
        <p className="text-slate-500 mb-4 text-lg">We couldn't find this author, or they haven't published any lessons.</p>
        <Link href="/public-lessons" className="text-[#0F766E] font-medium hover:underline">
          Browse all public lessons →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Author Header Profile */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-8 items-center md:items-start relative overflow-hidden">

        {/* Profile Image */}
        <img
          src={author?.image || author?.photoURL || `https://ui-avatars.com/api/?name=${author?.name || 'Author'}&background=0F766E&color=fff`}
          alt={author?.name || 'Author'}
          className="w-32 h-32 rounded-2xl object-cover border-4 border-slate-50 shadow-sm z-10"
        />

        <div className="flex-1 w-full z-10 text-center md:text-left">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-[#1E293B] flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3">
              {author?.name || 'Anonymous Author'}
              {/* Premium Badge */}
              {author?.isPremium && (
                <span className="bg-amber-100 text-amber-700 text-xs px-2.5 py-1 rounded-md font-bold shadow-sm w-max">
                  Premium ⭐
                </span>
              )}
            </h1>
          </div>

          {/* Stats Bar */}
          <div className="flex gap-8 text-sm text-slate-600 bg-slate-50 p-4 rounded-xl inline-flex w-full sm:w-auto justify-center md:justify-start">
            <p className="flex flex-col items-center md:items-start">
              <strong className="text-[#1E293B] text-xl">{publicLessons.length}</strong>
              Published Lessons
            </p>
          </div>
        </div>

        {/* Background Decorative Graphic */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
      </div>

      {/* Public Lessons Grid */}
      <div>
        <h2 className="text-2xl font-bold text-[#1E293B] mb-6">Lessons by {author?.name?.split(' ')[0] || 'Author'}</h2>

        {publicLessons.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-sm">
            <p className="text-slate-500">This author hasn't published any public lessons yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicLessons.map((lesson) => (
              <div key={lesson._id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full relative overflow-hidden group">

                {/* Access Level Badge */}
                {lesson.accessLevel === 'Premium' && (
                  <div className="absolute top-4 right-4 bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded shadow-sm z-10">
                    Premium ⭐
                  </div>
                )}

                <span className="text-xs font-semibold text-[#0F766E] bg-[#0F766E]/10 px-2 py-1 rounded-md w-max">
                  {lesson.category || 'Uncategorized'}
                </span>

                <h3 className="font-bold text-[#1E293B] mt-3 text-lg">{lesson.title}</h3>

                <p className="text-slate-500 text-sm mt-2 line-clamp-3 flex-grow">
                  {lesson.description}
                </p>

                <div className="mt-5 pt-4 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    {lesson.createdAt ? new Date(lesson.createdAt).toLocaleDateString() : 'Recently'}
                  </span>

                  <Link
                    href={`/public-lessons/${lesson._id}`}
                    className="flex items-center gap-1 text-sm font-medium text-[#0F766E] group-hover:text-[#14B8A6] transition-colors"
                  >
                    Details <ExternalLink size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}