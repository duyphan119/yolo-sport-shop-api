const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const userSchema = new mongoose.Schema(
  {
    lastName: { type: String },
    firstName: { type: String },
    gender: { type: String },
    email: { type: String },
    hash: { type: String },
    birthDay: { type: Date },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
