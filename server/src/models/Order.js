  import mongoose from "mongoose";

  const orderItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String },      // snapshot
    image: { type: String },     // snapshot
    qty: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 }
  }, { _id: false });

  const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    total: { type: Number, required: true, min: 0 },
    status: { 
      type: String, 
      enum: ["pending","paid","shipped","delivered","cancelled"], 
      default: "pending" 
    },
    shippingAddress: {
      address: String,
      city: String,
      postalCode: String,
      country: String
    },
    payment: {
      method: { type: String, enum: ["COD","card","upi"], default: "COD" },
      paidAt: Date,
      transactionId: String
    }
  }, { timestamps: true });

  orderSchema.index({ user: 1, createdAt: -1 });

  export default mongoose.model("Order", orderSchema);
