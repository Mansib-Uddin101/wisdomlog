import Image from 'next/image'
import React from 'react'
import { FaBangladeshiTakaSign } from 'react-icons/fa6'
import { WithForm } from './AdoptModal'
import Link from 'next/link'

const PetCard = ({ petInfo }) => {
    return (
        <div className='group relative max-w-sm rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-white transition-all duration-300 hover:shadow-lg flex flex-col justify-between'>

            <div className='relative h-64 w-full overflow-hidden'>
                <Image
                    src={petInfo.imageUrl}
                    fill
                    className='object-cover transition-transform duration-500 ease-in-out group-hover:scale-105'
                    alt={petInfo.name}
                    sizes='(max-w-768px) 100vw, 384px'
                />
            </div>

            <span className='absolute top-3 left-3 bg-amber-50 text-amber-800 border border-amber-200/50 text-xs font-bold px-3 py-1 rounded-full shadow-sm backdrop-blur-sm bg-opacity-90'>
                {petInfo.species}
            </span>

            <div className='p-4'>
                <h2 className='text-2xl font-bold text-gray-800 mb-1'>{petInfo.name}</h2>

                <div className='flex flex-wrap justify-arond items-center gap-1.5 text-sm text-gray-500 mb-4 font-medium'>
                    <div className='flex items-center gap-1.5'>
                        <span className='text-gray-300'>•</span>
                        <span>{petInfo.breed}</span>
                    </div>
                    <div className='flex items-center gap-1.5'>
                        <span className='text-gray-300'>•</span>
                        <span>{petInfo.age}</span>
                    </div>

                    <div className='flex items-center gap-1.5'>
                        <span className='text-gray-300'>•</span>
                        <span className='flex items-center gap-1'>Adoption Fee: <span className='text-[#315579] font-semibold flex items-center'><FaBangladeshiTakaSign />{petInfo.adoptionFee}</span></span>
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-3 pt-1'>
                    <Link href={`/details/${petInfo._id}`}>
                        <button className='w-full py-1.5 px-2 rounded-xl border border-[#315579] text-[#315579] font-bold transition-all duration-300 hover:scale-105 active:bg-gray-100'>
                            View Details
                        </button>
                    </Link>

                    <button className='w-full py-2.5 px-4 rounded-xl bg-[#D66237] text-white font-semibold text-sm transition-all hover:scale-105 duration-300 active:bg-[#ae4725] shadow-sm'>
                        Adopt Now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PetCard