import React from 'react'

interface StatsCardProps {
    icon: React.ReactNode;
    stat: number;
    textContent: string;
}

const StatsCard: React.FC<StatsCardProps> = ({icon, stat, textContent}) => {
  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
              <div className='flex items-center justify-between mb-2'>
              <span className="">{icon}</span>
                <span className='text-3xl font-bold text-gray-900'>{stat}</span>
              </div>
          <p className='text-gray-600 font-medium'>{textContent}</p>
            </div>
  )
}

export default StatsCard