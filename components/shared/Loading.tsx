import React from 'react'

const Loading = () => {
    return (
        <div className='w-full p-4 py-6 max-w-6xl mx-auto'>
            <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="h-48 bg-gray-200 rounded-xl"></div>
                    <div className="h-48 bg-gray-200 rounded-xl"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export function ResumesLoading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="animate-pulse">
                    <div className="h-14 bg-gray-200 rounded-xl w-1/3 mb-4"></div>
                    <div className="h-10 bg-gray-200 rounded-xl w-1/4 mb-12"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div className="bg-gray-200 h-96 rounded-2xl shadow-md" key={i}></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loading