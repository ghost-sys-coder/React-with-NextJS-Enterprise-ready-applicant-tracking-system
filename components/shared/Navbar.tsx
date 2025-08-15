"use client";
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { navLinks } from '@/constants';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { ChevronDown, Loader2, LogOut, Menu } from 'lucide-react';
import { SignOutButton, UserButton } from '@clerk/nextjs';
import MobileNavbar from './MobileNavbar';
import axios from 'axios';

interface NavUserProps {
    firstName: string | null | "",
    lastName: string | null | "",
    profileImage: string | null | "",
    email: string;
}

const Navbar: React.FC<NavUserProps> = ({ firstName, profileImage, lastName, email }) => {
    const pathname = usePathname();
    const [profileOpen, setProfileOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isCheckingUser, setIsCheckingUser] = useState(false);

    useEffect(() => {
        (async () => {
            setIsCheckingUser(true);
            try {
                const { data } = await axios.post("/api/user", {
                    firstName,
                    lastName,
                    email,
                    imageUrl: profileImage
                });
                console.log(data);
            } catch (error) {
                console.log("Something went wrong", error);
            } finally {
                setIsCheckingUser(false);
            }
        })()
    }, [firstName, lastName, email, profileImage]);

    if (isCheckingUser === false) {
        <div className="flex justify-center items-center h-screen">
            <Loader2 size={40} className='animate-spin text-indigo-500' />
            <p className='font-semibold text-indigo-700 text-xl'>Loading User Data...</p>
        </div>
    }

    return (
        <nav className='bg-white border-b shadow-sm w-full sticky top-0 px-4 py-4 z-50'>
            <div className="flex justify-between items-center gap-8">
                <Link href={"/"} className='font-semibold text-2xl text-indigo-600'>CVScan</Link>

                {/* desktop menu */}
                <div className="hidden md:flex items-center justify-between gap-6">
                    {navLinks.map((link) => {
                        return (
                            <Link
                                key={link.href} href={link.href}
                                className={clsx("flex items-center text-gray-700 hover:text-indigo-600 transition",
                                    pathname === link.href ? "font-semibold border-b-2 border-indigo-600" : "font-normal"
                                )}
                            >
                                {link.label}
                            </Link>
                        )
                    })}

                    {/* if user is logged in, show profile icon */}
                    {firstName && (
                        <div className="relative">
                            <button
                                type='button'
                                className='flex items-center gap-2 cursor-pointer focus:outline-none'
                                onClick={() => setProfileOpen(!profileOpen)}
                            >
                                <Image
                                    src={profileImage ?? ""}
                                    alt="profile"
                                    className='w-8 h-8 rounded-full object-cover'
                                    width={100}
                                    height={100}
                                />
                                <span className='text-gray-700 text-[12px]'>{firstName}</span>
                                <ChevronDown
                                    size={16}
                                    className={clsx("transition-transform", profileOpen ? "rotate-180" : "rotate-0")}
                                />
                            </button>
                            {profileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                                    <div className="flex gap-2 items-center my-2 px-2">
                                        <UserButton />
                                        <span className='text-sm text-gray-600'>{firstName}</span>
                                    </div>
                                    <SignOutButton>
                                        <button type='button' className='flex items-center gap-2 px-4 py-2 hover:bg-gray-200 text-red-500 text-left text-sm w-full'>
                                            <span>Log Out</span>
                                            <LogOut />
                                        </button>
                                    </SignOutButton>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                {/* Mobile Nav */}
                <button
                    type='button'
                    className='p-2 rounded-md hover:bg-gray-100  focus:outline-none md:hidden'
                    title='Open Menu'
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <Menu size={24} />
                </button>
                {menuOpen && (
                    <MobileNavbar
                        openMenu={menuOpen}
                        setOpenMenu={setMenuOpen}
                        pathname={pathname}
                    />
                )}
            </div>
        </nav>
    )
}

export default Navbar