
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "./state/AuthContext.jsx";
import { useCart } from "./state/CartContext.jsx";
import { useState } from "react";
import "./App.css";
import "./styles/Navbar.css";
import "./styles/AppLayout.css";
import "./styles/Buttons.css";

export default function App() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setNavOpen(false);
  };

  const handleHamburger = () => setNavOpen((v) => !v);
  const closeNav = () => setNavOpen(false);

  return (
    <div className="app-container">
      <div className="app-content">
        {/* Navbar */}
        <header className={`navbar-main${navOpen ? " open" : ""}`}>
          <Link to="/" className="logo-main" onClick={closeNav}>MyShop</Link>
          <button className="navbar-hamburger" onClick={handleHamburger} aria-label="Toggle navigation">
            &#9776;
          </button>
        <nav className="nav-main">
          <Link to="/" className="nav-link" onClick={closeNav}>Home</Link>
         <Link to="/cart" className="nav-link" onClick={closeNav}>Cart ({cart?.length || 0})</Link>

          {user ? (
            <div className="nav-user">
              <span className="nav-hello">Hello, {user.name}</span>
              <Link to="/orders" className="nav-link" onClick={closeNav}>My Orders</Link>
              {user.role === "admin" && (
                <>
                  <Link to="/admin/products" className="nav-link" onClick={closeNav}>Admin Products</Link>
                  <Link to="/admin/orders" className="nav-link" onClick={closeNav}>Admin Orders</Link>
                </>
              )}
              <button className="nav-logout" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="nav-auth">
              <Link to="/login" className="nav-link" onClick={closeNav}>Login</Link>
              <Link to="/register" className="nav-link" onClick={closeNav}>Register</Link>
            </div>
          )}
        </nav>
      </header>

      {/* Page Content */}
      <main className="main-content">
        <Outlet />
      </main>

      </div>
      
      {/* Footer */}
      <footer className="footer-main">
        <div className="footer-content">
          <div className="footer-section">
            <h3>MyShop</h3>
            <p>Your one-stop shop for all your needs</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              {user && <li><Link to="/orders">My Orders</Link></li>}
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: support@myshop.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} MyShop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
