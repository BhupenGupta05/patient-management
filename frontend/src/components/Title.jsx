import React from 'react';

const Title = ({ title, heading, subheading, className }) => {
  return (
    <header className={`${className} max-w-2xl`}>
      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-indigo-600 mb-4">
        {title}
      </h2>

      <h4 className="text-2xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold mb-1">
        {heading}
      </h4>

      <p className="text-xs sm:text-sm lg:text-md mb-8">
        {subheading}
      </p>
    </header>
  );
};

export default Title;
