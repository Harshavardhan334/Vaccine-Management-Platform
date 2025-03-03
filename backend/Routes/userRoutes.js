import express from "express";
import {
  createUser,
  editUserProfile,
  deleteUser,
  loginUser,
  logoutUser
} from "../Controllers/User.js";

const router = express.Router();

// Route to create a new user (Admin can use this)
router.post("/", createUser);

// Route to login a user
router.post("/login", loginUser);

// Route to logout a user
router.post("/logout", logoutUser);

// Route to edit a user's profile (Self-edit only)
router.put("/", editUserProfile);

// Route to delete a user (Self-delete only)
router.delete("/", deleteUser);

export default router;
