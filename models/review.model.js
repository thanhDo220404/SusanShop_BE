const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ReviewSchema = new Schema(
  {
    user_id: { type: ObjectId, ref: "User", required: true },
    order_item_id: { type: ObjectId, ref: "OrderItem", required: true },
    product_variant_id: {
      type: ObjectId,
      ref: "ProductVariant",
      required: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    content: { type: String, default: "" },
    status: { type: Boolean, default: true },
  },
  { timestamps: true },
);

ReviewSchema.index({ order_item_id: 1 }, { unique: true });

module.exports =
  mongoose.models.Review || mongoose.model("Review", ReviewSchema);
