const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = new Schema(
  {
    name: { type: String, required: true },
    paternalLastName: { type: String, required: true },
    maternalLastName: { type: String },
    idCard: { type: String, required: false },
    specialty: { type: String },
    profilePic: {
      type: String
    },
    email: {
      type: String,
      match: /[\w\.-]+@[\w\.-]+\.[\w\.]+/,
      required: true
    },
    password: { type: String, required: true },
    address: {
      streetAddress: { type: String },
      borough: { type: String },
      city: { type: String }
    },
    appointment: [{ type: Schema.Types.ObjectId, ref: "Appointment" }],
    role: {
      type: String,
      default: "doctor"
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
