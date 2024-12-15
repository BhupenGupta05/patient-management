
import { departments } from '../constants';
import React from 'react';
import Department from './Department';

const Departments = () => {
  return (
    <main className="flex flex-col items-center py-6">
      {/* HEADING */}
      <h2 className="text-xl mb-2">Departments</h2>
      <p className="text-gray-600 mb-6 text-center text-xs">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, distinctio.
      </p>

      {/* DEPARTMENTS */}
      <ul className="flex flex-wrap gap-6 justify-center">
        {departments.map((department, idx) => (
          <li key={idx} className="flex flex-col items-center transform transition-transform hover:scale-105">
            <Department department={department} />
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Departments;
