import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectToMongoDB from "@/lib/mongo";
import ResumeModel from "@/models/resume.model";

export async function GET() {
  // protect the route
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Unathorized Access",
        },
        { status: 401 }
      );
    }

  // connect to mongoDB
  await connectToMongoDB();

  try {
    const response = await ResumeModel.find({
      userId: userId
    })
      .select(
        "projectId companyName jobTitle resumeFileName resumeFileUrl resumeImageUrl resumeAnalysis.overallScore resumeAnalysis.overallRating resumeAnalysis.jobMatchScore resumeAnalysisStatus createdAt"
      )
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    if (!response) {
      return NextResponse.json(
        {
          success: false,
          message: "No Resumes found!",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `${response.length} Resumes Found!`,
        data: response,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Internal Server Error:", error);
  }
}
