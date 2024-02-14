import crypto from "crypto";
import User from "../models/usersModel.js";
import { sendPasswordResetEmail } from "../utils/activationUtils.js";
// import { sendPasswordResetEmail } from "../utils/emailUtils";

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Generate a unique reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Set the reset token and expiration time in the user record
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour validity

    // Save the updated user record
    await user.save();

    // Send the password reset email with the reset token link
    sendPasswordResetEmail(user.email, resetToken);

    res.json({ message: "Password reset email sent successfully." });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
