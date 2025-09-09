require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes/routes");
const logger = require("morgan");
const path = require("path");
const PORT = process.env.PORT || 3100;

const connectDB = require("./config/db");
connectDB();

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.enable("trust proxy");
app.disable("etag");

// Express View engine setup

app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "lEnD1T",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 * 1000,
    }),
  })
);

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

// Uncomment the next line for local environment
// app.listen(PORT, () => console.log("Lend connected on port " + PORT));

app.use("/", routes);

app.use((req, res, next) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/public/index.html");
});

module.exports = app;
