// src/components/forms/VaccineForm.jsx
import React, { useState } from "react";
import axios from "axios";
// import Notification from "./Notification.jsx";

const VaccineForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    diseasesCovered: "",
    recommendedAge: "",
    dosesRequired: "",
    sideEffects: ""
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    try {
      await axios.post("http://localhost:4000/api/resident/vaccines", {
        name: formData.name,
        description: formData.description,
        diseasesCovered: formData.diseasesCovered.split(",").map(item => item.trim()),
        recommendedAge: formData.recommendedAge,
        dosesRequired: parseInt(formData.dosesRequired, 10),
        sideEffects: formData.sideEffects.split(",").map(item => item.trim())
      }, { withCredentials: true });
      setMessage({ type: "success", text: "Vaccine submitted successfully! Waiting for admin approval." });
      setFormData({
        name: "",
        description: "",
        diseasesCovered: "",
        recommendedAge: "",
        dosesRequired: "",
        sideEffects: ""
      });
    } catch (error) {
      setMessage({ type: "error", text: error.response?.data?.message || "Submission failed." });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4">
      {message.text && <Notification type={message.type} message={message.text} />}
      <input
        type="text"
        name="name"
        placeholder="Vaccine Name"
        value={formData.name}
        onChange={handleChange}
        className="border p-2 w-full rounded"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="border p-2 w-full rounded"
        required
      />
      <input
        type="text"
        name="diseasesCovered"
        placeholder="Diseases Covered (comma separated)"
        value={formData.diseasesCovered}
        onChange={handleChange}
        className="border p-2 w-full rounded"
        required
      />
      <input
        type="text"
        name="recommendedAge"
        placeholder="Recommended Age"
        value={formData.recommendedAge}
        onChange={handleChange}
        className="border p-2 w-full rounded"
        required
      />
      <input
        type="number"
        name="dosesRequired"
        placeholder="Doses Required"
        value={formData.dosesRequired}
        onChange={handleChange}
        className="border p-2 w-full rounded text-black"
        required
      />
      <input
        type="text"
        name="sideEffects"
        placeholder="Side Effects (comma separated)"
        value={formData.sideEffects}
        onChange={handleChange}
        className="border p-2 w-full rounded"
        required
      />
      <button type="submit" className="bg-white text-black hover:bg-slate-100 px-4 py-2 rounded w-full">
        Submit
      </button>
    </form>
  );
};

export default VaccineForm;
