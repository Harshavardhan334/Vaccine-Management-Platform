import mongoose from "mongoose";

const DiseaseSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  affectedAreas: [{ type: String }] // List of localities affected
}, { timestamps: true });

const Disease = mongoose.model("Disease", DiseaseSchema);

export default Disease;