import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    imageUrl: { type: String },
    description: { type: String, required: true },
    location: { type: String, required: true },
	tags: { type: 'array', items: { type: String } }
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Item", ItemSchema);
