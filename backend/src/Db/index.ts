import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();
const { Schema } = mongoose;
const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {
  throw new Error("MONGO_URL is not defined in environment variables");
}

await mongoose.connect(mongoUrl);

const userSchema = new Schema({
    id: String,
    name: String,
    email: String,
    password: String,
    role: String,
});

export const DBUserModel = mongoose.model('User', userSchema);
