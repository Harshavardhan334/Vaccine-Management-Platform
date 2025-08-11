import express from "express";
import { isAuthenticated, authorizeRoles } from "../Middlewares/auth.js";
import {
  addVaccine,
  getAllUsers,
  deleteUser,
  approveVaccine,
  deleteVaccine,
  approveDisease,
  assignLocationsToDisease,
  deleteDisease,
  addDisease,
  editDisease,
  editVaccine,
  getVaccineRequests,
  getDiseaseRequests,
  getAllDiseases,
  getAllVaccines,
} from "../Controllers/Admin.js";
import { getVaccinesByLocation } from "../Controllers/Resident.js";

const router = express.Router();

// Protect all admin routes (Only logged-in users with "admin" role can access)
router.use(isAuthenticated, authorizeRoles("admin"));

// Route to add a new vaccine
router.post("/vaccines", addVaccine);

// Route to add a new disease
router.post("/diseases", addDisease);

// Route to approve a vaccine
router.put("/vaccines/approve/:id", approveVaccine);

// Route to delete a vaccine
router.delete("/vaccines/:id", deleteVaccine);

// Route to edit a vaccine
router.put("/vaccines/:id", editVaccine);

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

// Route to edit a disease
router.put("/diseases/:id", editDisease);

// Routes to fetch pending requests
router.get("/vaccines/requests", getVaccineRequests);
router.get("/diseases/requests", getDiseaseRequests);

// Search vaccines by location (admin access)
router.get("/vaccines/location/:location", getVaccinesByLocation);

// Optional: Routes to fetch all approved entities
router.get("/vaccines", getAllVaccines);
router.get("/diseases", getAllDiseases);

export default router;
