import Copyright from '../components/Copyright';
import AppointmentDetails from '../components/AppointmentDetails';
import CustomButton from '../components/CustomButton';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Success = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const appointmentData = location.state || {}
  

  const handleNewAppointment = () => {
    navigate(`/patient/${appointmentData.patientId}/appointment`, { state: { patientId: appointmentData.patientId } });
  }
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8 px-4">
      <h2 className="text-3xl font-bold text-indigo-600 mb-4">WeCare</h2>


      <section className='text-center'>
        <p className="text-gray-700 text-lg mb-2">Your appointment request has been submitted successfully!</p>
        <p className="text-gray-500 text-sm mb-6">We'll be in touch shortly to confirm.</p>


        <hr className="mx-auto mb-4 w-60" />
        <AppointmentDetails
          appointmentData={appointmentData} />
        <hr className="mx-auto mt-4 w-60" />

        <div className="flex justify-center items-center m-4">
          <CustomButton handleClick={handleNewAppointment}>
            New Appointment
          </CustomButton>
        </div>

      </section>

      <div className="mt-4">
        <Copyright />
      </div>
    </main>
  );
};

export default Success;
