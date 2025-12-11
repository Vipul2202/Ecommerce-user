import React from "react";
import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaFacebookF,
    FaInstagram,
    FaChevronUp,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
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
                            <FaMapMarkerAlt className="mr-2" />
                            4/41 McCoy Street, Myaree, 6154
                           
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
                                href="https://www.facebook.com/p/Carsaloon-Perth-100075514525242/"
                                className="p-2 bg-white rounded-full hover:bg-[#00a0db] transition-colors duration-300"
                            >
                                <FaFacebookF className="text-black " />
                            </a>
                            
                            <a
                                href="https://www.instagram.com/carsaloon_perth"
                                className="p-2 bg-white rounded-full hover:bg-[#00a0db] transition-colors duration-300"
                            >
                                <FaInstagram className="text-black hover:text-white" />
                            </a>
                            
                        </div>
                    </div>

                    {/* Popular Links */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-4 text-[#00a0db]">Popular Links</h2>
                        <ul className="space-y-2">
                            <li><a href="/about" className="hover:text-[#00a0db]">About Us</a></li>
                            <li><a href="/contact" className="hover:text-[#00a0db]">Contact Us</a></li>
                            <li><a href="/washing" className="hover:text-[#00a0db]">Washing Service</a></li>
                            <li><a href="/detailing" className="hover:text-[#00a0db]">Detailing Service</a></li>
                            <li><a href="/ultrapremium" className="hover:text-[#00a0db]">Ultra Premium Services</a></li>
                            <li><a href="/extras" className="hover:text-[#00a0db]">Extras</a></li>
                        </ul>
                    </div>

                    {/* Useful Links */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-4 text-[#00a0db]">Useful Links</h2>
                        <ul className="space-y-2">
                            <li>
                                <button
                                    onClick={() => handleNavigation("/terms")}
                                    className="hover:text-[#00a0db] transition-colors duration-300"
                                >
                                    Terms of Use
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleNavigation("/privacy")}
                                    className="hover:text-[#00a0db] transition-colors duration-300"
                                >
                                    Privacy Policy
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleNavigation("/faqs")}
                                    className="hover:text-[#00a0db] transition-colors duration-300"
                                >
                                    FAQs
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Footer bottom */}
                <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
                    <p>
                        &copy; <a href="#" className="text-[#00a0db] hover:underline"> carsaloon.com.au</a>, All Rights Reserved.
                    </p>
                </div>
            </div>

            {/* Back to Top Button */}
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
