import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Ensure your .env is loaded

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false, // Must be false for port 587 (STARTTLS)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Optional: verify the SMTP connection when server starts
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ SMTP Error:', error);
  } else {
    console.log('✅ SMTP Connection Successful');
  }
});

export default transporter;
