"use client";
import React, { useState  } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import HomePageMobileNavbar from './HomePageMobileNavbar';

const HomePageNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link className='logo' href={"#"}>CVScan</Link>
                <ul className='nav-links'>
                    <li><Link className='link' href={"#features"}>Features</Link></li>
                    <li><Link className='link' href={"#pricing"}>Pricing</Link></li>
                    <li><Link className='link' href={"#contact"}>Contact</Link></li>
                    <li className=''><Link href={"/upload"} className='get-started-button'>Get Started</Link></li>
                </ul>
                <Menu
                    className='w-8 h-8 md:hidden'
                    onClick={() => setIsMenuOpen(true)}
                />
                {isMenuOpen && (
                    <HomePageMobileNavbar
                        isMenuOpen={isMenuOpen}
                        setIsMenuOpen={setIsMenuOpen}
                    />
                )}
            </div>
        </nav>
    )
}

export default HomePageNavbar