const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema(
  {
    content: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    rate: { type: Number },
    replyTo: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Comment", commentSchema);
