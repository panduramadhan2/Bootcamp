// Import necessary modules or services
// import User from "../models/User"; // Import your User model or whatever you're using
import bcrypt from "bcrypt";
import User from "../models/usersModel.js";

// Function to reset password
export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Check if the user with the provided email exists
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    await user.update({ password: hashedPassword });

    return res.json({ success: true, message: "Password reset successful." });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
