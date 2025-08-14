import mongoose from "mongoose";

interface User {
    firstName: string;
    lastName: string;
    email: string;
    imageUrl: string;
}

interface ResumeAnalysisSection {
    sectionName: string;
    score: number;
    improvements: string[];
}

interface ResumeAnalysisData {
    overallScore: number;
    overallRating: "Poor" | "Good" | "Very Good" | "Excellent";
    overallComments: string;
    sections: ResumeAnalysisSection[];
    jobMatchScore: number;
    jobMatchComments: string;
}

interface ResumeAnalysisObject {
    _id: mongoose.Types.ObjectId;
    userId: string;
    projectId: string;
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    resumeFileUrl: string;
    resumeFileName: string;
    resumeImageUrl: string;
    resumeAnalysis: ResumeAnalysisData;
    resumeAnalysisStatus: "Pending" | "Completed" | "Failed"
    rawTextContext: string;
}


interface ResumeFeedbackProps {
    data: {
        overallScore: number;
        overallRating: number;
        overallComments: number;
        sections: {
            sectionName: string;
            score: number;
            improvements: string[];
        };
        jobMatchScore: number;
        jobMatchComments: string;
    }
}