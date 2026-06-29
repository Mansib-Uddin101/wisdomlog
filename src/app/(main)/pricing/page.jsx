'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from "@/lib/auth-client"
import { toast } from 'react-hot-toast'
import { Check, X, ShieldCheck, Zap, Lock } from 'lucide-react'

export default function PricingPage() {
  const router = useRouter()
  const sessionData = authClient.useSession()
  const user = sessionData.data?.user
  const isLoading = sessionData.isPending

  const [isProcessing, setIsProcessing] = useState(false)

  // 1. Protection Guard: Redirect if not logged in (after loading completes)
  useEffect(() => {
    if (!isLoading && !user) {
      toast.error("Please login to access the pricing page.")
      router.push('/login')
    }
  }, [user, isLoading, router])

  // 2. Premium Badge View: If the user is already Premium, show the Premium state badge layout
  if (user?.isPremium) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-slate-50">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-[#0F766E]">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-[#1E293B]">Lifetime Premium Active</h1>
            <p className="text-sm text-slate-500">
              Welcome back, {user.name}! You have unlocked complete lifetime access to all public and hidden premium wisdom.
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0F766E] text-white font-semibold text-sm shadow-sm animate-pulse">
            Premium ⭐
          </div>
          <div className="pt-2">
            <button
              onClick={() => router.push('/public-lessons')}
              className="w-full bg-[#1E293B] hover:bg-slate-800 text-white text-sm font-medium py-2.5 rounded-xl transition-all"
            >
              Browse Premium Lessons
            </button>
          </div>
        </div>
      </div>
    )
  }

  // 3. Handle Checkout Session Initiations
  const handleUpgrade = async () => {
    setIsProcessing(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.id })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to initiate checkout connection.')
      }

      // Redirect user to Stripe Checkout window
      if (data.url) {
        router.push(data.url)
      } else {
        throw new Error('Invalid server payment session response link.')
      }
    } catch (err) {
      toast.error(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#0F766E] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Header Header Text */}
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1E293B]">
            Upgrade Your Wisdom Journey
          </h1>
          <p className="text-slate-500 text-sm sm:text-base">
            Preserve your personal breakthroughs and safely unlock deep premium insights shared by global creators.
          </p>
        </div>

        {/* Plan Pricing Callout Block */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 text-[#0F766E] font-medium text-xs">
              <Zap className="w-3.5 h-3.5" /> Lifetime Access Plan
            </div>
            <h2 className="text-2xl font-bold text-[#1E293B]">WisdomLog Premium Tier</h2>
            <p className="text-slate-500 text-sm max-w-md">
              Pay once, enjoy forever. No ongoing monthly descriptions, tracking setups, or hidden upcharges.
            </p>
          </div>
          <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end justify-between md:justify-center gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
            <div>
              <span className="text-4xl font-black text-[#1E293B]">৳1500</span>
              <span className="text-slate-400 text-sm font-medium"> / one-time</span>
            </div>
            <button
              onClick={handleUpgrade}
              disabled={isProcessing}
              className="w-full sm:w-auto text-center bg-[#0F766E] hover:bg-[#14B8A6] disabled:bg-slate-300 text-white font-medium text-sm px-6 py-3 rounded-xl transition-all shadow-sm shadow-emerald-700/10 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Connecting...
                </>
              ) : (
                'Upgrade to Premium'
              )}
            </button>
          </div>
        </div>

        {/* Feature Comparison Table Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/70">
            <h3 className="font-bold text-[#1E293B] text-base">Plan Feature Comparison</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-semibold uppercase tracking-wider text-slate-400 bg-slate-50/30">
                  <th className="py-3 px-6 font-medium">Features & Capabilities</th>
                  <th className="py-3 px-6 text-center font-medium w-32 sm:w-40">Free Plan</th>
                  <th className="py-3 px-6 text-center font-medium w-32 sm:w-40 text-[#0F766E] bg-emerald-50/20">Premium Plan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                {/* Row 1 */}
                <tr>
                  <td className="py-4 px-6 font-medium text-[#1E293B]">Number of lessons that can be created</td>
                  <td className="py-4 px-6 text-center text-slate-400">Limited (Max 5)</td>
                  <td className="py-4 px-6 text-center font-semibold text-[#0F766E] bg-emerald-50/10">Unlimited</td>
                </tr>
                {/* Row 2 */}
                <tr>
                  <td className="py-4 px-6 font-medium text-[#1E293B]">Premium lesson creation access</td>
                  <td className="py-4 px-6 text-center flex justify-center"><X className="w-4 h-4 text-rose-400" /></td>
                  <td className="py-4 px-6 text-center bg-emerald-50/10 flex justify-center"><Check className="w-4 h-4 text-emerald-500" /></td>
                </tr>
                {/* Row 3 */}
                <tr>
                  <td className="py-4 px-6 font-medium text-[#1E293B]">Ad-free browsing engine experience</td>
                  <td className="py-4 px-6 text-center flex justify-center"><X className="w-4 h-4 text-rose-400" /></td>
                  <td className="py-4 px-6 text-center bg-emerald-50/10 flex justify-center"><Check className="w-4 h-4 text-emerald-500" /></td>
                </tr>
                {/* Row 4 */}
                <tr>
                  <td className="py-4 px-6 font-medium text-[#1E293B]">Priority listing in community public feeds</td>
                  <td className="py-4 px-6 text-center text-slate-400">Standard</td>
                  <td className="py-4 px-6 text-center font-semibold text-[#0F766E] bg-emerald-50/10">High Priority</td>
                </tr>
                {/* Row 5 */}
                <tr>
                  <td className="py-4 px-6 font-medium text-[#1E293B]">Access to premium content from other users</td>
                  <td className="py-4 px-6 text-center text-slate-400 flex items-center justify-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-slate-400" /> Locked
                  </td>
                  <td className="py-4 px-6 text-center bg-emerald-50/10 flex justify-center"><Check className="w-4 h-4 text-emerald-500" /></td>
                </tr>
                {/* Row 6 */}
                <tr>
                  <td className="py-4 px-6 font-medium text-[#1E293B]">Community verified badge / member status</td>
                  <td className="py-4 px-6 text-center flex justify-center"><X className="w-4 h-4 text-rose-400" /></td>
                  <td className="py-4 px-6 text-center bg-emerald-50/10 flex justify-center"><Check className="w-4 h-4 text-emerald-500" /></td>
                </tr>
                {/* Row 7 */}
                <tr>
                  <td className="py-4 px-6 font-medium text-[#1E293B]">Interactive insights & charts summary</td>
                  <td className="py-4 px-6 text-center text-slate-400">Basic Summary</td>
                  <td className="py-4 px-6 text-center font-semibold text-[#0F766E] bg-emerald-50/10">Advanced Analytics</td>
                </tr>
                {/* Row 8 */}
                <tr>
                  <td className="py-4 px-6 font-medium text-[#1E293B]">Customer operational assistance</td>
                  <td className="py-4 px-6 text-center text-slate-400">Standard Email</td>
                  <td className="py-4 px-6 text-center font-semibold text-[#0F766E] bg-emerald-50/10">24/7 Priority Support</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}