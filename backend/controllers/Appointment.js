const { default: mongoose } = require('mongoose')
const Appointment = require('../models/Appointment')
const Patient = require('../models/Patient')

const getAppointment = async (req, res) => {
    try {
        const {patientId} = req.body

        if(!patientId || !mongoose.Types.ObjectId.isValid(patientId)) {
            return res.status(400).json({ message: "Invalid or missing patient ID" });
        }

        // Sort appointments in descending order of storage timing in the DB
        const latestAppointment = await Appointment.findOne({ patient: patientId })
            .sort({ updatedAt: -1, createdAt: -1 })


        if (!latestAppointment) {
            return res.status(404).json({ message: "No appointments found for this patient" });
        }

        return res.status(200).json(latestAppointment);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error fetching appointment"})
    }
}

const createAppointment = async (req, res) => {
    try {
        const {patientId, physician, appointmentDate, reason, comments} = req.body

        const newAppointment = new Appointment({
            patient: patientId,
            physician,
            appointmentDate,
            reason,
            comments
        })

        // Adding appointment and updating Patient using Promise.all
        const [savedAppointment, updatedPatient] = await Promise.all([
            newAppointment.save(),
            Patient.findByIdAndUpdate(
                patientId,
                { $push: { appointments: newAppointment.id } },
                { new: true } 
            )
        ])
        
        res.status(201).json({ appointment: savedAppointment, patient: updatedPatient })


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating appointment" })
    }
}

const updateAppointment = async (req, res) => {
    try {
        console.log("REQ BODY: ", req.body);

        const { appointmentId, status, cancellationReason } = req.body; 

        if (!appointmentId || !mongoose.Types.ObjectId.isValid(appointmentId)) {
            return res.status(400).json({ message: "Invalid or missing appointment ID" });
        }

        if (!status) {
            return res.status(400).json({ message: "Status is required" });
        }

        if(status === 'cancelled' && !cancellationReason) {
            return res.status(400).json({ message: "Cancellation reason is required when cancelling an appointment" });
        }

        const updatedAppointment = await Appointment.findByIdAndUpdate(
            appointmentId,
            { status, cancellationReason },
            { new: true }
        );

        if (!updatedAppointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        return res.status(200).json(updatedAppointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating appointment" });
    }
}


module.exports = { getAppointment, createAppointment, updateAppointment }