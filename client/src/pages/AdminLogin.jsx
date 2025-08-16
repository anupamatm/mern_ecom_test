import { useState } from "react";
import http from "../api/http";
import { useAuth } from "../state/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!email || !password) {
      setErr("Please enter both email and password.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await http.post("/auth/login", { email, password });
      if (data.user.role !== "admin") {
        setErr("Not an admin account.");
      } else {
        login(data);
        navigate("/admin/dashboard");
      }
    } catch (e) {
      setErr(e.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="form">
      <h2>Admin Login</h2>
      {err && <div className="error">{err}</div>}
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Admin Email"
        disabled={loading}
      />
      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
        disabled={loading}
      />
      <button disabled={loading}>{loading ? "Logging in..." : "Login as Admin"}</button>
    </form>
  );
}
