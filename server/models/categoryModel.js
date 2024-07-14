import mongoose from "mongoose";
import { Schema } from "mongoose";
const categorySchema = new Schema({
  name: {
    type: String,
    // unique: true,
    // required: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
});

export default mongoose.model("Category", categorySchema);
