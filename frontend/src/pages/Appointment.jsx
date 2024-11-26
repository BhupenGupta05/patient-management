import Copyright from '../components/Copyright'
import AppointmentForm from '../components/AppointmentForm'
import React from 'react'
import Title from '../components/Title';

const Appointment = ({ type, patient, onClose }) => {
    const title = "WeCare";
    const heading =
        type === "cancel"
            ? "Cancel Appointment"
            : type === "schedule"
            ? "Schedule Appointment"
            : "New Appointment";
    const subheading =
        type === "cancel"
            ? "Please fill in the details to cancel your appointment."
            : type === "schedule"
            ? "Please provide the details to schedule your appointment."
            : "Request an appointment in just seconds.";
  return (
    <main className='max-w-2xl mx-auto p-10'>
        <Title title={title} heading={heading} subheading={subheading} />
      <AppointmentForm type={type} patientData={patient} onClose={onClose} />
      <Copyright />
    </main>
  )
}

export default Appointment