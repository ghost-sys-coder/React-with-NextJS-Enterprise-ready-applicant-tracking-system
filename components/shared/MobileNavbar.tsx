import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { navLinks } from '@/constants';
import Link from 'next/link';
import clsx from 'clsx';
import { SignOutButton, useUser } from '@clerk/nextjs';
import { LogOutIcon } from 'lucide-react';

interface MobileNavProps {
    openMenu: boolean;
    setOpenMenu: (openMenu: boolean) => void;
    pathname: string;
}

const MobileNavbar: React.FC<MobileNavProps> = ({ openMenu, setOpenMenu, pathname }) => {
    const { user } = useUser();
    return (
        <Sheet open={openMenu} onOpenChange={() => setOpenMenu(false)}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className='text-indigo-700 font-semibold border-b-2 text-2xl'>CVScan</SheetTitle>
                    <SheetDescription>
                        Your AI-Powered resume analyzing tool!
                    </SheetDescription>
                </SheetHeader>
                <div className="flex gap-5 flex-col px-4">
                    {navLinks.map((link) => (
                        <Link href={link.href} key={link.label} onClick={() => setOpenMenu(false)}
                            className={clsx(
                                "flex gap-2 items-center hover:bg-gray-300 px-2 py-2",
                                pathname === link.href ? "bg-indigo-400 px-2 py-2" : ""
                            )}
                        >
                            <link.icon size={25} className={clsx(
                                "text-gray-500 font-bold", pathname === link.href ? "text-white" : "")}
                            />
                            <span className={clsx(
                                "text-gray-600",
                                pathname === link.href ? "text-white" : "")}>
                                {link.label}
                            </span>
                        </Link>
                    ))}
                </div>
                <SheetFooter>
                    <div className="flex justify-between items-center">
                    <p className='font-semibold text-indigo-600'>{user?.firstName}</p>
                    <SignOutButton>
                        <div className="flex gap-2 items-center justify-center bg-red-500 text-white px-2 py-2 rounded-sm hover:opacity-85 cursor-pointer">
                        <span>Sign Out</span>
                        <LogOutIcon />
                        </div>
                    </SignOutButton>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNavbar