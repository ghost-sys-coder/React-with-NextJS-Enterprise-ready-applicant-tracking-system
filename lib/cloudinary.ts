import { v2 as cloudinary } from "cloudinary";

// cloudinary config
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME!,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_SECRET_KEY!
});


export async function SavePDFToCloudinary(userId: string, fileBuffer: Buffer) {
    // Save the PDF to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            resource_type: "raw", // Use 'raw' for PDFs
            folder: "resumes", // Organize in a folder
            public_id: `resume_${userId}_${Date.now()}`, // Unique filename
            use_filename: true,
            unique_filename: false,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(fileBuffer);
      }) as unknown;

    return uploadResult;
}