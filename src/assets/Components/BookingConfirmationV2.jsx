import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { RedesignNav, RedesignFooter } from "./RedesignLayout";
import { useGoogleFont, accent, navy, border, fraunces } from "./redesignTheme";
import Bubble from "./Bubble";

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

const BookingConfirmationV2 = () => {
  useGoogleFont();
  const navigate = useNavigate();
  const { state } = useLocation();
  const booking = state?.booking;

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }} className="bg-[#f8f6f1] text-[#1c2024] min-h-screen flex flex-col">
      <RedesignNav />
      <main className="flex-1">
        <div className="relative px-6 pt-14 pb-10 text-center overflow-hidden">
          <Bubble size={100} top="-15%" left="-4%" opacity={0.1} />
          <Bubble size={60} top="30%" right="6%" opacity={0.1} />
          <div className="relative mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: navy }}>
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <span className="relative text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>Booking Request Received</span>
          <h1 style={fraunces} className="relative text-3xl sm:text-4xl font-semibold text-[#13242c] mt-3">
            {booking?.first_name ? `Thanks, ${booking.first_name}!` : "You're All Set!"}
          </h1>
          <p className="relative text-[#6b7278] mt-3 max-w-xl mx-auto text-sm">
            {booking?.email
              ? `Our team will confirm your appointment and send you a confirmation shortly on ${booking.email}.`
              : "Our team will confirm your appointment and send you a confirmation shortly on your email address."}
          </p>
        </div>

        {booking && (
          <div className="max-w-xl mx-auto px-6 pb-16">
            <div
              className="bg-white rounded-2xl p-6"
              style={{ borderTop: `3px solid ${accent}`, borderLeft: `1px solid ${border}`, borderRight: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}
            >
              <h3 style={fraunces} className="text-lg font-semibold text-[#13242c] mb-4">Your Appointment</h3>
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-[#8a8f94]">Location</span>
                  <span className="font-semibold text-[#13242c] text-right">{booking.location}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#8a8f94]">Date</span>
                  <span className="font-semibold text-[#13242c] text-right">{formatDate(booking.booking_date)}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#8a8f94]">Time</span>
                  <span className="font-semibold text-[#13242c] text-right">{formatTime(booking.booking_time)}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#8a8f94]">Vehicle</span>
                  <span className="font-semibold text-[#13242c] text-right">{booking.vehicle_registration}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#8a8f94]">Services</span>
                  <span className="font-semibold text-[#13242c] text-right">{(booking.services || []).join(", ")}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-xl mx-auto px-6 pb-20">
          <div className="rounded-2xl text-center p-10" style={{ backgroundColor: navy }}>
            <h3 style={{ ...fraunces, color: "white" }} className="text-xl font-semibold mb-2">Need to make a change?</h3>
            <p className="text-white/75 mb-6 text-sm">Give us a call and we'll help you reschedule or cancel.</p>
            <div className="flex gap-3 flex-wrap justify-center">
              <a href="tel:0478551640" className="px-6 py-3 rounded-full font-semibold text-sm text-white" style={{ backgroundColor: accent }}>
                Call Midland: 0478 551 640
              </a>
              <a href="tel:0451288164" className="px-6 py-3 rounded-full font-semibold text-sm text-white" style={{ border: "1px solid rgba(255,255,255,0.4)" }}>
                Call Myaree: 0451 288 164
              </a>
              <button
                onClick={() => navigate("/new-home")}
                className="px-6 py-3 rounded-full font-semibold text-sm text-white"
                style={{ border: "1px solid rgba(255,255,255,0.4)" }}
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </main>
      <RedesignFooter />
    </div>
  );
};

export default BookingConfirmationV2;
