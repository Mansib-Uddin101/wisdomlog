import PetCard from '@/components/PetCard'
import React from 'react'

const AllPage = async ({ searchParams }) => {
  // Await searchParams in Next.js 15+ 
  const resolvedParams = await searchParams;
  const searchQuery = resolvedParams?.search || '';
  const speciesFilter = resolvedParams?.species || '';
  const sortOrder = resolvedParams?.sort || '';

  // Fetch all pets data from your backend
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pets`, {
    cache: 'no-store'
  })
  const petsData = await res.json()
  
  // 1. Extract unique species dynamically from your dataset for the filter dropdown
  const uniqueSpecies = Array.from(
    new Set(petsData.map((pet) => pet.species).filter(Boolean))
  );

  // 2. Filter data server-side based on search query and species selection
  let filteredPets = petsData.filter((pet) => {
    const matchesSearch = pet.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecies = speciesFilter ? pet.species === speciesFilter : true;
    return matchesSearch && matchesSpecies;
  });

  // 3. Sort data server-side alphabetically by name
  if (sortOrder === 'name-asc') {
    filteredPets.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOrder === 'name-desc') {
    filteredPets.sort((a, b) => b.name.localeCompare(a.name));
  }

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
            Showing <span className='font-semibold text-slate-800'>{filteredPets.length}</span> adorable pets
          </div>
        </div>
      </div>

      {/* SEARCH, FILTER & SORTING BAR */}
      <div className='w-5/6 mx-auto mt-8'>
        <form method="GET" className='grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-4 rounded-xl shadow-xs border border-slate-100'>
          {/* Search Input */}
          <div>
            <label className='block text-xs font-medium text-slate-500 mb-1'>Search by Name</label>
            <input 
              type="text" 
              name="search"
              defaultValue={searchQuery}
              placeholder="Type a buddy's name..."
              className='w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500'
            />
          </div>

          {/* Species Filter */}
          <div>
            <label className='block text-xs font-medium text-slate-500 mb-1'>Filter by Species</label>
            <select 
              name="species"
              defaultValue={speciesFilter}
              className='w-full text-sm px-3 py-2 border border-slate-200 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500'
            >
              <option value="">All Species</option>
              {uniqueSpecies.map((species) => (
                <option key={species} value={species}>{species}</option>
              ))}
            </select>
          </div>

          {/* Sorting Box & Submit Button */}
          <div className='flex gap-2 items-end'>
            <div className='flex-1'>
              <label className='block text-xs font-medium text-slate-500 mb-1'>Sort By</label>
              <select 
                name="sort"
                defaultValue={sortOrder}
                className='w-full text-sm px-3 py-2 border border-slate-200 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500'
              >
                <option value="">Default</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
            
            <button 
              type="submit" 
              className='px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium text-sm rounded-lg transition-colors duration-150 h-[38px]'
            >
              Apply
            </button>
          </div>
        </form>
      </div>

      <main className='w-5/6 mx-auto mt-10'>
        {filteredPets.length === 0 ? (
          <div className='text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200'>
            <p className='text-slate-400'>No buddies found matching your criteria. Try adjusting your filters!</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 mx-auto md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8'>
            {filteredPets.map((pet) => (
              <PetCard key={pet._id} petInfo={pet} petId={pet._id} ownerId={pet.ownerId} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default AllPage
export const dynamic = 'force-dynamic';