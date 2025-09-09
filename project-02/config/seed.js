require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Patient = require("../models/Patient");

mongoose.connect(process.env.URL_DB);

const salt = bcrypt.genSaltSync(10);
const hashPass = bcrypt.hashSync(process.env.DUMMY_PASS, salt);

const patients = [
  {
    name: "Fernanda",
    paternalLastName: "Hernández",
    email: "fernanda@example.com",
    password: hashPass
  },
  {
    name: "Diana",
    paternalLastName: "García",
    email: "diana@example.com",
    password: hashPass
  },
  {
    name: "Andrea",
    paternalLastName: "López",
    email: "andrea@example.com",
    password: hashPass
  },
  {
    name: "Ana",
    paternalLastName: "Martínez",
    email: "ana@example.com",
    password: hashPass
  },
  {
    name: "María",
    paternalLastName: "Rodríguez",
    email: "maria@example.com",
    password: hashPass
  },
  {
    name: "Mariana",
    paternalLastName: "González",
    email: "mariana@example.com",
    password: hashPass
  },
  {
    name: "Daniela",
    paternalLastName: "Pérez",
    email: "daniela@example.com",
    password: hashPass
  },
  {
    name: "Alejandra",
    paternalLastName: "Sánchez",
    email: "alejandra@example.com",
    password: hashPass
  },
  {
    name: "Adriana",
    paternalLastName: "Gómez",
    email: "adriana@example.com",
    password: hashPass
  },
  {
    name: "Karla",
    paternalLastName: "Flores",
    email: "karla@example.com",
    password: hashPass
  }
];

Patient.collection.drop();

Patient.create(patients)
  .then(newPatients => {
    console.log(`Created ${newPatients.length} patients`);
    mongoose.connection.close();
  })
  .catch(err => console.log("error ", err));
