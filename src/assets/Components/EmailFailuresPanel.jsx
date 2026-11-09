import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_BASE_URL;

const formatDateTime = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString();
};

const EmailFailuresPanel = ({ password, onAuthExpired }) => {
  const [failures, setFailures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actioningId, setActioningId] = useState(null);
  const [showResolved, setShowResolved] = useState(false);

  const authHeaders = { headers: { "x-owner-password": password } };

  const fetchFailures = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/admin/email-failures`, {
        ...authHeaders,
        params: { resolved: showResolved ? "true" : "false" },
      });
      setFailures(res.data?.failures || []);
    } catch (error) {
      if (error.response?.status === 401) onAuthExpired?.();
      else toast.error("Failed to load email failures");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFailures();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showResolved]);

  const handleResend = async (id) => {
    setActioningId(id);
    try {
      await axios.post(`${API}/admin/email-failures/${id}/resend`, {}, authHeaders);
      toast.success("Email resent successfully");
      fetchFailures();
    } catch (error) {
      if (error.response?.status === 401) onAuthExpired?.();
      else toast.error(error.response?.data?.message || "Resend failed - it's still broken, see server logs");
    } finally {
      setActioningId(null);
    }
  };

  const handleDismiss = async (id) => {
    setActioningId(id);
    try {
      await axios.post(`${API}/admin/email-failures/${id}/dismiss`, {}, authHeaders);
      toast.success("Dismissed");
      fetchFailures();
    } catch (error) {
      if (error.response?.status === 401) onAuthExpired?.();
      else toast.error("Failed to dismiss");
    } finally {
      setActioningId(null);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-300">Email Failures</h2>
          <p className="text-sm text-gray-500 mt-1">
            Emails every send method (Zoho / Resend) failed to deliver. Each one is retried automatically a
            few times before landing here, so these are genuine failures worth a look.
          </p>
        </div>
        <button
          onClick={() => setShowResolved((v) => !v)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition whitespace-nowrap ${
            showResolved ? "bg-[#00a0db] text-white" : "bg-[#111] text-gray-300 hover:bg-gray-800"
          }`}
        >
          {showResolved ? "Showing resolved" : "Show resolved"}
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#00a0db] text-white text-left">
              <th className="p-3">When</th>
              <th className="p-3">To</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Error</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-400">Loading...</td>
              </tr>
            ) : failures.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-400">
                  {showResolved ? "No resolved failures to show" : "No unresolved email failures — all good"}
                </td>
              </tr>
            ) : (
              failures.map((f) => (
                <tr key={f._id} className="border-t border-gray-800">
                  <td className="p-3 whitespace-nowrap text-gray-400">{formatDateTime(f.createdAt)}</td>
                  <td className="p-3 whitespace-nowrap">{f.to}</td>
                  <td className="p-3">{f.subject}</td>
                  <td className="p-3 text-red-400 max-w-xs">{f.error || "-"}</td>
                  <td className="p-3 whitespace-nowrap">
                    {f.resolved ? (
                      <span className="text-green-400 text-xs">Resolved</span>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          disabled={actioningId === f._id}
                          onClick={() => handleResend(f._id)}
                          className="px-3 py-1 rounded-full bg-green-600 hover:bg-green-700 text-xs font-semibold disabled:opacity-50"
                        >
                          {actioningId === f._id ? "Working..." : "Resend"}
                        </button>
                        <button
                          disabled={actioningId === f._id}
                          onClick={() => handleDismiss(f._id)}
                          className="px-3 py-1 rounded-full bg-[#222] hover:bg-gray-700 text-xs font-semibold disabled:opacity-50"
                        >
                          Dismiss
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmailFailuresPanel;
