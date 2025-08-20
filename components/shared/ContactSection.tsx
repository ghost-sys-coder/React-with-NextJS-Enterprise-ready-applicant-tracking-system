"use client";
import React, { useState } from 'react'
import SectionWrapper from './SectionWrapper'
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

const ContactSection = () => {
    const [contactInfo, setContactInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setContactInfo(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
          console.log("Submitting contact form with data:", contactInfo);  
        } catch (error) {
            console.log("Error submitting contact form:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <SectionWrapper sectionId='contact' className='mt-30 px-4 md:px-6 lg:px-8 space-y-8'>
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-lg  border border-purple-500/20 rounded-xl p-8">
                <h5 className='text-2xl font-semibold text-white mb-6 text-center'>Send a message or an Inquiry</h5>
                <form className="space-y-6 max-w-4xl mx-auto" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='firstName'>First Name</Label>
                            <Input
                                id='firstName'
                                name="firstName"
                                value={contactInfo.firstName}
                                placeholder='Enter your first name'
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='lastName'>Last Name</Label>
                            <Input
                                id='lastName'
                                name="lastName"
                                value={contactInfo.lastName}
                                placeholder='Enter your last name'
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='email'>Email</Label>
                            <Input
                                id='email'
                                name="email"
                                value={contactInfo.email}
                                placeholder='e.g johndoe@example.com'
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='subject'>Subject</Label>
                            <Input
                                id='subject'
                                name={"subject"}
                                value={contactInfo.subject}
                                placeholder='Email Subject...'
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-full">
                            <Label htmlFor='message'>Message Or Inquiry</Label>
                            <Textarea
                                id='message'
                                name='message'
                                value={contactInfo.message}
                                placeholder='Write your message or inquiry here...'
                                onChange={handleChange}
                                className='h-32 md:h-40 mt-2'
                            />
                        </div>
                    </div>
                    <div className="flex justify-end items-center">
                        <Button type="submit"
                            className='bg-gradient-to-br from-purple-400 to-pink-400/50 px-4 py-6'
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className='animate-spin' />
                                    <span>Submitting...</span>
                                </>
                            ) : (
                                    <span>Send Message</span>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </SectionWrapper>
    )
}

export default ContactSection