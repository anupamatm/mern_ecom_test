
import React from "react";
import { useAuth } from "../state/AuthContext.jsx";
import { Link } from "react-router-dom";

import "../styles/Home.css";
import "../styles/Card.css";
import "../styles/Pager.css";

export default function AdminDashboard() {
  const { user } = useAuth();
  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user?.name || "Admin"}!</p>
      <div className="grid">
        <Link to="/admin/products" className="card">
          <div className="card-body">
            <div className="name">Manage Products</div>
          </div>
        </Link>
        <Link to="/admin/orders" className="card">
          <div className="card-body">
            <div className="name">Manage Orders</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
