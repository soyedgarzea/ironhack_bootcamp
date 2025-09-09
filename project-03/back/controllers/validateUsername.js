const User = require("../models/User");

const ValidateUsername = async (req, res, next) => {
  const { username } = req.params;

  try {
    const profile = await User.find({ username });

    if (profile.length > 0) {
      res.status(200).json({ message: "Este usuario ya existe", status: true });
    } else {
      res.status(200).json({ message: "Usuario válido", status: false });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports = ValidateUsername;
