import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, index: true },
  images: [{ type: String }],
  stock: { type: Number, default: 0, min: 0 }
}, { timestamps: true });

productSchema.index({ name: "text", description: "text" });

export default mongoose.model("Product", productSchema);
