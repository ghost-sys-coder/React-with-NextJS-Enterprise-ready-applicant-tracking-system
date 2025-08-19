import React from 'react'
import SectionWrapper from './SectionWrapper'
import { features } from '@/constants'

const FeaturesSection = () => {
    return (
        <SectionWrapper className="mt-30 px-4 md:px-6 lg:px-8" sectionId='features'>
            <div className="w-full">
                <div className="text-center mb-6">
                    <h2 className="text-3xl lg:text-5xl font-semibold bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">Powerful AI Driven Features</h2>
                    <p className="text-xl text-slate-300 max-x-3xl mx-auto mt-2">Experience the future of resume optimization with our cutting-edge AI technology that provides comprehensive analysis and actionable insights.</p>
                </div>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-lg border border-purple-500/20 rounded-2xl p-8 hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20"
                                key={feature.title}
                            >
                                <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Icon />
                                </div>
                                <h3 className='text-xl font-semibold mb-4 text-white'>{feature.title}</h3>
                                <p className='text-slate-300 leading-relaxed'>{feature.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </SectionWrapper>
    )
}

export default FeaturesSection