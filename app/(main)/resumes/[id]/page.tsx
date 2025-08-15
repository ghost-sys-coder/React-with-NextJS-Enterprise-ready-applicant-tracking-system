"use client";
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import { ResumeAnalysisObject } from '@/types';
import Loading from '@/components/shared/Loading';
import ErrorComponent from '@/components/shared/ErrorComponent';
import NoResumeData from '@/components/shared/NoResumeData';
import Image from 'next/image';
import Link from 'next/link';
import { getRatingColor, getScoreColor } from '@/lib/utils';
import JobDetailsComponent from '@/components/shared/JobDetailsComponent';


interface AiResponse {
    success: false;
    data?: ResumeAnalysisObject;
    error?: string;
}


const SingleResumePage = () => {
    const { id } = useParams();
    const [resumeData, setResumeData] = useState<ResumeAnalysisObject | null>(null);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch the resume data
    useEffect(() => {
        const fetchResumeData = async () => {
            setIsLoadingData(true);
            try {
                const response = await fetch(`/api/resume/${id}`);
                const result: AiResponse = await response.json();

                if (!response.ok) {
                    setError("Failed to fetch data!");
                    throw new Error(result.error || "Failed to fetch data")
                }

                if (result.success && result.success) {
                    console.log(result.data);
                    setResumeData(result.data ?? null);
                } else {
                    setError("Invalid response Format");
                    throw new Error("Invalid response Format")
                }

            } catch (error) {
                setError("Something went wrong!");
                console.log("Something went wrong!", error);
            } finally {
                setIsLoadingData(false);
            }
        }
        fetchResumeData();
    }, [id]);

    if (isLoadingData) return <Loading />

    if (error) return <ErrorComponent error={error ?? "No data fetched!"} />

    if (!resumeData) return <NoResumeData />
    return (
        <div className='px-4 py-6 max-w-6xl mx-auto'>
            {/* Header Section */}
            <div className='mb-8'>
                <div className='flex items-start justify-between mb-4'>
                    <div>
                        <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                            Resume Analysis
                        </h1>
                        <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-600'>
                            <span className='font-medium'>{resumeData.jobTitle}</span>
                            <span className='hidden sm:block'>•</span>
                            <span>{resumeData.companyName}</span>
                            <span className='hidden sm:block'>•</span>
                            <span className='text-sm'>
                                Analyzed on {new Date(resumeData.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>

                    {/* Resume Preview */}
                    {resumeData.resumeImageUrl && (
                        <div className='flex-shrink-0'>
                            <div className='w-32 h-40 border border-gray-200 rounded-lg overflow-hidden shadow-sm'>
                                <Image
                                    src={resumeData.resumeImageUrl}
                                    alt="Resume preview"
                                    width={128}
                                    height={160}
                                    className='w-full h-full object-cover'
                                />
                            </div>
                            <a
                                href={resumeData.resumeFileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className='block text-center text-sm text-blue-600 hover:text-blue-800 mt-2'
                            >
                                View PDF
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* Overall Score Section */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
                <div className='bg-white rounded-xl border border-gray-200 p-6'>
                    <div className='flex items-center justify-between mb-4'>
                        <h2 className='text-xl font-semibold text-gray-900'>Overall Score</h2>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRatingColor(resumeData.resumeAnalysis.overallRating)}`}>
                            {resumeData.resumeAnalysis.overallRating}
                        </span>
                    </div>
                    <div className='flex items-center mb-4'>
                        <span className={`text-4xl font-bold ${getScoreColor(resumeData.resumeAnalysis.overallScore)}`}>
                            {resumeData.resumeAnalysis.overallScore}
                        </span>
                        <span className='text-gray-500 text-lg ml-1'>/100</span>
                    </div>
                    <p className='text-gray-700 text-sm leading-relaxed'>
                        {resumeData.resumeAnalysis.overallComments}
                    </p>
                </div>

                <div className='bg-white rounded-xl border border-gray-200 p-6'>
                    <h2 className='text-xl font-semibold text-gray-900 mb-4'>Job Match</h2>
                    <div className='flex items-center mb-4'>
                        <span className={`text-4xl font-bold ${getScoreColor(resumeData.resumeAnalysis.jobMatchScore)}`}>
                            {resumeData.resumeAnalysis.jobMatchScore}
                        </span>
                        <span className='text-gray-500 text-lg ml-1'>/100</span>
                    </div>
                    <p className='text-gray-700 text-sm leading-relaxed'>
                        {resumeData.resumeAnalysis.jobMatchComments}
                    </p>
                </div>
            </div>

            {/* Sections Analysis */}
            <div className='mb-8'>
                <h2 className='text-2xl font-bold text-gray-900 mb-6'>Detailed Analysis</h2>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    {resumeData.resumeAnalysis.sections.map((section, index) => (
                        <div key={index} className='bg-white rounded-xl border border-gray-200 p-6'>
                            <div className='flex items-center justify-between mb-4'>
                                <h3 className='text-lg font-semibold text-gray-900'>
                                    {section.sectionName}
                                </h3>
                                <span className={`text-xl font-bold ${getScoreColor(section.score)}`}>
                                    {section.score}/100
                                </span>
                            </div>

                            <div className='space-y-3'>
                                <h4 className='text-sm font-medium text-gray-700 uppercase tracking-wide'>
                                    Suggested Improvements
                                </h4>
                                <ul className='space-y-2'>
                                    {section.improvements.map((improvement, impIndex) => (
                                        <li key={impIndex} className='flex items-start'>
                                            <span className='w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0'></span>
                                            <span className='text-sm text-gray-700 leading-relaxed'>
                                                {improvement}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Job Details Section */}
            <JobDetailsComponent
                jobDescription={resumeData.jobDescription}
                jobTitle={resumeData.jobTitle}
                companyName={resumeData.companyName}
                resumeFileName={resumeData.resumeFileName}
                resumeFileUrl={resumeData.resumeFileUrl}
            />

            {/* Back Button */}
            <div className='mt-8 text-center'>
                <Link
                    href="/dashboard"
                    className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                    ← Back to Dashboard
                </Link>
            </div>
        </div>
    )
}

export default SingleResumePage