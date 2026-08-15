import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "./context/AdminAuthContext";

export const ProtectedRoute = () => {
  const { user, loading } = useAdminAuth();

  if (loading) return <div className="min-h-screen" />;
  if (!user) return <Navigate to="/admin/login" replace />;

  return <Outlet />;
};

export const OwnerRoute = () => {
  const { user, loading } = useAdminAuth();

  if (loading) return <div className="min-h-screen" />;
  if (!user) return <Navigate to="/admin/login" replace />;
  if (user.role !== "owner") return <Navigate to="/admin" replace />;

  return <Outlet />;
};
