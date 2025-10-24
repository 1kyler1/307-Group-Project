// user-services.js

import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);

// mongoose
//   .connect("mongodb://127.0.0.1:27017/users", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .catch((error) => console.log(error));

mongoose.connection.on("connected", () => {
  console.log(
    "✅ Mongo connected:",
    mongoose.connection.host,
    mongoose.connection.port,
  );
});
mongoose.connection.on("error", (err) => {
  console.error("❌ Mongo error:", err.message);
});

await mongoose.connect("mongodb://127.0.0.1:27017/users");

function getUsers(name, job) {
  if (name === undefined && job === undefined) {
    return userModel.find();
  } else if (name && !job) {
    return findUserByName(name);
  } else if (job && !name) {
    return findUserByJob(job);
  } else {
    return userModel.find({ name, job });
  }
}

function findUserById(id) {
  return userModel.findById(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}

function removeUserById(id) {
  return userModel.findByIdAndDelete(id);
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  removeUserById,
};
