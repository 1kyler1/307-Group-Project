// backend.js
import "dotenv/config";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import Item from "./models/listing.js";
import User from "./user.js";

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

// connect DB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((e) => console.error("Mongo error:", e));

// API routes
app.post("/api/items", upload.single("image"), async (req, res) => {
  try {
    const { title, description, location } = req.body;
    if (!title?.trim() || !description?.trim() || !location?.trim())
      return res.status(400).json({ error: "Missing required fields." });

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
    const item = await Item.create({ title, description, location, imageUrl });
    res.status(201).json(item);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

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
    // Simulate user creation
    const newUser = await User.create({ username, password });
    res.status(201).json({ message: "User created", user: newUser });
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
