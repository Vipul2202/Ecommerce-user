import React, { useState } from "react";
import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaFacebookF,
    FaInstagram,
    FaChevronUp,
} from "react-icons/fa";


const Footer = () => {
    const [tooltip, setTooltip] = useState(null);
    const handleClick = (e, id) => {
        e.preventDefault();
        setTooltip(id);
        setTimeout(() => setTooltip(null), 1500); // Hide after 1.5s
    };
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
                            <li><a href="/about" className="hover:text-[#00a0db]">About Us</a></li>
                            <li><a href="/contact" className="hover: hover:text-[#00a0db]">Contact Us</a></li>
                            <li><a href="/washing" className="hover: hover:text-[#00a0db]">Washing Service</a></li>
                            <li><a href="/detailing" className="hover: hover:text-[#00a0db]">Detailing Service</a></li>
                            <li><a href="/ultrapremium" className="hover: hover:text-[#00a0db]">Ultra Premium Services</a></li>
                            <li><a href="/extras" className="hover: hover:text-[#00a0db]">Extras</a></li>

                        </ul>
                    </div>


                    <div>
                        <h2 className="text-2xl font-semibold mb-4 text-[#00a0db]">Useful Links</h2>
                        <ul className="space-y-2 relative">
                            {[
                                { id: 1, label: "Terms of Use" },
                                { id: 2, label: "Privacy Policy" },
                                { id: 3, label: "FAQs" },
                            ].map((link) => (
                                <li key={link.id} className="relative">
                                    <a
                                        href="/#"
                                        onClick={(e) => handleClick(e, link.id)}
                                        className="hover:text-[#00a0db] relative transition-colors duration-300"
                                    >
                                        {link.label}
                                        {tooltip === link.id && (
                                            <span className=" ml-2 px-2 py-1 text-sm bg-black text-white ">
                                                Coming Soon
                                            </span>
                                        )}
                                    </a>
                                </li>
                            ))}
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
