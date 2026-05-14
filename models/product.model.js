const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProductSchema = new Schema(
  {
    category_id: { type: ObjectId, ref: "ProductCategory", required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    status: { type: Boolean, default: true },
    features: { type: Boolean, default: false },
    deleted_at: { type: Date, default: null },
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
