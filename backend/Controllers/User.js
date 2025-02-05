import User from "../Models/User.js";

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
      password,  // Storing plain text password
      mobile,
      role
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: { name: newUser.name, email: newUser.email, role: newUser.role }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Edit user profile (Self-edit)
export const editUserProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Find the user by their ID (assuming the user has some way to identify themselves)
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Edit user details (including password if provided)
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;  // Updating with new password (no hashing)

    await user.save();

    res.status(200).json({
      message: "User profile updated successfully",
      user: { name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete user (Self-delete only)
export const deleteUser = async (req, res) => {
  try {
    // Find the user by their ID
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the logged-in user is the one making the request
    if (user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: "You can only delete your own account" });
    }

    // Delete the user
    await user.remove();
    console.log("hello");
    

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
