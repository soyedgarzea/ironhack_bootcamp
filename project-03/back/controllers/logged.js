const User = require("../models/User");

const Logged = async (req, res, next) => {
  try {
    if (req.session.currentUser) {
      const user = await User.findById(req.session.currentUser._id);
      req.session.currentUser = user;
      res.status(200).json(user);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports = Logged;
