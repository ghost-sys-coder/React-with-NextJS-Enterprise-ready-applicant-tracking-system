import React from 'react'

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form'
import { Textarea } from '../ui/textarea';

interface FormInputProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    name: FieldPath<T>;
    label: string;
    placeholder: string;
    componentType: "Input" | "Textarea"
}

const FormInputTextArea = <T extends FieldValues>({ form, name, label, placeholder, componentType }: FormInputProps<T>) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => {
                return (
                    <FormItem className='my-6'>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            {componentType === "Input" ? (
                                <Input
                                    placeholder={placeholder}
                                    {...field}
                                />
                            ) : (
                                <Textarea
                                    rows={10}
                                    placeholder={placeholder}
                                    {...field}
                                    className='max-h-[300px]'
                                />
                            )}
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )
            }}
        />
    )
}

export default FormInputTextArea;