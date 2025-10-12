import User from "../models/User.js";
import js from "jsonwebtoken";

export const greetUser = (req, res) => {
  res.json({ 
    message: `Hello ${req.user.name || 'User'}! Welcome to the server.`,
    userId: req.user.id 
  });
};
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(403).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(403).json({
        error: "User already exists",
      });
    }

    const user = new User({
      name,
      email,
      password,
    });

    user.save();
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(400).send(err.message);
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(403).json({
        error: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(403).json({
        error: "User does not exist",
      });
    }

    if (await user.comparePassword(password)) {
      const token = js.sign({ id: user._id }, process.env.JWT_SECRET);
      res.status(200).json({ token });
    } else {
      return res.status(403).json({
        error: "Incorrect password",
      });
    }

  } catch (err) {
    res.status(400).send(err.message);
  }
};
