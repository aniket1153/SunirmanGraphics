import React, { useEffect, useState } from "react";
import { getAdminUsers, createAdminUser, updateAdminUser, deleteAdminUser } from "../../api/adminUsers";
import { useAdminAuth } from "../context/AdminAuthContext";
import Modal from "../components/Modal";

const emptyForm = { name: "", email: "", password: "", role: "editor" };

const UsersPage = () => {
  const { user: currentUser } = useAdminAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    getAdminUsers()
      .then(setUsers)
      .catch(() => setError("Failed to load users"))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openCreate = () => {
    setForm(emptyForm);
    setError("");
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await createAdminUser(form);
      setModalOpen(false);
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create user");
    } finally {
      setSaving(false);
    }
  };

  const handleRoleToggle = async (targetUser) => {
    const newRole = targetUser.role === "owner" ? "editor" : "owner";
    try {
      await updateAdminUser(targetUser._id, { role: newRole });
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update role");
    }
  };

  const handleDelete = async (targetUser) => {
    if (!confirm(`Remove admin "${targetUser.name}"?`)) return;
    try {
      await deleteAdminUser(targetUser._id);
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to remove user");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-ink">Admin Users</h1>
        <button
          onClick={openCreate}
          className="bg-ink text-cream font-semibold text-sm px-4 py-2.5 rounded-md hover:bg-orange-500 transition-colors"
        >
          + Add Admin
        </button>
      </div>

      {loading ? (
        <p className="text-ink-soft">Loading...</p>
      ) : (
        <div className="bg-white rounded-lg border border-hairline shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-ink-soft text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-5 py-3">Name</th>
                <th className="text-left px-5 py-3">Email</th>
                <th className="text-left px-5 py-3">Role</th>
                <th className="text-right px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-t border-hairline">
                  <td className="px-5 py-3 font-semibold text-ink">
                    {u.name} {u._id === currentUser?.id && <span className="text-ink-soft font-normal">(you)</span>}
                  </td>
                  <td className="px-5 py-3 text-ink-soft">{u.email}</td>
                  <td className="px-5 py-3 text-ink-soft capitalize">{u.role}</td>
                  <td className="px-5 py-3 text-right space-x-3">
                    <button
                      onClick={() => handleRoleToggle(u)}
                      className="text-orange-600 font-semibold hover:underline"
                    >
                      Make {u.role === "owner" ? "Editor" : "Owner"}
                    </button>
                    <button
                      onClick={() => handleDelete(u)}
                      disabled={u._id === currentUser?.id}
                      className="text-red-600 font-semibold hover:underline disabled:opacity-40 disabled:no-underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <Modal title="Add Admin User" onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                {error}
              </div>
            )}

            <label className="block">
              <span className="block mb-1 text-sm font-semibold text-ink-soft">Name</span>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-md border border-hairline focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
              />
            </label>

            <label className="block">
              <span className="block mb-1 text-sm font-semibold text-ink-soft">Email</span>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-md border border-hairline focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
              />
            </label>

            <label className="block">
              <span className="block mb-1 text-sm font-semibold text-ink-soft">Password</span>
              <input
                type="password"
                required
                minLength={6}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-2.5 rounded-md border border-hairline focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
              />
            </label>

            <label className="block">
              <span className="block mb-1 text-sm font-semibold text-ink-soft">Role</span>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full px-4 py-2.5 rounded-md border border-hairline focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
              >
                <option value="editor">Editor</option>
                <option value="owner">Owner</option>
              </select>
            </label>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-ink text-cream font-semibold py-2.5 rounded-md hover:bg-orange-500 disabled:opacity-60 transition-colors"
            >
              {saving ? "Creating..." : "Create Admin"}
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default UsersPage;
