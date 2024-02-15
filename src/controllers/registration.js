import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/usersModel.js";
import {
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

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user record in the database
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
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
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res
        .status(401)
        .json({ error: "Invalid credentials or registration code." });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password." });
    }

    // If PIN is not provided, redirect to PIN creation endpoint
    if (!user.pin) {
      return res.status(302).json({
        message: "Login successful please create your PIN",
        redirect: "/create-pin",
        userId: user.id,
      });
    }

    // If PIN is provided, validate and update the user's PIN in the database
    if (req.body.pin) {
      const pinAsString = req.body.pin.toString(); // Convert to string to handle leading zeros

      if (pinAsString.length !== 8 || !/^\d+$/.test(pinAsString)) {
        return res.status(400).json({ error: "PIN must be 8 digits." });
      }

      const hashedPin = await bcrypt.hash(pinAsString, 10);
      await user.update({ pin: hashedPin });
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
