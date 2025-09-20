import mongoose from "mongoose";
const imageSchema = new mongoose.Schema({
  file_name: { type: String },
  public_id: { type: String },
  image_url: { type: String },
});

export const File = mongoose.model("cloudinary", imageSchema);
