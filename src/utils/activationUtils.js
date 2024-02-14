import dotenv from "dotenv";
import crypto from "crypto";
import nodemailer from "nodemailer";

dotenv.config();

export const generateActivationCode = () => {
  return crypto.randomBytes(20).toString("hex");
};

export const sendActivationEmail = (email, activationCode) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: process.env.BREVOEMAIL,
      pass: process.env.BREVOSMTPKEY,
    },
  });

  const mailOptions = {
    from: process.env.BREVOEMAIL,
    to: email,
    subject: "Activate Your Account",
    text: `Your activation code is: ${activationCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      // Handle the error appropriately
    } else {
      console.log("Email sent:", info.response);
    }
  });
};
