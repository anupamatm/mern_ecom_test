
import React, { useEffect, useState } from "react";
import { useAuth } from "../state/AuthContext.jsx";
import { Link } from "react-router-dom";
import http from "../api/http";
import "../styles/AdminDashboard.css";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    pendingOrders: 0,
    totalSales: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch products with a high limit to get all products in one request
        // and orders without pagination
        const [productsRes, ordersRes] = await Promise.all([
          http.get('/products?limit=1000'), // High limit to get all products
          http.get('/orders')
        ]);
        
        // For products, use the total count from the paginated response
        // If not available, use the length of items array as fallback
        const totalProducts = productsRes.data.total || 
                             (Array.isArray(productsRes.data.items) ? productsRes.data.items.length : 0);
        
        // For orders, check if the response is paginated or a direct array
        const orders = Array.isArray(ordersRes.data) ? ordersRes.data : 
                      (Array.isArray(ordersRes.data.items) ? ordersRes.data.items : []);
        
        const totalOrders = Array.isArray(ordersRes.data) ? ordersRes.data.length : 
                          (ordersRes.data.total || 0);
        
        // Count pending orders
        const pendingOrders = orders.filter(
          order => order.status === 'pending'
        ).length;
        
        // Calculate total sales
        const totalSales = orders.reduce(
          (sum, order) => sum + (order.total || 0), 0
        );
        
        setStats({
          products: totalProducts,
          orders: totalOrders,
          pendingOrders: pendingOrders,
          totalSales: totalSales
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Set default values in case of error
        setStats({
          products: 0,
          orders: 0,
          pendingOrders: 0,
          totalSales: 0
        });
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Dashboard Overview</h1>
      <p className="welcome-message">Welcome back, <span>{user?.name || 'Admin'}</span>!</p>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>Total Products</h3>
            <p className="stat-number">{stats.products}</p>
          </div>
          <Link to="/admin/products" className="stat-link">View All →</Link>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-info">
            <h3>Total Orders</h3>
            <p className="stat-number">{stats.orders}</p>
          </div>
          <Link to="/admin/orders" className="stat-link">View All →</Link>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>Pending Orders</h3>
            <p className="stat-number">{stats.pendingOrders}</p>
          </div>
          <Link to="/admin/orders?status=pending" className="stat-link">Review →</Link>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>Total Sales</h3>
            <p className="stat-number">₹{stats.totalSales.toLocaleString()}</p>
          </div>
          <Link to="/admin/orders" className="stat-link">View Report →</Link>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/admin/products/new" className="action-button primary">
            + Add New Product
          </Link>
          <Link to="/admin/orders" className="action-button secondary">
            View Recent Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
