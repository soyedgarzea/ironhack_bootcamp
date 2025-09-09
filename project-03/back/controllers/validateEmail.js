const User = require("../models/User");

const ValidateEmail = async (req, res, next) => {
  const { email } = req.params;

  try {
    const profile = await User.find({ email });

    if (profile.length > 0) {
      res
        .status(200)
        .json({ message: "Este correo ya está registrado", status: true });
    } else {
      res.status(200).json({ message: "Correo válido", status: false });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports = ValidateEmail;
