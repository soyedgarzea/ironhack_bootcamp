const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    date: {type: Date, required: true},
    doctorId: {type: Schema.Types.ObjectId, ref: 'Doctor'},
    patientId: {type: Schema.Types.ObjectId, ref: 'Patient'}
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;