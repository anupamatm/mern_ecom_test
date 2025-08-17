import { useEffect, useState } from "react";
import { useAuth } from "../state/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import http, { API_BASE } from "../api/http";
import "../styles/MyOrdersPage.css";

export default function MyOrdersPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    http.get("/orders/mine")
      .then(({ data }) => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user, navigate]);

  if (loading) return <p>Loading your orders...</p>;

  if (!orders.length) {
    return (
      <div className="orders-page">
        <h2>My Orders</h2>
        <p>You have no orders yet.</p>
        <Link to="/" className="btn">Go Shopping</Link>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h2>My Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <h3>Order #{order._id}</h3>
          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          <p><strong>Total:</strong> ₹{order.total}</p>

          <ul className="order-items">
            {order.items.map((it, i) => (
              <li key={i}>
                <img
                  src={
                    it.product?.images?.length
                      ? (it.product.images[0].startsWith("http")
                        ? it.product.images[0]
                        : `${API_BASE}${it.product.images[0]}`)
                      : "/placeholder.png"
                  }
                  alt={it.product?.name}
                />
                <div>
                  <span>{it.product?.name}</span>
                  <span>Qty: {it.qty}</span>
                  <span>₹{it.price * it.qty}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
