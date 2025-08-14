import Link from 'next/link'
import React from 'react'

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                    Resume Not Found
                </h2>
                <p className="text-gray-600 mb-8">
                    The resume you&apos;re looking for doesn&apos;t exist or you don&apos;t have permission to view it.
                </p>
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

export default NotFound