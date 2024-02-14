import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/usersModel.js";
import {
  // generateActivationCode,
  generateAuthToken,
  generateRegistrationCode,
  sendActivationEmail,
} from "../utils/activationUtils.js";

export const Register = async (req, res) => {
  try {
    // Extract user details from the request body
    const { name, email, password } = req.body;

    // Generate a registration code
    const registrationCode = generateRegistrationCode(); // Implement this function

    // Create a new user record in the database
    const newUser = await User.create({
      name,
      email,
      password,
      registrationCode,
    });

    // Send the activation email with the registration code
    sendActivationEmail(email, registrationCode);

    // Respond to the client
    res.status(201).json({
      message: "User registered successfully. Activation code sent to email.",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const Login = async (req, res) => {
  try {
    const { name, email, password, registrationCode } = req.body;

    // Find the user by email, password, and registration code
    const user = await User.findOne({
      where: {
        name,
        email,
        password,
        registrationCode,
      },
    });

    if (!user) {
      return res
        .status(401)
        .json({ error: "Invalid credentials or registration code." });
    }

    // If PIN is not provided, redirect to PIN creation endpoint
    if (!user.pin) {
      return res
        .status(302)
        .json({
          message: "Login successful please create your PIN",
          redirect: "/create-pin",
          userId: user.id,
        });
    }

    // If PIN is provided, validate and update the user's PIN in the database
    if (pin) {
      const pinAsString = pin.toString(); // Convert to string to handle leading zeros

      if (pinAsString.length !== 8 || !/^\d+$/.test(pinAsString)) {
        return res.status(400).json({ error: "PIN must be 8 digits." });
      }

      const hashedPin = await bcrypt.hash(pinAsString, 10);
      user = await user.update({ pin: hashedPin });
    }

    res.json({
      message: "Login successful.",
      token: generateAuthToken(user), // Implement this function
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
