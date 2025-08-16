

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
// import ProductPage from "./pages/ProductPage.jsx";
// import CartPage from "./pages/CartPage.jsx";
// import RegisterPage from "./pages/RegisterPage.jsx";
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
            <Route element={<App />}>
              <Route index element={<Home />} />
              {/* <Route path="/product/:id" element={<ProductPage />} /> */}
              {/* <Route path="/cart" element={<CartPage />} /> */}
              {/* <Route path="/checkout" element={<Private><CheckoutPage/></Private>} /> */}
              {/* <Route path="/orders" element={<Private><OrdersPage/></Private>} /> */}
              <Route path="/login" element={<LoginPage />} />
              {/* <Route path="/register" element={<RegisterPage />} /> */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminOnly><AdminDashboard/></AdminOnly>} />
              <Route path="/admin/products" element={<AdminOnly><div className="container"><h2>Admin Products (TODO)</h2></div></AdminOnly>} />
              <Route path="/admin/orders" element={<AdminOnly><div className="container"><h2>Admin Orders (TODO)</h2></div></AdminOnly>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
