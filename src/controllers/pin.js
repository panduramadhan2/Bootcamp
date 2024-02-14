import bcrypt from "bcrypt";
import User from "../models/usersModel.js";

export const createPin = async (req, res) => {
  try {
    const { userId, pin } = req.body;

    // Check if the user exists
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Check if the user already has a PIN
    if (user.pin) {
      return res.status(400).json({ error: "User already has a PIN." });
    }

    // Validate the provided PIN
    const pinAsString = pin.toString(); // Convert to string to handle leading zeros

    if (pinAsString.length !== 8 || !/^\d+$/.test(pinAsString)) {
      return res.status(400).json({ error: "PIN must be 8 digits." });
    }

    // Hash the original PIN
    const hashedPin = await bcrypt.hash(pinAsString, 10);

    // Update the user with the hashed PIN
    await user.update({ pin: hashedPin }, { fields: ["pin"], validate: false });

    res.json({ message: "PIN created successfully." });
  } catch (error) {
    console.error("Error creating PIN:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
