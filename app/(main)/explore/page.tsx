"use client";
import React, { useEffect, useState } from 'react'
import { ResumeItem } from '@/types';
import { ResumesLoading } from '@/components/shared/Loading';
import { ResumesErrorComponent } from '@/components/shared/ErrorComponent';
import Link from 'next/link';
import { Award, Building2, FileText, Target, TrendingUp } from 'lucide-react';
import StatsCard from '@/components/shared/StatsCard';
import EmptyResumeState from '@/components/shared/EmptyResumeState';
import ResumeCard from '@/components/shared/ResumeCard';




interface ApiReponse {
  success: boolean;
  data?: ResumeItem[];
  count?: number;
  error?: string;
}


const ExplorePage = () => {

  const [resumes, setResumes] = useState<ResumeItem[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResumes = async () => {
      setIsLoadingData(true);
      try {
        const response = await fetch("/api/explore");
        const result: ApiReponse = await response.json();
        console.log(result.data);

        if (!response.ok) {
          setError("Failed to fetch data");
          throw new Error("Failed to fetch data");
        }

        if (result.success && result.data) {
          setResumes(result.data);
        }
      } catch (err) {
        console.log("Something went wrong", error);
        setError(err instanceof Error ? err.message : "An error occured");
      } finally {
        setIsLoadingData(false);
      }
    }
    fetchResumes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoadingData) return <ResumesLoading />

  if (error) return <ResumesErrorComponent error={error} />

  // stats calculation
  const stats = {
    total: resumes.length,
    averageScore: resumes.length > 0 ? Math.round(resumes.reduce((sum, r) => sum + r.resumeAnalysis.overallScore, 0) / resumes.length) : 0,
    excellentCount: resumes.filter(r => r.resumeAnalysis.overallRating === 'Excellent').length,
    companiesCount: new Set(resumes.map(r => r.companyName)).size
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-200 via-white to-purple-50 px-4 py-4'>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-between items-center gap-8 mb-10 md:flex-row flex-col">
            <h1 className='text-5xl font-bold text-gray-900 mb-4'>
              Resume <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>Gallery</span>
            </h1>
            <Link
              href="/upload"
              className='inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105'
            >
              <TrendingUp className='w-6 h-6 mr-3' />
              Analyze New Resume
            </Link>
          </div>
          <p className='text-xl text-gray-600 mb-8'>
            {resumes.length > 0 ? `${resumes.length} analyzed resumes ready for review` : 'Your analyzed resumes will appear here'}
          </p>
        </div>

        {/* Stats Cards */}
        {resumes.length > 0 && (
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-12'>
            <StatsCard
              icon={<FileText className='w-8 h-8 text-blue-600' />}
              stat={stats.total}
              textContent='Total Resumes'
            />
            <StatsCard
              icon={<Target className='w-8 h-8 text-green-600' />}
              stat={stats.averageScore}
              textContent='Average Score'
            />
            <StatsCard
              icon={<Award className='w-8 h-8 text-purple-600' />}
              stat={stats.excellentCount}
              textContent='Excellent Rated'
            />
            <StatsCard
              icon={<Building2 className='w-8 h-8 text-orange-600' />}
              stat={stats.companiesCount}
              textContent='Companies'
            />
          </div>
        )}


        {/* Empty state */}
        {resumes.length === 0 && !isLoadingData && (
          <EmptyResumeState />
        )}


        {/* Resume Grid */}
        {resumes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resumes.map((resume) => (
              <ResumeCard
                key={resume.projectId}
                resume={resume}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default ExplorePage