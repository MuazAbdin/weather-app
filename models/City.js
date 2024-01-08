import { Schema, model } from "mongoose";

const citySchema = Schema(
  {
    name: { type: String, lowercase: true, trim: true, required: true },
    country: { type: String, uppercase: true, trim: true },
    temperature: { type: Number, required: true },
    condition: { type: String, trim: true, required: true },
    conditionPic: { type: String, trim: true },
    lastUpdated: String,
  },
  { timestamps: true }
);

export default model("City", citySchema);
