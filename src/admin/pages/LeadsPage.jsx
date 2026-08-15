import React, { useEffect, useState } from "react";
import { getLeads, updateLeadStatus, deleteLead } from "../../api/leads";

const STATUS_OPTIONS = ["new", "contacted", "closed"];

const STATUS_STYLES = {
  new: "bg-orange-100 text-orange-700",
  contacted: "bg-blue-100 text-blue-700",
  closed: "bg-gray-200 text-gray-700",
};

const LeadsPage = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    getLeads()
      .then(setLeads)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleStatusChange = async (id, status) => {
    setLeads((prev) => prev.map((l) => (l._id === id ? { ...l, status } : l)));
    try {
      await updateLeadStatus(id, status);
    } catch {
      alert("Failed to update status");
      load();
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this enquiry?")) return;
    try {
      await deleteLead(id);
      load();
    } catch {
      alert("Failed to delete");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink mb-6">Leads / Enquiries</h1>

      {loading ? (
        <p className="text-ink-soft">Loading...</p>
      ) : leads.length === 0 ? (
        <p className="text-ink-soft">No enquiries yet.</p>
      ) : (
        <div className="bg-white rounded-lg border border-hairline shadow-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-ink-soft text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-5 py-3">Name</th>
                <th className="text-left px-5 py-3">Contact</th>
                <th className="text-left px-5 py-3">Product</th>
                <th className="text-left px-5 py-3">Message</th>
                <th className="text-left px-5 py-3">Date</th>
                <th className="text-left px-5 py-3">Status</th>
                <th className="text-right px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id} className="border-t border-hairline align-top">
                  <td className="px-5 py-3 font-semibold text-ink whitespace-nowrap">{lead.name}</td>
                  <td className="px-5 py-3 text-ink-soft whitespace-nowrap">{lead.email}</td>
                  <td className="px-5 py-3 text-ink-soft whitespace-nowrap">{lead.product || "—"}</td>
                  <td className="px-5 py-3 text-ink-soft max-w-xs">{lead.message}</td>
                  <td className="px-5 py-3 text-ink-soft whitespace-nowrap">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3">
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                      className={`text-xs font-semibold rounded-full px-2.5 py-1 border-0 ${STATUS_STYLES[lead.status]}`}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-3 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(lead._id)}
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
    </div>
  );
};

export default LeadsPage;
