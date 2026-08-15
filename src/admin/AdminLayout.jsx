import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAdminAuth } from "./context/AdminAuthContext";

const NAV_ITEMS = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/categories", label: "Categories" },
  { to: "/admin/products", label: "Products" },
  { to: "/admin/leads", label: "Leads" },
];

const AdminLayout = () => {
  const { user, logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const linkClass = ({ isActive }) =>
    `block px-4 py-2.5 rounded-md text-sm font-semibold transition-colors ${
      isActive ? "bg-orange-500 text-white" : "text-cream/80 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-60 shrink-0 bg-ink flex flex-col">
        <div className="px-5 py-6">
          <p className="text-cream font-extrabold text-lg leading-tight">Sunirman Graphics</p>
          <p className="text-cream/50 text-xs uppercase tracking-widest mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
          {user?.role === "owner" && (
            <NavLink to="/admin/users" className={linkClass}>
              Users
            </NavLink>
          )}
        </nav>
        <div className="px-3 py-4 border-t border-white/10">
          <p className="px-2 text-cream/70 text-xs mb-2 truncate">
            {user?.name} · {user?.role}
          </p>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2.5 rounded-md text-sm font-semibold text-cream/80 hover:bg-white/10 hover:text-white transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <div className="p-6 lg:p-10 max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
