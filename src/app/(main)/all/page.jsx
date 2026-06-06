import PetCard from '@/components/PetCard'
import React from 'react'

const Page = async () => {
  const res = await fetch("http://localhost:8000/pets")
  const petsData = await res.json()
  
  return (
    <div className='min-h-screen bg-slate-50/50 pb-16'>
      <div className='bg-linear-to-b from-orange-50/50 to-transparent pt-12 pb-8 border-b border-slate-100'>
        <div className='w-5/6 mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6'>
          <div>
            <span className='text-xs font-semibold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full'>
              Adoption Gallery
            </span>
            <h1 className='text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight mt-3'>
              Meet Our Lovable Buddies
            </h1>
            <p className='text-slate-500 mt-2 text-sm md:text-base max-w-xl'>
              Browse through our lovely pets waiting for a forever home. Find your perfect companion today.
            </p>
          </div>
          <div className='text-sm text-slate-500 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 self-start md:self-auto'>
            Showing <span className='font-semibold text-slate-800'>{petsData.length}</span> adorable pets
          </div>
        </div>
      </div>

      <main className='w-5/6 mx-auto mt-10'>
        {petsData.length === 0 ? (
          <div className='text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200'>
            <p className='text-slate-400'>No buddies found at the moment. Check back later!</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 mx-auto md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8'>
            {petsData.map((pet) => (
              <PetCard key={pet._id} petInfo={pet} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default Page