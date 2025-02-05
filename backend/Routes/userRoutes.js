import express from "express";
import {
  createUser,
  editUserProfile,
  deleteUser
} from "../Controllers/User.js";

const router = express.Router();

// Route to create a new user (Admin can use this)
router.post("/", createUser);

// Route to edit a user's profile (Self-edit only)
router.put("/:id", editUserProfile);

// Route to delete a user (Self-delete only)
router.delete("/:id", deleteUser);

export default router;
