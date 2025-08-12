import express from "express";
import { isAuthenticated, authorizeRoles } from "../Middlewares/auth.js";
import {
  getVaccinesByLocation,
  addDiseaseReq,
  addVaccineReq,
  getAllDiseases,
  getApprovedVaccines,
  createAppointment,
  listMyAppointments,
  cancelAppointment,
  rescheduleAppointment,
  updateAppointmentStatus
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
// Route to fetch approved vaccines (for dropdowns)
router.get("/vaccines", getApprovedVaccines);

// Appointments
router.post("/appointments", createAppointment);
router.get("/appointments", listMyAppointments);
router.put("/appointments/:id", rescheduleAppointment);
router.delete("/appointments/:id", cancelAppointment);
router.put("/appointments/:id/status", updateAppointmentStatus);

export default router;
