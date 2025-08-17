import { useEffect, useState } from "react";
import http, { API_BASE } from "../api/http";
import "../styles/AdminOrdersPage.css";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    http.get("/admin/orders")
      .then(({ data }) => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    await http.patch(`/admin/orders/${id}/status`, { status });
    setOrders(orders.map(o => o._id === id ? { ...o, status } : o));
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="admin-orders">
      <h2>All Orders</h2>
      {orders.map(order => (
        <div key={order._id} className="order-card">
          <h3>Order #{order._id}</h3>
          <p>User: {order.user?.name} ({order.user?.email})</p>
          <p>Total: ₹{order.total}</p>
          <p>Status: 
            <select
              value={order.status}
              onChange={(e) => updateStatus(order._id, e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Delivered">Delivered</option>
            </select>
          </p>
          <ul>
            {order.items.map((it, i) => (
              <li key={i}>
                <img
                  src={
                    it.product?.images?.[0]
                      ? it.product.images[0].startsWith("http")
                        ? it.product.images[0]
                        : it.product.images[0].startsWith("/uploads/")
                          ? `${API_BASE}${it.product.images[0]}`
                          : `${API_BASE}/uploads/${it.product.images[0]}`
                      : it.image
                        ? it.image.startsWith("http")
                          ? it.image
                          : it.image.startsWith("/uploads/")
                            ? `${API_BASE}${it.image}`
                            : `${API_BASE}/uploads/${it.image}`
                        : "/placeholder.png"
                  }
                  alt={it.product?.name || it.name || "Product"}
                />
                {(it.product?.name || it.name || "")} × {it.qty} = ₹{it.price * it.qty}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
