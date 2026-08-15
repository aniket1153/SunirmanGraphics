import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../api/categories";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../../api/products";
import Modal from "../components/Modal";

const emptyForm = { name: "", category: "", description: "", featured: false, imageFiles: [] };

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadCategories = () => getCategories().then(setCategories).catch(() => {});

  const loadProducts = () => {
    setLoading(true);
    getProducts(categoryFilter ? { category: categoryFilter } : {})
      .then(setProducts)
      .catch(() => setError("Failed to load products"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFilter]);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...emptyForm, category: categories[0]?._id || "" });
    setError("");
    setModalOpen(true);
  };

  const openEdit = (product) => {
    setEditing(product);
    setForm({
      name: product.name,
      category: product.category?._id || "",
      description: product.description || "",
      featured: product.featured,
      imageFiles: [],
    });
    setError("");
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (editing) {
        await updateProduct(editing._id, {
          name: form.name,
          category: form.category,
          description: form.description,
          featured: form.featured,
        });
      } else {
        const fd = new FormData();
        fd.append("name", form.name);
        fd.append("category", form.category);
        fd.append("description", form.description);
        fd.append("featured", form.featured);
        form.imageFiles.forEach((file) => fd.append("images", file));
        await createProduct(fd);
      }
      setModalOpen(false);
      loadProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (product) => {
    if (!confirm(`Delete product "${product.name}"? This removes all its images.`)) return;
    try {
      await deleteProduct(product._id);
      loadProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete product");
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-extrabold text-ink">Products</h1>
        <div className="flex items-center gap-3">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-md border border-hairline text-sm"
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c._id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          <button
            onClick={openCreate}
            disabled={categories.length === 0}
            className="bg-ink text-cream font-semibold text-sm px-4 py-2.5 rounded-md hover:bg-orange-500 disabled:opacity-50 transition-colors"
          >
            + Add Product
          </button>
        </div>
      </div>

      {categories.length === 0 && !loading && (
        <p className="text-ink-soft mb-4">Create a category first before adding products.</p>
      )}

      {loading ? (
        <p className="text-ink-soft">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-ink-soft">No products yet.</p>
      ) : (
        <div className="bg-white rounded-lg border border-hairline shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-ink-soft text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-5 py-3">Product</th>
                <th className="text-left px-5 py-3">Category</th>
                <th className="text-left px-5 py-3">Images</th>
                <th className="text-left px-5 py-3">Featured</th>
                <th className="text-right px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-t border-hairline">
                  <td className="px-5 py-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-gray-100 overflow-hidden shrink-0">
                      {product.images?.[0]?.url && (
                        <img src={product.images[0].url} alt="" className="w-full h-full object-cover" />
                      )}
                    </div>
                    <span className="font-semibold text-ink">{product.name}</span>
                  </td>
                  <td className="px-5 py-3 text-ink-soft">{product.category?.name}</td>
                  <td className="px-5 py-3 text-ink-soft">{product.images?.length || 0}</td>
                  <td className="px-5 py-3 text-ink-soft">{product.featured ? "Yes" : "—"}</td>
                  <td className="px-5 py-3 text-right space-x-3 whitespace-nowrap">
                    <Link
                      to={`/admin/products/${product._id}/images`}
                      className="text-orange-600 font-semibold hover:underline"
                    >
                      Images
                    </Link>
                    <button
                      onClick={() => openEdit(product)}
                      className="text-orange-600 font-semibold hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product)}
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
        <Modal title={editing ? "Edit Product" : "Add Product"} onClose={() => setModalOpen(false)}>
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
              <span className="block mb-1 text-sm font-semibold text-ink-soft">Category</span>
              <select
                required
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-md border border-hairline focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
              >
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="block mb-1 text-sm font-semibold text-ink-soft">Description</span>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-md border border-hairline focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 resize-none"
              />
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              />
              <span className="text-sm font-semibold text-ink-soft">Show in "Trending Products"</span>
            </label>

            {!editing && (
              <label className="block">
                <span className="block mb-1 text-sm font-semibold text-ink-soft">
                  Images (optional, can add more later)
                </span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setForm({ ...form, imageFiles: Array.from(e.target.files) })}
                  className="w-full text-sm"
                />
              </label>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-ink text-cream font-semibold py-2.5 rounded-md hover:bg-orange-500 disabled:opacity-60 transition-colors"
            >
              {saving ? "Saving..." : "Save Product"}
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default ProductsPage;
