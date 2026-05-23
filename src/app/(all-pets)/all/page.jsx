import PetCard from '@/components/PetCard'
import React from 'react'

const page = () => {
  
  return (
    <div className='min-h-screen mt-6 w-5/6 mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <PetCard/>
        <PetCard/>
        <PetCard/>
        <PetCard/>
        <PetCard/>
        <PetCard/>
      </div>
    </div>
  )
}
export default page
