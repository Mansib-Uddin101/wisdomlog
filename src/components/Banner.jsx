import Image from 'next/image'
import React from 'react'
import banner from '@/assets/pet_hero.png'
import { Heart } from 'lucide-react'
import Link from 'next/link'
import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im'

const Banner = () => {
  return (
    <section className="max-w-5/6 mx-auto rounded-2xl mt-6 sm:mt-8 bg-[#F4EEE2] py-12 lg:py-28 overflow-hidden shadow-sm">
      <div className="px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-6 flex flex-col space-y-4 sm:space-y-6 text-center lg:text-left order-2 lg:order-1">
          <span className="flex items-center  gap-1.5 text-xs sm:text-sm font-bold tracking-wider text-[#D66237] uppercase">
            <ImQuotesLeft className='text-[10px]' />Find Your Perfect Match<ImQuotesRight className='text-[10px]'/>
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 tracking-tight leading-tight">
            Every pet deserves a <span className="text-[#D66237] italic font-serif">loving home</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0">
            Open your heart and your home to a furry, feathered, or scaled companion. Connect with pet owners and adopt your new best buddy today.
          </p>

          <div>
            <Link href="/all">
              <button className="w-full flex gap-1.5 items-center justify-center sm:w-auto bg-[#D66237] mt-2 hover:bg-[#b74718] hover:scale-105 active:bg-[#96340e] text-white font-semibold px-8 py-3.5 rounded-lg transition duration-200 shadow-md">
                Adopt Now<Heart />
              </button>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6 flex justify-center order-1 lg:order-2">
          <div className="w-full max-w-[320px] sm:max-w-md lg:max-w-xl aspect-5/3 relative">
            <Image
              src={banner}
              alt="A diverse group of happy shelter pets waiting for adoption"
              fill
              priority
              sizes="(max-w: 768px) 100vw, 50vw"
              className="object-contain mix-blend-multiply"
            />
          </div>
        </div>

      </div>
    </section>
  )
}

export default Banner