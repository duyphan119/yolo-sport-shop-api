const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    total: { type: Number },
    status: { type: Number, default: -1 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", orderSchema);
