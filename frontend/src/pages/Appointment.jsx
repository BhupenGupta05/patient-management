import AppointmentForm from '../components/AppointmentForm'
import React from 'react'

const Appointment = ({ type, patient, onClose }) => {
  return (
    <div className='max-w-2xl mx-auto p-10'>
      {type !== 'schedule' && type !== 'cancel' && (
        <h2 className="text-2xl font-bold text-indigo-600 mb-8"
        >
          WeCare
        </h2>
      )}

      <h4 className='text-3xl font-bold mb-2'>{type === 'cancel' ? 'Cancel appointment' : 'New Appointment'}</h4>
      <p className='text-sm mb-8'>{type === 'cancel' || type === 'schedule' ? "Please fill in the details to cancel appointment" : "Request an appontment in just seconds."}</p>
      <AppointmentForm type={type} patientData={patient} onClose={onClose} />
      <p className="text-xs">&copy;2024 WeCare</p>
    </div>
  )
}

export default Appointment