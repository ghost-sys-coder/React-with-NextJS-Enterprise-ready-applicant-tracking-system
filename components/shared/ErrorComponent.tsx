import { ArrowLeft, FileText } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const ErrorComponent = ({ error }: { error: string }) => {
    return (
        <div className='max-w-6xl mx-auto py-6 px-4'>
            <div className="text-center py-12">
                <div className="text-red-600 text-6xl mb-4">⚠️</div>
                <h1 className="text-gray-900 mb-4 text-2xl font-bold">
                    <span className='text-red-400 in mr-2'>Error</span>
                    Loading Resume data
                </h1>
                <p className="text-gray-600 mb-8">{error}</p>
                <Link href={"/"} className='inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
                    <ArrowLeft />
                    Back to Home page
                </Link>
            </div>
        </div>
    )
}

export function ResumesErrorComponent({ error }: { error: string }) {
    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4'>
            <div className='text-center max-w-md'>
                <div className='w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                    <FileText className='w-10 h-10 text-red-600' />
                </div>
                <h2 className='text-2xl font-bold text-gray-900 mb-4'>Something went wrong</h2>
                <p className='text-gray-600 mb-8'>{error}</p>
                <button
                    type='button'
                    onClick={() => window.location.reload()}
                    className='px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium'
                >
                    Try Again
                </button>
            </div>
        </div>
    )
}

export default ErrorComponent