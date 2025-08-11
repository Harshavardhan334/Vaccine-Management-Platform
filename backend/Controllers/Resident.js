import Vaccine from "../Models/Vaccine.js";
import Disease from "../Models/Disease.js";
import VaccineRequest from "../Models/vaccineReq.js";
import DiseaseRequest from "../Models/diseaseReq.js";

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