const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserAddressSchema = new Schema(
  {
    user_id: { type: ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    province: { type: String, default: "" },
    district: { type: String, default: "" },
    ward: { type: String, default: "" },
    street: { type: String, required: true },
    is_default: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.UserAddress || mongoose.model("UserAddress", UserAddressSchema);
