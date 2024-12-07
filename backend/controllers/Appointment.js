const mongoose = require('mongoose')
const { format } = require('date-fns')
const Appointment = require('../models/Appointment')
const Patient = require('../models/Patient');
const { sendAppointmentReminder } = require('../utils/sendSMS');

const getAppointment = async (req, res) => {
    
    const { patientId } = req.params;

    try {
        if (!patientId || !mongoose.Types.ObjectId.isValid(patientId)) {
            return res.status(400).json({ message: "Invalid or missing patient ID" });
        }

        // Sort appointments in descending order of storage timing in the DB
        const latestAppointment = await Appointment.findOne({ patient: patientId })
            .sort({ updatedAt: -1, createdAt: -1 });
        

        if (!latestAppointment) {
            return res.status(404).json({ message: "No appointments found for this patient" });
        }

        return res.status(200).json(latestAppointment);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error fetching appointment" });
    }
};


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
        const { appointmentId } = req.params;

        const { status, cancellationReason } = req.body; 

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
        ).populate('patient');

        console.log("UPDATED APPOINTMENT", updatedAppointment);
        

        if (!updatedAppointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        const patient = updatedAppointment.patient;

        // Validate patient and phone
        if (!patient || !patient.phoneNumber) {
            return res.status(404).json({ message: "Patient not found or missing phone number" });
        }

        const patientPhone = patient.phoneNumber;

        // Send SMS based on status
        const smsMessage = `Hi, it's NurtureMed. 
        ${status === 'scheduled' 
            ? `Your appointment has been scheduled for ${format(updatedAppointment.appointmentDate, "MMMM d, yyyy h:mmaa")}.` 
            : `We regret to inform you that your appointment on ${format(updatedAppointment.appointmentDate, "MMMM d, yyyy h:mmaa")} has been cancelled for the following reason: ${cancellationReason}.`}
            `;

        // Call the SMS function
        await sendAppointmentReminder(patientPhone, smsMessage)
            .then(() => console.log(`SMS sent for ${status} appointment`))
            .catch(err => {
                console.error("Error sending SMS:", err.message);
                // Optionally respond with an error related to SMS
                // res.status(500).json({ message: "Error sending SMS" });
            });

        return res.status(200).json(updatedAppointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating appointment" });
    }
}


module.exports = { getAppointment, createAppointment, updateAppointment }