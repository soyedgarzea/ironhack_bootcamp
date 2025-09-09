const User = require("../models/User");
const Stuff = require("../models/Stuff");
const Recommendation = require("../models/Recommendation");

const Profile = async (req, res, next) => {
  const { username } = req.params;

  try {
    const profile = await User.findOne({ username });

    if (profile) {
      const stuffs = await Stuff.find({ owner: profile._id });

      const recom = await Recommendation.find({ owner: profile._id });
      if (
        req.session.currentUser &&
        req.session.currentUser.username === profile.username
      ) {
        res.status(200).json({ profile, owner: true, stuffs, recom });
      } else {
        res.status(200).json({ profile, owner: false, stuffs, recom });
      }
    } else {
      res.status(200).json({ profile: null, owner: false });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

module.exports = Profile;
