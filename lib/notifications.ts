/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from 'nodemailer';
import { ContactFormData } from '@/types';
// Create transporter - using Gmail as an example
const createTransporter = () => {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NEXT_PUBLIC_GMAIL_USER!,
        pass: process.env.NEXT_PUBLIC_GMAIL_PASSWORD!,
      },
    });
  };
  
  // Alternative: Manual SMTP configuration
  export const createCustomTransporter = () => {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });
  };
  
  // Email template generators
  const generateOwnerNotificationHtml = (formData: ContactFormData) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 30px 20px; border-radius: 10px 10px 0 0; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px;">🔔 New Contact Form Submission</h1>
    </div>
    
    <div style="background: #f8fafc; padding: 30px 20px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 10px 10px;">
      <h2 style="color: #374151; margin-top: 0; font-size: 20px;">Contact Details:</h2>
      
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; width: 100px;">Name:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">${formData.firstName} ${formData.lastName}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Email:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
            <a href="mailto:${formData.email}" style="color: #6366f1; text-decoration: none;">${formData.email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Subject:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">${formData.subject}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: bold;">Time:</td>
          <td style="padding: 10px 0;">${new Date().toLocaleString('en-UG', { 
            timeZone: 'Africa/Kampala',
            dateStyle: 'full',
            timeStyle: 'short'
          })}</td>
        </tr>
      </table>
      
      <h3 style="color: #374151; margin-top: 25px; font-size: 18px;">Message:</h3>
      <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #d1d5db; margin-bottom: 20px;">
        <p style="margin: 0; white-space: pre-wrap;">${formData.message}</p>
      </div>
      
      <div style="background: #ddd6fe; padding: 20px; border-radius: 8px; border-left: 4px solid #6366f1;">
        <h4 style="margin: 0 0 10px 0; color: #6b21a8; font-size: 16px;">💡 Quick Actions:</h4>
        <ul style="margin: 0; padding-left: 20px; color: #6b21a8;">
          <li style="margin-bottom: 5px;">
            <a href="mailto:${formData.email}?subject=Re: ${formData.subject}" style="color: #6366f1; text-decoration: none;">Reply to ${formData.firstName}</a>
          </li>
          <li style="margin-bottom: 5px;">Add to your CRM or follow-up system</li>
          <li>Consider this for future ResumeAI improvements</li>
        </ul>
      </div>
    </div>
    
    <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
      <p>This notification was sent automatically from your ResumeAI contact form.</p>
    </div>
  </body>
  </html>
  `;
  
  const generateOwnerNotificationText = (formData: ContactFormData) => `
  New Contact Form Submission
  
  Name: ${formData.firstName} ${formData.lastName}
  Email: ${formData.email}
  Subject: ${formData.subject}
  Time: ${new Date().toLocaleString('en-UG', { timeZone: 'Africa/Kampala' })}
  
  Message:
  ${formData.message}
  
  Reply to: ${formData.email}
  `;
  
  const generateClientAutoReplyHtml = (formData: ContactFormData) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You - ResumeAI</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 30px 20px; border-radius: 10px 10px 0 0; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px;">Thank You for Reaching Out! 🚀</h1>
    </div>
    
    <div style="background: #f8fafc; padding: 30px 20px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 10px 10px;">
      <h2 style="color: #374151; margin-top: 0; font-size: 20px;">Hi ${formData.firstName}!</h2>
      
      <p style="margin-bottom: 20px; font-size: 16px;">
        Thank you for your interest in <strong>ResumeAI</strong>! We've received your message and appreciate you taking the time to reach out to us.
      </p>
      
      <p style="margin-bottom: 25px; font-size: 16px;">
        Our team will review your inquiry and get back to you within <strong>24 hours</strong>. We're excited to help you transform your career prospects with our AI-powered resume analysis!
      </p>
      
      <div style="background: #ddd6fe; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #6366f1;">
        <h3 style="margin: 0 0 15px 0; color: #6b21a8; font-size: 16px;">📋 Your Message Summary:</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 5px 0; font-weight: bold; color: #6b21a8; width: 80px;">Subject:</td>
            <td style="padding: 5px 0; color: #6b21a8;">${formData.subject}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; font-weight: bold; color: #6b21a8;">Submitted:</td>
            <td style="padding: 5px 0; color: #6b21a8;">${new Date().toLocaleString('en-UG', { 
              timeZone: 'Africa/Kampala',
              dateStyle: 'medium',
              timeStyle: 'short'
            })}</td>
          </tr>
        </table>
      </div>
      
      <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #d1d5db; margin: 25px 0;">
        <h3 style="margin: 0 0 15px 0; color: #374151; font-size: 18px;">🎯 What's Next?</h3>
        <ul style="margin: 0; padding-left: 20px; color: #4b5563;">
          <li style="margin-bottom: 8px;">We'll review your message within the next few hours</li>
          <li style="margin-bottom: 8px;">Our team will respond with personalized assistance</li>
          <li style="margin-bottom: 8px;">In the meantime, feel free to explore our AI-powered features!</li>
        </ul>
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://cvscan-seven.vercel.app/explore" 
           style="background: linear-gradient(135deg, #6366f1, #8b5cf6); 
                  color: white; 
                  padding: 15px 30px; 
                  text-decoration: none; 
                  border-radius: 50px; 
                  font-weight: bold; 
                  font-size: 16px; 
                  display: inline-block;">
          🚀 Explore ResumeAI Features
        </a>
      </div>
      
      <p style="margin-top: 25px; font-size: 16px; color: #4b5563;">
        Best regards,<br>
        <strong>The ResumeAI Team</strong><br>
        <span style="color: #6b7280; font-size: 14px;">Empowering careers through intelligent analysis</span>
      </p>
    </div>
    
    <div style="text-align: center; margin-top: 20px; padding: 20px; color: #6b7280; font-size: 12px; border-top: 1px solid #e5e7eb;">
      <p style="margin: 0 0 10px 0;">
        This is an automated response. Please don't reply to this email.
      </p>
      <p style="margin: 0;">
        © 2025 ResumeAI. All rights reserved.
      </p>
    </div>
  </body>
  </html>
  `;
  
  const generateClientAutoReplyText = (formData: ContactFormData) => `
  Hi ${formData.firstName}!
  
  Thank you for your interest in ResumeAI! We've received your message and appreciate you taking the time to reach out to us.
  
  Your Message Summary:
  - Subject: ${formData.subject}
  - Submitted: ${new Date().toLocaleString('en-UG', { timeZone: 'Africa/Kampala' })}
  
  Our team will review your inquiry and get back to you within 24 hours. We're excited to help you transform your career prospects with our AI-powered resume analysis!
  
  What's Next?
  • We'll review your message within the next few hours
  • Our team will respond with personalized assistance  
  • In the meantime, feel free to explore our AI-powered features!
  
  Best regards,
  The ResumeAI Team
  Empowering careers through intelligent analysis
  
  ---
  This is an automated response. Please don't reply to this email.
  © 2025 ResumeAI. All rights reserved.
  `;
  
  // Helper function to send email
  const sendEmail = async (mailOptions: any) => {
    try {
      const transporter = createTransporter();
      const result = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' };
    }
  };
  
  // Send notification email to owner
  export async function sendOwnerNotification(formData: ContactFormData) {
    const mailOptions = {
      from: `"ResumeAI Contact Form" <${process.env.NEXT_PUBLIC_GMAIL_USER!}>`,
      to: process.env.NEXT_PUBLIC_GMAIL_ACCOUNT_OWNER!,
      subject: `🔔 New Contact Form Submission: ${formData.subject}`,
      html: generateOwnerNotificationHtml(formData),
      text: generateOwnerNotificationText(formData),
    };
  
    return await sendEmail(mailOptions);
  }
  
  // Send auto-reply email to the client
  export async function sendClientAutoReply(formData: ContactFormData) {
    const mailOptions = {
      from: `"ResumeAI Team" <${process.env.EMAIL_USER}>`,
      to: formData.email,
      subject: `Thank you for contacting ResumeAI - We'll be in touch soon!`,
      html: generateClientAutoReplyHtml(formData),
      text: generateClientAutoReplyText(formData),
    };
  
    return await sendEmail(mailOptions);
  }
  
  // Main function to send both emails
  export async function sendContactFormEmails(formData: ContactFormData) {
    const [ownerResult, clientResult] = await Promise.allSettled([
      sendOwnerNotification(formData),
      sendClientAutoReply(formData)
    ]);
  
    return {
      ownerNotification: ownerResult.status === 'fulfilled' ? ownerResult.value : { success: false, error: ownerResult.reason },
      clientAutoReply: clientResult.status === 'fulfilled' ? clientResult.value : { success: false, error: clientResult.reason }
    };
  }