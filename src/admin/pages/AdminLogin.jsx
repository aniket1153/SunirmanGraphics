import React, { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

const AdminLogin = () => {
  const { user, loading, login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) {
    return <Navigate to={location.state?.from || "/admin"} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-lg shadow-sm border border-hairline p-8"
      >
        <h1 className="text-2xl font-extrabold text-ink mb-1">Admin Login</h1>
        <p className="text-sm text-ink-soft mb-6">Sunirman Graphics admin panel</p>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
            {error}
          </div>
        )}

        <label className="block mb-4">
          <span className="block mb-1 text-sm font-semibold text-ink-soft">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 rounded-md border border-hairline focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
          />
        </label>

        <label className="block mb-6">
          <span className="block mb-1 text-sm font-semibold text-ink-soft">Password</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-md border border-hairline focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
          />
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-ink text-cream font-semibold py-2.5 rounded-md hover:bg-orange-500 disabled:opacity-60 transition-colors"
        >
          {submitting ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
