'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { FaRegUserCircle } from 'react-icons/fa';

export default function CommentSection({ comments, lessonId }) {
    const userData = authClient.useSession();
    const currentUser = userData.data?.user;
    const [commentText, setCommentText] = useState('')
    const [isMounted, setIsMounted] = useState(false)

    // Wait until the component is mounted in the browser
    useEffect(() => {
        setIsMounted(true)
    }, [])

    const handlePostComment = async () => {
        if (commentText.length == 0) {
            return toast.error("Enter a comment!")

        }
        const commentPostData = {
            lessonId: lessonId,
            userId: currentUser?.id,
            text: commentText,
            createdAt: new Date().toISOString()
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(commentPostData),
            });

            toast.success("comment posted successfully")
        } catch (error) {
            toast.error("Submission Error:", error);
            console.error("Submission Error:", error);
        }
    }

    return (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-[#1E293B] mb-6">Discussion ({comments.length})</h3>

            {/* 
              Only evaluate currentUser once mounted. 
              Before mounting (on server/initial paint), it defaults to the fallback box.
            */}
            {isMounted && currentUser ? (
                <div className="flex gap-4 mb-8">
                    <div className="w-10 h-10 bg-[#0F766E] rounded-full flex items-center justify-center text-white font-bold shrink-0">
                        {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="grow">
                        <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Share your thoughts on this situation..."
                            className="w-full border border-slate-200 rounded-xl p-3 resize-none h-24 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                        />
                        <div className="flex justify-end mt-2">
                            <button onClick={handlePostComment} className="bg-[#1E293B] text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors">
                                Post Comment
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-8 text-center text-sm text-slate-600">
                    Please <Link href="/login" className="text-[#0F766E] font-bold hover:underline">log in</Link> to join the discussion.
                </div>
            )}

            {/* Comments list rendering */}
            <div className="space-y-6">
                {comments.map((item, index) => (
                    <div key={item._id || index} className="flex gap-4">
                        <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold shrink-0">
                            <FaRegUserCircle />
                        </div>
                        <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl grow rounded-tl-none">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-[#1E293B] text-sm">{item.userId || 'User'}</span>
                                <span className="text-xs text-slate-400">{item.createdAt}</span>
                            </div>
                            <p className="text-slate-700 text-sm">{item.text}</p>
                        </div>
                    </div>
                ))}
                {comments.length === 0 && (
                    <p className="text-sm text-slate-400 text-center py-4">No responses yet. Start the conversation!</p>
                )}
            </div>
        </div>
    )
}
