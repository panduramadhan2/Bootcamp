import dotenv from "dotenv";
import crypto from "crypto";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.BREVOEMAIL,
    pass: process.env.BREVOSMTPKEY,
  },
});

export const sendActivationEmail = (email, registrationCode) => {
  const mailOptions = {
    from: process.env.BREVOEMAIL,
    to: email,
    subject: "Activate Your Account",
    text: `Your activation code is: ${registrationCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending activation email:", error);
    } else {
      console.log("Activation email sent:", info.response);
    }
  });
};

export const sendPasswordResetEmail = (email, resetToken) => {
  const mailOptions = {
    from: process.env.BREVOEMAIL,
    to: email,
    subject: "Password Reset",
    html: `
      <p>Click the following link to reset your password:</p>
      <p><a href="http://localhost:5000/reset-password/${resetToken}">Reset Password</a></p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending password reset email:", error);
    } else {
      console.log("Password reset email sent:", info.response);
    }
  });
};

export const generateRegistrationCode = () => {
  const codeLength = 6;
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let registrationCode = "";
  for (let i = 0; i < codeLength; i++) {
    const randomIndex = crypto.randomInt(0, charset.length);
    registrationCode += charset[randomIndex];
  }
  return registrationCode;
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
