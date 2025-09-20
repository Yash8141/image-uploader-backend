import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import { fileURLToPath } from "url";
import { File } from "./models/imageUpload.js";

// Load environment variables
dotenv.config();

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB connect
mongoose
  .connect(process.env.MONGODB_URI || process.env.MONGODB_URL, {
    dbName: "image_uploader_db",
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB connection error:", error));

// Cloudinary connect
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });
// render ejs file
app.get("/", (req, res) => {
  res.render("index.ejs", { url: null });
});

app.post("/upload", upload.single("file"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).render("index.ejs", {
        url: null,
        error: "No file uploaded",
      });
    }

    const file = req.file.path;

    const cloudinaryResponse = await cloudinary.uploader.upload(file, {
      folder: "NodeJs_Mastery",
    });

    // save to database
    await File.create({
      file_name: req.file.originalname,
      public_id: cloudinaryResponse.public_id,
      image_url: cloudinaryResponse.secure_url,
    });

    res.render("index.ejs", {
      url: cloudinaryResponse.secure_url,
      error: null,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).render("index.ejs", {
      url: null,
      error: "Upload failed. Please try again.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
