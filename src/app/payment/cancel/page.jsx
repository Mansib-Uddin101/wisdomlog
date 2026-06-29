'use client'
import { useRouter } from 'next/navigation'
import { AlertCircle } from 'lucide-react'

export default function PaymentCancel() {
  const router = useRouter()
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 max-w-md w-full text-center space-y-5">
        <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-500">
          <AlertCircle className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold text-[#1E293B]">Payment Cancelled</h1>
        <p className="text-sm text-slate-500">
          The transaction was not completed. If this was a mistake, you can re-attempt the upgrade anytime from the pricing dashboard[cite: 146].
        </p>
        <button
          onClick={() => router.push('/pricing')}
          className="w-full bg-[#1E293B] hover:bg-slate-800 text-white text-sm font-medium py-2.5 rounded-xl transition-all"
        >
          Return to Pricing Table
        </button>
      </div>
    </div>
  )
}