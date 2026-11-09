import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReminderRectificationPanel from "./ReminderRectificationPanel";
import ReminderActivityPanel from "./ReminderActivityPanel";
import PricingPanel from "./PricingPanel";
import EmailFailuresPanel from "./EmailFailuresPanel";
import NotificationsPanel from "./NotificationsPanel";

const API = import.meta.env.VITE_API_BASE_URL;
const PASSWORD_STORAGE_KEY = "admin_panel_password";

const STATUS_TABS = [
  { label: "All", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Declined", value: "cancelled" },
  { label: "Completed", value: "completed" },
];

const NAV_ITEMS = [
  { label: "Bookings", value: "bookings" },
  { label: "Pricing", value: "pricing" },
  { label: "Reminder Correction", value: "reminder-correction" },
  { label: "Reminder Activity", value: "reminder-activity" },
  { label: "Email Failures", value: "email-failures" },
  { label: "Notifications", value: "notifications" },
];

const PAGE_SIZE = 20;

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString();
};

const AdminPanel = () => {
  const [password, setPassword] = useState(
    () => sessionStorage.getItem(PASSWORD_STORAGE_KEY) || ""
  );
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [authChecking, setAuthChecking] = useState(false);

  const [bookings, setBookings] = useState([]);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [actioningId, setActioningId] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const [view, setView] = useState("bookings");
  const [testModeStatus, setTestModeStatus] = useState(null); // { testMode, testEmail }
  const [togglingTestMode, setTogglingTestMode] = useState(false);
  const [customerTestModeStatus, setCustomerTestModeStatus] = useState(null); // { testMode, testEmail }
  const [togglingCustomerTestMode, setTogglingCustomerTestMode] = useState(false);
  const [unresolvedFailureCount, setUnresolvedFailureCount] = useState(0);

  const authHeaders = (pwd) => ({
    headers: { "x-owner-password": pwd },
  });

  const handleLogout = () => {
    sessionStorage.removeItem(PASSWORD_STORAGE_KEY);
    setPassword("");
  };

  const fetchTestModeStatus = async (pwd) => {
    try {
      const res = await axios.get(`${API}/admin/reminders/test-mode-status`, authHeaders(pwd));
      setTestModeStatus(res.data);
    } catch (error) {
      // Non-critical — the banner just stays hidden if this fails.
    }
  };

  const fetchCustomerTestModeStatus = async (pwd) => {
    try {
      const res = await axios.get(`${API}/admin/reminders/customer-test-mode-status`, authHeaders(pwd));
      setCustomerTestModeStatus(res.data);
    } catch (error) {
      // Non-critical — the banner just stays hidden if this fails.
    }
  };

  const fetchEmailFailureCount = async (pwd) => {
    try {
      const res = await axios.get(`${API}/admin/email-failures`, authHeaders(pwd));
      setUnresolvedFailureCount(res.data?.total || 0);
    } catch (error) {
      // Non-critical — the sidebar badge just stays at 0 if this fails.
    }
  };

  const handleToggleTestMode = async () => {
    if (!testModeStatus) return;
    const turningOn = !testModeStatus.testMode;
    let testEmail;
    if (turningOn && !testModeStatus.testEmail) {
      testEmail = window.prompt(
        "No REMINDER_TEST_EMAIL is set yet. Enter the inbox test-mode emails should redirect to:",
        ""
      );
      if (!testEmail || !testEmail.trim()) return;
    }
    const confirmed = window.confirm(
      turningOn
        ? "Turn reminder test mode ON? All reminder/rectification emails will redirect to the test inbox instead of real customers."
        : "Turn reminder test mode OFF? Reminder and rectification emails will start reaching real customers again."
    );
    if (!confirmed) return;

    setTogglingTestMode(true);
    try {
      const res = await axios.post(
        `${API}/admin/reminders/test-mode-status`,
        { testMode: turningOn, ...(testEmail ? { testEmail: testEmail.trim() } : {}) },
        authHeaders(password)
      );
      setTestModeStatus(res.data);
      toast.success(turningOn ? "Test mode turned ON" : "Test mode turned OFF");
    } catch (error) {
      if (error.response?.status === 401) {
        handleLogout();
      } else {
        toast.error(error.response?.data?.message || "Failed to change test mode");
      }
    } finally {
      setTogglingTestMode(false);
    }
  };

  const handleToggleCustomerTestMode = async () => {
    if (!customerTestModeStatus) return;
    const turningOn = !customerTestModeStatus.testMode;
    let testEmail;
    if (turningOn && !customerTestModeStatus.testEmail) {
      testEmail = window.prompt(
        "No REMINDER_TEST_EMAIL is set yet. Enter the inbox customer emails should redirect to:",
        ""
      );
      if (!testEmail || !testEmail.trim()) return;
    }
    const confirmed = window.confirm(
      turningOn
        ? "Turn customer email test mode ON? Approval, cancellation, reschedule, and delete emails will redirect to the test inbox instead of real customers. Admin/branch notifications are not affected."
        : "Turn customer email test mode OFF? Customer-facing emails will start reaching real customers again."
    );
    if (!confirmed) return;

    setTogglingCustomerTestMode(true);
    try {
      const res = await axios.post(
        `${API}/admin/reminders/customer-test-mode-status`,
        { testMode: turningOn, ...(testEmail ? { testEmail: testEmail.trim() } : {}) },
        authHeaders(password)
      );
      setCustomerTestModeStatus(res.data);
      toast.success(turningOn ? "Customer email test mode turned ON" : "Customer email test mode turned OFF");
    } catch (error) {
      if (error.response?.status === 401) {
        handleLogout();
      } else {
        toast.error(error.response?.data?.message || "Failed to change customer email test mode");
      }
    } finally {
      setTogglingCustomerTestMode(false);
    }
  };

  const fetchBookings = async (pwd, currentStatus, currentPage) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/admin/get-bookings`, {
        ...authHeaders(pwd),
        params: {
          limit: PAGE_SIZE,
          offset: currentPage * PAGE_SIZE,
          ...(currentStatus ? { status: currentStatus } : {}),
        },
      });
      setBookings(res.data?.booking || []);
      setTotal(res.data?.total || 0);
    } catch (error) {
      if (error.response?.status === 401) {
        sessionStorage.removeItem(PASSWORD_STORAGE_KEY);
        setPassword("");
        setAuthError("Session expired. Please enter the password again.");
      } else {
        toast.error("Failed to load bookings");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!passwordInput.trim()) {
      setAuthError("Enter the admin panel password");
      return;
    }
    setAuthChecking(true);
    setAuthError("");
    try {
      await axios.get(`${API}/admin/get-bookings`, {
        ...authHeaders(passwordInput),
        params: { limit: 1, offset: 0 },
      });
      sessionStorage.setItem(PASSWORD_STORAGE_KEY, passwordInput);
      setPassword(passwordInput);
      setPasswordInput("");
    } catch (error) {
      setAuthError("Incorrect password");
    } finally {
      setAuthChecking(false);
    }
  };

  useEffect(() => {
    if (password) {
      fetchBookings(password, status, page);
    }
    setSelectedIds([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password, status, page]);

  useEffect(() => {
    if (password) {
      fetchTestModeStatus(password);
      fetchCustomerTestModeStatus(password);
      fetchEmailFailureCount(password);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  // Refresh the unresolved-count badge whenever leaving the Email Failures
  // tab, so resend/dismiss actions taken there are reflected right away.
  useEffect(() => {
    if (password && view !== "email-failures") {
      fetchEmailFailureCount(password);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  const handleStatusTab = (value) => {
    setStatus(value);
    setPage(0);
    setSelectedIds([]);
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const visibleIds = bookings.map((b) => b._id);
    const allSelected = visibleIds.every((id) => selectedIds.includes(id));
    setSelectedIds(allSelected ? [] : visibleIds);
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;
    const confirmed = window.confirm(
      `Delete ${selectedIds.length} booking${selectedIds.length > 1 ? "s" : ""}? This cannot be undone.`
    );
    if (!confirmed) return;

    setDeleting(true);
    try {
      await axios.post(
        `${API}/admin/delete-bookings`,
        { ids: selectedIds },
        authHeaders(password)
      );
      toast.success("Booking(s) deleted");
      setSelectedIds([]);
      fetchBookings(password, status, page);
    } catch (error) {
      if (error.response?.status === 401) {
        handleLogout();
      } else {
        toast.error("Failed to delete booking(s)");
      }
    } finally {
      setDeleting(false);
    }
  };

  const handleApproveDecline = async (booking, newStatus) => {
    const reason =
      newStatus === "cancelled"
        ? window.prompt("Reason for declining (optional):", "") || ""
        : "";
    setActioningId(booking._id);
    try {
      await axios.post(
        `${API}/admin/change-booking-status`,
        { id: booking._id, status: newStatus, reason },
        authHeaders(password)
      );
      toast.success(
        newStatus === "approved" ? "Booking approved" : "Booking declined"
      );
      fetchBookings(password, status, page);
    } catch (error) {
      if (error.response?.status === 401) {
        handleLogout();
      } else {
        toast.error("Could not update booking status");
      }
    } finally {
      setActioningId(null);
    }
  };

  const handleDownloadExcel = async () => {
    if (total === 0) {
      toast.info("No bookings to export");
      return;
    }
    setDownloading(true);
    try {
      const res = await axios.get(`${API}/admin/get-bookings`, {
        ...authHeaders(password),
        params: {
          limit: total,
          offset: 0,
          ...(status ? { status } : {}),
        },
      });
      const allBookings = res.data?.booking || [];
      const rows = allBookings.map((b) => ({
        "Booking ID": b.booking_id || "",
        "First Name": b.first_name || "",
        "Last Name": b.last_name || "",
        Email: b.email || "",
        Phone: b.phone || "",
        Location: b.location || "",
        "Car Type": b.car_type || "",
        "Vehicle Registration": b.vehicle_registration || "",
        Services: Array.isArray(b.services) ? b.services.join(", ") : "",
        "Booking Date": formatDate(b.booking_date),
        "Booking Time": b.booking_time || "",
        Status: b.booking_status || "",
        "Cancel Reason": b.booking_cancel_reason || "",
        Message: b.message || "",
      }));
      const worksheet = XLSX.utils.json_to_sheet(rows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Bookings");
      const dateStamp = new Date().toISOString().slice(0, 10);
      XLSX.writeFile(workbook, `bookings-${status || "all"}-${dateStamp}.xlsx`);
    } catch (error) {
      if (error.response?.status === 401) {
        handleLogout();
      } else {
        toast.error("Failed to export bookings");
      }
    } finally {
      setDownloading(false);
    }
  };

  if (!password) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <form
          onSubmit={handlePasswordSubmit}
          className="bg-[#111] border border-gray-800 rounded-2xl p-8 w-full max-w-sm"
        >
          <h1 className="text-2xl font-bold text-[#00a0db] mb-6 text-center">
            Admin Panel
          </h1>
          <label className="block text-sm text-gray-400 mb-2">Password</label>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-black border border-gray-700 text-white focus:outline-none focus:ring focus:ring-[#00a0db] mb-3"
            autoFocus
          />
          {authError && (
            <p className="text-red-500 text-sm mb-3">{authError}</p>
          )}
          <button
            type="submit"
            disabled={authChecking}
            className="w-full bg-[#00a0db] text-white py-2 rounded-md font-semibold hover:bg-black hover:border hover:border-[#00a0db] transition"
          >
            {authChecking ? "Checking..." : "Enter"}
          </button>
        </form>
      </div>
    );
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const handleAuthExpired = () => {
    handleLogout();
  };

  const needsAttention = Boolean(testModeStatus?.testMode || customerTestModeStatus?.testMode);

  return (
    <div className="min-h-screen bg-black text-white flex">
      <aside className="w-60 shrink-0 bg-[#0a0a0a] border-r border-gray-800 flex flex-col">
        <div className="px-5 py-6 border-b border-gray-800">
          <h1 className="text-lg font-bold text-[#00a0db] tracking-tight">Admin Panel</h1>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.value}
              onClick={() => setView(item.value)}
              className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition text-left ${
                view === item.value
                  ? "bg-[#00a0db] text-white"
                  : "text-gray-300 hover:bg-gray-900"
              }`}
            >
              <span>{item.label}</span>
              {item.value === "notifications" && needsAttention && (
                <span className="w-2 h-2 rounded-full bg-yellow-400 shrink-0" aria-label="Needs attention" />
              )}
              {item.value === "email-failures" && unresolvedFailureCount > 0 && (
                <span className="text-xs bg-red-600 text-white rounded-full px-2 py-0.5 shrink-0 leading-none">
                  {unresolvedFailureCount}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2.5 rounded-lg text-sm font-semibold text-gray-300 hover:bg-red-900 hover:text-red-200 transition text-left"
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 px-6 sm:px-10 py-10 overflow-x-auto">
        <div className="max-w-7xl mx-auto">

        {view === "pricing" ? (
          <PricingPanel password={password} onAuthExpired={handleAuthExpired} />
        ) : view === "reminder-correction" ? (
          <ReminderRectificationPanel password={password} onAuthExpired={handleAuthExpired} />
        ) : view === "reminder-activity" ? (
          <ReminderActivityPanel password={password} onAuthExpired={handleAuthExpired} />
        ) : view === "email-failures" ? (
          <EmailFailuresPanel password={password} onAuthExpired={handleAuthExpired} />
        ) : view === "notifications" ? (
          <NotificationsPanel
            testModeStatus={testModeStatus}
            togglingTestMode={togglingTestMode}
            onToggleTestMode={handleToggleTestMode}
            customerTestModeStatus={customerTestModeStatus}
            togglingCustomerTestMode={togglingCustomerTestMode}
            onToggleCustomerTestMode={handleToggleCustomerTestMode}
          />
        ) : (
        <>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h2 className="text-xl font-bold text-gray-300">Bookings</h2>
          <div className="flex gap-3">
            {selectedIds.length > 0 && (
              <button
                onClick={handleDeleteSelected}
                disabled={deleting}
                className="bg-red-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-red-700 transition disabled:opacity-50"
              >
                {deleting ? "Deleting..." : `Delete Selected (${selectedIds.length})`}
              </button>
            )}
            <button
              onClick={handleDownloadExcel}
              disabled={downloading}
              className="bg-white text-black px-5 py-2 rounded-full font-semibold hover:bg-gray-200 transition disabled:opacity-50"
            >
              {downloading ? "Preparing..." : "Download Excel"}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => handleStatusTab(tab.value)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                status === tab.value
                  ? "bg-[#00a0db] text-white"
                  : "bg-[#111] text-gray-300 hover:bg-gray-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#00a0db] text-white text-left">
                <th className="p-3">
                  <input
                    type="checkbox"
                    checked={
                      bookings.length > 0 &&
                      bookings.every((b) => selectedIds.includes(b._id))
                    }
                    onChange={toggleSelectAll}
                    className="w-4 h-4"
                  />
                </th>
                <th className="p-3">Sno</th>
                <th className="p-3">Customer Name</th>
                <th className="p-3">Mobile</th>
                <th className="p-3">Email</th>
                <th className="p-3">Vehicle</th>
                <th className="p-3">Service</th>
                <th className="p-3">Time/Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={10} className="p-6 text-center text-gray-400">
                    Loading bookings...
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-6 text-center text-gray-400">
                    No bookings found
                  </td>
                </tr>
              ) : (
                bookings.map((b, index) => (
                  <tr key={b._id} className="border-t border-gray-800">
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(b._id)}
                        onChange={() => toggleSelectOne(b._id)}
                        className="w-4 h-4"
                      />
                    </td>
                    <td className="p-3 whitespace-nowrap">{page * PAGE_SIZE + index + 1}</td>
                    <td className="p-3 whitespace-nowrap">
                      {b.first_name} {b.last_name}
                    </td>
                    <td className="p-3 whitespace-nowrap">{b.phone}</td>
                    <td className="p-3">{b.email}</td>
                    <td className="p-3 whitespace-nowrap">
                      <div>{b.car_type}</div>
                      <div className="text-gray-400">{b.vehicle_registration}</div>
                    </td>
                    <td className="p-3">
                      {Array.isArray(b.services) ? b.services.join(", ") : "-"}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <div>{formatDate(b.booking_date)}</div>
                      <div className="text-gray-400">{b.booking_time}</div>
                    </td>
                    <td className="p-3 whitespace-nowrap capitalize">
                      {b.booking_status === "cancelled" ? "Declined" : b.booking_status}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      {b.booking_status === "pending" ? (
                        <div className="flex gap-2">
                          <button
                            disabled={actioningId === b._id}
                            onClick={() => handleApproveDecline(b, "approved")}
                            className="px-3 py-1 rounded-full bg-green-600 hover:bg-green-700 text-xs font-semibold disabled:opacity-50"
                          >
                            Approve
                          </button>
                          <button
                            disabled={actioningId === b._id}
                            onClick={() => handleApproveDecline(b, "cancelled")}
                            className="px-3 py-1 rounded-full bg-red-600 hover:bg-red-700 text-xs font-semibold disabled:opacity-50"
                          >
                            Decline
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-500 text-xs">-</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-6 text-sm text-gray-400">
          <span>
            Page {page + 1} of {totalPages} ({total} total)
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-4 py-2 rounded-full bg-[#111] hover:bg-gray-800 disabled:opacity-40"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page + 1 >= totalPages}
              className="px-4 py-2 rounded-full bg-[#111] hover:bg-gray-800 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
        </>
        )}
        </div>
      </main>
      <ToastContainer position="top-center" autoClose={2500} />
    </div>
  );
};

export default AdminPanel;
