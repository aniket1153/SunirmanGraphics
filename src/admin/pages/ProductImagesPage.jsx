import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProducts, addProductImages, updateProductImage, deleteProductImage } from "../../api/products";

const ProductImagesPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [drafts, setDrafts] = useState({});

  const load = () => {
    setLoading(true);
    getProducts()
      .then((all) => {
        const found = all.find((p) => p._id === id);
        setProduct(found || null);
        if (found) {
          const d = {};
          found.images.forEach((img) => {
            d[img._id] = { title: img.title || "", description: img.description || "" };
          });
          setDrafts(d);
        }
      })
      .catch(() => setError("Failed to load product"))
      .finally(() => setLoading(false));
  };

  useEffect(load, [id]);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      files.forEach((f) => fd.append("images", f));
      await addProductImages(id, fd);
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleSaveMeta = async (imageId) => {
    try {
      await updateProductImage(id, imageId, drafts[imageId]);
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save");
    }
  };

  const handleDeleteImage = async (imageId) => {
    if (!confirm("Delete this image?")) return;
    try {
      await deleteProductImage(id, imageId);
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete image");
    }
  };

  if (loading) return <p className="text-ink-soft">Loading...</p>;
  if (!product) return <p className="text-ink-soft">Product not found.</p>;

  return (
    <div>
      <Link to="/admin/products" className="text-orange-600 font-semibold text-sm hover:underline">
        ← Back to Products
      </Link>

      <h1 className="text-2xl font-extrabold text-ink mt-3 mb-6">{product.name} — Images</h1>

      {error && (
        <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          {error}
        </div>
      )}

      <label className="block mb-8">
        <span className="block mb-1 text-sm font-semibold text-ink-soft">Add images</span>
        <input
          type="file"
          accept="image/*"
          multiple
          disabled={uploading}
          onChange={handleUpload}
          className="text-sm"
        />
        {uploading && <p className="text-sm text-ink-soft mt-1">Uploading...</p>}
      </label>

      {product.images.length === 0 ? (
        <p className="text-ink-soft">No images yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {product.images.map((img) => (
            <div key={img._id} className="bg-white rounded-lg border border-hairline shadow-sm overflow-hidden">
              <img src={img.url} alt={img.title} className="w-full h-48 object-cover" />
              <div className="p-4 space-y-2">
                <input
                  value={drafts[img._id]?.title || ""}
                  onChange={(e) =>
                    setDrafts({ ...drafts, [img._id]: { ...drafts[img._id], title: e.target.value } })
                  }
                  placeholder="Title"
                  className="w-full px-3 py-1.5 text-sm rounded-md border border-hairline"
                />
                <textarea
                  value={drafts[img._id]?.description || ""}
                  onChange={(e) =>
                    setDrafts({
                      ...drafts,
                      [img._id]: { ...drafts[img._id], description: e.target.value },
                    })
                  }
                  placeholder="Description"
                  rows={2}
                  className="w-full px-3 py-1.5 text-sm rounded-md border border-hairline resize-none"
                />
                <div className="flex justify-between pt-1">
                  <button
                    onClick={() => handleSaveMeta(img._id)}
                    className="text-orange-600 text-sm font-semibold hover:underline"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleDeleteImage(img._id)}
                    className="text-red-600 text-sm font-semibold hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImagesPage;
