const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProductCategorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    size_category_id: { type: ObjectId, ref: "SizeCategory", default: null },
    parent_category_id: {
      type: ObjectId,
      ref: "ProductCategory",
      default: null,
    },
    status: { type: Boolean, default: true },
    sort_order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.ProductCategory ||
  mongoose.model("ProductCategory", ProductCategorySchema);
