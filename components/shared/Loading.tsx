import React from 'react'

const Loading = () => {
    return (
        <div className='w-full p-4 py-6 max-w-6xl mx-auto'>
            <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            </div>
        </div>
    )
}

export default Loading