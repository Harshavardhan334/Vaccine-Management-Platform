// src/pages/resident/AddVaccineResidentPage.jsx
import React from "react";
import RoleNavbar from "../../components/navs/RoleNavbar.jsx";
import VaccineForm from "../../components/forms/VaccineForm";

const AddVaccineResidentPage = () => {
  return (<>

    <RoleNavbar />
    <div className="h-screen bg-black text-white flex justify-center items-center ">
      <div className="container mx-auto p-4">
        <VaccineForm />
      </div>
    </div>
  </>
  );
};

export default AddVaccineResidentPage;
