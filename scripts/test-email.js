// Test script for email functionality
require('dotenv').config({ path: '.env.local' });
const nodemailer = require('nodemailer');

// Create a transporter with SMTP configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Test email data
const mailOptions = {
  from: process.env.SMTP_FROM,
  to: process.env.SMTP_USER, // Send to yourself for testing
  subject: 'Test Email from AI for You',
  text: 'This is a test email to verify that the SMTP configuration is working correctly.',
  html: '<p>This is a test email to verify that the SMTP configuration is working correctly.</p>',
};

// Send the test email
async function sendTestEmail() {
  console.log('Sending test email...');
  console.log('SMTP Configuration:');
  console.log(`Host: ${process.env.SMTP_HOST}`);
  console.log(`Port: ${process.env.SMTP_PORT}`);
  console.log(`User: ${process.env.SMTP_USER}`);
  console.log(`From: ${process.env.SMTP_FROM}`);
  
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
    console.log('Message ID:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

// Execute the test
sendTestEmail()
  .then(() => {
    console.log('Test completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Test failed:', error);
    process.exit(1);
  }); 