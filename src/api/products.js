import client from "./client";

export const getProducts = ({ category, featured } = {}) => {
  const params = {};
  if (category) params.category = category;
  if (featured) params.featured = "true";
  return client.get("/products", { params }).then((res) => res.data);
};

export const getProduct = (name) =>
  client.get(`/products/${encodeURIComponent(name)}`).then((res) => res.data);

export const createProduct = (formData) =>
  client
    .post("/products", formData, { headers: { "Content-Type": "multipart/form-data" } })
    .then((res) => res.data);

export const updateProduct = (id, data) =>
  client.put(`/products/${id}`, data).then((res) => res.data);

export const deleteProduct = (id) =>
  client.delete(`/products/${id}`).then((res) => res.data);

export const addProductImages = (id, formData) =>
  client
    .post(`/products/${id}/images`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);

export const updateProductImage = (id, imageId, data) =>
  client.put(`/products/${id}/images/${imageId}`, data).then((res) => res.data);

export const deleteProductImage = (id, imageId) =>
  client.delete(`/products/${id}/images/${imageId}`).then((res) => res.data);
