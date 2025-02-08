// src/components/forms/DiseaseForm.jsx
import React, { useState } from "react";
import axios from "axios";
// import Notification from "frontend/src/components/Notification.jsx";

const DiseaseForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    locations: ""
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    try {
      await axios.post("http://localhost:4000/api/resident/diseases", {
        name: formData.name,
        description: formData.description,
        locations: formData.locations.split(",").map(item => item.trim())
      }, { withCredentials: true });
      setMessage({ type: "success", text: "Disease submitted successfully! Waiting for admin approval." });
      setFormData({
        name: "",
        description: "",
        locations: ""
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
        placeholder="Disease Name"
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
        name="locations"
        placeholder="Affected Locations (comma separated)"
        value={formData.locations}
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

export default DiseaseForm;
