const express = require('express')
const AppointmentController = require('../controllers/Appointment')

const AppointmentRouter = express.Router()

// CREATE APPOINTMENT
AppointmentRouter.post('/:patientId/appointment', AppointmentController.createAppointment)

// UPDATE APPOINTMENT
// AppointmentRouter.patch('/:appointmentId', AppointmentController.updateAppointment)

// GET APPOINTMENT
AppointmentRouter.get('/:patientId', AppointmentController.getAppointment)

module.exports = { AppointmentRouter }