import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Clock, Phone, Mail, MapPin } from "lucide-react";
import { FaSpinner } from "react-icons/fa";

const ContactUs = () => {
    const formRef = useRef();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        subject: "",
        message: "",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const contactInfo = [
        {
            id: 1,
            icon: <Clock className="w-6 h-6" />,
            title: "Opening Hour",
            details: ["Mon - Fri, 7:00 - 5:00", "Weekends on Appointment"],
        },
        {
            id: 2,
            icon: <Phone className="w-6 h-6" />,
            title: "Call Us",
            details: ["0430170164"],
        },
        {
            id: 3,
            icon: <Mail className="w-6 h-6" />,
            title: "Email Us",
            details: ["info@carsaloon.com.au"],
        },
        {
            id: 4,
            icon: <MapPin className="w-6 h-6" />,
            title: "Location",
            details: ["7 Loton Avenue, Midland, 6056"],
        },
    ];

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileRegex = /^[0-9]{10,15}$/;

        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email";
        if (!mobileRegex.test(formData.mobile)) newErrors.mobile = "Invalid mobile number";
        if (!formData.subject.trim()) newErrors.subject = "Subject is required";
        if (!formData.message.trim() || formData.message.length < 10)
            newErrors.message = "Message must be at least 10 characters";

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
            setFormData({
                name: "",
                email: "",
                mobile: "",
                subject: "",
                message: "",
            });
            setTimeout(() => setSubmitSuccess(false), 5000);
        } catch (error) {
            console.error("Email sending failed:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className=" bg-gray-50">

            <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-4">Contact Us</h1>
                <nav className="text-gray-600">
                    <span className="text-orange-500">Home</span>
                    <span className="mx-2">/</span>
                    <span>Contact</span>
                </nav>
            </div>


            <div className="bg-black py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10">


                    <div className="bg-orange-500 rounded-2xl p-6 text-white max-w-full w-full">
                        <h3 className="text-2xl font-bold mb-8">Quick Contact Info</h3>
                        <div className="space-y-6">
                            {contactInfo.map((info) => (
                                <div key={info.id} className="flex items-start space-x-4">
                                    <div className="bg-white rounded-full p-3 text-orange-500">
                                        {info.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-md mb-1">{info.title}</h4>
                                        {info.details.map((d, i) => (
                                            <p key={i} className="text-sm">{d}</p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                    <div className=" rounded-2xl p-8 lg:p-10 shadow-xl">
                        {submitSuccess && (
                            <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                                Message sent successfully! We'll get back to you soon.
                            </div>
                        )}

                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">

                            <div>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Your Name"
                                    className={`w-full px-4 py-3 bg-white rounded-md border-b-2 focus:outline-none ${errors.name ? "border-red-500" : "border-gray-300"
                                        }`}
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>


                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Your Email"
                                    className={`w-full px-4 py-3 bg-white rounded-md border-b-2 focus:outline-none ${errors.email ? "border-red-500" : "border-gray-300"
                                        }`}
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>


                            <div>
                                <input
                                    type="tel"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleInputChange}
                                    placeholder="Your Mobile Number"
                                    className={`w-full px-4 py-3 bg-white rounded-md border-b-2 focus:outline-none ${errors.mobile ? "border-red-500" : "border-gray-300"
                                        }`}
                                />
                                {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                            </div>


                            <div>
                                <input
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    placeholder="Subject"
                                    className={`w-full px-4 py-3 bg-white rounded-md border-b-2 focus:outline-none ${errors.subject ? "border-red-500" : "border-gray-300"
                                        }`}
                                />
                                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                            </div>


                            <div>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Message"
                                    rows={4}
                                    className={`w-full px-4 py-3 bg-white rounded-md border-b-2 resize-none focus:outline-none ${errors.message ? "border-red-500" : "border-gray-300"
                                        }`}
                                />
                                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-white text-black rounded-full font-semibold rounded-full hover:bg-orange-600 transition transform hover:scale-105 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <FaSpinner className="animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        "Send Message"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
