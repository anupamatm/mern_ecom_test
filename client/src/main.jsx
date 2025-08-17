import AdminLayout from "./pages/AdminLayout.jsx";


import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
// import ProductPage from "./pages/ProductPage.jsx";
// import CartPage from "./pages/CartPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
// import CheckoutPage from "./pages/CheckoutPage.jsx";
// import OrdersPage from "./pages/OrdersPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
// import AdminProducts from "./pages/admin/AdminProducts.jsx";
// import AdminOrders from "./pages/admin/AdminOrders.jsx";
import { AuthProvider, useAuth } from "./state/AuthContext.jsx";
import { CartProvider } from "./state/CartContext.jsx";
import "./index.css";


import { Private, AdminOnly } from "./routesGuards.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* Main app layout and routes */}
            <Route element={<App />}>
              <Route index element={<Home />} />
              {/* <Route path="/product/:id" element={<ProductPage />} /> */}
              {/* <Route path="/cart" element={<CartPage />} /> */}
              {/* <Route path="/checkout" element={<Private><CheckoutPage/></Private>} /> */}
              {/* <Route path="/orders" element={<Private><OrdersPage/></Private>} /> */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>
            {/* Admin login route (not protected) */}
            <Route path="/admin/login" element={<AdminLogin />} />
            {/* Admin layout and protected admin routes */}
            <Route path="/admin" element={<AdminOnly><AdminLayout /></AdminOnly>}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<div className="container"><h2>Admin Products (TODO)</h2></div>} />
              <Route path="orders" element={<div className="container"><h2>Admin Orders (TODO)</h2></div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
