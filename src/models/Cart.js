const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema(
  {
    items: {
      type: Array,
      default: [
        {
          productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
          quantity: { type: Number },
          size: {type: String}
        },
      ],
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Cart", cartSchema);
