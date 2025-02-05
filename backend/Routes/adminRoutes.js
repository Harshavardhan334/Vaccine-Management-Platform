import express from "express";
import {
  addVaccine,
  getAllUsers,
  deleteUser,
  approveVaccine,
  deleteVaccine,
  approveDisease,
  assignLocationsToDisease,
  deleteDisease
} from "../Controllers/Admin.js";

const router = express.Router();

// Route to add a new vaccine
router.post("/vaccines", addVaccine);

// Route to approve a vaccine
router.put("/vaccines/approve/:id", approveVaccine);

// Route to delete a vaccine
router.delete("/vaccines/:id", deleteVaccine);

// Route to get all users (admin-only)
router.get("/users", getAllUsers);

// Route to delete a user (admin-only)
router.delete("/users/:id", deleteUser);

// Route to approve a disease
router.put("/diseases/approve/:id", approveDisease);

// Route to assign locations to a disease
router.put("/diseases/locations/:id", assignLocationsToDisease);

// Route to delete a disease
router.delete("/diseases/:id", deleteDisease);

export default router;
