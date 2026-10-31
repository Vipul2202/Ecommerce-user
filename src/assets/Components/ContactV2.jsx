import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Clock, Phone, Mail, MapPin } from "lucide-react";
import { FaSpinner } from "react-icons/fa";
import { RedesignNav, RedesignFooter } from "./RedesignLayout";
import { useGoogleFont, accent, navy, border, fraunces } from "./redesignTheme";
import Bubble from "./Bubble";

const contactInfo = [
  { id: 1, icon: Clock, title: "Opening Hours", details: ["Mon - Fri, 7:00 - 5:00", "Weekends on Appointment"] },
  { id: 2, icon: Phone, title: "Call Us", details: ["Midland: 0478 551 640", "Myaree: 0451 288 164"] },
  { id: 3, icon: Mail, title: "Email Us", details: ["info@carsaloon.com.au"] },
  { id: 4, icon: MapPin, title: "Locations", details: ["7 Loton Avenue, Midland, 6056", "4/41 McCoy Street, Myaree, 6154"] },
];

const ContactV2 = () => {
  useGoogleFont();
  const formRef = useRef();
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10,15}$/;
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email";
    if (!mobileRegex.test(formData.mobile)) newErrors.mobile = "Invalid mobile number";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim() || formData.message.length < 10) newErrors.message = "Message must be at least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", mobile: "", subject: "", message: "" });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Email sending failed:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 bg-[#f8f6f1] rounded-lg border focus:outline-none ${errors[field] ? "border-red-500" : "border-[#e7e2d8]"}`;

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }} className="bg-[#f8f6f1] text-[#1c2024] min-h-screen flex flex-col">
      <RedesignNav />
      <main className="flex-1">
        <div className="relative px-6 pt-14 pb-10 text-center overflow-hidden">
          <Bubble size={100} top="-15%" left="-4%" opacity={0.1} />
          <Bubble size={60} top="30%" right="6%" opacity={0.1} />
          <span className="relative text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>Get In Touch</span>
          <h1 style={fraunces} className="relative text-3xl sm:text-4xl font-semibold text-[#13242c] mt-3">Contact Us</h1>
        </div>

        <div className="max-w-5xl mx-auto px-6 pb-20 grid lg:grid-cols-[300px_1fr] gap-8">
          <div className="relative rounded-2xl p-7 text-white flex flex-col gap-6 overflow-hidden" style={{ backgroundColor: navy }}>
            <Bubble size={80} top="-15%" right="-10%" opacity={0.1} color="#ffffff" />
            <h3 style={fraunces} className="relative text-xl font-semibold">Quick Contact Info</h3>
            {contactInfo.map((info) => (
              <div key={info.id} className="flex items-start gap-4">
                <div className="bg-white/15 rounded-full p-2.5 shrink-0">
                  <info.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm mb-1">{info.title}</div>
                  {info.details.map((d) => (
                    <p key={d} className="text-xs text-white/80">{d}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8" style={{ border: `1px solid ${border}` }}>
            {submitSuccess && (
              <div className="mb-6 bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-lg text-sm">
                Message sent successfully! We'll get back to you soon.
              </div>
            )}
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Your Name" className={inputClass("name")} />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Your Email" className={inputClass("email")} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="Your Mobile Number" className={inputClass("mobile")} />
                {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
              </div>
              <div>
                <input name="subject" value={formData.subject} onChange={handleInputChange} placeholder="Subject" className={inputClass("subject")} />
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
              </div>
              <div>
                <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Message" rows={4} className={`${inputClass("message")} resize-none`} />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center justify-center gap-2 px-8 py-3 rounded-full font-semibold text-white transition ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                style={{ backgroundColor: navy }}
              >
                {isSubmitting ? (<><FaSpinner className="animate-spin" />Sending...</>) : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </main>
      <RedesignFooter />
    </div>
  );
};

export default ContactV2;
