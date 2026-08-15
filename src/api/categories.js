import client from "./client";

export const getCategories = (withProducts = false) =>
  client
    .get("/categories", { params: withProducts ? { withProducts: "true" } : {} })
    .then((res) => res.data);

export const getCategory = (name) =>
  client.get(`/categories/${encodeURIComponent(name)}`).then((res) => res.data);

export const createCategory = (formData) =>
  client
    .post("/categories", formData, { headers: { "Content-Type": "multipart/form-data" } })
    .then((res) => res.data);

export const updateCategory = (id, formData) =>
  client
    .put(`/categories/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } })
    .then((res) => res.data);

export const deleteCategory = (id) =>
  client.delete(`/categories/${id}`).then((res) => res.data);
