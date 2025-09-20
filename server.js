import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import { File } from "./models/imageUpload.js";
import { url } from "inspector";

dotenv.config({ path: ".env.local" });

// MongoDB connect
mongoose
  .connect(
    "mongodb+srv://yashsolanki1622_db_user:Fguuuml5Lwcj1wsh@cluster0.iolebsr.mongodb.net/",
    { dbName: "image_uploader_db" }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

// Cloudinary connect
cloudinary.config({
  cloud_name: "dkklnd2k1",
  api_key: "645396612834928",
  api_secret: "bP8daAr4MXqhfflNI1DtokJ6HYw",
});

const app = express();
const port = process.env.PORT || 3000;

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
  const file = req.file.path;

  const cloudinaryResponse = await cloudinary.uploader.upload(file, {
    folder: "NodeJs_Mastery",
  });

  // save to database
  const db = await File.create({
    file_name: file.originalname,
    public_id: cloudinaryResponse.public_id,
    image_url: cloudinaryResponse.secure_url,
  });
  res.render("index.ejs", { url: cloudinaryResponse.secure_url });
  // res.json({ message: "File uploaded successfully", data: cloudinaryResponse });
});

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
