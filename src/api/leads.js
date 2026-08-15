import client from "./client";

export const createLead = (data) => client.post("/leads", data).then((res) => res.data);

export const getLeads = () => client.get("/leads").then((res) => res.data);

export const updateLeadStatus = (id, status) =>
  client.patch(`/leads/${id}`, { status }).then((res) => res.data);

export const deleteLead = (id) => client.delete(`/leads/${id}`).then((res) => res.data);
