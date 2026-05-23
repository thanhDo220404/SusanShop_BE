const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CartItemSchema = new Schema(
  {
    user_id: { type: ObjectId, ref: "user", required: true },
    product_variant_id: { type: ObjectId, ref: "ProductVariant", required: true },
    quantity: { type: Number, required: true, min: 1, default: 1 },
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.CartItem ||
  mongoose.model("CartItem", CartItemSchema);
