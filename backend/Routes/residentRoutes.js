import express from "express";
import { isAuthenticated, authorizeRoles } from "../Middlewares/auth.js";
import {
  getVaccinesByLocation,
  addDiseaseReq,
  addVaccineReq
} from "../Controllers/Resident.js";

const router = express.Router();

router.use(isAuthenticated, authorizeRoles("resident"));

// Route to get vaccines by location (based on diseases at that location)
router.post("/vaccines/location", getVaccinesByLocation);

// Route to add a new disease request
router.post("/diseases", addDiseaseReq);

// Route to add a new vaccine request
router.post("/vaccines", addVaccineReq);

export default router;
