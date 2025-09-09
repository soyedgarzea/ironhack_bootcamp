const User = require("../models/User");

const Verificate = async (req, res, next) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({ verificationCode: code });

    if (user) {
      const userValidated = await User.findByIdAndUpdate(user._id, {
        validatedProfile: true,
      });

      res.status(200).json({ userValidated, answer: true });
    } else {
      res.status(200).json({ answer: false });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports = Verificate;
