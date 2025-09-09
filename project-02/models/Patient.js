const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema(
  {
    name: { type: String, required: true },
    paternalLastName: { type: String, required: true },
    maternalLastName: { type: String },
    email: {
      type: String,
      match: /[\w\.-]+@[\w\.-]+\.[\w\.]+/,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    profilePic: {
      type: String
    },
    birthdate: { type: Date },
    bloodType: {
      type: String,
      enum: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"]
    },
    height: { type: Number, min: 0, max: 2 }, // meters
    weight: { type: Number, min: 0, max: 200 }, // kilograms
    appointment: [{ type: Schema.Types.ObjectId, ref: "Appointment" }],
    prescriptions: [
      {
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
      }
    ],
    role: {
      type: String,
      default: "patient"
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
