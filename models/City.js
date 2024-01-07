import { Schema, model } from "mongoose";

const citySchema = Schema(
  {
    name: { type: String, lowercase: true, trim: true },
    temperature: { type: Number, required: true },
    condition: { type: String, lowercase: true, trim: true },
    conditionPic: { type: String, lowercase: true, trim: true },
  },
  { timestamps: true }
);

export default model("City", citySchema);
