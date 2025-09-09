const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const uploadCloud = require("../config/cloudinary");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");

router.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/login");
  }
});

// Get edit profile layout

router.get("/patient/edit", (req, res, next) => {
  const user = req.session.currentUser;

  if (user.birthdate) {
    user.birthdate = user.birthdate.slice(0, 10);
  }
  res.render("editProfilePatient", { user });
});

router.get("/doctor/edit", (req, res, next) => {
  const user = req.session.currentUser;

  if (user) {
    if (user.specialty === "") {
      res.render("editProfileDoctor", { user, empty: true });
    } else {
      res.render("editProfileDoctor", { user, empty: false });
    }
  } else {
    res.render("index");
  }
});

// Get profile layout

router.get("/patient/:patientID", async (req, res, next) => {
  const patient = req.session.currentUser;

  const user = await Patient.findById(patient._id);
  if (!user) {
    return res.render("index");
  }
  if (user.birthdate) {
    let currentDate = new Date();
    let birthdate = user.birthdate;
    user.age = Math.floor((currentDate - birthdate) / 31536000000);
  }

  console.log(user);
  res.render("profile-patient", { user });
});

router.get("/doctor/:doctorID", async (req, res, next) => {
  const doctor = req.session.currentUser;

  const user = await Doctor.findById(doctor._id);
  if (!user) {
    return res.status(404).render("not-found");
  }

  res.render("profile-doctor", { user, doctor });
});

// Post edit profile

router.post(
  "/patient/edit",
  uploadCloud.single("photo"),
  async (req, res, next) => {
    const user = req.session.currentUser;
    const personId = user._id;
    const oldPass = req.body.oldPassword;
    const newPass = req.body.newPassword;
    const confirmPass = req.body.confirmPassword;
    let imgPath;
    if (req.file) {
      imgPath = req.file.url;
    }
    const data = {};
    const fields = [
      "name",
      "paternalLastName",
      "maternalLastName",
      "birthdate",
      "weight",
      "height",
      "bloodType"
    ];

    if (newPass === confirmPass && bcrypt.compareSync(oldPass, user.password)) {
      for (let item of fields) {
        data[item] = req.body[item];
      }
      if (imgPath) {
        data.profilePic = imgPath;
      }

      if (newPass) {
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(newPass, salt);
        data.password = hashPass;
      }

      req.session.currentUser = await Patient.findByIdAndUpdate(
        personId,
        { $set: data },
        { new: true }
      );
      res.redirect(`/profile/patient/${personId}`);
    } else {
      return res.render("editProfilePatient", {
        user,
        messagePat: "Las contraseñas no coinciden"
      });
    }
  }
);

router.post(
  "/doctor/edit",
  uploadCloud.single("photo"),
  async (req, res, next) => {
    const user = req.session.currentUser;
    const personId = user._id;
    const oldPass = req.body.oldPassword;
    const newPass = req.body.newPassword;
    const confirmPass = req.body.confirmPassword;
    let imgPath;
    if (req.file) {
      imgPath = req.file.url;
    }
    const data = {};
    const fields = [
      "name",
      "paternalLastName",
      "maternalLastName",
      "idCard",
      "specialty",
      "location"
    ];

    if (newPass === confirmPass && bcrypt.compareSync(oldPass, user.password)) {
      for (let item of fields) {
        data[item] = req.body[item];
      }
      if (imgPath) {
        data.profilePic = imgPath;
      }

      if (newPass) {
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(newPass, salt);
        data.password = hashPass;
      }

      req.session.currentUser = await Doctor.findByIdAndUpdate(
        personId,
        { $set: data },
        { new: true }
      );

      res.redirect(`/profile/doctor/${personId}`);
    } else {
      return res.render("editProfileDoctor", {
        user,
        messageDoc: "Las contraseñas no coinciden"
      });
    }
  }
);

router.all("*", (req, res, next) => {
  res.status(404).render("not-found");
});

module.exports = router;
