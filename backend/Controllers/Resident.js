import Vaccine from "../Models/Vaccine.js";
import Disease from "../Models/Disease.js";
import VaccineRequest from "../Models/vaccineReq.js";
import DiseaseRequest from "../Models/diseaseReq.js";

// Get vaccines according to diseases at a specific location
export const getVaccinesByLocation = async (req, res) => {
    try {
      const { location } = req.body;
  
      // Fetch diseases associated with the location
      const diseases = await Disease.find({ affectedAreas: location, approved: true});
  
      if (diseases.length === 0) {
        return res.status(404).json({ message: "No diseases found for this location" });
      }
      // Get the IDs of diseases
      const diseaseIds = diseases.map(disease => disease._id);
      console.log("Disease IDs:", diseaseIds.map(id => id.toString()));

      // Fetch vaccines that cover these diseases
      const vaccines = await Vaccine.find({ diseasesCovered: { $in: diseaseIds }, approved: true });

      if (vaccines.length === 0) {
        return res.status(404).json({ message: "No vaccines found for the diseases in this location" });
      }
  
      res.status(200).json(vaccines);
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

    // Check if the vaccine already exists with the same diseasesCovered
    const existingVaccine = await Vaccine.findOne({
      name,
      diseasesCovered: { $all: diseasesCovered}
    });

    if (existingVaccine) {
      return res.status(400).json({ message: "Vaccine with the same diseases covered already exists" });
    }

    // Fetch ObjectIds for diseasesCovered (only approved diseases)
    const diseases = await Disease.find({ name: { $in: diseasesCovered }, approved: true }, "_id");

    if (diseases.length === 0) {
      return res.status(400).json({ message: "No valid diseases found" });
    }

    const diseaseIds = diseases.map(disease => disease._id);

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
    const diseases = await Disease.find();
    res.status(200).json(diseases);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};