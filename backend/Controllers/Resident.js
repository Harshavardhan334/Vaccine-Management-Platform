import User from "../Models/User.js";
import Vaccine from "../Models/Vaccine.js";
import Disease from "../Models/Disease.js";

// Get vaccines according to diseases at a specific location
export const getVaccinesByLocation = async (req, res) => {
    try {
      const { location } = req.params;
  
      // Fetch diseases associated with the location
      const diseases = await Disease.find({ affectedAreas: location });
  
      if (diseases.length === 0) {
        return res.status(404).json({ message: "No diseases found for this location" });
      }
  
      // Get the IDs of diseases
      const diseaseIds = diseases.map(disease => disease._id);
  
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
export const addDisease = async (req, res) => {
  try {
    const { name, description, locations } = req.body;

    // Check if the disease already exists
    const existingDisease = await Disease.findOne({ name });
    if (existingDisease) {
      return res.status(400).json({ message: "Disease already exists" });
    }

    // Create a new disease
    const newDisease = new Disease({
      name,
      description,
      locations,
      createdBy: req.user._id,
    });

    await newDisease.save();
    res.status(201).json(newDisease);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Add a new vaccine
export const addVaccine = async (req, res) => {
  try {
    const { name, description, diseasesCovered, recommendedAge, dosesRequired, sideEffects } = req.body;

    // Check if the vaccine already exists
    const existingVaccine = await Vaccine.findOne({ name });
    if (existingVaccine) {
      return res.status(400).json({ message: "Vaccine already exists" });
    }

    // Create a new vaccine
    const newVaccine = new Vaccine({
      name,
      description,
      diseasesCovered,
      recommendedAge,
      dosesRequired,
      sideEffects,
      createdBy: req.user._id  // Set the user who is creating the vaccine
    });

    await newVaccine.save();
    res.status(201).json(newVaccine);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
