const Stuff = require("../models/Stuff");

const ToggleAvailability = async (req, res, next) => {
  const { stuff } = req.params;

  try {
    const originalStuff = await Stuff.findById(stuff);
    const stuffEdited = await Stuff.findByIdAndUpdate(stuff, {
      available: !originalStuff.available,
    });
    res.status(200).json(stuffEdited);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports = ToggleAvailability;
