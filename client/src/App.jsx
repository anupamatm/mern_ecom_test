
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
    <div className="app-layout">
      {/* Navbar */}
      <header className={`navbar-main${navOpen ? " open" : ""}`}>
        <Link to="/" className="logo-main" onClick={closeNav}>MyShop</Link>
        <button className="navbar-hamburger" onClick={handleHamburger} aria-label="Toggle navigation">
          &#9776;
        </button>
        <nav className="nav-main">
          <Link to="/" className="nav-link" onClick={closeNav}>Home</Link>
         <Link to="/cart" className="nav-link" onClick={closeNav}>Cart ({cart.length})</Link>

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

      {/* Footer */}
      <footer className="footer-main">
        <p>© {new Date().getFullYear()} MyShop. All rights reserved.</p>
      </footer>
    </div>
  );
}
