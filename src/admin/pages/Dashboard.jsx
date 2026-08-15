import React, { useEffect, useState } from "react";
import { getCategories } from "../../api/categories";
import { getProducts } from "../../api/products";
import { getLeads } from "../../api/leads";

const StatCard = ({ label, value }) => (
  <div className="bg-white rounded-lg border border-hairline shadow-sm p-6">
    <p className="text-sm text-ink-soft">{label}</p>
    <p className="text-3xl font-extrabold text-ink mt-2">{value}</p>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({ categories: 0, products: 0, newLeads: 0, totalLeads: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getCategories(), getProducts(), getLeads()])
      .then(([categories, products, leads]) => {
        setStats({
          categories: categories.length,
          products: products.length,
          newLeads: leads.filter((l) => l.status === "new").length,
          totalLeads: leads.length,
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink mb-6">Dashboard</h1>
      {loading ? (
        <p className="text-ink-soft">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard label="Categories" value={stats.categories} />
          <StatCard label="Products" value={stats.products} />
          <StatCard label="New Leads" value={stats.newLeads} />
          <StatCard label="Total Leads" value={stats.totalLeads} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
