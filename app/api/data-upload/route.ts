/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import PDFParser from "pdf2json";
import { auth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import { v4 as uuid} from "uuid";

import connectToMongoDB from "@/lib/mongo";
import ResumeModel from "@/models/resume.model";


// cloudinary config
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME!,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_SECRET_KEY!,
});

export async function POST(req: NextRequest) {
  // protect the route
  const { userId } = await auth.protect();

  if (!userId) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized Access!!",
      },
      { status: 404 }
    );
  }

  // connect to mongoDB
  await connectToMongoDB();

  try {
    // get FormData
    const formData = await req.formData();
    const resumeFile = formData.get("resumeFile") as File;
    const companyName = formData.get("companyName") as string;
    const jobTitle = formData.get("jobTitle") as string;
    const jobDescription = formData.get("jobDescription") as string;

    if (!resumeFile || !companyName || !jobTitle || !jobDescription) {
      return NextResponse.json(
        { error: "All fields are required!" },
        { status: 400 }
      );
    }

    if (!(resumeFile instanceof File)) {
      return NextResponse.json({ error: "Invalid File" }, { status: 401 });
    }

    // convert uploaded file to buffer
    const fileBuffer = Buffer.from(await resumeFile.arrayBuffer());

    /**
     * !! parse directly from buffer
     */
    const parsedText = await new Promise<string>((resolve, reject) => {
      const pdfParser = new (PDFParser as any)(null, 1);

      pdfParser.on("pdfParser_dataError", (errData: any) => {
        reject(errData.parserError);
      });

      pdfParser.on("pdfParser_dataReady", () => {
        resolve((pdfParser as any).getRawTextContent());
      });

      pdfParser.parseBuffer(fileBuffer);
    });

    /**
     * !! Build AI Prompt
     */
    const aiPrompt = `
    You are an expert resume reviewer and hiring consultant. Analyze the provided resume against the job description and provide an objective evaluation.
    
    Your response must be in **valid JSON only** with no extra commentary, formatted as:
    {
      "overallScore": number (0-100),
      "overallRating": "Poor" | "Good" | "Very Good" | "Excellent",
      "overallComments": string,
      "sections": [
        {
          "sectionName": string,
          "score": number,
          "improvements": [string]
        }
      ],
      "jobMatchScore": number,
      "jobMatchComments": string
    }
    
    Scoring guidelines:
    - Base ratings strictly on content quality, relevance, and clarity.
    - Be concise but specific in improvement suggestions.
    - Use plain English with no jargon unless it's from the job description.
    
    Resume Text:
    ${parsedText}
    
    Job Details:
    Company Name: ${companyName}
    Job Title: ${jobTitle}
    Job Description: ${jobDescription}
    `;

    /**
     * ?? Create OpenAI Client
     */
    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENROUTER_AI_PROJECT_KEY!,
      baseURL: "https://openrouter.ai/api/v1",
    });

    /**
     * !! Create an completion
     */
    const response = await openai.chat.completions.create({
      model: "tngtech/deepseek-r1t2-chimera:free",
      messages: [{ role: "user", content: aiPrompt }],
    });

    // Extract and Parse the API reponse
    const aiResponseContent = response.choices[0]?.message?.content;

    if (!aiResponseContent) {
      return NextResponse.json(
        {
          success: false,
          message: "No AI response returned!",
        },
        { status: 404 }
      );
    }

    let parsedData;

    try {
      // Clean the AI response
      const cleanedAiResponse = aiResponseContent
        ?.replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      // Look for the complete JSON object
      const startJSON = cleanedAiResponse?.indexOf("{");
      const endJSON = cleanedAiResponse?.lastIndexOf("}");

      if (startJSON !== -1 && endJSON !== -1 && endJSON > startJSON) {
        const jsonString = cleanedAiResponse?.slice(startJSON, endJSON + 1);
        parsedData = JSON.parse(jsonString);
      } else {
        // if no cleaned JSON boundaries, try parsing the cleaned response
        parsedData = JSON.parse(cleanedAiResponse);
      }
    } catch (parseError) {
      console.log("Failed to parse AI response", parseError);
      return NextResponse.json(
        {
          success: false,
          message: "Invalid AI Response format",
          error: parseError,
        },
        { status: 500 }
      );
    }

    // save PDF to cloudinary & the data to mongoDB
    if (parsedData) {
      try {
        // Save the PDF to Cloudinary
        const pdfUploadResult = (await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                resource_type: "image", // Use 'raw' for PDFs
                folder: "resumes/pdfs", // Organize in a folder
                public_id: `resume_pdf_${userId}_${Date.now()}`, // Unique filename
                format: "pdf",
                access_mode: "public"
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            ).end(fileBuffer);
        })) as any;

        // Generate the image url from the pdf using cloudinary transformations
        const imageUrl = cloudinary.url(pdfUploadResult.public_id, {
          resource_type: "image",
          format: "png",
          page: 1,
          width: 800,
          height: 1000,
          crop: "fit",
          quality: "auto:good"
        })

        // SAVE TO MONGODB
        const resumeDoc = await ResumeModel.create({
          userId,
          projectId: uuid(),
          companyName,
          jobTitle,
          jobDescription,
          resumeFileName: resumeFile.name,
          resumeFileUrl: pdfUploadResult.secure_url,
          resumeImageUrl: imageUrl,
          resumeAnalysis: parsedData,
          rawContextText: parsedText,
          resumeAnalysisStatus: "Completed"
        });

        return NextResponse.json({
          success: true,
          message: "Resume analysis completed and saved successfully!",
          data: {
            analysis: parsedData,
            imageUrl: imageUrl,
            projectId: resumeDoc.projectId
          }
        })
          
      } catch (error) {
        console.log("Error while saving data", error);
        return NextResponse.json(
          {
            success: false,
            message: "Failed to save data",
            error,
          },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "No parsed data to save",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log("Internal Server Error", error);
    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
