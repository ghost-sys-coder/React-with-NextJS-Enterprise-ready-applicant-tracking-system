import React from 'react'
import { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Label } from '../ui/label';
import clsx from 'clsx';
import { UploadCloud } from 'lucide-react';
import { Input } from '../ui/input';
import { useResumeFileStore } from '@/context/resumeFileContext';

interface FileUploaderProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    name: FieldPath<T>;
    label: string;
    placeholder?: string;
    accept?: string;
    maxSize: number;
}

const FileUploader = <T extends FieldValues>({
    form, name, label, accept, maxSize }: FileUploaderProps<T>) => {
    const { setResumeFile } = useResumeFileStore();

    const { formState: { errors }, setError,  watch } = form;
    const file = watch(name) as File | null;
  
    
  return (
    <FormField
    control={form.control}
    name={name}
    render={({ field }) => {
        return (
            <FormItem className='my-6'>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <div className="flex flex-col gap-4">
                        <Label
                            htmlFor={`${name}-upload`}
                            className={clsx(`flex justify-center items-center gap-3 px-4 py-3 rounded-md shadow-md cursor-pointer border border-dashed transition hover:bg-gray-600 dark:hover:bg-gray-800 hover:text-white`, errors[name] ? 'border-red-500 text-red-500' : 'border-gray-300 text-gray-700')}
                        >
                            <UploadCloud className='w-5 h-5' />
                            <span>{file ? "Change File" : "Upload Your Resume File (PDF)"}</span>
                        </Label>
                        <Input
                            id={`${name}-upload`}
                            type='file'
                            accept={accept}
                            hidden
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    const selectedFile = e.target.files[0];
                                    if (!selectedFile) return;

                                    const isSizeValid = selectedFile.size <= maxSize * 1024 * 1024;
                                    
                                    const isTypeValid = selectedFile.type === accept;


                                    if (!isSizeValid) {
                                        setError(name, {
                                            type: "manual",
                                            message: `File size exceeds ${maxSize}MB. Please upload a smaller file.`,
                                        })
                                    }
                                    if (!isTypeValid) {
                                        setError(name, {
                                            type: "manual",
                                            message: "File should be a PDF"
                                        })
                                    }
                                    field.onChange(e.target.files[0]);
                                    setResumeFile(e.target.files[0]);
                                }
                            }}
                        />
                        {file && (
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-green-700 font-bold truncate">{file.name}</span>
                            </div>
                        )}
                    </div>
                </FormControl>
                <FormMessage />
            </FormItem>
        )
    }}
/>
  )
}

export default FileUploader