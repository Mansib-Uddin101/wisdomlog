"use client"
import DashboardPetCard from '@/components/DashboardPetCard'
import { authClient } from '@/lib/auth-client'; 
import React, { useEffect, useState } from 'react'

const MyListingsPage = () => {
  const session = authClient.useSession()
  const userId = session?.data?.user?.id; // Grab the exact ownerId string from your session

  const [petsData, setPetsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchMyPets = async () => {
      try {
        // Pass the ownerId safely via URL query string parameters
        const res = await fetch(`http://localhost:8000/my-listings?ownerId=${userId}`);
        const data = await res.json();
        setPetsData(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyPets();
  }, [userId]);

  if (session.isPending || (userId && loading)) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-slate-50'>
        <p className='text-slate-500 font-medium animate-pulse'>Loading your listings...</p>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-slate-50'>
        <p className='text-slate-500 font-medium'>Please log in to view your listings.</p>
      </div>
    );
  }

  const totalListings = petsData.length;
  const adoptedCount = petsData.filter(pet => pet.status !== 'available').length; 
  const availableCount = totalListings - adoptedCount;

  return (
    <div className='min-h-screen bg-slate-50/50 pb-16'>
      <div className='bg-white pt-12 pb-8 border-b border-slate-200 shadow-sm'>
        <div className='w-5/6 mx-auto'>
          <h1 className='text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight'>
            My Listings
          </h1>
          <p className='text-slate-500 mt-2 text-sm md:text-base'>
            Manage your pet adoption listings, view requests, and update statuses.
          </p>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-8'>
            <div className='bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col'>
              <span className='text-slate-500 text-sm font-medium'>Total Listings</span>
              <span className='text-3xl font-bold text-slate-800 mt-1'>{totalListings}</span>
            </div>
            <div className='bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex flex-col'>
              <span className='text-emerald-600 text-sm font-medium'>Available</span>
              <span className='text-3xl font-bold text-emerald-700 mt-1'>{availableCount}</span>
            </div>
            <div className='bg-blue-50 border border-blue-100 p-4 rounded-xl flex flex-col'>
              <span className='text-blue-600 text-sm font-medium'>Adopted</span>
              <span className='text-3xl font-bold text-blue-700 mt-1'>{adoptedCount}</span>
            </div>
          </div>
        </div>
      </div>

      <main className='w-5/6 mx-auto mt-10'>
        {petsData.length === 0 ? (
          <div className='text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300'>
            <h3 className='text-lg font-semibold text-slate-700 mb-2'>No listings found</h3>
            <p className='text-slate-400'>You haven't posted any pets for adoption yet.</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 mx-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {petsData.map((pet) => (
              <DashboardPetCard key={pet._id} petInfo={pet} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default MyListingsPage;