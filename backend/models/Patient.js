const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true,
    },
    address: {
        type: String,
        required: true,
    }, 
    occupation: {
        type: String,
        required: true,
    }, 
    emergencyContactName: {
        type: String,
    }, 
    emergencyContact: {
        type: String,
    },
    physician: {
        type: String,
        required: true,
    }, 
    allergies: {
        type: String,
    },
    medications: {
        type: String,
    }, 
    familyHistory: {
        type: String,
    },
    pastHistory: {
        type: String,
    },
    identificationType: {
        type: String,
        required: true,
    },
    identificationNumber: {
        type: String,
        required: true,
        unique: true
    },
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment', 
    }]
    
}, { timestamps: true })

patientSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

const Patient = mongoose.model('Patient', patientSchema)

module.exports = Patient