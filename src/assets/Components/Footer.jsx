import React from "react";
import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaFacebookF,
    FaInstagram,
    FaChevronUp,
} from "react-icons/fa";

const Footer = () => {
    return (
        <div className="bg-black text-white pt-10  mx-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                    {/* Contact Info */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-4 text-[#00a0db]">Get In Touch</h2>
                        <p className="flex items-center mb-2">
                            <FaMapMarkerAlt className="mr-2" />
                            7 Loton Avenue, Midland, 6056
                        </p>
                        <p className="flex items-center mb-2">
                            <FaPhoneAlt className="mr-2" />
                            0430 170 164
                        </p>
                        <p className="flex items-center mb-4">
                            <FaEnvelope className="mr-2" />
                            info@carsaloon.com.au
                        </p>
                        <div className="flex space-x-3">
                            <a
                                href="#"
                                className="p-2 bg-white rounded-full  transition-colors duration-300 hover:bg-[#00a0db]"
                            >
                                <FaFacebookF className="text-black " />
                            </a>
                            <a
                                href="#"
                                className="p-2 bg-white rounded-full hover:bg-[#00a0db] transition-colors duration-300"
                            >
                                <FaInstagram className="text-black hover:text-white" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4 text-[#00a0db]">Popular Links</h2>
                        <ul className="space-y-2">
                            <li><a href="/about" className="hover:underline">About Us</a></li>
                            <li><a href="/contact" className="hover:underline hover:text-blue-400">Contact Us</a></li>
                            <li><a href="/washing" className="hover:underline">Washing Service</a></li>
                            <li><a href="/detailing" className="hover:underline">Detailing Service</a></li>
                            <li><a href="/ultrapremium" className="hover:underline">Ultra Premium Services</a></li>
                            <li><a href="/extras" className="hover:underline">Extras</a></li>
                        </ul>
                    </div>

                   
                    <div>
                        <h2 className="text-2xl font-semibold mb-4 text-[#00a0db]">Useful Links</h2>
                        <ul className="space-y-2">
                            <li><a href="/terms_use" className="hover:underline">Terms of Use</a></li>
                            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
                            <li><a href="/faq" className="hover:underline">FAQs</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
                    <p>
                        &copy; <a href="#" className="text-[#00a0db] hover:underline">© carsaloon.com.au</a>, All Rights Reserved.
                    </p>
                </div>
            </div>

      
            <button
                onClick={() =>
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    })
                }
                className="fixed bottom-4 right-4 bg-[#00a0db] p-3 rounded-full text-white shadow-lg hover:bg-white hover:text-black"
                title="Back to top"
            >
                <FaChevronUp />
            </button>

        </div>
    );
};

export default Footer;
