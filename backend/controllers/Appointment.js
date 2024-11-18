const Appointment = require('../models/Appointment')
const Patient = require('../models/Patient')

const getAppointment = async (req, res) => {
    try {
        const {patientId} = req.body

        // Sort appointments in descending order of storage timing in the DB
        const latestAppointment = await Appointment.find({patient: patientId}).sort({ updatedat: -1, createdAt: -1})

        if (!latestAppointment) {
            return res.status(404).json({ message: "No appointments found for this patient" });
        }

        return res.status(200).json(appointment)
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

        if (!appointmentId || !status) {
            return res.status(400).json({ message: "Appointment ID and status are required" });
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