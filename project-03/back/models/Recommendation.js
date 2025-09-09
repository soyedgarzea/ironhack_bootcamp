const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recommendationSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    date: {
      type: String,
    },
    name: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    username: {
      type: String,
    },
    details: {
      type: String,
    },
    rate: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5],
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Recommendation = mongoose.model("Recommendation", recommendationSchema);

module.exports = Recommendation;
