const User = require("../models/User");
const Stuff = require("../models/Stuff");

const Contact = async (req, res, next) => {
  const { username } = req.params;

  try {
    const profile = await User.findOne({ username });

    const stuffs = await Stuff.find({ owner: profile._id });

    res.status(200).json({ profile, stuffs });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports = Contact;
