import express from "express";
import { isAuthenticated, authorizeRoles } from "../Middlewares/auth.js";
import {
  getVaccinesByLocation,
  addDiseaseReq,
  addVaccineReq,
  getAllDiseases
} from "../Controllers/Resident.js";

const router = express.Router();

router.use(isAuthenticated, authorizeRoles("resident"));

// Route to get vaccines by location (based on diseases at that location)
router.get("/vaccines/location/:location", getVaccinesByLocation);

// Route to add a new disease request
router.post("/diseases", addDiseaseReq);

// Route to add a new vaccine request
router.post("/vaccines", addVaccineReq);

// Route to fetch approved diseases (for autocomplete)
router.get("/diseases", getAllDiseases);

export default router;
