import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
	  description: "headline of the listing",
    },
	author: {
      type: String,
      required: true,
      trim: true,
	  description: "user/username of who posted the listing",
    },
    place: {
      type: String,
      required: true,
      trim: true,
	  description: "location of the object being listed",
    },
	desc: {
	  type: String,
	  description: "body text/caption of the listing",
	}
	date: { type: Date, default: Date.now },
	img: {
		type: String, //placeholder
		description: "user-provided image associated with the listing",
	}
  },
  { collection: "listings" }
);

const Listing = mongoose.model("Listing", ListingSchema);

export default Listing;