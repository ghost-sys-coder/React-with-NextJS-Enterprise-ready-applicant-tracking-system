import { footerLinks } from '@/constants'
import Link from 'next/link'
import React from 'react'

const FooterSection = () => {
  return (
    <footer className="max-w-[1200px] mx-auto my-30">
      <div className="">
        <div className="text-center mb-4">
          <h4 className="text-3xl lg:text-4xl bg-gradient-to-r from-white via-pink-400 to-purple-500 bg-clip-text text-transparent font-semibold">CVScan</h4>
          <p className='text-slate-300 lg:text-lg text-base pt-2'>Empowering Careers through Intelligent analysis</p>
        </div>
        <div className="max-w-2xl mx-auto flex gap-2 justify-between items-center flex-wrap my-4 px-4">
          {footerLinks.map((link, index) => (
            <Link href={link.link} className='text-slate-300 hover:text-pink-400 transition-colors text-sm md:text-base' key={index}>{link.label}</Link>
          ))}
        </div>
        <div className='bg-slate-600 h-[1px] w-full' />
        <p className='text-center py-3 text-slate-200 text-sm'>&copy; 2025 ResumeAI. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default FooterSection