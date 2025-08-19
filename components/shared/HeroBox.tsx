import React from 'react'
import Link from 'next/link'
import SectionWrapper from './SectionWrapper'
import { ChevronRight, FileText } from 'lucide-react'
import { stats } from '@/constants'
import clsx from 'clsx'

const HeroBox = () => {
    return (
        <SectionWrapper className='mt-30 flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 relative'>

            {/* background animation */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full animate-pulse filter blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full animate-pulse filter blur-3xl bg-pink-500"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left relative z-10">
                    <h1 className='text-4xl lg:text-6xl bg-gradient-to-r from-white via-purple-400 to-purple-600  bg-clip-text text-transparent font-semibold leading-tight'>Analyze Your Resume with AI Precision</h1>
                    <p className='text-xl text-slate-300 max-w-2xl my-8'>Transform your career prospects with our advanced AI-powered resume analysis. Get instant feedback, optimization suggestions, and industry insights to land your dream job.</p>

                    {/* action buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                        <Link href={"/upload"} className='flex gap-2 justify-center items-center bg-gradient-to-br from-slate-400 via-pink-400 to-purple-600 px-6 py-4 rounded-md shadow-md hover:from-purple-700 hover:to-pink-700'>
                            <span>Start Analysis</span>
                            <ChevronRight />
                        </Link>
                        <Link href={"#pricing"} className='flex justify-center items-center border-2 border-purple-500 rounded-md px-4 text-purple-300 text-lg font-semibold py-4 hover:bg-purple-500 hover:text-white  transition-all duration-200'>View Pricing</Link>
                    </div>

                    {/* stats */}
                    <div className="grid grid-cols-3 gap-8 max-w-md mx-auto lg:mx-0">
                        {stats.map((stat, index) => (
                            <div className="text-center" key={index}>
                                <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-2">{stat.number}</div>
                                <div className="text-sm text-slate-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative flex justify-center lg:justify-end z-10">
                    <div className="relative group">
                        <div className="w-80 h-96 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-6 transform group-hover:scale-105 group-hover:-rotate-2 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20">
                            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full px-4 py-4 text-sm font-semibold flex justify-center items-center shadow-lg">AI Analyzed</div>
                            <div className="flex justify-center items-center md:justify-start gap-2 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white px-4 font-semibold">
                                <FileText className='w-5 h-5' />
                                <span>Professional Resume</span>
                            </div>
                            {/* Resume Content Lines */}
                            <div className="space-y-3 mt-6">
                                {[...Array(10)].map((_, index) => (
                                    <div
                                        className={clsx(
                                            "h-3 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full animate-pulse",
                                            index % 3 === 0 ? "w-full" : index % 2 === 0 ? "w-4/5" : "w-3/5",
                                            `delay-[${index * 200}ms]`
                                        )}
                                        key={index}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}

export default HeroBox