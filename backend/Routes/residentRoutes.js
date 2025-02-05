import express from "express";
import {
  getVaccinesByLocation,
  addDisease,
  addVaccine
} from "../Controllers/Resident.js";

const router = express.Router();

// Route to get vaccines by location (based on diseases at that location)
router.get("/vaccines/location/:location", getVaccinesByLocation);

// Route to add a new disease (admin only, but could be modified for residents)
router.post("/diseases", addDisease);

// Route to add a new vaccine (admin only, but could be modified for residents)
router.post("/vaccines", addVaccine);

export default router;
