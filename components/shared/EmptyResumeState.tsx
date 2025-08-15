import React from 'react'
import { FileText, TrendingUp } from 'lucide-react'
import Link from 'next/link'

const EmptyResumeState = () => {
    return (
        <div className='text-center py-20'>
            <div className='w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-8'>
                <FileText className='w-16 h-16 text-gray-400' />
            </div>
            <h3 className='text-3xl font-bold text-gray-900 mb-4'>No resumes yet</h3>
            <p className='text-xl text-gray-600 mb-12 max-w-md mx-auto'>
                Upload and analyze your first resume to get started with AI-powered feedback and insights.
            </p>
            <Link
                href="/analyze"
                className='inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl'
            >
                <TrendingUp className='w-6 h-6 mr-3' />
                Get Started
            </Link>
        </div>
    )
}

export default EmptyResumeState