// src/pages/resident/AddVaccineResidentPage.jsx
import React from "react";
import ResidentNavbar from "../../components/navs/ResidentNavbar";
import VaccineForm from "../../components/forms/VaccineForm";

const AddVaccineResidentPage = () => {
  return (<>

    <ResidentNavbar />
    <div className="h-screen bg-black text-white flex justify-center items-center ">
      <div className="container mx-auto p-4">
        <VaccineForm />
      </div>
    </div>
  </>
  );
};

export default AddVaccineResidentPage;
