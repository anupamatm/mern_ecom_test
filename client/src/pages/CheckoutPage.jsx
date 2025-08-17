import { useState } from "react";
import { useCart } from "../state/CartContext";
import { useAuth } from "../state/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import http from "../api/http";
import "../styles/CheckoutPage.css";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "India",
    paymentMethod: "COD",
  });

  const [error, setError] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (!user) {
    return (
      <div className="checkout-page">
        <p>
          Please <Link to="/login">login</Link> to proceed with checkout.
        </p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <p>
          Your cart is empty. <Link to="/">Go shopping</Link>
        </p>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await http.post("/orders", {
        items: cart.map((i) => ({
          product: i.product._id,
          qty: Number(i.quantity) || 1,
        })),
        shippingAddress: {
          address: form.address,
          city: form.city,
          postalCode: form.postalCode,
          country: form.country,
        },
        payment: { method: form.paymentMethod },
      });

      clearCart();
      alert("✅ Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      setError(err.response?.data?.message || "Checkout failed");
    }
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      <div className="checkout-grid">
        {/* Left: Form */}
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h3>Shipping Information</h3>
          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
          />
          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
          />
          <input
            name="postalCode"
            placeholder="Postal Code"
            value={form.postalCode}
            onChange={handleChange}
            required
          />
          <input
            name="country"
            placeholder="Country"
            value={form.country}
            onChange={handleChange}
            required
          />

          <h3>Payment</h3>
          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
          >
            <option value="COD">Cash on Delivery</option>
            <option value="card">Card</option>
            <option value="upi">UPI</option>
          </select>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="btn-checkout">
            Place Order
          </button>
        </form>

        {/* Right: Order Summary */}
        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <ul>
            {cart.map((item) => (
              <li key={item.product._id}>
                {item.product.name} × {item.quantity} = ₹
                {item.product.price * item.quantity}
              </li>
            ))}
          </ul>
          <h4>Total: ₹{total}</h4>
        </div>
      </div>
    </div>
  );
}
