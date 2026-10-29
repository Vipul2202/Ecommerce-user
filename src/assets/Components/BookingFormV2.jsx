import React, { useMemo, useState } from "react";
import axios from "axios";
import { Check, ChevronUp, ChevronDown } from "lucide-react";
import { RedesignNav, RedesignFooter } from "./RedesignLayout";
import { useGoogleFont, accent, navy, border, fraunces } from "./redesignTheme";
import { TIER_SERVICES, PREMIUM_SERVICES, EXTRA_SERVICES, SERVICE_NOTICES } from "./bookingServicesData";

const API = import.meta.env.VITE_API_BASE_URL;

const ALL_SERVICES = [...TIER_SERVICES, ...PREMIUM_SERVICES, ...EXTRA_SERVICES];

const VEHICLE_TYPES = [
  { key: "sedan", label: "Sedan" },
  { key: "suv", label: "SUV" },
  { key: "fourWd", label: "4WD" },
];

const fmt = (n) => `$${n}`;

const todayStr = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const BookingFormV2 = () => {
  useGoogleFont();
  const minDate = useMemo(() => todayStr(), []);

  const [vehicleType, setVehicleType] = useState("sedan");
  const [selected, setSelected] = useState({});
  const [formData, setFormData] = useState({
    location: "",
    registration: "",
    date: "",
    time: "",
    firstName: "",
    email: "",
    phone: "",
    marketingConsent: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showServiceNoticeModal, setShowServiceNoticeModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [ackValuables, setAckValuables] = useState(false);
  const [ackSoiled, setAckSoiled] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);

  const toggleService = (service) => {
    const nowChecked = !selected[service.key];
    setSelected((prev) => ({ ...prev, [service.key]: nowChecked }));

    const newErrors = { ...errors };
    const willHaveServices = nowChecked || Object.keys(selected).some((k) => k !== service.key && selected[k]);
    if (!willHaveServices) {
      newErrors.services = "Please select at least one service";
    } else {
      delete newErrors.services;
    }
    setErrors(newErrors);

    if (nowChecked && SERVICE_NOTICES[service.key]) {
      setShowServiceNoticeModal(true);
    }
  };

  const lineItems = useMemo(() => {
    const items = [];
    TIER_SERVICES.forEach((t) => {
      if (selected[t.key]) items.push({ key: t.key, label: t.label, submitLabel: t.submitLabel, price: t.pricing[vehicleType] });
    });
    PREMIUM_SERVICES.forEach((p) => {
      if (selected[p.key]) items.push({ key: p.key, label: p.label, submitLabel: p.submitLabel, price: p.price, note: p.note });
    });
    EXTRA_SERVICES.forEach((e) => {
      if (selected[e.key]) items.push({ key: e.key, label: e.label, submitLabel: e.submitLabel, price: e.price });
    });
    return items;
  }, [selected, vehicleType]);

  const total = lineItems.reduce((sum, i) => sum + (i.price || 0), 0);
  const hasQuoteItems = lineItems.some((i) => i.price == null);

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    switch (name) {
      case "firstName":
        if (!value.trim()) newErrors.firstName = "Name is required";
        else if (value.trim().length < 2) newErrors.firstName = "Name must be at least 2 characters";
        else delete newErrors.firstName;
        break;
      case "email":
        if (!value.trim()) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) newErrors.email = "Please enter a valid email address";
        else delete newErrors.email;
        break;
      case "phone":
        if (!value.trim()) newErrors.phone = "Phone number is required";
        else if (value.trim().length < 8) newErrors.phone = "Please enter a valid phone number";
        else delete newErrors.phone;
        break;
      case "registration":
        if (!value.trim()) newErrors.registration = "Vehicle registration is required";
        else if (value.trim().length < 3) newErrors.registration = "Vehicle registration must be at least 3 characters";
        else delete newErrors.registration;
        break;
      case "date":
        if (!value) {
          newErrors.date = "Date is required";
        } else {
          const selectedDate = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (selectedDate < today) newErrors.date = "Please select a future date";
          else delete newErrors.date;
        }
        break;
      case "time": {
        if (!value) {
          newErrors.time = "Time is required";
        } else {
          const [hour, minute] = value.split(":").map(Number);
          const totalMinutes = hour * 60 + minute;
          if (totalMinutes < 7 * 60 || totalMinutes > 17 * 60) newErrors.time = "Please select a time between 07:00 and 17:00";
          else delete newErrors.time;
        }
        break;
      }
      case "location":
        if (!value) newErrors.location = "Please select a location";
        else delete newErrors.location;
        break;
      default:
        break;
    }
    setErrors(newErrors);
    return !newErrors[name];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    if (name === "phone") processedValue = value.replace(/[^\d\s\-()+]/g, "");

    setFormData((prev) => ({ ...prev, [name]: processedValue }));
    if (errors.general) setErrors((prev) => ({ ...prev, general: "" }));
    if (touched[name]) validateField(name, processedValue);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const selectLocation = (loc) => {
    setFormData((prev) => ({ ...prev, location: loc }));
    setTouched((prev) => ({ ...prev, location: true }));
    validateField("location", loc);
  };

  const isFormValid = () => {
    const requiredFields = ["location", "firstName", "email", "phone", "registration", "date", "time"];
    const hasRequiredFields = requiredFields.every((field) => formData[field] && formData[field].toString().trim());
    const hasServices = lineItems.length > 0;
    const hasNoErrors = Object.keys(errors).length === 0;
    return hasRequiredFields && hasServices && hasNoErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allTouched = {};
    Object.keys(formData).forEach((key) => { allTouched[key] = true; });
    setTouched(allTouched);

    let hasErrors = false;
    Object.keys(formData).forEach((key) => {
      const isValid = validateField(key, formData[key]);
      if (!isValid) hasErrors = true;
    });

    if (lineItems.length === 0) {
      setErrors((prev) => ({ ...prev, services: "Please select at least one service" }));
      hasErrors = true;
    }

    if (hasErrors) return;

    setShowConfirmModal(true);
  };

  const confirmAndSubmit = async () => {
    setShowConfirmModal(false);
    await submitBooking();
  };

  const submitBooking = async () => {
    try {
      setIsLoading(true);
      const payload = {
        location: formData.location,
        registration: formData.registration,
        services: lineItems.map((i) => i.submitLabel),
        date: formData.date,
        time: formData.time,
        firstName: formData.firstName,
        email: formData.email,
        phone: formData.phone,
        marketingConsent: formData.marketingConsent,
      };
      const response = await axios.post(`${API}/user/create-booking`, payload);

      if (response.status === 200 || response.status === 201) {
        setFormData({
          location: "",
          registration: "",
          date: "",
          time: "",
          firstName: "",
          email: "",
          phone: "",
          marketingConsent: false,
        });
        setSelected({});
        setErrors({});
        setTouched({});
        setAckValuables(false);
        setAckSoiled(false);
        setShowModal(true);
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        const backendErrors = {};
        error.response.data.errors.forEach((err) => {
          if (err.includes("First name")) backendErrors.firstName = err;
          else if (err.includes("email")) backendErrors.email = err;
          else if (err.includes("phone")) backendErrors.phone = err;
          else if (err.includes("registration")) backendErrors.registration = err;
          else if (err.includes("Date")) backendErrors.date = err;
          else if (err.includes("Time")) backendErrors.time = err;
          else if (err.includes("service")) backendErrors.services = err;
        });
        setErrors((prev) => ({ ...prev, ...backendErrors }));
      } else if (error.response?.data?.message) {
        setErrors((prev) => ({ ...prev, general: error.response.data.message }));
      } else {
        setErrors((prev) => ({ ...prev, general: "Booking failed. Please try again." }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const noticeItems = lineItems.filter((i) => SERVICE_NOTICES[i.key]);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }} className="bg-[#f8f6f1] text-[#1c2024] min-h-screen flex flex-col">
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
            <h2 style={fraunces} className="text-xl font-semibold mb-3 text-[#13242c]">Success</h2>
            <p className="text-sm text-[#52585d]">Your booking has been successfully submitted!</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-5 px-6 py-2.5 rounded-full font-semibold text-sm text-white"
              style={{ backgroundColor: navy }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showServiceNoticeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
            <h2 style={fraunces} className="text-xl font-semibold mb-4 text-center text-[#13242c]">Before You Book</h2>
            <div className="flex flex-col gap-3 mb-6">
              {noticeItems.map((i) => (
                <p key={i.key} className="text-sm text-[#52585d]">
                  <span className="font-semibold text-[#13242c]">{i.label}:</span> {SERVICE_NOTICES[i.key]}
                </p>
              ))}
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => setShowServiceNoticeModal(false)}
                className="px-6 py-2.5 rounded-full font-semibold text-sm text-white"
                style={{ backgroundColor: navy }}
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
            <h2 style={fraunces} className="text-xl font-semibold mb-4 text-center text-[#13242c]">Before You Confirm</h2>
            <div className="flex flex-col gap-4 mb-6">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.marketingConsent}
                  onChange={(e) => setFormData((prev) => ({ ...prev, marketingConsent: e.target.checked }))}
                  className="w-4 h-4 mt-0.5 shrink-0"
                  style={{ accentColor: accent }}
                />
                <span className="text-sm text-[#52585d]">
                  I would like to receive promotional offers and updates from Car Saloon via SMS and email. See our{" "}
                  <a href="/new-promotional-terms" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: accent }}>
                    Offer Terms &amp; Conditions
                  </a>. (Optional)
                </span>
              </label>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={ackValuables}
                  onChange={(e) => setAckValuables(e.target.checked)}
                  className="w-4 h-4 mt-0.5 shrink-0"
                  style={{ accentColor: accent }}
                />
                <span className="text-sm text-[#52585d]">
                  I understand I should remove all valuables from my car. Car Saloon practices safe cleaning and tries not to touch anything but is not responsible for the loss of any personal or valuable item.
                </span>
              </label>
              <label
                className="flex items-start gap-2 cursor-pointer rounded-lg p-3"
                style={{ backgroundColor: "#fdf1de", border: "1px solid #f0d49a" }}
              >
                <input
                  type="checkbox"
                  checked={ackSoiled}
                  onChange={(e) => setAckSoiled(e.target.checked)}
                  className="w-4 h-4 mt-0.5 shrink-0"
                  style={{ accentColor: accent }}
                />
                <span className="text-sm" style={{ color: "#7a4b00" }}>
                  I understand heavily soiled vehicles (mud, sand, pet hair, stains, rubbish or biohazards) will incur an additional <strong>surcharge</strong> depending on the condition. Car Saloon will advise of any additional cost before starting the cleaning.
                </span>
              </label>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={confirmAndSubmit}
                disabled={!ackValuables || !ackSoiled || isLoading}
                className="py-2.5 rounded-full font-semibold text-sm transition-colors"
                style={
                  ackValuables && ackSoiled && !isLoading
                    ? { backgroundColor: navy, color: "#fff" }
                    : { backgroundColor: "#e7e2d8", color: "#9a9fa4" }
                }
              >
                Confirm Booking
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="text-sm py-1.5 text-[#8a8f94]"
              >
                Go back
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
          <div className="w-12 h-12 rounded-full border-4 animate-spin" style={{ borderColor: border, borderTopColor: accent }} />
        </div>
      )}

      <RedesignNav />
      <form onSubmit={handleSubmit} className="flex-1 pb-24 lg:pb-0">
        <div className="px-6 pt-14 pb-10 text-center">
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>Book A Service</span>
          <h1 style={fraunces} className="text-3xl sm:text-4xl font-semibold text-[#13242c] mt-3">Book Now</h1>
          <p className="text-[#6b7278] mt-3 max-w-xl mx-auto text-sm">
            Pick your vehicle type and services to see your estimate update live as you go.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-6 pb-20 grid lg:grid-cols-[1fr_380px] gap-8 items-start">
          {/* LEFT: form */}
          <div className="flex flex-col gap-8">
            {/* Vehicle type */}
            <div className="bg-white rounded-2xl p-6" style={{ border: `1px solid ${border}` }}>
              <div className="text-xs font-bold uppercase tracking-wide text-[#6b7278] mb-3">Step 1 &middot; Vehicle Type *</div>
              <div className="grid grid-cols-3 gap-3">
                {VEHICLE_TYPES.map((v) => (
                  <button
                    key={v.key}
                    type="button"
                    onClick={() => setVehicleType(v.key)}
                    className="rounded-xl py-3 text-sm font-semibold transition-colors"
                    style={
                      vehicleType === v.key
                        ? { backgroundColor: navy, color: "#fff" }
                        : { backgroundColor: "#fff", color: "#4a5056", border: `1px solid ${border}` }
                    }
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-2xl p-6" style={{ border: `1px solid ${border}` }}>
              <div className="text-xs font-bold uppercase tracking-wide text-[#6b7278] mb-3">Select Location *</div>
              <div className="flex gap-3">
                {["Midland", "Myaree"].map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => selectLocation(loc)}
                    className="px-5 py-2 rounded-full text-sm font-semibold transition-colors"
                    style={
                      formData.location === loc
                        ? { backgroundColor: navy, color: "#fff" }
                        : { backgroundColor: "#fff", color: "#4a5056", border: `1px solid ${border}` }
                    }
                  >
                    {loc}
                  </button>
                ))}
              </div>
              {errors.location && touched.location && <p className="text-xs mt-2" style={{ color: "#c23b3b" }}>{errors.location}</p>}
            </div>

            {/* Wash & Detail tiers */}
            <div className="bg-white rounded-2xl p-6" style={{ border: `1px solid ${border}` }}>
              <div className="text-xs font-bold uppercase tracking-wide text-[#6b7278] mb-3">Wash &amp; Detail</div>
              <div className="flex flex-col gap-1">
                {TIER_SERVICES.map((t) => (
                  <label key={t.key} className="flex items-center justify-between gap-3 py-2.5 cursor-pointer" style={{ borderTop: `1px solid ${border}` }}>
                    <span className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={!!selected[t.key]}
                        onChange={() => toggleService(t)}
                        className="w-4 h-4 shrink-0"
                        style={{ accentColor: accent }}
                      />
                      <span className="text-sm">
                        <span className={selected[t.key] ? "font-semibold" : ""} style={selected[t.key] ? { color: navy } : {}}>{t.label}</span>
                        {t.tagline && <span className="block text-xs text-[#8a8f94]">{t.tagline}</span>}
                      </span>
                    </span>
                    <span className="text-sm font-semibold shrink-0" style={{ color: accent }}>{fmt(t.pricing[vehicleType])}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Ultra Premium */}
            <div className="bg-white rounded-2xl p-6" style={{ border: `1px solid ${border}` }}>
              <div className="text-xs font-bold uppercase tracking-wide text-[#6b7278] mb-3">Ultra Premium Finishes</div>
              <div className="flex flex-col gap-1">
                {PREMIUM_SERVICES.map((p) => (
                  <label key={p.key} className="flex items-center justify-between gap-3 py-2.5 cursor-pointer" style={{ borderTop: `1px solid ${border}` }}>
                    <span className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={!!selected[p.key]}
                        onChange={() => toggleService(p)}
                        className="w-4 h-4 shrink-0"
                        style={{ accentColor: accent }}
                      />
                      <span className="text-sm">
                        <span className={selected[p.key] ? "font-semibold" : ""} style={selected[p.key] ? { color: navy } : {}}>{p.label}</span>
                        {p.note && <span className="block text-xs text-[#8a8f94]">{p.note}</span>}
                      </span>
                    </span>
                    <span className="text-sm font-semibold shrink-0" style={{ color: accent }}>
                      {p.price != null ? `From ${fmt(p.price)}` : "Quote in-store"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Extras */}
            <div className="bg-white rounded-2xl p-6" style={{ border: `1px solid ${border}` }}>
              <div className="text-xs font-bold uppercase tracking-wide text-[#6b7278] mb-3">Touch Up Extras</div>
              <div className="flex flex-col gap-1">
                {EXTRA_SERVICES.map((e) => (
                  <label key={e.key} className="flex items-center justify-between gap-3 py-2.5 cursor-pointer" style={{ borderTop: `1px solid ${border}` }}>
                    <span className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={!!selected[e.key]}
                        onChange={() => toggleService(e)}
                        className="w-4 h-4 shrink-0"
                        style={{ accentColor: accent }}
                      />
                      <span className={`text-sm ${selected[e.key] ? "font-semibold" : ""}`} style={selected[e.key] ? { color: navy } : {}}>{e.label}</span>
                    </span>
                    <span className="text-sm font-semibold shrink-0" style={{ color: accent }}>From {fmt(e.price)}</span>
                  </label>
                ))}
              </div>
              {errors.services && <p className="text-xs mt-3" style={{ color: "#c23b3b" }}>{errors.services}</p>}
            </div>

            {/* Vehicle + date/time + contact */}
            <div className="bg-white rounded-2xl p-6 flex flex-col gap-5" style={{ border: `1px solid ${border}` }}>
              <div className="text-xs font-bold uppercase tracking-wide text-[#6b7278]">Your Details</div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Vehicle Registration *</label>
                <input
                  type="text"
                  name="registration"
                  placeholder="Enter vehicle registration"
                  value={formData.registration}
                  onChange={(e) => handleChange({ target: { name: "registration", value: e.target.value.toUpperCase() } })}
                  onBlur={handleBlur}
                  className="w-full rounded-lg px-3 py-2.5 text-sm uppercase placeholder:normal-case"
                  style={{ border: `1px solid ${errors.registration && touched.registration ? "#c23b3b" : border}` }}
                />
                {errors.registration && touched.registration && <p className="text-xs mt-1" style={{ color: "#c23b3b" }}>{errors.registration}</p>}
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    min={minDate}
                    className="w-full rounded-lg px-3 py-2.5 text-sm"
                    style={{ border: `1px solid ${errors.date && touched.date ? "#c23b3b" : border}` }}
                  />
                  {errors.date && touched.date && <p className="text-xs mt-1" style={{ color: "#c23b3b" }}>{errors.date}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Time *</label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full rounded-lg px-3 py-2.5 text-sm"
                    style={{ border: `1px solid ${errors.time && touched.time ? "#c23b3b" : border}` }}
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
                        return <option key={value} value={value}>{label}</option>;
                      });
                    }).flat()}
                  </select>
                  {errors.time && touched.time && <p className="text-xs mt-1" style={{ color: "#c23b3b" }}>{errors.time}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Name *</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full rounded-lg px-3 py-2.5 text-sm"
                  style={{ border: `1px solid ${errors.firstName && touched.firstName ? "#c23b3b" : border}` }}
                />
                {errors.firstName && touched.firstName && <p className="text-xs mt-1" style={{ color: "#c23b3b" }}>{errors.firstName}</p>}
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Email *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full rounded-lg px-3 py-2.5 text-sm"
                    style={{ border: `1px solid ${errors.email && touched.email ? "#c23b3b" : border}` }}
                  />
                  {errors.email && touched.email && <p className="text-xs mt-1" style={{ color: "#c23b3b" }}>{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Mobile Number"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full rounded-lg px-3 py-2.5 text-sm"
                    style={{ border: `1px solid ${errors.phone && touched.phone ? "#c23b3b" : border}` }}
                  />
                  {errors.phone && touched.phone && <p className="text-xs mt-1" style={{ color: "#c23b3b" }}>{errors.phone}</p>}
                </div>
              </div>
              {errors.general && (
                <div className="rounded-lg px-4 py-3 text-sm" style={{ backgroundColor: "#fde8e8", color: "#b23b3b" }}>
                  {errors.general}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: sticky summary (desktop only — mobile uses the fixed bottom bar below) */}
          <div className="hidden lg:block lg:sticky lg:top-24 self-start w-full">
            <div className="bg-white rounded-2xl p-6 flex flex-col gap-4" style={{ border: `1px solid ${border}` }}>
              <h2 style={fraunces} className="text-lg font-semibold text-[#13242c]">Your Estimate</h2>

              {lineItems.length === 0 ? (
                <p className="text-sm text-[#8a8f94]">Select services to see your estimate build up here.</p>
              ) : (
                <div className="flex flex-col gap-2.5">
                  {lineItems.map((i) => (
                    <div key={i.key} className="flex items-start justify-between gap-3 text-sm">
                      <span className="flex items-start gap-2 text-[#4a5056]">
                        <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accent }} />
                        {i.label}
                      </span>
                      <span className="font-semibold shrink-0" style={{ color: i.price == null ? "#b2721c" : navy }}>
                        {i.price != null ? fmt(i.price) : "Quote"}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-4 flex items-center justify-between" style={{ borderTop: `1px solid ${border}` }}>
                <span style={fraunces} className="text-base font-semibold text-[#13242c]">Estimated Minimum Total</span>
                <span style={fraunces} className="text-xl font-semibold" style={{ color: accent }}>{fmt(total)}</span>
              </div>
              {hasQuoteItems && (
                <p className="text-xs text-[#8a8f94] -mt-2">
                  Items marked "Quote" need an in-person look and aren't included in this total.
                </p>
              )}

              <button
                type="submit"
                disabled={!isFormValid() || isLoading}
                className="mt-1 w-full py-3 rounded-full font-semibold text-sm transition-colors"
                style={
                  isFormValid() && !isLoading
                    ? { backgroundColor: navy, color: "#fff" }
                    : { backgroundColor: "#e7e2d8", color: "#9a9fa4" }
                }
              >
                {isLoading ? "Submitting..." : "Book Now"}
              </button>
              <p className="text-[11px] text-[#8a8f94] text-center -mt-2">Final price confirmed in-store.</p>
            </div>
          </div>
        </div>

        {/* Mobile-only sticky estimate bar, fixed to the bottom of the viewport */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40">
          {mobileSummaryOpen && (
            <div
              className="bg-white px-5 pt-4 pb-2 max-h-[60vh] overflow-y-auto"
              style={{ borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}
            >
              {lineItems.length === 0 ? (
                <p className="text-sm text-[#8a8f94] pb-3">Select services to see your estimate build up here.</p>
              ) : (
                <div className="flex flex-col gap-2.5 pb-3">
                  {lineItems.map((i) => (
                    <div key={i.key} className="flex items-start justify-between gap-3 text-sm">
                      <span className="flex items-start gap-2 text-[#4a5056]">
                        <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accent }} />
                        {i.label}
                      </span>
                      <span className="font-semibold shrink-0" style={{ color: i.price == null ? "#b2721c" : navy }}>
                        {i.price != null ? fmt(i.price) : "Quote"}
                      </span>
                    </div>
                  ))}
                  {hasQuoteItems && (
                    <p className="text-xs text-[#8a8f94] pt-1">
                      Items marked "Quote" need an in-person look and aren't included in this total.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
          <div
            className="w-full bg-white px-5 py-3 flex items-center justify-between gap-3"
            style={{ borderTop: mobileSummaryOpen ? "none" : `1px solid ${border}`, boxShadow: "0 -4px 12px rgba(10,59,77,0.08)" }}
          >
            <button
              type="button"
              onClick={() => setMobileSummaryOpen((o) => !o)}
              className="flex items-center gap-1.5 text-left"
            >
              <span style={fraunces} className="text-base font-semibold text-[#13242c]">{fmt(total)}</span>
              <span className="text-xs text-[#8a8f94]">est. min</span>
              {mobileSummaryOpen ? <ChevronDown className="w-4 h-4 text-[#8a8f94]" /> : <ChevronUp className="w-4 h-4 text-[#8a8f94]" />}
            </button>
            <button
              type="submit"
              disabled={!isFormValid() || isLoading}
              className="px-6 py-2.5 rounded-full font-semibold text-sm shrink-0 transition-colors"
              style={
                isFormValid() && !isLoading
                  ? { backgroundColor: navy, color: "#fff" }
                  : { backgroundColor: "#e7e2d8", color: "#9a9fa4" }
              }
            >
              {isLoading ? "..." : "Book Now"}
            </button>
          </div>
        </div>
      </form>

      <RedesignFooter />
    </div>
  );
};

export default BookingFormV2;
