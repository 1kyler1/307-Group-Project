// backend.js
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

import Item from "./models/listing.js";
import User from "./models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ storage: multer.memoryStorage() });

function uploadBufferToCloudinary(buffer, folder = "listings") {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => (error ? reject(error) : resolve(result)),
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}

function generateAccessToken(user) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { _id: user._id.toString(), username: user.username },
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" },
      (err, token) => (err ? reject(err) : resolve(token)),
    );
  });
}

function verifyAccessToken(req, res, next) {
  const authHeader = req.headers.authorization || req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access token required. 1" });
  }

  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) return res.status(401).json({ error: "Access token required." });

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    console.error(e);
    return res.status(403).json({ error: "Invalid or expired token." });
  }
}

function safeUserData(user) {
  return {
    _id: user._id,
    username: user.username,
  };
}

// connect DB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((e) => console.error("Mongo error:", e));

app.post(
  "/api/items",
  verifyAccessToken,
  upload.single("image"),

  async (req, res) => {
    try {
      console.log("BODY:", req.body);
      const {
        title,
        description,
        location,
        tags = [],
        gender,
        categories = [],
        contractInfo,
      } = req.body;

      if (!title?.trim() || !description?.trim() || !location?.trim() || !contactInfo?.trim()) {
        return res.status(400).json({ error: "Missing required fields." });
      }

      let imageUrl;

      if (req.file) {
        const result = await uploadBufferToCloudinary(
          req.file.buffer,
          "listings",
        );
        imageUrl = result.secure_url;
      }

      const item = await Item.create({
        title,
        description,
        location,
        imageUrl,
        tags: Array.isArray(tags)
          ? tags
          : String(tags)
              .split(",")
              .map((s) => s.trim()),

        categories: Array.isArray(categories)
          ? categories
          : [categories].filter(Boolean),

        gender: gender || null,
        owner: req.user._id,
        contactInfo,
      });

      await User.findByIdAndUpdate(
        req.user._id,
        { $addToSet: { listings: item._id } },
        { new: false },
      );

      res.status(201).json(item);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Server error" });
    }
  },
);

app.get("/api/items", async (_req, res) => {
  const items = await Item.find().sort({ createdAt: -1 });
  res.json(items);
});

app.get("/", async (_req, res) => {
  res.status(200).send("Hello World");
});

app.get("/items", (req, res) => {
  const tag = req.query.tag;
  if (tag) {
    Item.find({ tags: tag })
      .then((data) => {
        res.send({ listings: data });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send();
      });
  } else {
    Item.find()
      .sort({ createdAt: -1 })
      .then((data) => {
        res.send({ listings: data });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send();
      });
  }
});

app.get("/api/items/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(item);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/items/mine", verifyAccessToken, async (req, res) => {
  try {
    const items = await Item.find({ owner: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(items);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/users/me/listings
app.get("/api/users/me/listings", verifyAccessToken, async (req, res) => {
  try {
    const me = await User.findById(req.user._id)
      .populate({ path: "listings", options: { sort: { createdAt: -1 } } })
      .select("_id username listings");

    if (!me) return res.status(404).json({ error: "User not found" });

    res.json({
      user: { _id: me._id, username: me.username },
      listings: me.listings,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username?.trim() || !password?.trim())
      return res.status(400).json({ error: "Missing username or password." });
    if (password.length < 8)
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters long." });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUserSecured = await User.create({
      username,
      password: hashedPassword,
    });
    const token = await generateAccessToken(newUserSecured);
    if (!token)
      return res
        .status(500)
        .json({ error: "Could not generate access token." });
    else console.log("Generated token for user:", username, "Token:", token);

    res.status(201).json({
      message: "User created",
      user: safeUserData(newUserSecured),
      token,
      tokenType: "Bearer",
      expiresIn: "1d",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/users/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username?.trim() || !password?.trim())
      return res.status(400).json({ error: "Missing username or password." });

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid username or password." });
    }

    const token = await generateAccessToken(user);
    res.status(200).json({
      message: "Login successful",
      user,
      token,
      tokenType: "Bearer",
      expiresIn: "1d",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/users", async (_req, res) => {
  const users = await User.find();
  res.json(users);
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API on http://localhost:${port}`));
