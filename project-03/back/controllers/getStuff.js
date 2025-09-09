const Stuff = require("../models/Stuff");

const GetStuff = async (req, res, next) => {
  const { id } = req.params;

  try {
    const stuff = await Stuff.findById(id);

    console.log(stuff);

    res.status(200).json(stuff);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports = GetStuff;
