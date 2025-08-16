import Order from "../models/Order.js";

export const listOrders = async (_req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 }).populate("user","name email");
  res.json(orders);
};

export const updateOrderStatus = async (req, res) => {
  const { status } = req.body; // pending|paid|shipped|delivered|cancelled
  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!order) return res.status(404).json({ message: "Not found" });
  res.json(order);
};
