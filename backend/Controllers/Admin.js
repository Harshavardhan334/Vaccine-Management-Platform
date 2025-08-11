import User from "../Models/User.js";
import Vaccine from "../Models/Vaccine.js";
import Disease from "../Models/Disease.js";
import VaccineRequest from "../Models/vaccineReq.js";
import DiseaseRequest from "../Models/diseaseReq.js";

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
      approvedBy: req.user._id,
      approved: true,
    });

    await vaccine.save();
    res.status(201).json({ message: "Vaccine added. Pending approval.", vaccine });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Add a new disease
export const addDisease = async (req, res) => {
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
    const newDisease = new Disease({
      name,
      description,
      affectedAreas,
      createdBy: req.user._id,
      approvedBy: req.user._id,
      approved: true,
    });

    await newDisease.save();
    res.status(201).json(newDisease);
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
    const vaccineReq = await VaccineRequest.findById(req.params.id);
    if (!vaccineReq) return res.status(404).json({ message: "Vaccine request not found" });

    const { name, description, diseasesCovered, recommendedAge, dosesRequired, sideEffects } = vaccineReq;

    // Check if a vaccine with the same name exists
    const existingVaccine = await Vaccine.findOne({ name });

    if (existingVaccine) {
      // Find diseases that are not already covered in the existing vaccine
      const newDiseases = diseasesCovered.filter(
        disease => !existingVaccine.diseasesCovered.includes(disease)
      );

      if (newDiseases.length === 0) {
        return res.status(400).json({ message: "Vaccine already covers these diseases" });
      }

      // Update the existing vaccine with new diseases
      existingVaccine.diseasesCovered.push(...newDiseases);
      await existingVaccine.save();
      await vaccineReq.remove();
      return res.status(200).json({ message: "Vaccine updated with new diseases", vaccine: existingVaccine });
    }

    // If vaccine doesn't exist, create a new one
    const newVaccine = new Vaccine({
      name,
      description,
      diseasesCovered,
      recommendedAge,
      dosesRequired,
      sideEffects,
      createdBy: vaccineReq.createdBy,
      approvedBy: req.user._id,
      approved: true,
    });

    await newVaccine.save();
    await vaccineReq.remove();

    res.status(200).json({ message: "Vaccine approved", vaccine: newVaccine });
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
    const diseaseReq = await DiseaseRequest.findById(req.params.id);
    if (!diseaseReq) return res.status(404).json({ message: "Disease request not found" });

    const { name, description, affectedAreas } = diseaseReq;

    // Check if a disease with the same name exists
    const existingDisease = await Disease.findOne({ name });

    if (existingDisease) {
      // Find affected areas that are not already covered
      const newAffectedAreas = affectedAreas.filter(
        area => !existingDisease.affectedAreas.includes(area)
      );

      if (newAffectedAreas.length === 0) {
        return res.status(400).json({ message: "Disease already covers these affected areas" });
      }

      // Update the existing disease with new affected areas
      existingDisease.affectedAreas.push(...newAffectedAreas);
      await existingDisease.save();
      await diseaseReq.remove();
      return res.status(200).json({ message: "Disease updated with new affected areas", disease: existingDisease });
    }

    // If disease doesn't exist, create a new one
    const newDisease = new Disease({
      name,
      description,
      affectedAreas,
      createdBy: diseaseReq.createdBy,
      approvedBy: req.user._id,
      approved: true,
    });

    await newDisease.save();
    await diseaseReq.remove();

    res.status(200).json({ message: "Disease approved", disease: newDisease });
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

    const areasToAdd = Array.isArray(locations) ? locations : [];
    const merged = [...new Set([...(disease.affectedAreas || []), ...areasToAdd])];
    disease.affectedAreas = merged;
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

//edit disease
export const editDisease = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, affectedAreas } = req.body;

    const disease = await Disease.findById(id);
    if (!disease) return res.status(404).json({ message: "Disease not found" });

    if (name) disease.name = name;
    if (description) disease.description = description;
    if (affectedAreas) {
      disease.affectedAreas = [...new Set([...disease.affectedAreas, ...affectedAreas])];
    }

    await disease.save();
    res.status(200).json({ message: "Disease updated", disease });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


//edit vaccine
export const editVaccine = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, diseasesCovered, recommendedAge, dosesRequired, sideEffects } = req.body;

    const vaccine = await Vaccine.findById(id);
    if (!vaccine) return res.status(404).json({ message: "Vaccine not found" });

    if (name) vaccine.name = name;
    if (description) vaccine.description = description;
    if (recommendedAge) vaccine.recommendedAge = recommendedAge;
    if (dosesRequired) vaccine.dosesRequired = dosesRequired;
    if (sideEffects) vaccine.sideEffects = sideEffects;

    if (diseasesCovered) {
      // Ensure diseases are valid
      const validDiseases = await Disease.find({ _id: { $in: diseasesCovered }, approved: true });
      const validDiseaseIds = validDiseases.map(d => d._id);

      if (validDiseaseIds.length === 0) {
        return res.status(400).json({ message: "No valid diseases found" });
      }

      vaccine.diseasesCovered = [...new Set([...vaccine.diseasesCovered, ...validDiseaseIds])];
    }

    await vaccine.save();
    res.status(200).json({ message: "Vaccine updated", vaccine });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// Get all vaccine requests
export const getVaccineRequests = async (req, res) => {
  try {
    const requests = await VaccineRequest.find();

    // Filter out requests that are effectively already approved (same-name vaccine covering all diseases)
    const escapeRegExp = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const pending = [];
    for (const r of requests) {
      const nameRegex = new RegExp(`^${escapeRegExp(r.name)}$`, 'i');
      const existing = await Vaccine.findOne({ name: nameRegex });
      if (!existing) {
        pending.push(r);
        continue;
      }
      // If all requested diseases are already covered, treat as approved-equivalent → skip
      const coversAll = r.diseasesCovered.every(id => existing.diseasesCovered.map(String).includes(String(id)));
      if (!coversAll) pending.push(r);
    }

    res.status(200).json(pending);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

// Get all disease requests
export const getDiseaseRequests = async (req, res) => {
  try {
    const requests = await DiseaseRequest.find();
    const escapeRegExp = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const pending = [];
    for (const r of requests) {
      const nameRegex = new RegExp(`^${escapeRegExp(r.name)}$`, 'i');
      const existing = await Disease.findOne({ name: nameRegex, approved: true });
      if (!existing) {
        pending.push(r);
        continue;
      }
      // If all requested affected areas already present in approved disease, skip
      const existingAreas = (existing.affectedAreas || []).map(a => String(a).toLowerCase());
      const allIncluded = (r.affectedAreas || []).every(a => existingAreas.includes(String(a).toLowerCase()));
      if (!allIncluded) pending.push(r);
    }

    res.status(200).json(pending);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

// Get all diseases
export const getAllDiseases = async (req, res) => {
  try {
    const diseases = await Disease.find();
    res.status(200).json(diseases);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all vaccines
export const getAllVaccines = async (req, res) => {
  try {
    const vaccines = await Vaccine.find();
    res.status(200).json(vaccines);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};