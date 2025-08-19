import React from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { homepageNavLinks } from '@/constants';
import Link from 'next/link';

interface HomePageMobileNavbarProps {
    isMenuOpen: boolean;
    setIsMenuOpen: (isMenuOpen: boolean) => void;
}

const HomePageMobileNavbar: React.FC<HomePageMobileNavbarProps> = ({isMenuOpen, setIsMenuOpen}) => {
    return (
        <Sheet
            open={isMenuOpen}
            onOpenChange={() => setIsMenuOpen(false)}
        >
            <SheetContent className=''>
                <SheetHeader className=''>
                    <SheetTitle
                        className='bg-gradient-to-br from-purple-600 via-pink-400 to-slate-500 bg-clip-text text-transparent;'
                    >
                        CVScan
                    </SheetTitle>
                    <SheetDescription>
                        Your AI-Powered Resume Analysing Tool
                    </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-10 px-4">
                    {homepageNavLinks.map((link) => (
                        <Link
                            href={link.href}
                            key={link.label}
                            className='flex gap-2 items-center hover:py-4 hover:px-2 hover:text-white hover:bg-gray-300 hover:rounded-md hover:shadow-md'
                        >
                            <link.icon />
                            <span>{link.label}</span>
                        </Link>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default HomePageMobileNavbar