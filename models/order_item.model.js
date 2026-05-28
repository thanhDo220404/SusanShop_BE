const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const OrderItemSchema = new Schema(
  {
    order_id: { type: ObjectId, ref: "Order", required: true },
    product_variant_id: { type: ObjectId, ref: "ProductVariant", required: true },
    product_name: { type: String },
    color_name: { type: String },
    size_name: { type: String },
    image_url: { type: String },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    quantity: { type: Number, required: true },
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.OrderItem || mongoose.model("OrderItem", OrderItemSchema);
