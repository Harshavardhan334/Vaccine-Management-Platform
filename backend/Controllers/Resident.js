import Vaccine from "../Models/Vaccine.js";
import Disease from "../Models/Disease.js";
import VaccineRequest from "../Models/vaccineReq.js";
import DiseaseRequest from "../Models/diseaseReq.js";
import Appointment from "../Models/Appointment.js";

// Get vaccines according to diseases at a specific location
export const getVaccinesByLocation = async (req, res) => {
    try {
      const { location } = req.method === 'GET' ? req.params : req.body;

      const escapeRegExp = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const trimmed = String(location || '').trim();
      const locRegex = new RegExp(`^${escapeRegExp(trimmed)}$`, 'i');
  
      // Fetch diseases associated with the location (case-insensitive)
      const diseases = await Disease.find({ affectedAreas: locRegex, approved: true});

      // Get the IDs of diseases
      const diseaseIds = diseases.map(disease => disease._id);

      // Fetch vaccines that cover these diseases
      const vaccines = diseaseIds.length > 0
        ? await Vaccine.find({ diseasesCovered: { $in: diseaseIds }, approved: true })
        : [];

      // Always return 200 with arrays; frontend can show empty states
      res.status(200).json({ diseases, vaccines });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };

// Add a new disease
export const addDiseaseReq = async (req, res) => {
  try {
    const { name, description, affectedAreas } = req.body;

    // Check if the disease already exists with the same affected areas
    const existingDisease = await Disease.findOne({
      name,
      affectedAreas: { $all: affectedAreas }
    });

    if (existingDisease) {
      return res.status(400).json({ message: "Disease with the same affected areas already exists" });
    }

    // Create a new disease request
    const newDisease = new DiseaseRequest({
      name,
      description,
      affectedAreas,
      createdBy: req.user._id,
    });

    await newDisease.save();
    res.status(201).json(newDisease);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// Add a new vaccine
export const addVaccineReq = async (req, res) => {
  try {
    const { name, description, diseasesCovered, recommendedAge, dosesRequired, sideEffects } = req.body;

    // Normalize disease names and fetch ObjectIds (only approved diseases)
    const escapeRegExp = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const normalizedNames = Array.isArray(diseasesCovered)
      ? diseasesCovered.map(n => String(n).trim()).filter(Boolean)
      : [];
    const nameRegexes = normalizedNames.map(n => new RegExp(`^${escapeRegExp(n)}$`, 'i'));

    const diseases = await Disease.find({ name: { $in: nameRegexes }, approved: true }, "_id name");

    if (diseases.length === 0) {
      return res.status(400).json({ message: "No valid diseases found" });
    }

    const diseaseIds = diseases.map(disease => disease._id);

    // Check if a vaccine already exists with the same name and covers at least these diseases
    const existingVaccine = await Vaccine.findOne({
      name: new RegExp(`^${escapeRegExp(name)}$`, 'i'),
      diseasesCovered: { $all: diseaseIds }
    });

    if (existingVaccine) {
      return res.status(400).json({ message: "Vaccine with the same diseases covered already exists" });
    }

    // Create a new vaccine request
    const newVaccine = new VaccineRequest({
      name,
      description,
      diseasesCovered: diseaseIds,
      recommendedAge,
      dosesRequired,
      sideEffects,
      createdBy: req.user._id
    });

    await newVaccine.save();
    res.status(201).json(newVaccine);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// Get all diseases
export const getAllDiseases = async (req, res) => {
  try {
    const diseases = await Disease.find({ approved: true });
    res.status(200).json(diseases);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all approved vaccines (minimal fields)
export const getApprovedVaccines = async (req, res) => {
  try {
    const vaccines = await Vaccine.find({ approved: true }).select("name dosesRequired recommendedAge");
    res.status(200).json(vaccines);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Create a new appointment for a resident
export const createAppointment = async (req, res) => {
  try {
    const { vaccineId, scheduledAt, location, doseNumber, notes } = req.body;

    if (!vaccineId || !scheduledAt || !location) {
      return res.status(400).json({ message: "vaccineId, scheduledAt, and location are required" });
    }

    // Ensure vaccine exists and is approved
    const vaccine = await Vaccine.findOne({ _id: vaccineId, approved: true });
    if (!vaccine) {
      return res.status(404).json({ message: "Vaccine not found or not approved" });
    }

    // Basic validations
    const when = new Date(scheduledAt);
    if (isNaN(when.getTime())) {
      return res.status(400).json({ message: "scheduledAt must be a valid date-time" });
    }
    // Enforce only dates after today (start of tomorrow)
    const today = new Date();
    const startOfTomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 0, 0, 0, 0);
    if (when.getTime() < startOfTomorrow.getTime()) {
      return res.status(400).json({ message: "scheduledAt must be after today" });
    }
    const dose = Number(doseNumber) || 1;
    if (dose < 1 || dose > (vaccine.dosesRequired || Infinity)) {
      return res.status(400).json({ message: "Invalid dose number for this vaccine" });
    }

    const appointment = new Appointment({
      resident: req.user._id,
      vaccine: vaccine._id,
      scheduledAt: when,
      location: String(location).trim(),
      doseNumber: dose,
      notes: notes ? String(notes).trim() : undefined,
    });

    await appointment.save();
    const populated = await appointment.populate([
      { path: "vaccine", select: "name dosesRequired" },
    ]);

    res.status(201).json(populated);
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({ message: "You already have an appointment for this vaccine at this time" });
    }
    res.status(500).json({ message: "Server error", error });
  }
};

// List resident appointments
export const listMyAppointments = async (req, res) => {
  try {
    const statusFilter = req.query.status; // optional
    const query = { resident: req.user._id };
    if (statusFilter) query.status = statusFilter;

    const items = await Appointment.find(query)
      .sort({ scheduledAt: 1 })
      .populate({ path: "vaccine", select: "name dosesRequired" });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Cancel resident appointment
export const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appt = await Appointment.findOne({ _id: id, resident: req.user._id });
    if (!appt) return res.status(404).json({ message: "Appointment not found" });
    if (appt.status === "canceled") {
      return res.status(200).json(appt);
    }
    appt.status = "canceled";
    await appt.save();
    res.status(200).json(appt);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Reschedule resident appointment
export const rescheduleAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { scheduledAt, location } = req.body;
    const appt = await Appointment.findOne({ _id: id, resident: req.user._id });
    if (!appt) return res.status(404).json({ message: "Appointment not found" });
    if (scheduledAt) {
      const when = new Date(scheduledAt);
      if (isNaN(when.getTime())) {
        return res.status(400).json({ message: "scheduledAt must be a valid date-time" });
      }
      const today = new Date();
      const startOfTomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 0, 0, 0, 0);
      if (when.getTime() < startOfTomorrow.getTime()) {
        return res.status(400).json({ message: "scheduledAt must be after today" });
      }
      appt.scheduledAt = when;
      // Rescheduling sets status back to scheduled
      appt.status = "scheduled";
    }
    if (location) appt.location = String(location).trim();
    await appt.save();
    res.status(200).json(appt);
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({ message: "Conflicts with an existing appointment" });
    }
    res.status(500).json({ message: "Server error", error });
  }
};

// Update appointment status (scheduled | completed | canceled)
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const allowed = ["scheduled", "completed", "canceled"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const appt = await Appointment.findOne({ _id: id, resident: req.user._id });
    if (!appt) return res.status(404).json({ message: "Appointment not found" });

    appt.status = status;
    await appt.save();
    res.status(200).json(appt);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};