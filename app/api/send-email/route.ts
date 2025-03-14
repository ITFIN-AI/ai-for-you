import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create a transporter with your SMTP configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true, // true for port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { name, email, message, workflowType, automationNeeds, phone } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Log the email attempt for debugging
    console.log('Attempting to send email with the following configuration:');
    console.log(`SMTP Host: ${process.env.SMTP_HOST}`);
    console.log(`SMTP Port: ${process.env.SMTP_PORT}`);
    console.log(`SMTP User: ${process.env.SMTP_USER}`);
    console.log(`From: ${process.env.SMTP_FROM}`);
    
    // Create email content
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_USER, // Send to yourself
      replyTo: email,
      subject: `New Message from ${name} - AI for You`,
      text: `
Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
${workflowType ? `Workflow Type: ${workflowType}` : ''}
${automationNeeds?.length ? `Automation Needs: ${automationNeeds.join(', ')}` : ''}

Message:
${message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #4f46e5;">New Message from AI for You Website</h2>
  
  <div style="margin-bottom: 20px; padding: 15px; background-color: #f9fafb; border-radius: 8px;">
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
    ${workflowType ? `<p><strong>Workflow Type:</strong> ${workflowType}</p>` : ''}
    ${automationNeeds?.length ? `<p><strong>Automation Needs:</strong> ${automationNeeds.join(', ')}</p>` : ''}
  </div>
  
  <div style="padding: 15px; background-color: #f3f4f6; border-radius: 8px;">
    <h3 style="color: #4338ca;">Message:</h3>
    <p style="white-space: pre-line;">${message}</p>
  </div>
</div>
      `,
    };

    // Send the email
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.messageId);
      return NextResponse.json({ success: true });
    } catch (emailError: any) {
      console.error('SMTP Error:', emailError);
      
      // Check for authentication errors
      if (emailError.code === 'EAUTH') {
        return NextResponse.json(
          { 
            error: 'Email authentication failed. Please check your SMTP credentials.',
            details: emailError.message
          },
          { status: 500 }
        );
      }
      
      // Handle other email sending errors
      return NextResponse.json(
        { 
          error: 'Failed to send email',
          details: emailError.message
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
} 