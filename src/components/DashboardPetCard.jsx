import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaBangladeshiTakaSign } from 'react-icons/fa6'
import { FiEdit, FiTrash2, FiEye, FiInbox } from 'react-icons/fi' 

const DashboardPetCard = ({ petInfo, onViewRequests, onUpdate, onDelete }) => {
  return (
    <div className='group relative max-w-sm rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-white transition-all duration-300 hover:shadow-lg flex flex-col justify-between'>
      
      {/* Image Section */}
      <div className='relative h-56 w-full overflow-hidden'>
        <Image
          src={petInfo.imageUrl}
          fill
          className='object-cover transition-transform duration-500 ease-in-out group-hover:scale-105'
          alt={petInfo.name}
          sizes='(max-w-768px) 100vw, 384px'
        />
        {/* Status Badge */}
        <span className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full shadow-sm backdrop-blur-sm bg-opacity-90 ${petInfo.isAdopted ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-[#D66237] border-amber-200'}`}>
          {petInfo.isAdopted ? 'Adopted' : 'Available'}
        </span>
      </div>

      <div className='p-4 grow flex flex-col'>
        <h2 className='text-2xl font-bold text-gray-800 mb-2 truncate'>{petInfo.name}</h2>

        <div className='flex items-center gap-1.5 text-sm text-gray-500 mb-4 font-medium'>
          <span className='flex items-center gap-1'>
            Price: <span className='text-[#315579] font-semibold flex items-center'><FaBangladeshiTakaSign />{petInfo.adoptionFee}</span>
          </span>
        </div>

        {/* 2x2 Action Buttons Grid */}
        <div className='grid grid-cols-2 gap-2 mt-auto pt-4 border-t border-gray-100'>
          
          {/* View Button */}
          <Link href={`/details/${petInfo._id}`} className='w-full'>
            <button className='w-full flex items-center justify-center gap-2 py-2 px-2 rounded-lg bg-slate-50 text-slate-700 font-medium transition-all hover:bg-slate-100 hover:text-slate-900 text-sm'>
              <FiEye /> View
            </button>
          </Link>

          {/* Requests Button */}
          <button 
            onClick={onViewRequests}
            className='w-full flex items-center justify-center gap-2 py-2 px-2 rounded-lg bg-blue-50 text-blue-700 font-medium transition-all hover:bg-blue-100 text-sm'
          >
            <FiInbox /> Requests
          </button>

          {/* Edit Button (Triggers the update modal) */}
          <button 
            onClick={onUpdate}
            className='w-full flex items-center justify-center gap-2 py-2 px-2 rounded-lg bg-amber-50 text-amber-700 font-medium transition-all hover:bg-amber-100 text-sm'
          >
            <FiEdit /> Edit
          </button>

          {/* Delete Button */}
          <button 
            onClick={onDelete}
            className='w-full flex items-center justify-center gap-2 py-2 px-2 rounded-lg bg-red-50 text-red-600 font-medium transition-all hover:bg-red-100 text-sm'
          >
            <FiTrash2 /> Delete
          </button>

        </div>
      </div>
    </div>
  )
}

export default DashboardPetCard;