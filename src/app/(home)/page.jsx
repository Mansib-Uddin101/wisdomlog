import Logo from '@/components/Logo'
import React from 'react'
import Link from 'next/link'
import PetCard from '@/components/PetCard'
import Banner from '@/components/Banner'
const getFeaturedPets = async () => {
  try {
    // Fetching the pets data from your local backend server
    const res = await fetch("http://localhost:8000/pets")
    const allPets = await res.json()
    return allPets.slice(0, 6)
  } catch (error) {
    console.error("Error fetching featured pets:", error)
    return []
  }
}
const HomePage = async () => {
  const featuredPets = await getFeaturedPets()
  return (
    <div className='bg-white min-h-screen space-y-24 pb-24'>
      <Banner/>
      <section className="w-5/6 mx-auto">
        {/* className='bg-linear-to-b from-orange-50/50 to-transparent pt-12 pb-8 border-b border-slate-100' */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 ">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
              Make a Difference
            </span>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-3">
              Featured Buddies Ready for Adoption
            </h2>
            <p className="text-slate-500 mt-2 text-sm max-w-xl">
              Meet some of our wonderful friends who are eagerly waiting to bring endless joy and companionship into your life.
            </p>
          </div>
          <Link
            href="/all"
            className="inline-flex items-center justify-center border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm self-start md:self-auto"
          >
            View All Pets
          </Link>
        </div>

        {featuredPets.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-slate-400">Unable to load featured pets right now. Please try reloading.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
            {featuredPets.map((pet) => (
              <PetCard key={pet._id} petInfo={pet} />
            ))}
          </div>
        )}
      </section>

      <section className="w-5/6 mx-auto bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Why Adopt Instead of Buy?</h2>
          <p className="text-slate-500 mt-2 text-sm">Choosing adoption changes more than just one life.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 text-xl font-bold mx-auto mb-4">❤️</div>
            <h3 className="font-bold text-slate-800 mb-2">Save a Precious Life</h3>
            <p className="text-slate-500 text-sm">Shelters are filled with wonderful animals awaiting a second chance at happiness.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 text-xl font-bold mx-auto mb-4">🛡️</div>
            <h3 className="font-bold text-slate-800 mb-2">Fight Unethical Breeders</h3>
            <p className="text-slate-500 text-sm">Adopting directly de-incentivizes mass puppy mills and commercial breeding operations.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 text-xl font-bold mx-auto mb-4">✨</div>
            <h3 className="font-bold text-slate-800 mb-2">Healthy & Pre-Loved</h3>
            <p className="text-slate-500 text-sm">Most shelter pets are already behavior-assessed, house-trained, and vaccinated!</p>
          </div>
        </div>
      </section>

      <section className="w-5/6 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Happily Ever Afters</h2>
          <p className="text-slate-500 mt-2 text-sm">Real stories from our sweet community of pet parents.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <blockquote className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50 flex flex-col justify-between">
            <p className="text-slate-600 italic text-sm leading-relaxed">
              "Adopting Max was the absolute best decision our family made this year. The PetBuddy application platform made the transition incredibly safe and organized. He fills our home with pure chaos and absolute joy every single afternoon!"
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 font-bold flex items-center justify-center text-xs text-slate-600">S</div>
              <div>
                <cite className="not-italic font-bold text-slate-800 text-sm block">Sajib & Family</cite>
                <span className="text-slate-400 text-xs">Adopted Max (Golden Retriever)</span>
              </div>
            </div>
          </blockquote>

          <blockquote className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50 flex flex-col justify-between">
            <p className="text-slate-600 italic text-sm leading-relaxed">
              "Bella had been in the shelter system for nearly 8 months before we spotted her picture here. Now, she spends her days sunbathing on our balcony. Adoption saved her, but honestly, she rescued us too."
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 font-bold flex items-center justify-center text-xs text-slate-600">T</div>
              <div>
                <cite className="not-italic font-bold text-slate-800 text-sm block">Tahsan & Nabila</cite>
                <span className="text-slate-400 text-xs">Adopted Bella (Persian Cat)</span>
              </div>
            </div>
          </blockquote>
        </div>
      </section>

      <section className="w-5/6 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Pet Care Essentials</h2>
            <p className="text-slate-500 mt-2 text-sm">Expert advice to help your new companion settle into their forever environment safely.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group cursor-pointer">
            <div className="aspect-video bg-slate-100 rounded-2xl mb-4 overflow-hidden border border-slate-100 flex items-center justify-center text-7xl">🥦</div>
            <h3 className="font-bold text-slate-800 text-base group-hover:text-orange-600 transition-colors">Balanced Nutrition Guide</h3>
            <p className="text-slate-500 text-xs mt-1 leading-relaxed">Understanding exact portion parameters and dangerous household ingredients to keep away from pets.</p>
          </div>
          <div className="group cursor-pointer">
            <div className="aspect-video bg-slate-100 rounded-2xl mb-4 overflow-hidden border border-slate-100 flex items-center justify-center text-7xl">🩺</div>
            <h3 className="font-bold text-slate-800 text-base group-hover:text-orange-600 transition-colors">Routine Vet Check-Ups</h3>
            <p className="text-slate-500 text-xs mt-1 leading-relaxed">A complete timeline tracking necessary immunization boosters, anti-parasite tables, and dental health routines.</p>
          </div>
          <div className="group cursor-pointer">
            <div className="aspect-video bg-slate-100 rounded-2xl mb-4 overflow-hidden border border-slate-100 flex items-center justify-center text-7xl">🏡</div>
            <h3 className="font-bold text-slate-800 text-base group-hover:text-orange-600 transition-colors">The First 72 Hours</h3>
            <p className="text-slate-500 text-xs mt-1 leading-relaxed">How to handle sensory overload and setup decompression zones for a shelter animal entering a fresh home.</p>
          </div>
        </div>
      </section>

      <section className="w-5/6 mx-auto border-t border-slate-100 pt-20">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full">Easy 4-Step Journey</span>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-3">How Adoption Works</h2>
          <p className="text-slate-500 mt-2 text-sm">Getting your application processed and verified is straightforward and transparent.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="space-y-2">
            <div className="text-3xl font-black text-orange-200 max-sm:text-center">01</div>
            <h3 className="font-bold text-slate-800 text-sm max-sm:text-center">Select Your Pet</h3>
            <p className="text-slate-500 text-xs leading-relaxed">Browse through profiles, checking health records and dynamic adoption fees directly.</p>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-black text-orange-200 max-sm:text-center">02</div>
            <h3 className="font-bold text-slate-800 text-sm max-sm:text-center">Submit Application</h3>
            <p className="text-slate-500 text-xs leading-relaxed">Fill out ownership details securely so our shelter operators can review environmental matching metrics.</p>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-black text-orange-200 max-sm:text-center">03</div>
            <h3 className="font-bold text-slate-800 text-sm max-sm:text-center">Meet & Greet</h3>
            <p className="text-slate-500 text-xs leading-relaxed">Schedule a verification visit to interact live with the pet and establish base comfort compatibility.</p>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-black text-orange-200 max-sm:text-center">04</div>
            <h3 className="font-bold text-slate-800 text-sm max-sm:text-center">Bring Them Home</h3>
            <p className="text-slate-500 text-xs leading-relaxed">Complete structural orientation check-ins, settle final protocols, and claim your wonderful friend!</p>
          </div>
        </div>
      </section>
    </div>
  )
}



export default HomePage
