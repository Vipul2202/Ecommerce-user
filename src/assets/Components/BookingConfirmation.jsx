import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
};

const formatTime = (timeStr) => {
  if (!timeStr) return "";
  const [h, m] = timeStr.split(":").map(Number);
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  const ampm = h < 12 ? "AM" : "PM";
  return `${hour12}:${String(m).padStart(2, "0")} ${ampm}`;
};

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const booking = state?.booking;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="bg-white rounded-2xl shadow p-6 sm:p-8 max-w-md w-full text-center">
        <div className="w-14 h-14 rounded-full bg-[#00a0db] flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-xl font-bold text-black mb-2">
          {booking?.first_name ? `Thanks, ${booking.first_name}!` : "Booking Request Received"}
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          {booking?.email
            ? `Our team will confirm your appointment and send you a confirmation shortly on ${booking.email}.`
            : "Our team will confirm your appointment and send you a confirmation shortly on your email address."}
        </p>

        {booking && (
          <div className="text-left bg-gray-50 rounded-xl p-4 mb-6 border border-gray-200">
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Location</span>
                <span className="font-semibold text-black text-right">{booking.location}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Date</span>
                <span className="font-semibold text-black text-right">{formatDate(booking.booking_date)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Time</span>
                <span className="font-semibold text-black text-right">{formatTime(booking.booking_time)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Vehicle</span>
                <span className="font-semibold text-black text-right">{booking.vehicle_registration}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Services</span>
                <span className="font-semibold text-black text-right">{(booking.services || []).join(", ")}</span>
              </div>
            </div>
          </div>
        )}

        <p className="text-xs text-gray-500 mb-3">Need to make a change? Give us a call and we'll help you reschedule or cancel.</p>
        <div className="flex flex-col gap-2">
          <a
            href="tel:0478551640"
            className="bg-[#00a0db] text-white py-2.5 rounded-full font-semibold hover:bg-black transition"
          >
            Call Midland: 0478 551 640
          </a>
          <a
            href="tel:0451288164"
            className="bg-[#00a0db] text-white py-2.5 rounded-full font-semibold hover:bg-black transition"
          >
            Call Myaree: 0451 288 164
          </a>
          <button
            onClick={() => navigate("/")}
            className="border border-gray-300 text-black py-2.5 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
