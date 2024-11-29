import React from 'react';

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-50 z-50">
      <div className="text-center">
        {/* Adjust spinner size responsively */}
        <svg className="animate-spin h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 text-indigo-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M16.24 16.24l1.41-1.41M4.93 19.07l1.41-1.41M16.24 7.76l1.41 1.41M2 12h2M20 12h2M4.93 12h2.14M16.24 12h2.14" />
        </svg>
        <p className="text-indigo-600 text-sm sm:text-lg md:text-xl mt-2">Loading...</p>
      </div>
    </div>
  );
};

export default Spinner;
