const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const productSchema = new mongoose.Schema(
  {
    name: { type: String },
    price: { type: Number },
    sale: { type: Number, default: 0 },
    inventory: {
      type: Array,
      default: [
        {
          size: { type: String },
          count: { type: Number },
        },
      ],
    },
    description: { type: String },
    images: [{ type: String }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    slug: { type: String, slug: "name" },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", productSchema);
