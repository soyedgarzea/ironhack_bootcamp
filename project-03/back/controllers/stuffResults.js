const Stuff = require("../models/Stuff");
const User = require("../models/User");

const StuffResults = async (req, res, next) => {
  const { stuff } = req.params;

  try {
    const stuffs = await Stuff.find({
      name: { $regex: stuff, $options: "i" },
    });

    res.status(200).json(stuffs);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports = StuffResults;
