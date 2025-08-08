import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema<ResumeAnalysisObject>(
  {
    companyName: { type: String, required: true },
    jobTitle: { type: String, required: true },
    jobDescription: { type: String, required: true },
    resumeFileUrl: { type: String, required: true },
    resumeAnalysis: { type: String, required: true },
  },
  { timestamps: true }
);

const ResumeModel =
  mongoose.models.Resume || mongoose.model("Resume", resumeSchema);

export default ResumeModel;
