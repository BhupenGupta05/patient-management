import Copyright from '../components/Copyright';
import AppointmentForm from '../components/AppointmentForm';
import React from 'react';
import Title from '../components/Title';

const Appointment = ({ type, patient, onClose }) => {
    const title = "NurtureMed";
    const heading =
        type === "cancel"
            ? "Cancel Appointment"
            : type === "schedule"
            ? "Schedule Appointment"
            : "New Appointment";
    const subheading =
        type === "cancel"
            ? "Please provide the reason to cancel your appointment."
            : type === "schedule"
            ? "Please check the details to schedule the appointment."
            : "Request an appointment in just seconds.";

    return (
        <main className={`flex justify-center items-center ${type === 'create' ? 'bg-gray-50 min-h-screen' : ' ' } mx-4`}>
            <div className={`bg-white w-full max-w-3xl mx-4 rounded-lg ${type === 'create' ? 'shadow-lg p-6' : 'p-2'}`}>
                <Title
                    title={title}
                    heading={heading}
                    subheading={subheading}
                    className=""
                    titleClassName="text-sm sm:text-md md:text-lg lg:text-xl font-bold text-indigo-600 mb-2 md:mb-4"
                    headingClassName="text-lg md:text-xl lg:text-2xl font-bold mb-1"
                    subheadingClassName="text-wrap text-xs md:text-sm lg:text-md mb-8 md:mb-10"
                />
                <AppointmentForm type={type} patientData={patient} onClose={onClose} />
                <Copyright />
            </div>
            
        </main>
    );
};

export default Appointment;
