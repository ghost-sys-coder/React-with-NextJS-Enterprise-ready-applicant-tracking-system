/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import PDFParser from "pdf2json";
import { auth } from "@clerk/nextjs/server";
import connectToMongoDB from "@/lib/mongo";


// import { v4 as uuidv4 } from "uuid";
// import { promises as fs } from "fs";
// import path from "path";


export async function POST(req: NextRequest) {
  // protect the route
  await auth.protect();

  // connect to mongodb
  await connectToMongoDB();

  try {
    // Get FormData
    const formData = await req.formData();
    const resumeFile = formData.get("resumeFile") as File;
    const companyName = formData.get("companyName") as string;
    const jobTitle = formData.get("jobTitle") as string;
    const jobDescription = formData.get("jobDescription") as string;

    if (!resumeFile || !jobDescription || !jobTitle || !companyName) {
      return NextResponse.json(
        { error: "All fields are required!" },
        { status: 400 }
      );
    }

    if (!(resumeFile instanceof File)) {
      return NextResponse.json(
        { error: "Invalid or missing PDF file!" },
        { status: 401 }
      );
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
     * !! Save file to disk for debugging
     * ?? Uncomment if you want to Inspect saved files locally or on tmp in production
     */
    // Generate a unique ID for this resume
    //  const fileName = uuidv4();
    // const tempDir =
    //   process.env.VERCEL === "1" ? "/tmp" : path.join(process.cwd(), "temp");
    // await fs.mkdir(tempDir, { recursive: true }); // ensures the file is created
    // const tempFilePath = path.join(tempDir, `/${fileName}.pdf`);
    // await fs.writeFile(tempFilePath, fileBuffer);

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
     * ?? Call OpenAI
     */
    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENROUTER_AI_PROJECT_KEY!,
      baseURL: "https://openrouter.ai/api/v1",
    });

    const response = await openai.chat.completions.create({
      model: "tngtech/deepseek-r1t2-chimera:free",
      messages: [
        {
          role: "user",
          content: aiPrompt,
        },
      ],
    });

    console.log(response.choices[0].message);
    const feedback = response.choices?.[0]?.message?.content || "No feedback generated!";

    return NextResponse.json({ success: true, feedback }, { status: 200 });
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
