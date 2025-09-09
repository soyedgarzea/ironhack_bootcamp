const express = require("express");
const router = express.Router();
const axios = require("axios");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const Prescription = require("../models/Prescription");
const moment = require("moment");
moment.locale("es");

router.get("/receta/:id", async (req, res, next) => {
  const user = req.session.currentUser;
  let prescription;

  try {
    if (!user) {
      return res.redirect("/");
    } else {
      const patient = await Patient.findById(user._id);
      prescription = patient.prescriptions.forEach(pres => {
        if (pres._id == req.params.id) {
          prescription = pres;
        }
        res.render("prescription-detail", { user, prescription });
      });
    }
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

router.get("/", async (req, res, next) => {
  const user = req.session.currentUser;

  try {
    if (!user) {
      return res.redirect("/");
    } else if (user.role === "doctor") {
      const patients = await Patient.find();
      return res.render("prescription", { user, patients, doctor: true });
    } else {
      return res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

router.get("/getPatientInfo", async (req, res, next) => {
  const user = req.session.currentUser;
  const patientId = req.query.patient;

  try {
    const patient = await Patient.findById(patientId);
    if (patient.birthdate) {
      let currentDate = new Date();
      let birthdate = patient.birthdate;
      patient.age = Math.floor((currentDate - birthdate) / 31536000000);
    }
    moment.locale();
    const date = moment(new Date()).format("LLL");
    res.render("prescription", { user, patient, date, doctor: true });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

router.post("/newPrescription", async (req, res, next) => {
  const user = req.session.currentUser;
  const patient = req.body.patientID;
  const prescription = {
    doctorName: req.body.doctorName,
    doctorPaternalLastName: req.body.doctorPaternal,
    doctorIDcard: req.body.doctorIDcard,
    patientName: req.body.patientName,
    patientPaternalLastName: req.body.patientPaternalLastName,
    patientAge: req.body.patientAge,
    bloodType: req.body.bloodType,
    height: req.body.height,
    weight: req.body.weight,
    bodyTemperature: `${req.body.bodyTemperature} ℃`,
    allergies: req.body.allergies,
    dx: req.body.dx,
    treatment: req.body.treatment,
    date: req.body.date
  };
  try {
    if (user.role === "doctor") {
      await Patient.findById(patient).then(patientPrescripted => {
        patientPrescripted.prescriptions.push(prescription);
        patientPrescripted.save();
        res.redirect(`/profile/doctor/${req.session.currentUser._id}`);
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.all("*", (req, res, next) => {
  res.status(404).render("not-found");
});

module.exports = router;
