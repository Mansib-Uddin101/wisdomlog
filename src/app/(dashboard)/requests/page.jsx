"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { FiCheck, FiX, FiCalendar, FiClock } from 'react-icons/fi'
import { authClient } from '@/lib/auth-client'

const MyRequestsPage = () => {
  const session = authClient.useSession()
  const userId = session?.data?.user?.id

  const [requestsData, setRequestsData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      if (session?.status === 'unauthenticated') {
        setIsLoading(false)
      }
      return
    }

    const fetchRequests = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(`http://localhost:8000/requests?ownerId=${userId}`)
        if (res.ok) {
          const data = await res.json()
          setRequestsData(data)
        }
      } catch (error) {
        console.error("Failed to fetch adoption requests:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRequests()
  }, [userId, session?.status])

  // Function to handle Accept or Reject actions
  const handleUpdateStatus = async (requestId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:8000/requests/${requestId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (res.ok) {
        // Optimistically update local UI state immediately
        setRequestsData((prevData) =>
          prevData.map((req) =>
            req._id === requestId ? { ...req, status: newStatus } : req
          )
        )
      } else {
        console.error("Failed to update status on server")
      }
    } catch (error) {
      console.error("Error updating application status:", error)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Not Scheduled'
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
      case 'accepted':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200'
      case 'rejected':
        return 'bg-red-50 text-red-700 border-red-200'
      case 'pending':
      default:
        return 'bg-amber-50 text-amber-700 border-amber-200'
    }
  }

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-slate-50/50'>
        <p className="text-slate-500 font-medium animate-pulse">Loading your requests...</p>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-slate-50/50 pb-16'>

      {/* Page Header */}
      <div className='bg-white pt-12 pb-8 border-b border-slate-200 shadow-sm'>
        <div className='w-5/6 mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-4'>
          <div>
            <h1 className='text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight'>
              Adoption Requests Dashboard
            </h1>
            <p className='text-slate-500 mt-2 text-sm md:text-base'>
              Review Incoming incoming pet applications. Accept or reject incoming placement requests.
            </p>
          </div>
          <div className='text-sm text-slate-500 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 self-start md:self-auto font-medium'>
            Total Incoming: <span className='font-bold text-slate-800'>{requestsData.length}</span>
          </div>
        </div>
      </div>

      {/* Main Table Content */}
      <main className='w-5/6 mx-auto mt-10'>
        {requestsData.length === 0 ? (
          <div className='text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300'>
            <p className='text-slate-400 font-medium'>No incoming adoption requests found.</p>
          </div>
        ) : (
          <div className='bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='w-full text-left border-collapse'>

                <thead>
                  <tr className='bg-slate-50 border-b border-slate-200 text-slate-600 text-sm font-semibold uppercase tracking-wider'>
                    <th className='py-4 px-6'>Pet Name</th>
                    <th className='py-4 px-6'>Request Date</th>
                    <th className='py-4 px-6'>Pickup Date</th>
                    <th className='py-4 px-6'>Status</th>
                    <th className='py-4 px-6 text-right'>Actions / Decision</th>
                  </tr>
                </thead>

                <tbody className='divide-y divide-slate-100 text-slate-700 text-sm md:text-base font-medium'>
                  {requestsData.map((request) => {
                    const currentStatus = request.status?.toLowerCase();
                    const isPending = currentStatus === 'pending' || !currentStatus;

                    return (
                      <tr key={request._id} className='hover:bg-slate-50/50 transition-colors'>

                        {/* Pet Name */}
                        <td className='py-5 px-6 font-bold text-slate-800'>
                          {request.petName || 'Unknown Buddy'}
                        </td>

                        {/* Request Date */}
                        <td className='py-5 px-6 text-slate-500'>
                          <span className='flex items-center gap-1.5 text-xs md:text-sm'>
                            <FiClock className='text-slate-400' />
                            {formatDate(request.requestDate || request.createdAt)}
                          </span>
                        </td>

                        {/* Pickup Date */}
                        <td className='py-5 px-6 text-slate-500'>
                          <span className='flex items-center gap-1.5 text-xs md:text-sm'>
                            <FiCalendar className='text-slate-400' />
                            {request.pickupDate ? formatDate(request.pickupDate) : <span className='text-slate-400 italic'>Not Finalized</span>}
                          </span>
                        </td>

                        {/* Status Badge */}
                        <td className='py-5 px-6'>
                          <span className={`inline-flex border text-xs font-bold px-3 py-1 rounded-full capitalize shadow-2xs ${getStatusStyle(request.status)}`}>
                            {request.status || 'Pending'}
                          </span>
                        </td>

                        {/* Actions Cell */}
                        <td className='py-5 px-6 text-right'>
                          <div className='flex items-center justify-end gap-3'>
                            {isPending ? (
                              <>
                                {/* Accept Button */}
                                <button
                                  onClick={() => handleUpdateStatus(request._id, 'Approved')}
                                  className='flex items-center gap-1 px-3 py-1.5 border border-emerald-600 bg-emerald-600 text-white rounded-lg text-xs font-bold transition-all hover:bg-emerald-700 active:scale-95 shadow-sm'
                                  title="Accept Request"
                                >
                                  <FiCheck size={14} /> Accept
                                </button>

                                {/* Reject Button */}
                                <button
                                  onClick={() => handleUpdateStatus(request._id, 'Rejected')}
                                  className='flex items-center gap-1 px-3 py-1.5 border border-red-200 bg-red-50 text-red-600 rounded-lg text-xs font-bold transition-all hover:bg-red-100 active:scale-95'
                                  title="Reject Request"
                                >
                                  <FiX size={14} /> Reject
                                </button>
                              </>
                            ) : (
                              /* Static Text Label showing decision summary instead of buttons */
                              <span className={`text-xs font-extrabold tracking-wider uppercase px-2 py-1 ${
                                currentStatus === 'approved' || currentStatus === 'accepted' 
                                  ? 'text-emerald-600' 
                                  : 'text-red-500'
                              }`}>
                                {currentStatus === 'approved' || currentStatus === 'accepted' ? 'Accepted ✓' : 'Rejected ✕'}
                              </span>
                            )}
                          </div>
                        </td>

                      </tr>
                    )
                  })}
                </tbody>

              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default MyRequestsPage