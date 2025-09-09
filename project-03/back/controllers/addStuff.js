const Stuff = require("../models/Stuff");
const User = require("../models/User");

const SignUp = (req, res, next) => {
  const { name, description, quantity, img, realPrice, priceLend } = req.body;

  try {
    const user = req.session.currentUser;
    User.findById(user._id).then((user) => {
      Stuff.create({
        name,
        description,
        quantity,
        imgPath: img,
        owner: user._id,
        available: true,
        realPrice,
        priceLend,
        usernameOwner: user.username,
      }).then((stuff) => {
        user.stuffs.push(stuff._id);
        user.save();
        res.status(200).json({ stuff, user });
      });
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports = SignUp;
