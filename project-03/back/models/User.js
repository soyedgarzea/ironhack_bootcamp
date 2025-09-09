const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: String,
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
    },
    password: String,
    profilePic: {
      type: String,
    },
    stuffs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Stuff",
      },
    ],
    verificationCode: String,
    expireCodeDate: String,
    validatedProfile: {
      type: Boolean,
      default: false,
    },
    validationWay: {
      type: String,
      enum: ["email", "phone"],
    },
    since: String,
    recommendations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Recommandations",
      },
    ],
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
