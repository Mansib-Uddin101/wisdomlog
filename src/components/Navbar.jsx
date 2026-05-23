'use client'

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import Logo from "@/components/Logo"
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const toggleMenu = () => setIsOpen(!isOpen)

    const pathname = usePathname()
    const isActive = (path) => pathname === path;
    
    return (
        <header className="shadow-sm bg-white sticky top-0 z-50">
            <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8 border-b border-gray-200 pb-3 mt-2">
                <div className="flex items-center py-2">
                    {/* Left Group: Logo and Nav links grouped together */}
                    <div className="flex items-center gap-12">
                        <Link href={"/"} className="shrink-0">
                            <Logo/>
                        </Link>

                        <nav className="hidden md:flex space-x-8 font-medium text-gray-700">
                            {/* Active Link (Home) - Underline is always full width */}
                            <Link
                                href="/"
                                className={`relative py-1 ${isActive('/') ? 'text-[#D66237]': ''} hover:text-[#D66237] transition-colors duration-300 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-0 after:bg-[#AF5B36] after:transition-all after:duration-300 hover:after:w-full`}
                            >
                                Home
                            </Link>

                            {/* Inactive Link - Underline slides out from the left on hover */}
                            <Link
                                href="/all"
                                className={`relative py-1 ${isActive('/all') ? 'text-[#D66237]': ''} hover:text-[#D66237] transition-colors duration-300 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-0 after:bg-[#AF5B36] after:transition-all after:duration-300 hover:after:w-full`}
                            >
                                All Pets
                            </Link>

                            {/* Inactive Link */}
                            <Link
                                href="/requests"
                                className={`relative py-1 ${isActive('/requests') ? 'text-[#D66237]': ''} hover:text-[#D66237] transition-colors duration-300 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-0 after:bg-[#AF5B36] after:transition-all after:duration-300 hover:after:w-full`}
                            >
                                My Requests
                            </Link>
                            <Link
                                href="/add"
                                className={`relative py-1 ${isActive('/add-pet') ? 'text-[#D66237]': ''} hover:text-[#D66237] transition-colors duration-300 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-0 after:bg-[#AF5B36] after:transition-all after:duration-300 hover:after:w-full`}
                            >
                                Add Pet
                            </Link>
                        </nav>
                    </div>


                    {/* Right Group: Pushed to the far right using ml-auto */}
                    <div className="hidden md:flex items-center gap-4 ml-auto">
                        <Link href={"/"} className="bg-[#D66237] text-white px-6 py-2.5 font-semibold rounded-md hover:bg-[#b74718] active:bg-[#96340e] transition">
                            Login
                        </Link>
                    </div>

                    {/* Mobile Hamburger: Also pushed to the right on small screens */}
                    <div className="md:hidden flex items-center ml-auto">
                        <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>
            <div>
                
            </div>

            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 py-4 px-6 space-y-4 shadow-inner">
                    <nav className="flex flex-col space-y-4 font-medium text-gray-700">
                        <Link href="/" onClick={toggleMenu} className="hover:text-blue-500 transition">Home</Link>
                        <Link href="/all-books" onClick={toggleMenu} className="hover:text-blue-500 transition">All Books</Link>
                        <Link href="/profile" onClick={toggleMenu} className="hover:text-blue-500 transition">My Profile</Link>
                    </nav>

                    <div className="pt-4 border-t border-gray-100">
                        <Link href="/" className="block text-center bg-[#00D3BB]/50 py-3 font-semibold rounded-md">
                            Login
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Navbar