const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const categorySchema = new mongoose.Schema(
  {
    name: { type: String },
    slug: { type: String, slug: "name" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Category", categorySchema);
