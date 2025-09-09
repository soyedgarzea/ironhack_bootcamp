const { connect } = require("mongoose");

const connectDB = async () => {
  try {
    await connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("Base de datos conectada.");
  } catch (err) {
    console.error("Error en la base de datos", err);
  }
};

module.exports = connectDB;
