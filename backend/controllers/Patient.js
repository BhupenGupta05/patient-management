const Patient = require("../models/Patient");
const mongoose = require('mongoose')

const getPatient = async (req, res) => {
    const { patientId } = req.params;

    if (!patientId || !mongoose.Types.ObjectId.isValid(patientId)) {
        return res.status(400).json({ message: "Invalid patient ID" });
    }

    try {
        const patient = await Patient.findById(patientId);

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        return res.status(200).json(patient);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching patient" });
    }
};


const getAllPatients = async (req, res) => {
    if(req.user.role !== 'admin') {
        return res.status(403).json({ message: 'You do not have permission to access this page' });
    }
    try {
        const patients = await Patient.find({}).populate({
            path: 'appointments',
            options: { 
                sort: { 
                    updatedAt: -1, 
                    createdAt: -1 
                } 
            },
        }) 

        if (!patients || patients.length === 0) {
            return res.status(404).json({ message: "No patients found" });
        }


        const filteredAppointmentsPatientData = patients.map((patient) => {
            const latestAppointment = patient.appointments[0];
            return {
                ...patient.toObject(),
                appointments: latestAppointment || null
            }
        })
        return res.status(200).json(filteredAppointmentsPatientData)

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error fetching patients"})
        
    }
}

const checkUserExists = async (req, res) => {
    try {
        const {email} = req.query
        
        const user = await Patient.findOne({ email })

        if(user) {
            return res.status(200).json({ exists: true, id: user.id })
        }

        return res.status(200).json({ exists: false })

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error fetching user"})
        
    }
}

const addPatient = async (req, res) => {
    try {
        
        const { address, allergies, dob, name, phoneNumber, email, gender, occupation, physician, familyHistory, pastHistory, medications, emergencyContactName, emergencyContact, identificationType, identificationNumber } = req.body

        // CHECK IF PATIENT EXISTS
        const existingPatient = await Patient.findOne({ email })

        if (existingPatient) {
            return res.status(409).json({ message: "Patient already exists" })  //'409' for conflict
        }

        const newPatient = new Patient({
            address, 
            allergies, 
            dob: new Date(dob), 
            name,
            phoneNumber:`+${phoneNumber}`, 
            email, 
            gender, 
            occupation, 
            physician, 
            familyHistory, 
            pastHistory, 
            medications, 
            emergencyContactName, 
            emergencyContact:`+${emergencyContact}`, 
            identificationType, 
            identificationNumber
        })

        await newPatient.save()

        res.status(201).json(newPatient)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error adding patient" })

    }
}

module.exports = { getPatient, getAllPatients, addPatient, checkUserExists }