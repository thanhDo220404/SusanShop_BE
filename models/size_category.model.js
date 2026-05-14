const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SizeCategorySchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.SizeCategory ||
  mongoose.model("SizeCategory", SizeCategorySchema);
