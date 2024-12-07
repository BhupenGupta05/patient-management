const express = require('express')
const middleware = require('../utils/middleware')
const PatientController = require('../controllers/Patient')
const AuthController = require('../controllers/Auth')
const AppointmentController = require('../controllers/Appointment')

const AdminRouter = express.Router()

// GET ALL PATIENT DATA
AdminRouter.get('/', middleware.verifyToken, PatientController.getAllPatients)

AdminRouter.post('/login', AuthController.loginAdmin)

AdminRouter.patch('/:appointmentId/schedule', AppointmentController.updateAppointment)
AdminRouter.patch('/:appointmentId/cancel', AppointmentController.updateAppointment)

module.exports = {AdminRouter}