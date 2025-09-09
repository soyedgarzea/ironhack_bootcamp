const bcrypt = require("bcrypt");
const moment = require("moment-timezone");
const User = require("../models/User");
const sgMail = require("@sendgrid/mail");
const twilio = require("twilio");
var client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const SignUp = async (req, res, next) => {
  const {
    name,
    username,
    email,
    phone,
    password,
    confirmPassword,
    device,
  } = req.body;

  try {
    let charts;
    let validationWay;

    const makeid = () => {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < charts; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    };

    const expireCodeDate = moment()
      .tz("America/Mexico_City")
      .add(1, "days")
      .locale("es")
      .format("LLL");

    const since = moment().tz("America/Mexico_City").locale("es").format("LLL");

    if (
      name != "" &&
      username != "" &&
      phone != "" &&
      email != "" &&
      password != "" &&
      confirmPassword != "" &&
      password === confirmPassword
    ) {
      if (device.email) {
        charts = 20;
        validationWay = "email";
      }

      if (device.phone) {
        charts = 10;
        validationWay = "phone";
      }
      const verificationCode = makeid();

      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);

      if (validationWay === "email") {
        const msg = {
          to: email,
          from: "cesszea@icloud.com",
          subject: `${name} Bienvenido a Lend`,
          dynamic_template_data: {
            code: verificationCode,
          },
          template_id: "d-01c9a4c15102489b9db352a23f12a632",
        };

        await sgMail.send(msg);
      }

      if (validationWay === "phone") {
        const message = await client.messages.create({
          body: `Hola, ${name}, este es tu código de verificación ${verificationCode}. Entra a https://lendt.herokuapp.com/verification y pega el código`,
          to: `+52${phone}`, // Text this number
          from: "+12058462963", // From a valid Twilio number
        });
      }

      const user = await User.create({
        name,
        username,
        password: hashPass,
        email,
        phone,
        verificationCode,
        expireCodeDate,
        since,
        validationWay,
      });

      res.status(200).json(user);
    } else {
      res
        .status(400)
        .json({ message: "Hubo un error inesperado, intenta de nuevo" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports = SignUp;
