import Image from 'next/image'
import React from 'react'

const PetCard = () => {
    const petData = {
        "_id": { "$oid": "664bdf1a2f3b4c1a8c8b4567" },
        "name": "Buddy",
        "species": "Dog",
        "breed": "Golden Retriever",
        "age": "2 years",
        "gender": "Male",
        "imageUrl": "https://i.ibb.co/G3dLJW2c/da89d930fc320dd912a2a25487b9ca86b37fcdd6-800x600.webp",
        "healthStatus": "Excellent",
        "vaccinationStatus": "Fully Vaccinated",
        "location": "Dhaka, Bangladesh",
        "adoptionFee": 0,
        "description": "A very friendly and energetic golden retriever who loves playing fetch and is great with kids.",
        "ownerEmail": "owner1@example.com",
        "status": "available",
        "createdAt": { "$date": "2026-05-20T10:00:00.000Z" }
    }

    return (
        // Added 'relative' so the species badge anchors correctly inside the card
        <div className='group relative max-w-sm rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-white transition-all duration-300 hover:shadow-lg'>
            
            {/* Image Wrapper */}
            <div className='relative h-64 w-full overflow-hidden'>
                <Image
                    src={petData.imageUrl}
                    fill
                    className='object-cover transition-transform duration-500 ease-in-out group-hover:scale-105'
                    alt={petData.name}
                    sizes='(max-w-768px) 100vw, 384px'
                />
            </div>

            {/* Species Badge - Now correctly positioned relative to the card wrapper */}
            <span className='absolute top-3 left-3 bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm backdrop-blur-sm bg-opacity-90'>
                {petData.species}
            </span>

            {/* Content Container */}
            <div className='p-4'>
                <h2 className='text-2xl font-bold text-gray-800 mb-1'>{petData.name}</h2>
                
                {/* Info Pills/Text */}
                <div className='flex gap-3 text-sm text-gray-500 mb-4 font-medium'>
                    <span className='text-gray-300'>•</span>
                    <span>{petData.breed}</span>
                    <span className='text-gray-300'>•</span>
                    <span>{petData.age}</span>
                    <span className='text-gray-300'>•</span>
                    <span>{petData.vaccinationStatus}</span>
                </div>

                {/* Refactored Button Actions */}
                <div className='grid grid-cols-2 gap-3 pt-1'>
                    {/* Secondary Button: Outlined style to de-emphasize */}
                    <button className='w-full py-2.5 px-4 rounded-xl border border-gray-300 text-[#315579] font-bold text-sm transition-all duration-300 hover:scale-105 active:bg-gray-100'>
                        View Details
                    </button>
                    
                    {/* Primary Button: Solid branding color matches your landing page */}
                    <button className='w-full py-2.5 px-4 rounded-xl bg-[#D66237] text-white font-semibold text-sm transition-all hover:scale-105 duration-300 active:bg-[#ae4725] shadow-sm'>
                        Adopt Now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PetCard