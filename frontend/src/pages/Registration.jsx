import React from 'react';
import Title from '../components/Title';
import Copyright from '../components/Copyright';
import RegistrationForm from '../components/RegistrationForm';

const Registration = () => {
  return (
    <main className="max-w-full mx-auto p-4 sm:p-6 lg:p-8">
      <Title 
        title="WeCare"
        heading="Welcome"
        subheading="Let us know more about you."
      />
      

      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto mb-6">
        <RegistrationForm />
      </div>

      <Copyright />
    </main>
  );
};

export default Registration;
