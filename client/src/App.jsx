import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "./state/AuthContext.jsx";
import { useCart } from "./state/CartContext.jsx";
import "./App.css";

export default function App() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="app-layout">
      {/* Navbar */}
      <header className="navbar-main">
        <Link to="/" className="logo-main">MyShop</Link>
        <nav className="nav-main">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/cart" className="nav-link">Cart ({cart.length})</Link>
          {user ? (
            <div className="nav-user">
              <span className="nav-hello">Hello, {user.name}</span>
              <Link to="/orders" className="nav-link">My Orders</Link>
              {user.role === "admin" && (
                <>
                  <Link to="/admin/products" className="nav-link">Admin Products</Link>
                  <Link to="/admin/orders" className="nav-link">Admin Orders</Link>
                </>
              )}
              <button className="nav-logout" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="nav-auth">
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </div>
          )}
        </nav>
      </header>

      {/* Page Content */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="footer-main">
        <p>© {new Date().getFullYear()} MyShop. All rights reserved.</p>
      </footer>
    </div>
  );
}
