'use client'

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import Logo from "@/components/Logo"
import { usePathname } from 'next/navigation'
import { authClient } from "@/lib/auth-client"
import { Avatar, Dropdown, Label } from "@heroui/react"
import { ArrowRightFromSquare, Gear, Persons } from "@gravity-ui/icons"
import { useRouter } from "next/navigation"

const Navbar = () => {
    const router = useRouter()
    const userData = authClient.useSession()
    const user = userData.data?.user
    const handleSignOut = async () => {
        
        await authClient.signOut()
        router.push('/');
    }
    const [isOpen, setIsOpen] = useState(false)
    const toggleMenu = () => setIsOpen(!isOpen)

    const pathname = usePathname()
    const isActive = (path) => pathname === path;

    return (
        <header className="shadow-sm bg-white sticky top-0 z-50">
            <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8 border-b border-gray-200 pb-3 mt-2">
                <div className="flex items-center py-2">
                    <div className="flex items-center gap-12">
                        <Link href={"/"} className="shrink-0">
                            <Logo />
                        </Link>

                        <nav className="hidden md:flex space-x-8 font-medium text-gray-700">
                            <Link
                                href="/"
                                className={`relative py-1 ${isActive('/') ? 'text-[#D66237]' : ''} hover:text-[#D66237] transition-colors duration-300 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-0 after:bg-[#AF5B36] after:transition-all after:duration-300 hover:after:w-full`}
                            >
                                Home
                            </Link>

                            <Link
                                href="/all"
                                className={`relative py-1 ${isActive('/all') ? 'text-[#D66237]' : ''} hover:text-[#D66237] transition-colors duration-300 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-0 after:bg-[#AF5B36] after:transition-all after:duration-300 hover:after:w-full`}
                            >
                                All Pets
                            </Link>

                            <Link
                                href="/requests"
                                className={`relative py-1 ${isActive('/requests') ? 'text-[#D66237]' : ''} hover:text-[#D66237] transition-colors duration-300 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-0 after:bg-[#AF5B36] after:transition-all after:duration-300 hover:after:w-full`}
                            >
                                My Requests
                            </Link>
                            <Link
                                href="/add"
                                className={`relative py-1 ${isActive('/add-pet') ? 'text-[#D66237]' : ''} hover:text-[#D66237] transition-colors duration-300 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-0 after:bg-[#AF5B36] after:transition-all after:duration-300 hover:after:w-full`}
                            >
                                Add Pet
                            </Link>
                        </nav>
                    </div>

                    <div className="hidden md:flex items-center gap-4 ml-auto">
                        {!user ? (
                            <Link href={"/signin"} className="bg-[#D66237] text-white px-6 py-2 font-semibold rounded-md hover:bg-[#b74718] active:bg-[#96340e] transition">
                                Login
                            </Link>
                        ) : (
                            <div className="flex items-center gap-4">
                                <p className="font-bold text-[#315579] text-2xl">{user?.name}</p>
                                <Dropdown >
                                    <Dropdown.Trigger className="rounded-full cursor-pointer">
                                        <Avatar size="lg" className="border-2 border-[#D66237]">
                                            <Avatar.Image alt={user?.name} src={user?.image} />
                                            <Avatar.Fallback>JD</Avatar.Fallback>
                                        </Avatar>
                                    </Dropdown.Trigger>
                                    <Dropdown.Popover>
                                        <div className="px-3 pt-3 pb-1">
                                            <div className="flex items-center gap-2">
                                                <Avatar size="sm">
                                                    <Avatar.Image alt={user?.name} src={user?.image} />
                                                    <Avatar.Fallback>JD</Avatar.Fallback>
                                                </Avatar>
                                                <div className="flex flex-col gap-0">
                                                    <p className="text-sm leading-5 font-medium">{user?.name}</p>
                                                    <p className="text-xs leading-none text-muted">{user?.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <Dropdown.Menu>
                                            <Dropdown.Item id="profile" textValue="Profile">
                                                <Label>Profile</Label>
                                            </Dropdown.Item>
                                            <Dropdown.Item id="dashboard" textValue="Dashboard">
                                                <Label>Dashboard</Label>
                                            </Dropdown.Item>


                                            <Dropdown.Item id="logout" textValue="Logout" variant="danger" onAction={handleSignOut}>
                                                <div className="flex w-full items-center justify-between gap-2">
                                                    <Label>Log Out</Label>
                                                    <ArrowRightFromSquare className="size-3.5 text-danger" />
                                                </div>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown.Popover>
                                </Dropdown>
                            </div>
                        )}
                    </div>

                    <div className="md:hidden flex items-center ml-auto">
                        <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 py-4 px-6 space-y-4 shadow-inner">
                    {user && (
                        <div className="flex flex-col items-center justify-center p-2">
                            <div>
                                <Avatar size="lg" className="border-2 border-[#D66237]">
                                    <Avatar.Image alt={user?.name} src={user?.image} />
                                    <Avatar.Fallback>JD</Avatar.Fallback>
                                </Avatar>
                            </div>
                            <p className="font-bold text-[#315579] text-xl">{user?.name}</p>
                        </div>
                    )}
                    <nav className="flex flex-col space-y-4 font-medium text-gray-700">
                        <Link href="/" onClick={toggleMenu} className="hover:text-[#D66237] transition">Home</Link>
                        <Link href="/all" onClick={toggleMenu} className="hover:text-[#D66237] transition">All Pets</Link>
                        <Link href="/requests" onClick={toggleMenu} className="hover:text-[#D66237] transition">My Requests</Link>
                        <Link href="/add" onClick={toggleMenu} className="hover:text-[#D66237] transition">Add Pet</Link>
                    </nav>

                    <div className="pt-4 border-t border-gray-100">
                        {!user ? (
                            <Link href="/signin" onClick={toggleMenu} className="bg-[#D66237] text-white block text-center px-6 py-2 font-semibold rounded-md hover:bg-[#b74718] active:bg-[#96340e] transition">
                                Login
                            </Link>
                        ) : (
                            <button onClick={() => { handleSignOut(); toggleMenu(); }} className="w-full bg-red-500 text-white block text-center px-6 py-2 font-semibold rounded-md hover:bg-red-600 transition">
                                Log Out
                            </button>
                        )}
                    </div>
                </div>
            )}
        </header>
    )
}

export default Navbar