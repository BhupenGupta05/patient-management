import React from 'react';
import Title from '../components/Title';
import Copyright from '../components/Copyright';
import RegistrationForm from '../components/RegistrationForm';

const Registration = () => {
  return (
    <main className="max-w-2xl mx-auto p-8">
      <Title 
        title="WeCare"
        heading="Welcome"
        subheading="Let us know more about you."
      />

      <RegistrationForm />

      <Copyright />
    </main>
  );
};

export default Registration;
