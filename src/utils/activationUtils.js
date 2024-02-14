import dotenv from "dotenv";
import crypto from "crypto";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

dotenv.config();

// Generate registration code
export const generateRegistrationCode = () => {
  const codeLength = 6; // Length of the registration code
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let registrationCode = "";
  for (let i = 0; i < codeLength; i++) {
    const randomIndex = crypto.randomInt(0, charset.length);
    registrationCode += charset[randomIndex];
  }
  return registrationCode;
};

export const sendActivationEmail = (email, registrationCode) => {
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
    text: `Your activation code is: ${registrationCode}`,
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

// Generate JWT token for user
export const generateAuthToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    // Add any additional user data you want to include in the token
  };
  const secretKey = process.env.JWT_SECRET; // You should define this secret key in your environment variables
  const options = {
    expiresIn: "1h", // Token expiration time
  };
  return jwt.sign(payload, secretKey, options);
};
