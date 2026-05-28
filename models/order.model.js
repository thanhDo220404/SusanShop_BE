const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const OrderSchema = new Schema(
  {
    user_id: { type: ObjectId, ref: "User", required: true },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipping", "delivered", "cancelled"],
      default: "pending",
    },
    shipping_name: { type: String, required: true },
    shipping_phone: { type: String, required: true },
    shipping_address: { type: String, required: true },
    shipping_fee: { type: Number, default: 0 },
    coupon_code: { type: String, default: "" },
    coupon_discount: { type: Number, default: 0 },
    notes: { type: String, default: "" },
    status_history: [
      {
        status: String,
        changed_at: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.models.Order || mongoose.model("Order", OrderSchema);
