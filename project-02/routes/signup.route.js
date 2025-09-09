const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const axios = require("axios");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");

router.get("/", (req, res, next) => {
  res.render("signup");
});

router.post("/doctor", async (req, res, next) => {
  const name = req.body.inputName;
  const paternalLastName = req.body.inputPaternalLastName;
  const idCard = req.body.inputIDcard;
  const email = req.body.inputEmail;
  const password = req.body.inputPassword;
  const confirmPassword = req.body.inputConfirmPassword;

  const isEmpty = [
    name,
    paternalLastName,
    idCard,
    email,
    password,
    confirmPassword
  ].some(element => element === "");

  try {
    if (isEmpty) {
      return res.render("signup", {
        messageDoc: "Todos los campos son requeridos."
      });
    }

    const emailExists = await Doctor.findOne({ email });

    if (emailExists) {
      return res.render("signup", {
        messageDoc: "Este usuario ya existe."
      });
    }

    if (idCard === "") {
      return res.render("signup", {
        messageDoc:
          "Es requerido validar tu profesión para registrarte como Médico"
      });
    } else {
    }

    if (password === confirmPassword) {
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);

      await Doctor.create({
        name,
        paternalLastName,
        password: hashPass,
        email
      });

      res.redirect("/login");
    } else {
      return res.render("signup", {
        messageDoc: "Las contraseñas no coinciden"
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/patient", async (req, res, next) => {
  const name = req.body.inputName;
  const paternalLastName = req.body.inputPaternalLastName;
  const email = req.body.inputEmail;
  const password = req.body.inputPassword;
  const confirmPassword = req.body.inputConfirmPassword;

  const isEmpty = [
    name,
    paternalLastName,
    email,
    password,
    confirmPassword
  ].some(element => element === "");

  try {
    if (isEmpty) {
      return res.render("signup", {
        messagePat: "Todos los campos son requeridos."
      });
    }

    const emailExists = await Patient.findOne({ email });

    if (emailExists) {
      return res.render("signup", {
        messagePat: "Este usuario ya existe."
      });
    }

    if (password === confirmPassword) {
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);

      await Patient.create({
        name,
        paternalLastName,
        password: hashPass,
        email
      });

      res.redirect("/login");
    } else {
      return res.render("signup", {
        messagePat: "Las contraseñas no coinciden"
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
