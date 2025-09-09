// CONFIG
require("dotenv").config();
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);

const app = express();
const PORT = process.env.PORT || 3000;

const connectDB = require("./config/db");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "views/partials"));

//CONNECTION
connectDB();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "m3di4PP",
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 * 1000
    })
  })
);

// ROUTES
const index = require("./routes/index.route");
app.use("/", index);

const login = require("./routes/login.route");
app.use("/login", login);

const signup = require("./routes/signup.route");
app.use("/signup", signup);

const profile = require("./routes/profile.route");
app.use("/profile", profile);

const search = require("./routes/search.route");
app.use("/search", search);

const prescription = require("./routes/prescription.route");
app.use("/prescription", prescription);

// app.all("*", (req, res, next) => {
//   res.render("/");
// });

// LISTEN
app.listen(PORT, () => console.log(`Servidor listo en el puerto 3000`));

module.exports = app;
