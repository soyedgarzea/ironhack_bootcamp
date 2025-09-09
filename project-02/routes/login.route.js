const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");

router.get("/", (req, res, next) => {
  res.render("login");
});

router.post("/doctor", async (req, res, next) => {
  try {
    const email = req.body.inputEmail;
    const password = req.body.inputPassword;

    if (!email || !password) {
      return res.render("login", {
        messageDoc: "Todos los campos son obligatorios."
      });
    }

    const user = await Doctor.findOne({ email });

    if (!user) {
      return res.render("login", {
        messageDoc: "El usuario no existe."
      });
    } else {
      if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        res.redirect(`/profile/doctor/${req.session.currentUser._id}`);
      } else {
        res.render("login", {
          messageDoc: "Los campos no coinciden."
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/patient", async (req, res, next) => {
  try {
    const email = req.body.inputEmail;
    const password = req.body.inputPassword;

    if (!email || !password) {
      return res.render("login", {
        messagePat: "Todos los campos son obligatorios."
      });
    }

    const user = await Patient.findOne({ email });

    if (!user) {
      return res.render("login", {
        messagePat: "El usuario no existe."
      });
    } else {
      if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        res.redirect(`/profile/patient/${req.session.currentUser._id}`);
      } else {
        res.render("login", {
          messagePat: "Los campos no coinciden."
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.all("*", (req, res, next) => {
  res.status(404).render("not-found");
});

module.exports = router;
