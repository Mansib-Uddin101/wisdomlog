import PetCard from '@/components/PetCard'
import React from 'react'

const page = async () => {
  const res = await fetch("http://localhost:8000/pets")
  const petsData = await res.json()
  console.log(petsData);
  
  
  return (
    <div className='min-h-screen mt-6 w-5/6 mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        {petsData.map((pet)=> <PetCard key={pet._id} petInfo={pet} />)}
      </div>
    </div>
  )
}
export default page
