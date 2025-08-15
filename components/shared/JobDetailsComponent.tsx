import React from 'react'

interface JobDetailsComponentProps {
    jobTitle: string;
    jobDescription: string;
    companyName: string;
    resumeFileName: string;
    resumeFileUrl: string;
}

const JobDetailsComponent: React.FC<JobDetailsComponentProps> = ({
    jobDescription, jobTitle,
    companyName, resumeFileName,
    resumeFileUrl }) => {
  return (
    <div className='bg-gray-50 rounded-xl p-6'>
                <h2 className='text-xl font-semibold text-gray-900 mb-4'>Job Details</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                        <h3 className='text-sm font-medium text-gray-700 uppercase tracking-wide mb-2'>
                            Position
                        </h3>
                        <p className='text-gray-900 font-medium'>{jobTitle}</p>
                        <p className='text-gray-600'>{companyName}</p>
                    </div>
                    <div>
                        <h3 className='text-sm font-medium text-gray-700 uppercase tracking-wide mb-2'>
                            Resume File
                        </h3>
                        <p className='text-gray-900'>{resumeFileName}</p>
                        <a
                            href={resumeFileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className='text-blue-600 hover:text-blue-800 text-sm'
                        >
                            Download Original PDF
                        </a>
                    </div>
                </div>

                <div className='mt-6'>
                    <h3 className='text-sm font-medium text-gray-700 uppercase tracking-wide mb-2'>
                        Job Description
                    </h3>
                    <div className='bg-white rounded-lg p-4 border border-gray-200'>
                        <p className='text-gray-700 text-sm leading-relaxed whitespace-pre-wrap'>
                            {jobDescription}
                        </p>
                    </div>
                </div>
            </div>
  )
}

export default JobDetailsComponent