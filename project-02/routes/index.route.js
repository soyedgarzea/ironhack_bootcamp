const express = require("express");
const router = express.Router();
const axios = require("axios");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");

router.get("/", async (req, res, next) => {
  const user = req.session.currentUser;
  // try {
  //   const data = new FormData();
  //   data.append(
  //     "json",
  //     JSON.stringify({
  //       maxResult: "1000",
  //       nombre: "",
  //       paterno: "",
  //       materno: "",
  //       idCedula: "8134801"
  //     })
  //   );
  //   const iD = await axios.post(
  //     "https://www.cedulaprofesional.sep.gob.mx/cedula/buscaCedulaJson.action",
  //     data
  //   );
  //   console.log(iD);
  // } catch (error) {
  //   console.log(error);
  // }

  if (user) {
    if (user.role === "doctor") {
      res.render("index", { user, doctor: true });
    } else {
      res.render("index", { user });
    }
  } else {
    res.render("index");
  }
});

router.get("/logout", (req, res, next) => {
  req.session.destroy(err => {
    res.redirect("/");
  });
});

router.get("/patients", (req, res, next) => {
  Patient.find()
    .then(patients => {
      res.render("patients", { patients });
    })
    .catch(err =>
      console.log("Error while getting the patients from DB:", err)
    );
});

router.get("/reserve", async (req, res, next) => {
  const user = req.session.currentUser;
  // obtener las horas disponibles por semana
  /*
  const data = [
    {Fecha: [{citaHora, citaID}, {}, {}, ...]},
    {},
    {},
    ...];
  */
  const isEmpty = Object.entries(req.query).length === 0;

  const days = [
    {
      fecha: "2020-01-01",
      horas: ["10:00", "11:00"]
    },
    {
      fecha: "2020-01-02",
      horas: ["12:00", "13:00"]
    },
    {
      fecha: "2020-01-03",
      horas: ["15:00", "16:00"]
    }
  ];

  if (isEmpty) {
    res.render("reserve", { days });
  } else {
    const doctorId = req.query.doctorId;

    try {
      await Doctor.findById(doctorId).then(doctorInfo => {
        if (user) {
          res.render("reserve", { user, days, doctorInfo });
        } else {
          res.render("reserve", { days, doctorInfo });
        }
      });
    } catch (error) {
      console.log(error);
      res.render("not-found");
    }
  }
});

module.exports = router;
