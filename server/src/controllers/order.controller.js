import Order from "../models/Order.js";
import Product from "../models/Product.js";

//
// Create Order
//


// In server/src/controllers/order.controller.js
export const createOrder = async (req, res) => {
  const { items, shippingAddress, payment } = req.body;
  if (!items?.length) return res.status(400).json({ message: "Empty order" });

  // Fetch product details
  const products = await Product.find({ _id: { $in: items.map(i => i.product) } });

  let total = 0;
  const orderItems = [];

  for (const it of items) {
    const product = products.find(p => p._id.toString() === it.product);
    if (!product) return res.status(400).json({ message: "Invalid product" });

    if (product.stock < it.qty) {
      return res.status(400).json({ message: `Out of stock: ${product.name}` });
    }

    total += product.price * it.qty;

    // Ensure we store the full Cloudinary URL
    const productImage = product.images?.[0] || "";
    const fullImageUrl = productImage.startsWith('http') ? 
      productImage : 
      `${process.env.API_BASE || ''}${productImage}`;

    orderItems.push({
      product: product._id,
      name: product.name,
      image: fullImageUrl,  // Store full URL
      qty: it.qty,
      price: product.price
    });
  }

  // Rest of the function remains the same...
  // Decrement stock
  await Promise.all(
    items.map(it =>
      Product.findByIdAndUpdate(it.product, { $inc: { stock: -it.qty } })
    )
  );

  // Save order with full info
  const order = await Order.create({
    user: req.user._id,
    items: orderItems,
    total,
    shippingAddress: {
      address: shippingAddress?.address,
      city: shippingAddress?.city,
      postalCode: shippingAddress?.postalCode,
      country: shippingAddress?.country
    },
    payment: {
      method: payment?.method || "COD",
      paidAt: payment?.paidAt || null,
      transactionId: payment?.transactionId || null
    }
  });

  res.status(201).json(order);
};


//
// User's Orders
//
export const myOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json(orders); // ✅ snapshots already in DB, no need to repatch
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

//
// Admin Orders
//
export const adminOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("user", "name email"); // ✅ only populate user, not items.product

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

//
// Update Order Status
//
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
