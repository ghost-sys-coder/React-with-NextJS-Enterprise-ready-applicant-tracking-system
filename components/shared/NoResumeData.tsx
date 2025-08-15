import Link from 'next/link'
import React from 'react'

const NoResumeData = () => {
  return (
    <div className='px-4 py-6 max-w-6xl mx-auto'>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Resume Not Found</h1>
          <p className="text-gray-600 mb-8">The resume you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/dashboard"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
  )
}

export default NoResumeData