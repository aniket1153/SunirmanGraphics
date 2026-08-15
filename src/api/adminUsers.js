import client from "./client";

export const getAdminUsers = () => client.get("/admin-users").then((res) => res.data);

export const createAdminUser = (data) =>
  client.post("/admin-users", data).then((res) => res.data);

export const updateAdminUser = (id, data) =>
  client.put(`/admin-users/${id}`, data).then((res) => res.data);

export const deleteAdminUser = (id) =>
  client.delete(`/admin-users/${id}`).then((res) => res.data);
