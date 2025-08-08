import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useResumeFileStore } from '@/context/resumeFileContext'

const ResumePDFPreview = () => {
    const { resumeFile } = useResumeFileStore();
    const fileUrl = resumeFile ? URL.createObjectURL(resumeFile) : null;

    return (
        <Card className='w-[300px] hidden lg:block'>
            <CardHeader>
                <CardTitle>Preview your PDF resume</CardTitle>
                <CardDescription>This preview is not editable</CardDescription>
            </CardHeader>
            <CardContent>
                {fileUrl ? (
                    <iframe
                        src={fileUrl}
                        title='PDF Preview'
                        className='w-full h-[400px] rounded-md mt-5'
                    />
                ) : (
                    <div className="flex justify-center items-center h-64">
                        <p className="text-gray-600">No PDF uploaded. Please upload a PDF file to preview.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default ResumePDFPreview