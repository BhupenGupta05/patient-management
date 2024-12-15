import React from 'react';
import { doctors } from '../constants';
import DoctorCard from '../components/DoctorCard';

const Doctors = () => {
  return (
    <main className="flex flex-col items-center px-2 py-6">
      {/* HEADING */}
      <h2 className="text-xl mb-2">Top Doctors to Book</h2>
      <p className="text-gray-600 mb-6 text-center text-xs">
        Find the best doctors to meet your medical needs.
      </p>

      {/* DOCTORS LIST */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-5xl">
        {doctors.map((doctor, idx) => (
          <DoctorCard key={idx} doctor={doctor} />
        ))}
      </div>
    </main>
  );
};

export default Doctors;
