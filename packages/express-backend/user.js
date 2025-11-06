// user.js
import mongoose from "mongoose";
import Item from "./models/listing.js";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 8)
          throw new Error("Invalid job, must be at least 2 characters.");
      },
    },
    listings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
  },
  { collection: "users_list" },
);

const User = mongoose.model("User", UserSchema);

export default User;
