require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

/**
 * Send SMS reminder for an appointment
 * @param {string} to - The recipient's phone number.
 * @param {object} appointmentDetails - Appointment details including date and time.
 * @param {string} appointmentDetails.date - Appointment date.
 * @param {string} appointmentDetails.time - Appointment time.
 * @returns {Promise} - Resolves with the SMS message SID or rejects with an error.
 */

const sendAppointmentReminder = (to, message) => {
    return client.messages
    .create({
        body: `${message}`,
        from: `${process.env.TWILIO_PHONE_NUMBER}`,
        to: `${to}`
    })
}

module.exports = {sendAppointmentReminder}

