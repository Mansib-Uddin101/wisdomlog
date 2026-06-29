"use client"
import Image from 'next/image'
import React, { useState, useEffect } from 'react' // Added useState and useEffect
import { FaBangladeshiTakaSign } from 'react-icons/fa6'
import { AdoptModal } from './AdoptModal'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'
import toast from 'react-hot-toast'

const PetCard = ({ petInfo, petOwner}) => {
    const session = authClient.useSession()
    const userId = session?.data?.user?.id
    
    // 1. Add a mounting state to delay client-only checks
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    // 2. Only compute isOwner after mounting to match the server's initial render
    const isOwner = isMounted && userId === petInfo.ownerId

    const handleAdoptClickIntercept = (e) => {
        
        if (isOwner) {
            e.preventDefault()
            e.stopPropagation()
            toast.error("You cannot adopt your own listed pet!")
        }
    }

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

            <span className='absolute top-3 left-3 bg-amber-50 text-[#D66237] border border-amber-200/50 text-xs font-bold px-3 py-1 rounded-full shadow-sm backdrop-blur-sm bg-opacity-90'>
                {petInfo.species}
            </span>

            <div className='p-4'>
                <h2 className='text-2xl font-bold text-gray-800 mb-1'>{petInfo.name}</h2>

                <div className='flex flex-col md:items-left gap-1.5 text-sm text-gray-500 mb-4 font-medium'>
                    <div className='flex gap-4'>
                        <div className='flex items-center gap-1.5'>
                            <span className='text-gray-300'>•</span>
                            <span>{petInfo.breed}</span>
                        </div>
                        <div className='flex items-center gap-1.5'>
                            <span className='text-gray-300'>•</span>
                            <span>{petInfo.age} old</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-1.5'>
                        <span className='text-gray-300'>•</span>
                        <span className='flex items-center gap-1'>Adoption Fee: <span className='text-[#315579] font-semibold flex items-center'><FaBangladeshiTakaSign />{petInfo.adoptionFee}</span></span>
                    </div>
                </div>
                
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 justify-around'>
                    <div>
                        <Link href={`/details/${petInfo._id}`}>
                            <button className='w-full py-1.5 px-2 rounded-xl border border-[#315579] text-[#315579] font-bold transition-all duration-300 hover:scale-105 active:bg-gray-100'>
                                View Details
                            </button>
                        </Link>
                    </div>
                    {/* 3. The class conditionally renders safe attributes now */}
                    <div onClick={handleAdoptClickIntercept} className={isOwner ? "cursor-not-allowed" : ""}>
                        {/* 4. Pass the calculated state down if the modal button needs to be disabled */}
                        <AdoptModal petInfo={petInfo} petOwner={petOwner} isDisabled={isOwner} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PetCard
