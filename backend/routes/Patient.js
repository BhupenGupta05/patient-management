const express = require('express')
const PatientController = require('../controllers/Patient')

const PatientRouter = express.Router()

// CHECK IF USER EXISTS (RETURNS PAATIENT ID)
PatientRouter.get('/check-user', PatientController.checkUserExists)

// REGISTERS A PATIENT 
PatientRouter.post('/registration', PatientController.addPatient)

module.exports = { PatientRouter }