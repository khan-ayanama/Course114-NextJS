import mongoose, { Document, Model, Schema } from "mongoose";

// Interface for the Email document
export interface IEmail extends Document {
  email: string;
  subscribedAt: Date;
}

// Mongoose schema for the Email model
const emailSchema: Schema<IEmail> = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Email model
const Email: Model<IEmail> =
  mongoose.models.Email || mongoose.model<IEmail>("Email", emailSchema);

export default Email;
