const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProductVariantSchema = new Schema(
  {
    product_id: { type: ObjectId, ref: "Product", required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    sale_starts_at: { type: Date, default: null },
    sale_ends_at: { type: Date, default: null },
    color_id: { type: ObjectId, ref: "Color", default: null },
    size_id: { type: ObjectId, ref: "SizeOption", default: null },
    stock: { type: Number, default: 0 },
    status: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.ProductVariant ||
  mongoose.model("ProductVariant", ProductVariantSchema);
