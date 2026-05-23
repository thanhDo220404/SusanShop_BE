const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MediaSchema = new Schema(
  {
    public_id: { type: String, required: true },
    url: { type: String, required: true },
    secure_url: { type: String, required: true },
    width: { type: Number },
    height: { type: Number },
    format: { type: String },
    resource_type: { type: String, default: "image" },
    bytes: { type: Number },
    folder: { type: String },
    original_filename: { type: String },
    asset_id: { type: String },
    alt_text: { type: String, default: "" },
    title: { type: String, default: "" },
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.Media || mongoose.model("Media", MediaSchema);
