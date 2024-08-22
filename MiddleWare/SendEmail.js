import nodemailer from "nodemailer";
import dotenv from 'dotenv';

dotenv.config();

const sendEmail = async (email, subject) => {
  try {
    console.log("Email User:", process.env.EMAIL_USER);
    console.log("Email Pass:", process.env.EMAIL_PASS);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `Cyber e-commerce <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; border-radius: 10px;">
          <div style="text-align: center;">
            <h2 style="color: #333;">This is a Demo Email</h2>
            <p style="font-size: 16px; color: #666;">Follow the steps below to get started:</p>
          </div>
          <div style="background-color: #fff; padding: 20px; border-radius: 10px;">
            <h3 style="color: #333; margin-bottom: 10px;">Steps:</h3>
            <ol style="font-size: 16px; color: #555; line-height: 1.6; padding-left: 20px;">
              <li>Step 1: check and explore our products.</li>
              <li>Step 2: Purchase our products.</li>
              <li>Step 3: Enjoy your chill life.</li>
            </ol>
          </div>
          <div style="text-align: center; margin-top: 20px;">
            <a href="#" style="background-color: #007BFF; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Get Started</a>
          </div>
          <footer style="text-align: center; margin-top: 20px; color: #aaa; font-size: 14px;">
            <p>&copy; ${new Date().getFullYear()} Cyber E-commerce. All rights reserved.</p>
          </footer>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

export default sendEmail;
