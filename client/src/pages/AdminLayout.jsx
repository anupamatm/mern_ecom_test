import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";
import { useState } from "react";
import "../styles/AdminLayout.css";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
    setOpen(false);
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${open ? "open" : ""}`}>
        <h2 className="admin-logo">Admin Panel</h2>
        <nav className="admin-nav">
          <Link to="/admin/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
          <Link to="/admin/products" onClick={() => setOpen(false)}>Products</Link>
          <Link to="/admin/orders" onClick={() => setOpen(false)}>Orders</Link>
          <div className="admin-user">
            <span>Hi, {user?.name || "Admin"}</span>
            <button onClick={handleLogout} className="admin-logout">Logout</button>
          </div>
        </nav>
      </aside>

      {/* Main area */}
      <div className="admin-main">
        <header className="admin-header">
          <button
            className="admin-hamburger"
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle menu"
          >
            &#9776;
          </button>
          <h1 className="admin-page-title">Admin</h1>
        </header>
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
