// listing.js
import mongoose from "mongoose";
const ItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    imageUrl: { type: String },
    description: { type: String, required: true },
    location: { type: String, required: true },
    tags: { type: [String], default: [] },

    gender: {
      type: String,
      enum: ["male", "female", "misc"],
      default: null,
    },
    categories: {
      type: [String],
      default: [],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    contactInfo: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model("Item", ItemSchema);
