import mongoose from "mongoose";
import { ResumeAnalysisData, ResumeAnalysisObject, ResumeAnalysisSection } from "@/types";

const resumeSectionSchema = new mongoose.Schema<ResumeAnalysisSection>({
  sectionName: { type: String, required: true },
  score: { type: Number, required: true, min: 0, max: 100 },
  improvements: { type: [String], required: true }
}, { _id: false}); // _id: false to prevent auto-generation of _id for subdocuments

const resumeAnalysisSchema = new mongoose.Schema<ResumeAnalysisData>({
  overallScore: { type: Number, required: true, min: 0, max: 100 },
  overallComments: { type: String, required: true },
  overallRating: {
    type: String,
    required: true,
    enum: ["Poor", "Good", "Very Good", "Excellent"]
  },
  sections: { type: [resumeSectionSchema], required: true },
  jobMatchScore: { type: Number, required: true, min: 0, max: 100 },
  jobMatchComments: { type: String, required: true}
}, {_id: false})

const resumeSchema = new mongoose.Schema<ResumeAnalysisObject>({
  userId: { type: String, required: true },
  projectId: { type: String, required: true },
  companyName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  jobDescription: { type: String, required: true },
  resumeFileName: { type: String, required: true },
  resumeFileUrl: { type: String, required: true }, // STORE ORIGINAL FILENAME
  resumeImageUrl: { type: String, required: true},
  resumeAnalysis: { type: resumeAnalysisSchema, required: true }, // structured analysis object
  
  // store raw text content for future reference
  rawTextContext: { type: String },

  // status tracking
  resumeAnalysisStatus: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending"
  },

  // New Features Added
  maxResumesAnalyzed: {
    type: Number,
    default: 0,
    min: 0,
  },
  maxResumesStored: {
    type: Number,
    default: 0,
    min: 0,
  },
  prioritySupport: {
    type: Boolean,
    default: false,
  },
  canAccessPremiumFeatures: {
    type: Boolean,
    default: false,
  },
  customBranding: {
    type: Boolean,
    default: false,
  },
  accessPlan: {
    type: String,
    enum: ["free_plan", "starter_plan", "professional_plan", "enterprise_plan"],
    default: "Free Plan"
  }
}, {
  timestamps: true,
});

// Add indexes for efficient querying
resumeSchema.index({ userId: 1, companyName: 1 });
resumeSchema.index({ userId: 1, jobTitle: 1 });

const ResumeModel =
  mongoose.models.Resume || mongoose.model("Resume", resumeSchema);

export default ResumeModel;
