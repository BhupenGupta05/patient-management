const express = require('express')
const AppointmentController = require('../controllers/Appointment')

const AppointmentRouter = express.Router()

AppointmentRouter.get('/', AppointmentController.getAppointment)

// CREATE APPOINTMENT
AppointmentRouter.post('/appointment', AppointmentController.createAppointment)

module.exports = { AppointmentRouter }