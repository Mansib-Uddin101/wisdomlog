'use client'
import { useRouter } from 'next/navigation'
import { ShieldCheck } from 'lucide-react'

export default function PaymentSuccess() {
  const router = useRouter()
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 max-w-md w-full text-center space-y-5">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-[#0F766E]">
          <ShieldCheck className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold text-[#1E293B]">Payment Successful!</h1>
        <p className="text-sm text-slate-500">
          Thank you for upgrading. Your account has been permanently transitioned to the Premium Tier. Enjoy lifetime access!
        </p>
        <button
          onClick={() => router.push('/dashboard/profile')}
          className="w-full bg-[#0F766E] hover:bg-[#14B8A6] text-white text-sm font-medium py-2.5 rounded-xl transition-all"
        >
          Go to Profile
        </button>
      </div>
    </div>
  )
}