import crypto from "crypto";
import nodemailer from "nodemailer";

export const generateActivationCode = () => {
  return crypto.randomBytes(20).toString("hex");
};

export const sendActivationEmail = (req, res) => {
  const { email, activationCode } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: req.body.email, // Assuming req.body.email contains the email
      pass: req.body.password, // Assuming req.body.password contains the password
    },
  });

  const mailOptions = {
    from: req.body.email,
    to: email,
    subject: "Activate Your Account",
    text: `Your activation code is: ${activationCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: "Error sending activation email" });
    }

    console.log("Email sent:", info.response);
    res.status(200).json({ message: "Activation email sent successfully" });
  });
};
