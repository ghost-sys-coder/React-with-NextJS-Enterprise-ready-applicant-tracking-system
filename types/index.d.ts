interface User {
    firstName: string;
    lastName: string;
    email: string;
    imageUrl: string;
}

interface ResumeAnalysisObject {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    resumeFileUrl: File;
    resumeAnalysis: string;
}