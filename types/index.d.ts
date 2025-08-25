import mongoose from "mongoose";

interface User {
  clerkUserId: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  userCurrentSubscription: string;
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
  resumeAnalysisStatus: "Pending" | "Completed" | "Failed";
  rawTextContext: string;
  createdAt: Date;
  updatedAt: Date;
  // New Features Added
  maxResumesAnalyzed: number;
  maxResumesStored: number;
  prioritySupport: boolean;
  canAccessPremiumFeatures: boolean;
  customBranding: boolean;
  accessPlan: string;
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
  };
}

interface ResumeItem {
  _id: mongoose.Types.ObjectId;
  projectId: string;
  companyName: string;
  jobTitle: string;
  resumeFileName: string;
  resumeFileUrl: string;
  resumeImageUrl: string;
  resumeAnalysis: {
    overallScore: number;
    overallRating: "Poor" | "Good" | "Very Good" | "Excellent";
    jobMatchScore: number;
  };
  resumeAnalysisStatus: "Pending" | "Completed" | "Failed";
  createdAt: string;
}


// Contact form Data
interface ContactFormData {
  firstName: string;
  lastName: string;
  subject: string;
  email: string;
  message: string;
}

interface NotificationConfig {
  ownerEmail: string;
  ownerPhone: string;
  ownerName: string;
}
