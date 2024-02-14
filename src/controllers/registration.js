import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/usersModel.js";
import {
  generateActivationCode,
  sendActivationEmail,
} from "../utils/activationUtils.js";

export const Register = async (req, res) => {
  try {
    // Extract user details from the request body
    const { email, password } = req.body;

    // Create a new user record in the database
    const newUser = await User.create({
      email,
      password,
    });

    // Generate an activation code (you can use a library for this)
    const activationCode = generateActivationCode();

    // Save the activation code in the user record
    newUser.activationCode = activationCode;
    await newUser.save();

    // Send the activation code to the user's email (you can use a library for this)
    sendActivationEmail(email, activationCode);

    // Respond to the client
    res.status(201).json({
      message: "User registered successfully. Activation code sent to email.",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const Activation = async (req, res) => {
  try {
    const { email, activationCode } = req.body;

    // Find the user by email and activation code
    const user = await User.findOne({
      where: {
        email,
        activationCode,
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ error: "Invalid activation code or email." });
    }

    // Activate the user account
    user.isActive = true;
    await user.save();

    res.json({
      message: "Account activated successfully. You can now log in.",
    });
  } catch (error) {
    console.error("Error activating account:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
