"use client";
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import { ResumeAnalysisObject } from '@/types';


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
            try {
                const response = await fetch(`/api/resume/${id}`);
                const result: AiResponse = await response.json();

                if (!response.ok) {
                    throw new Error(result.error || "Failed to fetch data")
                }

                if (result.success && result.success) {
                    console.log(result.data);
                    setResumeData(result.data ?? null);
                } else {
                    throw new Error("Invalid response Format")
                }

            } catch (error) {
                console.log("Something went wrong!", error);
            } finally {
                setIsLoadingData(false);
            }
        }
        fetchResumeData();
    }, [id]);

  return (
      <div className='py-4 px-4 flex justify-center items-center min-h-screen'>
          {id}
    </div>
  )
}

export default SingleResumePage