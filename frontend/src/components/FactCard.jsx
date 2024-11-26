import React from "react";

const FactCard = ({ icon, text, aggregate }) => {
  return (
    <div className="bg-yellow-300 w-full sm:w-72 flex-grow h-auto sm:h-28 flex flex-col gap-2 items-start justify-center p-4 sm:p-6 rounded-lg">
      {/* Icon and Aggregate */}
      <div className="flex flex-row gap-4 items-center text-lg sm:text-xl">
        {icon}
        <span >{aggregate}</span>
      </div>

      {/* Text */}
      <p className="text-sm sm:text-base font-medium">{text}</p>
    </div>
  );
};

export default FactCard;
