import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  tableNumber: { type: Number, required: true },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  status: { type: String, enum: ["pending", "approved", "served"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
