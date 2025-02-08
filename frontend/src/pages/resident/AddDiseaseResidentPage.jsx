// src/pages/resident/AddDiseaseResidentPage.jsx
import React from "react";
import ResidentNavbar from "../../components/navs/ResidentNavbar";
import DiseaseForm from "../../components/forms/DiseaseForm";

const AddDiseaseResidentPage = () => {
    return (<>

        <ResidentNavbar />
        <div className="h-screen bg-black text-white flex justify-center items-center ">
            <div className="container mx-auto p-4">
                <DiseaseForm />
            </div>
        </div>
    </>
    );
};

export default AddDiseaseResidentPage;
