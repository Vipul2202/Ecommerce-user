import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_BASE_URL;

const RANGES = [
  { label: "24h", hours: 24 },
  { label: "3d", hours: 72 },
  { label: "7d", hours: 168 },
  { label: "30d", hours: 720 },
];

const NOTICE_LABELS = {
  reminder: "Reminder (Cancel/Reschedule)",
  confirmation: "Be-on-time confirmation",
};

const formatDateTime = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString();
};

// "2026-09-19T12:00" (what a datetime-local input holds) -> Date, in the
// viewer's local timezone, exactly like the input showed it.
const parseLocalDateTime = (value) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const todayAtNoonLocal = () => {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T12:00`;
};

const ReminderActivityPanel = ({ password, onAuthExpired }) => {
  const [hours, setHours] = useState(24);
  const [sinceInput, setSinceInput] = useState(""); // datetime-local value, empty = use hours
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(false);

  const [previewFor, setPreviewFor] = useState(null); // reminder row object
  const [previewData, setPreviewData] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  const authHeaders = { headers: { "x-owner-password": password } };

  const fetchRecent = async () => {
    setLoading(true);
    try {
      const sinceDate = parseLocalDateTime(sinceInput);
      const params = sinceDate ? { since: sinceDate.toISOString() } : { hours };
      const res = await axios.get(`${API}/admin/reminders/recent`, {
        ...authHeaders,
        params,
      });
      setReminders(res.data?.reminders || []);
    } catch (error) {
      if (error.response?.status === 401) {
        onAuthExpired?.();
      } else {
        toast.error("Failed to load reminder activity");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (password) fetchRecent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password, hours, sinceInput]);

  const selectRange = (h) => {
    setSinceInput("");
    setHours(h);
  };

  const openPreview = async (row) => {
    setPreviewFor(row);
    setPreviewData(null);
    setPreviewLoading(true);
    try {
      const res = await axios.get(`${API}/admin/reminders/${row._id}/sent-preview`, authHeaders);
      setPreviewData(res.data);
    } catch (error) {
      if (error.response?.status === 401) {
        onAuthExpired?.();
      } else {
        toast.error("Failed to load sent email preview");
      }
      setPreviewFor(null);
    } finally {
      setPreviewLoading(false);
    }
  };

  const closePreview = () => {
    setPreviewFor(null);
    setPreviewData(null);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h2 className="text-xl font-bold text-[#00a0db]">Reminder Activity</h2>
          <p className="text-sm text-gray-400 mt-1">
            Every reminder / "be on time" email the automated job has actually
            sent. Doesn't include correction emails from the Reminder
            Correction tab.
          </p>
        </div>
        <button
          onClick={fetchRecent}
          disabled={loading}
          className="bg-[#111] border border-gray-700 text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-6">
        {RANGES.map((r) => (
          <button
            key={r.hours}
            onClick={() => selectRange(r.hours)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              !sinceInput && hours === r.hours
                ? "bg-[#00a0db] text-white"
                : "bg-[#111] text-gray-300 hover:bg-gray-800"
            }`}
          >
            Last {r.label}
          </button>
        ))}
        <button
          onClick={() => setSinceInput(todayAtNoonLocal())}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
            sinceInput
              ? "bg-[#00a0db] text-white"
              : "bg-[#111] text-gray-300 hover:bg-gray-800"
          }`}
        >
          Since today 12pm
        </button>
        <div className="flex items-center gap-2 ml-2">
          <span className="text-sm text-gray-400">or since:</span>
          <input
            type="datetime-local"
            value={sinceInput}
            onChange={(e) => setSinceInput(e.target.value)}
            className="px-3 py-2 rounded-md bg-[#111] border border-gray-700 text-white text-sm focus:outline-none focus:ring focus:ring-[#00a0db]"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#00a0db] text-white text-left">
              <th className="p-3">Customer</th>
              <th className="p-3">Email</th>
              <th className="p-3">Vehicle</th>
              <th className="p-3">Location</th>
              <th className="p-3">Appointment</th>
              <th className="p-3">Notice Type</th>
              <th className="p-3">Sent At</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="p-6 text-center text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : reminders.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-6 text-center text-gray-400">
                  No reminders sent in this window.
                </td>
              </tr>
            ) : (
              reminders.map((r) => (
                <tr key={r._id} className="border-t border-gray-800">
                  <td className="p-3 whitespace-nowrap">
                    {r.first_name} {r.last_name}
                  </td>
                  <td className="p-3">{r.email}</td>
                  <td className="p-3 whitespace-nowrap">{r.vehicle_registration}</td>
                  <td className="p-3 whitespace-nowrap">{r.location}</td>
                  <td className="p-3 whitespace-nowrap">
                    {r.booking_date ? new Date(r.booking_date).toLocaleDateString() : "-"} {r.booking_time}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    {NOTICE_LABELS[r.notice_type] || r.notice_type || "-"}
                  </td>
                  <td className="p-3 whitespace-nowrap">{formatDateTime(r.sent_at)}</td>
                  <td className="p-3 whitespace-nowrap">
                    <button
                      onClick={() => openPreview(r)}
                      className="px-3 py-1 rounded-full bg-[#00a0db] hover:bg-[#0086b8] text-xs font-semibold"
                    >
                      View email
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {previewFor && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-[#111] border border-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="p-5 border-b border-gray-800">
              <h3 className="text-lg font-bold text-[#00a0db]">
                Sent email — {previewFor.first_name} {previewFor.last_name}
              </h3>
              {previewData && (
                <div className="text-sm text-gray-400 mt-1 space-y-1">
                  <div>To: {previewData.to}</div>
                  <div>Subject: {previewData.subject}</div>
                  <div>Sent at: {formatDateTime(previewData.sentAt)}</div>
                </div>
              )}
            </div>

            <div className="p-5 overflow-y-auto flex-1">
              {previewLoading || !previewData ? (
                <div className="text-gray-400 text-sm">Loading...</div>
              ) : (
                <iframe
                  title="Sent reminder email preview"
                  srcDoc={previewData.html}
                  sandbox=""
                  className="w-full bg-white rounded-lg border border-gray-700"
                  style={{ height: "50vh" }}
                />
              )}
            </div>

            <div className="p-5 border-t border-gray-800 flex justify-end">
              <button
                onClick={closePreview}
                className="px-4 py-2 rounded-full bg-[#222] text-white hover:bg-[#333] transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReminderActivityPanel;
