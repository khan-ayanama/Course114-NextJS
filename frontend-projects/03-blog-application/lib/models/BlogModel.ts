import mongoose, { Document, Model, Schema } from "mongoose";

export interface IBlog extends Document {
  title: string;
  description: string;
  category: string;
  author: string;
  image: string;
  authorImg: string;
  createdAt: Date;
}

const BlogSchema: Schema<IBlog> = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  author: {
    type: String,
    required: [true, "Author name is required"],
  },
  image: {
    type: String,
    required: [true, "Blog image is required"],
  },
  authorImg: {
    type: String,
    required: [true, "Author image is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BlogModel: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);

export default BlogModel;
