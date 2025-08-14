import { NextResponse, NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";


import connectToMongoDB from "@/lib/mongo";
import ResumeModel from "@/models/resume.model";

export async function GET(
    req: NextRequest,
    context: {params: Promise<{resumeId: string}>}
) {
    const { resumeId } = await context.params;

    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized access!"
            }, { status: 401 });
        }

        await connectToMongoDB();

        // Find the resume
        const resume = await ResumeModel.findOne({
            projectId: resumeId,
            userId: userId
        }).lean().exec();

        if (!resume) {
            return NextResponse.json({
                success: false,
                message: "No resume found!"
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Resume Found",
            data: resume
        }, { status: 200 });
    } catch (error) {
        console.log("Internal Server Erorr:", error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error"
        }, { status: 500 });
    }
}