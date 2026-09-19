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

const ReminderRectificationPanel = ({ password, onAuthExpired }) => {
  const [bookings, setBookings] = useState([]);
  const [testMode, setTestMode] = useState(true);
  const [loading, setLoading] = useState(false);

  const [previewFor, setPreviewFor] = useState(null); // booking object
  const [previewData, setPreviewData] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [sending, setSending] = useState(false);

  const authHeaders = { headers: { "x-owner-password": password } };

  const fetchAffected = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/admin/erroneous-reminders`, authHeaders);
      setBookings(res.data?.bookings || []);
      setTestMode(!!res.data?.testMode);
    } catch (error) {
      if (error.response?.status === 401) {
        onAuthExpired?.();
      } else {
        toast.error("Failed to load affected bookings");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (password) fetchAffected();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  const openPreview = async (booking) => {
    setPreviewFor(booking);
    setPreviewData(null);
    setPreviewLoading(true);
    try {
      const res = await axios.get(
        `${API}/admin/erroneous-reminders/${booking._id}/preview`,
        authHeaders
      );
      setPreviewData(res.data);
    } catch (error) {
      if (error.response?.status === 401) {
        onAuthExpired?.();
      } else {
        toast.error("Failed to load preview");
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

  const confirmSend = async (force) => {
    if (!previewFor) return;
    setSending(true);
    try {
      const res = await axios.post(
        `${API}/admin/erroneous-reminders/${previewFor._id}/send`,
        { force: !!force },
        authHeaders
      );
      toast.success(
        testMode
          ? `Sent (test mode) — redirected to ${res.data?.deliveredTo || "test inbox"}`
          : `Correction email sent to ${res.data?.deliveredTo}`
      );
      setBookings((prev) =>
        prev.map((b) =>
          b._id === previewFor._id
            ? { ...b, rectification_sent: true, rectification_sent_at: res.data?.rectificationSentAt }
            : b
        )
      );
      closePreview();
    } catch (error) {
      if (error.response?.status === 401) {
        onAuthExpired?.();
      } else if (error.response?.status === 409) {
        toast.info("Already sent for this booking. Use Resend if you really want to send it again.");
      } else {
        toast.error("Failed to send correction email");
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h2 className="text-xl font-bold text-[#00a0db]">
            Erroneous Reminder Correction
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Customers who were sent a booking reminder in error (appointment
            had already passed) before the fix. Review each one and send its
            correction email individually — nothing here is sent
            automatically.
          </p>
        </div>
        <button
          onClick={fetchAffected}
          disabled={loading}
          className="bg-[#111] border border-gray-700 text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {testMode && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-yellow-900/40 border border-yellow-700 text-yellow-200 text-sm">
          REMINDER_TEST_MODE is ON — every send below will redirect to the
          test inbox, not the real customer, until it's turned off on the
          server.
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-gray-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#00a0db] text-white text-left">
              <th className="p-3">Customer</th>
              <th className="p-3">Email</th>
              <th className="p-3">Vehicle</th>
              <th className="p-3">Appointment</th>
              <th className="p-3">Erroneously notified at</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-400">
                  No affected bookings found.
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr key={b._id} className="border-t border-gray-800">
                  <td className="p-3 whitespace-nowrap">
                    {b.first_name} {b.last_name}
                  </td>
                  <td className="p-3">{b.email}</td>
                  <td className="p-3 whitespace-nowrap">
                    <div>{b.car_type}</div>
                    <div className="text-gray-400">{b.vehicle_registration}</div>
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    {new Date(b.booking_date).toLocaleDateString()} {b.booking_time}
                  </td>
                  <td className="p-3 whitespace-nowrap">{formatDateTime(b.updatedAt)}</td>
                  <td className="p-3 whitespace-nowrap">
                    {b.rectification_sent ? (
                      <span className="text-green-400">
                        Sent {formatDateTime(b.rectification_sent_at)}
                      </span>
                    ) : (
                      <span className="text-gray-400">Not sent</span>
                    )}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <button
                      onClick={() => openPreview(b)}
                      className="px-3 py-1 rounded-full bg-[#00a0db] hover:bg-[#0086b8] text-xs font-semibold"
                    >
                      {b.rectification_sent ? "Preview / Resend" : "Preview & Send"}
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
                Correction email — {previewFor.first_name} {previewFor.last_name}
              </h3>
              {previewData && (
                <div className="text-sm text-gray-400 mt-1 space-y-1">
                  <div>To: {previewData.to}</div>
                  <div>Subject: {previewData.subject}</div>
                  {previewData.testMode && (
                    <div className="text-yellow-300">
                      Test mode is ON — will actually deliver to{" "}
                      {previewData.willActuallyDeliverTo || "(REMINDER_TEST_EMAIL not set!)"}
                    </div>
                  )}
                  {previewData.alreadySent && (
                    <div className="text-green-400">
                      Already sent {formatDateTime(previewData.rectificationSentAt)} —
                      sending again will resend it.
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="p-5 overflow-y-auto flex-1">
              {previewLoading || !previewData ? (
                <div className="text-gray-400 text-sm">Loading preview...</div>
              ) : (
                <iframe
                  title="Correction email preview"
                  srcDoc={previewData.html}
                  sandbox=""
                  className="w-full bg-white rounded-lg border border-gray-700"
                  style={{ height: "50vh" }}
                />
              )}
            </div>

            <div className="p-5 border-t border-gray-800 flex justify-end gap-3">
              <button
                onClick={closePreview}
                disabled={sending}
                className="px-4 py-2 rounded-full bg-[#222] text-white hover:bg-[#333] transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmSend(previewData?.alreadySent)}
                disabled={sending || previewLoading || !previewData}
                className="px-4 py-2 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold transition disabled:opacity-50"
              >
                {sending
                  ? "Sending..."
                  : previewData?.alreadySent
                  ? "Resend correction email"
                  : "Send correction email"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReminderRectificationPanel;
