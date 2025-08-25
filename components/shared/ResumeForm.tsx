"use client";
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form } from '../ui/form';

import { Button } from '../ui/button';
import FileUploader from './FileUploader';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';

import ResumePDFPreview from './ResumePDFPreview'
import FormInputTextArea from './FormInput';



export function cleanData(feedback: string) {
    return feedback.replace("```json", "").replace("```", "");
}


const formSchema = z.object({
    companyName: z.string().min(1, "Company name is required!"),
    jobTitle: z.string().min(1, "Job title is required!"),
    jobDescription: z.string().min(1, "Job Description"),
    resumeFile: z.any()
        .refine(file => file instanceof File && file.type === "application/pdf", {
            message: "Only PDF files are allowed"
        }).refine(file => file instanceof File && file.size <= 20 * 1024 * 1024, {
            message: "File size must less than 20MB"
        }).optional(),
    currentPlan: z.string()
        .refine(plan => ["free_plan", "starter_plan", "professional_plan", "enterprise_plan"].includes(plan), {
            message: "Invalid plan type"
        }).optional(),

})

const ResumeForm = ({ currentPlan }: { currentPlan: string }) => {
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);


    // Define your form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            companyName: "",
            jobTitle: "",
            jobDescription: "",
            resumeFile: null,
            currentPlan: currentPlan || "free_plan"
        }
    });

    // define submit handler
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const formData = new FormData();
        formData.append("companyName", data.companyName);
        formData.append("jobTitle", data.jobTitle);
        formData.append("jobDescription", data.jobDescription);
        formData.append("resumeFile", data.resumeFile);
        formData.append("currentPlan", data.currentPlan ?? "free_plan");

        setIsProcessing(true);

        try {
            const response = await fetch("/api/data-upload", {
                method: "POST",
                body: formData
            });

            const { data } = await response.json();
            console.log("Response Data", data);

            // if (data.projectId) return router.push(`/resumes/${data.projectId}`);

        } catch (error) {
            console.log("Error sending Request", error);
        } finally {
            setIsProcessing(false);
        }
    }

    return (
        <div className='max-w-5xl mx-auto shadow-lg rounded-2xl p-3 flex gap-4'>
            <div className="lg:w-[650px] w-full">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        {/* hidden input for current plan */}
                        <input
                            type="hidden"
                            {...form.register("currentPlan")}
                            value={currentPlan}
                        />
                        <FormInputTextArea
                            name='companyName'
                            placeholder='Company Name...'
                            form={form}
                            componentType='Input'
                            label='Enter Company Name'
                        />
                        <FormInputTextArea
                            name='jobTitle'
                            placeholder='Job Title...'
                            form={form}
                            componentType='Input'
                            label='Enter Job Title'
                        />
                        <FormInputTextArea
                            name='jobDescription'
                            placeholder='Provide Job Description...'
                            form={form}
                            componentType='Textarea'
                            label='Enter Job Description'
                        />
                        <FileUploader
                            form={form}
                            name='resumeFile'
                            accept='application/pdf'
                            maxSize={20}
                            label='Upload Resume PDF File'
                        />
                        <div className={clsx("flex items-center w-full", isProcessing ? "justify-center" : "justify-start")}>
                            <Button
                                className='cursor-pointer hover:opacity-90'
                                type="submit"
                                disabled={isProcessing}
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 size={30} className='animate-spin' />
                                        <span>Processing your resume...</span>
                                    </>
                                ) : (
                                    <span>Analyze Your Resume</span>
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
            <ResumePDFPreview />
        </div>
    )
}

export default ResumeForm