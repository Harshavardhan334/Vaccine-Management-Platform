import React from 'react';

const VaccineCard = ({ vaccine }) => {
  return (
    <div className="border p-4 rounded-lg shadow-lg bg-white">
      <h3 className="text-xl font-bold text-blue-600">{vaccine.name}</h3>
      <p className="text-gray-700 mt-1"><strong>Description:</strong> {vaccine.description}</p>
      <p className="text-gray-700 mt-1"><strong>Recommended Age:</strong> {vaccine.recommendedAge}</p>
      <p className="text-gray-700 mt-1"><strong>Doses Required:</strong> {vaccine.dosesRequired}</p>
      {vaccine.sideEffects.length > 0 && (
        <p className="text-red-500 mt-1"><strong>Side Effects:</strong> {vaccine.sideEffects.join(', ')}</p>
      )}
    </div>
  );
};

export default VaccineCard;
