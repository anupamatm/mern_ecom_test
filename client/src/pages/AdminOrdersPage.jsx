import { useEffect, useState } from "react";
import http, { API_BASE } from "../api/http";
import "../styles/AdminOrdersPage.css";
import "../styles/AdminOrdersFilter.css";
import { getImageUrl } from "../utils/images";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: 'all',
    startDate: '',
    endDate: ''
  });


  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await http.get("/admin/orders");
        setOrders(data);
        setFilteredOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...orders];

    // Filter by status
    if (filters.status !== 'all') {
      result = result.filter(order => order.status === filters.status);
    }

    // Filter by date range
    if (filters.startDate) {
      const start = new Date(filters.startDate);
      start.setHours(0, 0, 0, 0);
      result = result.filter(order => new Date(order.createdAt) >= start);
    }

    if (filters.endDate) {
      const end = new Date(filters.endDate);
      end.setHours(23, 59, 59, 999);
      result = result.filter(order => new Date(order.createdAt) <= end);
    }

    setFilteredOrders(result);
  }, [filters, orders]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      status: 'all',
      startDate: '',
      endDate: ''
    });
  };

  const updateStatus = async (id, status) => {
    await http.patch(`/admin/orders/${id}/status`, { status });
    setOrders(orders.map(o => o._id === id ? { ...o, status } : o));
  };

  if (loading) return <p>Loading orders...</p>;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="admin-orders">
      <h2>All Orders</h2>

      {/* Filters Section */}
      <div className="admin-orders-filters">
        <div className="filter-group">
          <label>Status:</label>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="filter-group">
          <label>From:</label>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            className="filter-date"
          />
        </div>

        <div className="filter-group">
          <label>To:</label>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            className="filter-date"
            min={filters.startDate}
          />
        </div>

        <button onClick={resetFilters} className="reset-filters-btn">
          Reset Filters
        </button>
      </div>

      {filteredOrders.length === 0 ? (
        <p className="no-orders">No orders found matching the selected filters.</p>
      ) : (
        <div className="orders-count">
          Showing {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''}
        </div>
      )}

      {filteredOrders.map(order => (
        <div key={order._id} className="order-card">
          <h3>Order #{order._id}</h3>
          <p>User: {order.user?.name} ({order.user?.email})</p>
          <p>Total: ₹{order.total}</p>
          <div className="order-meta">
            <p>Order Date: {formatDate(order.createdAt)}</p>
            <p className="order-status">
              Status:
              <select
                value={order.status}
                onChange={(e) => updateStatus(order._id, e.target.value)}
                className={`status-select status-${order.status.toLowerCase()}`}
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </p>
          </div>
          <ul>
            {order.items.map((it, i) => (
              <li key={i}>
                <img
                  src={getImageUrl(it.product?.images?.[0] || it.image)}
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
