import { useEffect, useState } from "react";
import { useAuth } from "../state/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import http, { API_BASE } from "../api/http";
import "../styles/MyOrdersPage.css";
import { getImageUrl } from "../utils/images";

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
          <div className="order-card-header">
            <h3>Order #{order._id.slice(-8).toUpperCase()}</h3>
            <div className="order-meta">
              <span>📅 {new Date(order.createdAt).toLocaleDateString()}</span>
              <span>🕒 {new Date(order.createdAt).toLocaleTimeString()}</span>
              <span className={`order-status status-${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>
          </div>
          
          <ul className="order-items">
            {order.items.map((item, i) => (
              <li key={i}>
                <img
  src={
    getImageUrl(item.image)
      ? item.image // ✅ Cloudinary already gives full https URL
      : "/placeholder.png"
  }
  alt={item.product?.name || "Product image"}
  onError={(e) => {
    e.target.src = "/placeholder.png";
  }}
/>

                <div className="order-item-details">
                  <span className="order-item-name">{item.product?.name || 'Product'}</span>
                  <div className="order-item-meta">
                    <span>Qty: {item.qty}</span>
                    <span>₹{item.price} each</span>
                  </div>
                </div>
                <span className="order-item-price">₹{(item.price * item.qty).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          
          <div className="order-total">
            Order Total: <span>₹{order.total.toFixed(2)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
