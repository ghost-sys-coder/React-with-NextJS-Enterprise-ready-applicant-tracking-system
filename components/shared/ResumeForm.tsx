"use client";
import React from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form } from '../ui/form';

import ResumePDFPreview from './ResumePDFPreview'
import FormInputTextArea from './FormInput';
import { Button } from '../ui/button';
import FileUploader from './FileUploader';


const formSchema = z.object({
    companyName: z.string().min(1, "Company name is required!"),
    jobTitle: z.string().min(1, "Job title is required!"),
    jobDescription: z.string().min(1, "Job Description"),
    resumeFile: z.any()
        .refine(file => file instanceof File && file.type === "application/pdf", {
            message: "Only PDF files are allowed"
        }).refine(file => file instanceof File && file.size <= 20 * 1024 * 1024, {
            message: "File size must less than 20MB"
        }).optional()
})

const ResumeForm = () => {
    // Define your form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            companyName: "",
            jobTitle: "",
            jobDescription: "",
            resumeFile: null
        }
    });

    // define submit handler
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        console.log({ data });
    }

    return (
        <div className='max-w-5xl mx-auto shadow-lg rounded-2xl p-3 flex gap-4'>
            <div className="lg:w-[650px] w-full">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
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
                        <Button className='cursor-pointer hover:opacity-90' type="submit">Analyze Resume</Button>
                    </form>
                </Form>
            </div>
            <ResumePDFPreview />
        </div>
    )
}

export default ResumeForm