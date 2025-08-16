import "dotenv/config.js";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import User from "../models/User.js";

await connectDB();
await User.deleteMany({ role: "admin", email: "admin@demo.com" });
await User.create({ name: "Admin", email: "admin@demo.com", password: "admin123", role: "admin" });
console.log("Seeded admin admin@demo.com / admin123");
await mongoose.disconnect();
