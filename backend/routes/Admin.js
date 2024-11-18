const express = require('express')
const PatientController = require('../controllers/Patient')
const AppointmentController = require('../controllers/Appointment')

const AdminRouter = express.Router()

// GET ALL PATIENT DATA
AdminRouter.get('/', PatientController.getAllPatients)

AdminRouter.patch('/:appointmentId/schedule', AppointmentController.updateAppointment)
AdminRouter.patch('/:appointmentId/cancel', AppointmentController.updateAppointment)

module.exports = {AdminRouter}