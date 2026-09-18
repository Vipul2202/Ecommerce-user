import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

const servicesList = [
  "Outside Only", "Inside & Out", "Premium Wash", "Full Detail", "Signature Detail", "The Works",
  "Ceramic Coating", "Interior Protection Pack", "Windows Tinting", "Paintless Dent Removal",
  "Stage 3 Paint Correction", "Buff and Polish", "Head Light Restoration", "Leather Clean/Seats Steam Clean",
  "Dog Hair Removal", "Bull Bar Polish"
];

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-AU", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
};

const formatTime = (timeStr) => {
  if (!timeStr) return "";
  const [h, m] = timeStr.split(":").map(Number);
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  const ampm = h < 12 ? "AM" : "PM";
  return `${hour12}:${String(m).padStart(2, "0")} ${ampm}`;
};

const ManageBooking = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const initialAction = searchParams.get("action");

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [booking, setBooking] = useState(null);

  // "landing" | "cancel-confirm" | "reschedule" | "cancel-success" | "reschedule-requested"
  const [view, setView] = useState("landing");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [form, setForm] = useState({ date: "", time: "", services: [] });
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    const today = new Date();
    setMinDate(today.toISOString().slice(0, 10));
  }, []);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get(`${API}/user/manage-booking/${id}`);
        const data = res.data.data;
        setBooking(data);
        setForm({
          date: new Date(data.booking_date).toISOString().slice(0, 10),
          time: data.booking_time,
          services: data.services || [],
        });
        if (data.canModify && (initialAction === "cancel" || initialAction === "reschedule")) {
          setView(initialAction === "cancel" ? "cancel-confirm" : "reschedule");
        }
      } catch (err) {
        setLoadError(
          err.response?.data?.message || "We couldn't find this booking. The link may be invalid."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleServiceToggle = (service) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleCancel = async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      await axios.post(`${API}/user/manage-booking/${id}/cancel`);
      setView("cancel-success");
    } catch (err) {
      setSubmitError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReschedule = async () => {
    if (form.services.length === 0) {
      setSubmitError("Please select at least one service.");
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await axios.post(`${API}/user/manage-booking/${id}/reschedule`, form);
      setBooking((prev) => ({
        ...prev,
        ...res.data.data,
        booking_date: form.date,
        booking_time: form.time,
        services: form.services,
      }));
      setView("reschedule-requested");
    } catch (err) {
      const errors = err.response?.data?.errors;
      setSubmitError(errors ? errors.join(" ") : err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading your booking…</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white rounded-2xl shadow p-8 max-w-sm text-center">
          <p className="text-gray-700">{loadError}</p>
        </div>
      </div>
    );
  }

  const BookingSummary = () => (
    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 mb-5">
      <p className="text-lg font-extrabold text-gray-800">{booking.vehicle_registration}</p>
      <div className="text-sm text-gray-600 mt-1 space-y-1">
        <p><span className="text-gray-400">Services:</span> <span className="font-medium text-gray-800">{booking.services.join(", ")}</span></p>
        <p><span className="text-gray-400">Date:</span> <span className="font-medium text-gray-800">{formatDate(booking.booking_date)} · {formatTime(booking.booking_time)}</span></p>
        <p><span className="text-gray-400">Location:</span> <span className="font-medium text-gray-800">{booking.location}</span></p>
      </div>
    </div>
  );

  if (!booking.canModify && (view === "landing" || view === "cancel-confirm" || view === "reschedule")) {
    const isPendingApproval = booking.blockReason === "pending_approval";
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
        <div className="bg-white rounded-2xl shadow p-8 max-w-sm w-full text-center">
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3 text-xl">⏳</div>
          <h2 className="font-bold text-gray-800 mb-1">
            {isPendingApproval ? "Change already requested" : "Too close to your booking"}
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            {booking.blockMessage ||
              "Online changes close 24 hours before your appointment. Please call your location directly to make changes now."}
          </p>
          {!isPendingApproval && booking.locationPhone && (
            <p className="text-sm bg-red-50 text-red-700 rounded-lg py-2 px-3 font-semibold">
              {booking.location} · {booking.locationPhone}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="bg-white rounded-2xl shadow p-6 sm:p-8 max-w-md w-full">
        {view === "landing" && (
          <>
            <h2 className="font-bold text-gray-800 mb-4">Manage your booking</h2>
            <BookingSummary />
            <p className="text-xs bg-amber-50 text-amber-700 rounded-lg p-3 mb-4">
              You can change this booking up until 24 hours before your appointment.
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setView("reschedule")}
                className="bg-[#00a0db] text-white py-2 rounded-full font-semibold hover:bg-black transition"
              >
                Reschedule booking
              </button>
              <button
                onClick={() => setView("cancel-confirm")}
                className="border border-red-300 text-red-600 py-2 rounded-full font-semibold hover:bg-red-50 transition"
              >
                Cancel booking
              </button>
            </div>
          </>
        )}

        {view === "cancel-confirm" && (
          <>
            <h2 className="font-bold text-gray-800 mb-4">Cancel this booking?</h2>
            <BookingSummary />
            <p className="text-sm text-gray-500 mb-5 text-center">
              This can't be undone. You'll need to make a new booking if you change your mind.
            </p>
            {submitError && <p className="text-red-500 text-sm mb-3 text-center">{submitError}</p>}
            <div className="flex flex-col gap-2">
              <button
                onClick={handleCancel}
                disabled={submitting}
                className="border border-red-300 text-red-600 py-2 rounded-full font-semibold hover:bg-red-50 transition disabled:opacity-50"
              >
                {submitting ? "Cancelling…" : "Yes, cancel booking"}
              </button>
              <button
                onClick={() => setView("landing")}
                className="text-gray-500 text-sm py-2"
              >
                Never mind, go back
              </button>
            </div>
          </>
        )}

        {view === "reschedule" && (
          <>
            <h2 className="font-bold text-gray-800 mb-4">Reschedule</h2>
            <div className="space-y-4 mb-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  min={minDate}
                  value={form.date}
                  onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                  className="p-2 text-black rounded w-full border-2 border-gray-300"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Time</label>
                <select
                  value={form.time}
                  onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))}
                  className="p-2 text-black rounded w-full border-2 border-gray-300"
                >
                  <option value="">--Select Time</option>
                  {Array.from({ length: 17 - 7 + 1 }, (_, hourOffset) => {
                    const hour = hourOffset + 7;
                    return [0, 30].map((minute) => {
                      const hour12 = hour % 12 === 0 ? 12 : hour % 12;
                      const ampm = hour < 12 ? "AM" : "PM";
                      const minuteStr = minute.toString().padStart(2, "0");
                      const value = `${hour.toString().padStart(2, "0")}:${minuteStr}`;
                      const label = `${hour12}:${minuteStr} ${ampm}`;
                      return (
                        <option key={value} value={value}>{label}</option>
                      );
                    });
                  }).flat()}
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Services</label>
                <div className="flex flex-wrap gap-2">
                  {servicesList.map((service) => (
                    <button
                      type="button"
                      key={service}
                      onClick={() => handleServiceToggle(service)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition ${
                        form.services.includes(service)
                          ? "bg-[#00a0db] border-[#00a0db] text-white font-semibold"
                          : "border-gray-300 text-gray-600"
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {submitError && <p className="text-red-500 text-sm mb-3 text-center">{submitError}</p>}
            <div className="flex flex-col gap-2">
              <button
                onClick={handleReschedule}
                disabled={submitting}
                className="bg-[#00a0db] text-white py-2 rounded-full font-semibold hover:bg-black transition disabled:opacity-50"
              >
                {submitting ? "Saving…" : "Confirm new time"}
              </button>
              <button
                onClick={() => setView("landing")}
                className="text-gray-500 text-sm py-2"
              >
                Cancel, go back
              </button>
            </div>
          </>
        )}

        {view === "cancel-success" && (
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto mb-3 text-xl">✓</div>
            <h2 className="font-bold text-gray-800 mb-1">Booking cancelled</h2>
            <p className="text-sm text-gray-500">Sorry to see this one go — you're welcome to book again anytime.</p>
          </div>
        )}

        {view === "reschedule-requested" && (
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3 text-xl">⏳</div>
            <h2 className="font-bold text-gray-800 mb-1">Reschedule request sent</h2>
            <p className="text-sm text-gray-500">
              We've asked to move your booking to {formatDate(booking.booking_date)} at {formatTime(booking.booking_time)}. Our team will confirm by email shortly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBooking;
