import React, { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../api/categories";
import { CategoryIcon, ICON_OPTIONS } from "../../utils/categoryIcons";
import Modal from "../components/Modal";

const emptyForm = { name: "", icon: "folder", imageFile: null };

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    getCategories(true)
      .then(setCategories)
      .catch(() => setError("Failed to load categories"))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setError("");
    setModalOpen(true);
  };

  const openEdit = (category) => {
    setEditing(category);
    setForm({ name: category.name, icon: category.icon || "folder", imageFile: null });
    setError("");
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("icon", form.icon);
    if (form.imageFile) fd.append("image", form.imageFile);

    try {
      if (editing) {
        await updateCategory(editing._id, fd);
      } else {
        await createCategory(fd);
      }
      setModalOpen(false);
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save category");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (category) => {
    if (!confirm(`Delete category "${category.name}"?`)) return;
    try {
      await deleteCategory(category._id);
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete category");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-ink">Categories</h1>
        <button
          onClick={openCreate}
          className="bg-ink text-cream font-semibold text-sm px-4 py-2.5 rounded-md hover:bg-orange-500 transition-colors"
        >
          + Add Category
        </button>
      </div>

      {loading ? (
        <p className="text-ink-soft">Loading...</p>
      ) : categories.length === 0 ? (
        <p className="text-ink-soft">No categories yet. Add your first one.</p>
      ) : (
        <div className="bg-white rounded-lg border border-hairline shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-ink-soft text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-5 py-3">Category</th>
                <th className="text-left px-5 py-3">Products</th>
                <th className="text-right px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id} className="border-t border-hairline">
                  <td className="px-5 py-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                      {category.image?.url ? (
                        <img src={category.image.url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <CategoryIcon iconKey={category.icon} size={18} />
                      )}
                    </div>
                    <span className="font-semibold text-ink">{category.name}</span>
                  </td>
                  <td className="px-5 py-3 text-ink-soft">{(category.products || []).length}</td>
                  <td className="px-5 py-3 text-right space-x-3">
                    <button
                      onClick={() => openEdit(category)}
                      className="text-orange-600 font-semibold hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category)}
                      className="text-red-600 font-semibold hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <Modal title={editing ? "Edit Category" : "Add Category"} onClose={() => setModalOpen(false)}>
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

            <div>
              <span className="block mb-2 text-sm font-semibold text-ink-soft">Icon</span>
              <div className="grid grid-cols-6 gap-2">
                {ICON_OPTIONS.map(({ key, Icon, label }) => (
                  <button
                    type="button"
                    key={key}
                    title={label}
                    onClick={() => setForm({ ...form, icon: key })}
                    className={`aspect-square rounded-md border flex items-center justify-center transition-colors ${
                      form.icon === key
                        ? "border-orange-500 bg-orange-50"
                        : "border-hairline hover:border-orange-300"
                    }`}
                  >
                    <Icon size={18} />
                  </button>
                ))}
              </div>
            </div>

            <label className="block">
              <span className="block mb-1 text-sm font-semibold text-ink-soft">
                Cover image (optional)
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setForm({ ...form, imageFile: e.target.files[0] || null })}
                className="w-full text-sm"
              />
            </label>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-ink text-cream font-semibold py-2.5 rounded-md hover:bg-orange-500 disabled:opacity-60 transition-colors"
            >
              {saving ? "Saving..." : "Save Category"}
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default CategoriesPage;
