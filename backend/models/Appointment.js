const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    physician: {
        type: String,
        required: true,
    },
    appointmentDate: {
        type: Date,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    comments: {
        type: String,
    },
    status: {
        type: String,
        enum: ['scheduled', 'cancelled', 'pending'],
        default: 'pending',
    },
    cancellationReason: {
        type: String,
        validate: {
            validator: function (value) {
                // Allow cancellationReason only if status is 'cancelled'
                return this.status === 'cancelled' ? !!value : !value;
            },
            message: 'Cancellation reason must be provided only when status is "cancelled"',
        },
    },
}, { timestamps: true });

appointmentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
