import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./state/AuthContext.jsx";

export const Private = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

export const AdminOnly = ({ children }) => {
  const { user } = useAuth();
  return user?.role === "admin" ? children : <Navigate to="/" replace />;
};
