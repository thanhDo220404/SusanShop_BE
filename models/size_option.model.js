const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const SizeOptionSchema = new Schema(
  {
    name: { type: String, required: true },
    size_category_id: { type: ObjectId, ref: "SizeCategory", required: true },
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.SizeOption ||
  mongoose.model("SizeOption", SizeOptionSchema);
