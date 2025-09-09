const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
  doctorName: String,
  doctorPaternalLastName: String,
  doctorIDcard: Number,
  patientName: String,
  patientPaternalLastName: String,
  patientAge: Number,
  bloodType: String,
  height: String,
  weight: String,
  bodyTemperature: String,
  allergies: String,
  dx: String,
  treatment: String,
  date: String
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);

module.exports = Prescription;
