import nodemailer from "nodemailer";
import dotenv from 'dotenv';

dotenv.config();
const sendEmail = async (email, subject, text) => {
  try {
    const transportor = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: text,
    };
    await transportor.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Error sending email:", error);
  }
};
export default sendEmail;