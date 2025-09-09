const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stuffSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trin: true,
    },
    quantity: {
      type: Number,
      trim: true,
    },
    imgPath: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    usernameOwner: {
      type: String,
      trim: true,
    },
    available: {
      type: Boolean,
      default: false,
    },
    realPrice: Number,
    priceLend: Number,
  },
  {
    timestamps: true,
  }
);

const Stuff = mongoose.model("Stuff", stuffSchema);

module.exports = Stuff;
