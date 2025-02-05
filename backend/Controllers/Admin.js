import User from "../Models/User.js";
import Vaccine from "../Models/Vaccine.js";
import Disease from "../Models/Disease.js";

// Add a new vaccine
export const addVaccine = async (req, res) => {
  try {
    const { name, description, diseasesCovered, recommendedAge, dosesRequired, sideEffects } = req.body;

    // Check if vaccine already exists
    const existingVaccine = await Vaccine.findOne({ name });
    if (existingVaccine) return res.status(400).json({ message: "Vaccine already exists" });

    const vaccine = new Vaccine({
      name,
      description,
      diseasesCovered,
      recommendedAge,
      dosesRequired,
      sideEffects,
      createdBy: req.user._id,
      approved: true
    });

    await vaccine.save();
    res.status(201).json({ message: "Vaccine added. Pending approval.", vaccine });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Approve a vaccine
export const approveVaccine = async (req, res) => {
  try {
    const vaccine = await Vaccine.findById(req.params.id);
    if (!vaccine) return res.status(404).json({ message: "Vaccine not found" });

    vaccine.approved = true;
    vaccine.approvedBy = req.user._id;
    await vaccine.save();

    res.status(200).json({ message: "Vaccine approved", vaccine });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a vaccine
export const deleteVaccine = async (req, res) => {
  try {
    const vaccine = await Vaccine.findByIdAndDelete(req.params.id);
    if (!vaccine) return res.status(404).json({ message: "Vaccine not found" });

    res.status(200).json({ message: "Vaccine deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Approve a disease
export const approveDisease = async (req, res) => {
  try {
    const disease = await Disease.findById(req.params.id);
    if (!disease) return res.status(404).json({ message: "Disease not found" });

    disease.approvedBy = req.user._id;
    await disease.save();

    res.status(200).json({ message: "Disease approved", disease });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Assign locations to a disease
export const assignLocationsToDisease = async (req, res) => {
  try {
    const { locations } = req.body;
    const disease = await Disease.findById(req.params.id);

    if (!disease) return res.status(404).json({ message: "Disease not found" });

    disease.locations = locations;
    await disease.save();

    res.status(200).json({ message: "Locations assigned", disease });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a disease
export const deleteDisease = async (req, res) => {
  try {
    const disease = await Disease.findByIdAndDelete(req.params.id);
    if (!disease) return res.status(404).json({ message: "Disease not found" });

    res.status(200).json({ message: "Disease deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
