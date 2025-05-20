import nodemailer from "nodemailer"

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
 service: "gmail",
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.GOOGLE_APP_PASS, 
  },
});

export default transporter;