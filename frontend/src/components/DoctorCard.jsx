import React from 'react';

const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-white rounded-sm shadow-sm hover:shadow-md transition-shadow">
      {/* IMAGE */}
      <div className="mb-4">
        <img
          src="https://via.placeholder.com/150" // Replace with actual image if available
          alt={doctor.name}
          className="w-full h-32 object-cover rounded-sm"
        />
      </div>

      {/* DETAILS */}
      <div className="flex items-center gap-1 mx-2 mt-4">
        {/* Green Dot */}
        <span className="w-2 h-2 rounded-full bg-green-500"></span>
        <h5 className="text-green-500 text-xs">Available</h5>
      </div>
      <h3 className="text-md mb-1 mx-2">{doctor.name}</h3>
      <p className="text-xs text-gray-600 mb-4 mx-2">{doctor.speciality}</p>
    </div>
  );
};

export default DoctorCard;
