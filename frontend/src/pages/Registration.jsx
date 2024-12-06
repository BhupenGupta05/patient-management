import React from 'react';
import Title from '../components/Title';
import Copyright from '../components/Copyright';
import RegistrationForm from '../components/RegistrationForm';

const Registration = () => {
  return (
    <main className="max-w-full mx-auto p-4 sm:p-6 lg:p-8">

      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto mb-6">
      <Title 
        title="NurtureMed"
        heading="Welcome"
        subheading="Let us know more about you."
        className='mb-12'
        titleClassName='text-md sm:text-lg md:text-xl md:mb-4 lg:text-2xl font-bold text-indigo-600 mb-2'
        headingClassName="text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1"
        subheadingClassName="text-wrap text-xs sm:text-sm md:text-md mb-6"
      />
        <RegistrationForm />
        <Copyright />
      </div>

      
    </main>
  );
};

export default Registration;
