const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ColorSchema = new Schema(
  {
    name: { type: String, required: true },
    hex: { type: String, default: "" },
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.Color ||
  mongoose.model("Color", ColorSchema);
