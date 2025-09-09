const Stuff = require("../models/Stuff");
const User = require("../models/User");

const DeleteStuff = async (req, res, next) => {
  const { stuff } = req.params;

  try {
    const originalStuff = await Stuff.findById(stuff);

    await User.findByIdAndUpdate(originalStuff.owner, {
      $pull: { stuffs: stuff },
    });

    originalStuff.delete();

    res.status(200).json({ message: "Artículo eliminado" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

module.exports = DeleteStuff;
