const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CouponSchema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    type: { type: String, enum: ["percent", "fixed"], default: "percent" },
    value: { type: Number, required: true },
    min_order: { type: Number, default: 0 },
    max_discount: { type: Number, default: 0 },
    usage_limit: { type: Number, default: 0 },
    used_count: { type: Number, default: 0 },
    starts_at: { type: Date, default: null },
    ends_at: { type: Date, default: null },
    status: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.models.Coupon || mongoose.model("Coupon", CouponSchema);
