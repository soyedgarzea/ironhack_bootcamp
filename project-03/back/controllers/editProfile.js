const User = require("../models/User");
const Stuff = require("../models/Stuff");
const bcrypt = require("bcrypt");

const EditProfile = async (req, res, next) => {
  const usernameP = req.params.username;
  const {
    name,
    username,
    phone,
    email,
    password,
    confirmPassword,
    profilePic,
  } = req.body;

  try {
    const profile = await User.findOne({ username: usernameP });

    if (password == "" && confirmPassword == "") {
      if (profilePic === "") {
        let profileEdited = await User.findByIdAndUpdate(profile._id, {
          name,
          username,
          phone,
          email,
        });

        let newProfile = await User.findById(profileEdited._id);

        await Stuff.updateMany(
          { owner: newProfile._id },
          { usernameOwner: newProfile.username }
        );

        req.session.currentUser = newProfile;

        res.status(200).json(newProfile);
      } else {
        let profileEdited = await User.findByIdAndUpdate(profile._id, {
          name,
          username,
          phone,
          email,
          profilePic,
        });

        let newProfile = await User.findById(profileEdited._id);

        await Stuff.updateMany(
          { owner: newProfile._id },
          { usernameOwner: newProfile.username }
        );

        req.session.currentUser = newProfile;

        res.status(200).json(newProfile);
      }
    } else {
      if (profilePic === "") {
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);

        let profileEdited = await User.findByIdAndUpdate(profile._id, {
          name,
          username,
          phone,
          email,
          password: hashPass,
        });

        let newProfile = await User.findById(profileEdited._id);

        await Stuff.updateMany(
          { owner: newProfile._id },
          { usernameOwner: newProfile.username }
        );

        req.session.currentUser = newProfile;

        res.status(200).json(newProfile);
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);

        let profileEdited = await User.findByIdAndUpdate(profile._id, {
          name,
          username,
          phone,
          email,
          password: hashPass,
          profilePic,
        });

        let newProfile = await User.findById(profileEdited._id);

        await Stuff.updateMany(
          { owner: newProfile._id },
          { usernameOwner: newProfile.username }
        );

        req.session.currentUser = newProfile;

        res.status(200).json(newProfile);
      }
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports = EditProfile;
