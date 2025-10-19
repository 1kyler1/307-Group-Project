import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
	author: {
      type: String,
      required: true,
      trim: true,
    },
    place: {
      type: String,
      required: true,
      trim: true,
    },
	desc: String,
	date: { type: Date, default: Date.now },
  },
  { collection: "listings" }
);

const Listing = mongoose.model("Listing", ListingSchema);

export default Listing;