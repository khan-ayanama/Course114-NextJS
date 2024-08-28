import mongoose from "mongoose";

const connectMongo = async () => {
  if (mongoose.connections[0].readyState) {
    return; // already connected
  }
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log("Connected to MongoDB");
};

export default connectMongo;
