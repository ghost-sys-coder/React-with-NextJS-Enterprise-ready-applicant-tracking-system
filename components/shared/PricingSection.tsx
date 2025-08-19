import React from 'react'
import SectionWrapper from './SectionWrapper'
import { pricing } from '@/constants'
import clsx from 'clsx'
import { Check } from 'lucide-react'
import { Button } from '../ui/button'

const PricingSection = () => {
    return (
        <SectionWrapper className="mt-30 px-4 md:px-6 lg:px-8" sectionId="pricing">
            <div className="w-full">
                <div className="text-center mb-6">
                    <h2 className="text-3xl lg:text-5xl bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent font-semibold">Choose Your Plan</h2>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto mt-2">Select the perfect plan for your career advancement needs. All plans include our core AI analysis features.</p>
                </div>

                <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-15 relative">
                    {pricing.map((item) => (
                        <div
                            className={clsx(
                                "relative flex flex-col justify-between bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-lg border-2 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl",
                                item.popular ? "border-purple-500 scale-105 hover:shadow-purple-500/20" : "border-purple-500/20 hover:border-purple-500/40 hover:shadow-purple-500/10"
                            )}
                            key={item.name}
                        >
                            {item.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <span className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold'>Most Popular</span>
                                </div>
                            )}
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-semibold mb-4 text-white">{item.name}</h3>
                                <div className="mb-2">
                                    <span className="text-4xl font-bold text-purple-400">${item.price}</span>
                                </div>
                                <p className="text-slate-400">{item.period}</p>
                            </div>
                            <ul className="space-y-4 mb-4">
                                {item.features.map((feature, index) => (
                                    <li className="flex justify-start gap-2" key={index}>
                                        <Check className='w-5 h-5 flex-shrink-0 mt-0.5' />
                                        <span className='text-slate-300'>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex justify-center mt-4">
                                <Button className={clsx(
                                    'w-full py-6 rounded-full cursor-pointer hover:opacity-80 transition-colors duration-300',
                                    item.buttonText !== "Contact Sales" ? "bg-gradient-to-br from-white via-pink-600 to-purple-700" : "bg-slate-400"
                            )}>
                                {item.buttonText} 
                            </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    )
}

export default PricingSection