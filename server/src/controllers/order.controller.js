import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
  const { items } = req.body;
  if (!items?.length) return res.status(400).json({ message: "Empty order" });

  const products = await Product.find({ _id: { $in: items.map(i => i.product) } });
  const priceById = Object.fromEntries(products.map(p => [p._id.toString(), p.price]));

  // compute total and verify stock
  let total = 0;
  for (const it of items) {
    const price = priceById[it.product];
    if (price == null) return res.status(400).json({ message: "Invalid product" });
    total += price * it.qty;
  }

  // stock decrement (bonus feature)
  for (const it of items) {
    const p = products.find(x => x.id === it.product);
    if ((p?.stock ?? 0) < it.qty) return res.status(400).json({ message: `Out of stock: ${p?.name}` });
  }
  await Promise.all(items.map(it =>
    Product.findByIdAndUpdate(it.product, { $inc: { stock: -it.qty } })
  ));

  const order = await Order.create({ user: req.user._id, items: items.map(it => ({
    product: it.product, qty: it.qty, price: priceById[it.product]
  })), total });

  // Notify admins
  const io = req.app.get("io");
  io.to("admins").emit("order:new", { orderId: order._id });

  res.status(201).json(order);
};

export const myOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .populate("items.product", "name images price");
  res.json(orders);
};
