"use client"
import React, { useEffect, useState } from 'react'
import { FiCalendar, FiClock, FiX, FiLoader, FiAlertCircle } from 'react-icons/fi'
import { authClient } from '@/lib/auth-client'

const MyRequestsPage =  () => {
  const session = authClient.useSession()
  const userId = session?.data?.user?.id

  const [requestsData, setRequestsData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Local state to keep track of which requests are actively deleting or had errors
  const [deletingId, setDeletingId] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")

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
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/requests?requesterId=${userId}`, {
          headers: {
            'Content-Type': 'application/json',
          }
        })
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

  const handleCancelRequest = async (requestId) => {
    setDeletingId(requestId)
    setErrorMessage("")

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/requests/${requestId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (res.ok) {
        setRequestsData((prevData) => prevData.filter((req) => req._id !== requestId));
      } else {
        const errorData = await res.json().catch(() => ({}));
        setErrorMessage(errorData.message || "Failed to cancel your request. Please try again.");
      }
    } catch (error) {
      console.error("Error cancelling request:", error);
      setErrorMessage("Network error: Could not reach the server to cancel the request.");
    } finally {
      setDeletingId(null)
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
              My Adoption Requests
            </h1>
            <p className='text-slate-500 mt-2 text-sm md:text-base'>
              Track the status of adoption applications you have submitted.
            </p>
          </div>
          <div className='text-sm text-slate-500 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 self-start md:self-auto font-medium'>
            Total Submitted: <span className='font-bold text-slate-800'>{requestsData.length}</span>
          </div>
        </div>
      </div>

      {/* Main Table Content */}
      <main className='w-5/6 mx-auto mt-10'>

        {/* Inline Custom Error Message Block */}
        {errorMessage && (
          <div className="mb-6 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium shadow-2xs">
            <FiAlertCircle className="shrink-0 text-base" />
            <span className="flex-1">{errorMessage}</span>
            <button onClick={() => setErrorMessage("")} className="text-red-400 hover:text-red-600 font-bold px-1">✕</button>
          </div>
        )}

        {requestsData.length === 0 ? (
          <div className='text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300'>
            <p className='text-slate-400 font-medium'>You haven't made any adoption requests yet.</p>
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
                    <th className='py-4 px-6 text-right'>Actions</th>
                  </tr>
                </thead>

                <tbody className='divide-y divide-slate-100 text-slate-700 text-sm md:text-base font-medium'>
                  {requestsData.map((request) => {
                    const isPending = !request.status || request.status.toLowerCase() === 'pending';
                    const isDeletingThis = deletingId === request._id;

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

                        {/* Actions Column */}
                        <td className='py-5 px-6 text-right'>
                          {isPending ? (
                            <button
                              onClick={() => handleCancelRequest(request._id)}
                              disabled={deletingId !== null}
                              className='inline-flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-700 hover:bg-red-50 disabled:opacity-50 disabled:hover:bg-transparent px-3 py-1.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-200'
                              title="Cancel Request"
                            >
                              {isDeletingThis ? (
                                <>
                                  <FiLoader className="animate-spin" /> Cancelling...
                                </>
                              ) : (
                                <>
                                  <FiX /> Cancel
                                </>
                              )}
                            </button>
                          ) : (
                            <span className="text-slate-400 text-sm italic">N/A</span>
                          )}
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

export default MyRequestsPage;