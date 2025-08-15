import React from 'react'
import Image from 'next/image'
import { ResumeItem } from '@/types'
import { Building2, Calendar, Download, Eye, FileText } from 'lucide-react'
import { getRatingBadgeColor, getRatingColor, getScoreColor } from '@/lib/utils'
import Link from 'next/link'

const ResumeCard = ({ resume }: { resume: ResumeItem }) => {
    return (
        <div className='resume-card'>
            <div className="resume-card_image_container">
                {resume.resumeImageUrl ? (
                    <Image
                        src={resume.resumeImageUrl}
                        alt={`${resume.resumeFileName} preview`}
                        fill
                        className='object-cover group-hover:scale-110 transition-transform duration-500'
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <FileText className='w-16 h-16 text-gray-300' />
                    </div>
                )}

                {/* Rating Badge */}
                <div className="absolute top-4 left-4">
                    <div className={`w-4 h-4 rounded-full shadow-lg ${getRatingColor(resume.resumeAnalysis.overallRating)}`}></div>
                </div>

                {/* Score Badge */}
                <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
                        <span className={`text-lg font-bold ${getScoreColor(resume.resumeAnalysis.overallScore)}`}>
                            {resume.resumeAnalysis.overallScore}
                        </span>
                    </div>
                </div>

                {/* Hover Overlay */}
                <div className="resume-card_overlay">
                    <div className="flex gap-4">
                        <Link
                            href={`/resumes/${resume.projectId}`}
                            className='p-3 bg-white/90 backdrop-blur-sm rounded-xl hover:bg-white transition-colors shadow-lg'
                        >
                            <Eye className='w-5 h-5 text-gray-700' />
                        </Link>
                        <a
                            title='Download Resume'
                            href={resume.resumeFileUrl}
                            target='_blank'
                            rel='noopener noreferer'
                            className='p-3 bg-white/90 backdrop-blur-sm rounded-xl hover:bg-white transition-colors shadow-lg'
                        >
                            <Download className='w-5 h-5 text-gray-700' />
                        </a>
                    </div>
                </div>

            </div>

            {/* card content */}
            <div className="p-6">
                <div className="mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getRatingBadgeColor(resume.resumeAnalysis.overallRating)} mb-3`}>
                        {resume.resumeAnalysis.overallRating}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                        {resume.jobTitle}
                    </h3>
                    <div className="flex items-center mb-2 text-gray-600 justify-start gap-1">
                        <Building2 className="w-4 h-4" />
                        <span className='line-clamp-1'>{resume.companyName}</span>
                    </div>
                    <div className="flex justify-start items-center text-gray-500 gap-1">
                        <Calendar className='w-4 h-4' />
                        <span>{new Date(resume.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        })}</span>
                    </div>
                </div>
                {/* Score details */}
                <div className="flex justify-between items-center mb-6">
                    <div className="text-center">
                        <div className={`text-2xl font-bold ${getScoreColor(resume.resumeAnalysis.overallScore)}`}>
                            {resume.resumeAnalysis.overallScore}
                        </div>
                        <div className="text-xs text-gray-500 font-medium">Overall Score</div>
                    </div>
                    <div className='w-px h-12 bg-gray-200'></div>
                    <div className='text-center'>
                        <div className={`text-2xl font-bold ${getScoreColor(resume.resumeAnalysis.jobMatchScore)}`}>
                            {resume.resumeAnalysis.jobMatchScore}
                        </div>
                        <div className='text-xs text-gray-500 font-medium'>Job Match Score</div>
                    </div>
                </div>
                <Link href={`/resumes/${resume.projectId}`} className='resume-card_view_button'>
                    View Detailed Analysis
                </Link>
            </div>
        </div>
    )
}

export default ResumeCard