const express = require('express')
const PatientController = require('../controllers/Patient')
const { validatePatient } = require('../utils/patientValidator')

const PatientRouter = express.Router()

// CHECK IF USER EXISTS (using query params)
PatientRouter.get('/check-user', PatientController.checkUserExists)

// REGISTERS A PATIENT
PatientRouter.post('/registration', validatePatient, PatientController.addPatient)

// GET PATIENT DETAILS (using :patientId in URL params)
PatientRouter.get('/:patientId', PatientController.getPatient)

module.exports = { PatientRouter }