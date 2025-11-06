// backend.js
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import Item from "./models/listing.js";
import User from "./user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// serve uploaded images
const uploadsDir = path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadsDir));

// multer storage for images
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

function generateAccessToken(username) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { username: username },
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      },
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

// API routes
app.post(
  "/api/items",
  verifyAccessToken,
  upload.single("image"),
  async (req, res) => {
    console.log("Authenticated user:", req.user);
    try {
      const { title, description, location } = req.body;
      if (!title?.trim() || !description?.trim() || !location?.trim())
        return res.status(400).json({ error: "Missing required fields." });

      const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
      const item = await Item.create({
        title,
        description,
        location,
        imageUrl,
      });
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
    const token = await generateAccessToken(username);
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

    const token = await generateAccessToken(username);
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
