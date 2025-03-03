import User from "../Models/User.js";
import { sendToken } from "../utils/jwtToken.js";
import jwt from "jsonwebtoken";

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { name, email, password, mobile, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create and save the new user
    const newUser = new User({
      name,
      email,
      password, // Plain text password (not recommended)
      mobile,
      role
    });

    await newUser.save();

    // Send JWT token in response
    sendToken(newUser, 201, res, "User created successfully");
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// User login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // Send JWT token in response
    sendToken(user, 200, res, "Login successful");
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// User logout
export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", { expires: new Date(0), httpOnly: true });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Edit user profile (Self-edit)
export const editUserProfile = async (req, res) => {
  try {
    // Get token from cookies
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    // Verify token and extract user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update user details
    const { name, email, password } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password; 

    await user.save();

    // Send updated token in response
    sendToken(user, 200, res, "User profile updated successfully");
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// Delete user (Self-delete only)
export const deleteUser = async (req, res) => {
  try {
    // Get token from cookies
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Verify token and extract user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Delete user
    await user.deleteOne(); // `deleteOne()` is preferred over `remove()`

    // Clear cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure only in production
      sameSite: "strict",
    });

    res.status(200).json({ message: "User deleted and logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
