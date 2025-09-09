import Link from "next/link";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { FiShield } from "react-icons/fi";

const Footer = () => {
    return (
        <footer className="w-full bg-[#A8D5BA] pt-10 relative">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-y-12 pb-16">
                {/* Institute Info Section */}
                <div className="col-span-1 lg:col-span-2 flex flex-col space-y-5">
                    <h1 className="font-bold text-lg text-[#1B4332]">
                        Langol View Institute of Nursing and Paramedical Sciences
                    </h1>
                    <p className="text-[#2F3E46] leading-relaxed max-w-sm">
                        Langol View Institute of Nursing and Paramedical Sciences was established under the banner of Langol View Hospital and Research Institute Pvt. Ltd., a trusted name in healthcare known for its commitment to patient care, clinical excellence, and community service. Built on this strong legacy, the institute aims to bridge the gap between classroom learning and real-world healthcare needs.
                    </p>
                </div>

                {/* Quick Links Section */}
                <div className="flex flex-col space-y-5">
                    <h1 className="font-bold text-lg text-[#1B4332]">Quick Links</h1>
                    <div className="flex flex-col space-y-2">
                        <Link className="text-[#2F3E46] hover:text-[#1B4332] transition-colors duration-300" href="/">Home</Link>
                        <Link className="text-[#2F3E46] hover:text-[#1B4332] transition-colors duration-300" href="/about">About Us</Link>
                        <Link className="text-[#2F3E46] hover:text-[#1B4332] transition-colors duration-300" href="/admissions">Admissions</Link>
                        <Link className="text-[#2F3E46] hover:text-[#1B4332] transition-colors duration-300" href="/gallery">Gallery</Link>
                        <Link className="text-[#2F3E46] hover:text-[#1B4332] transition-colors duration-300" href="/news">News & Events</Link>
                        <Link className="text-[#2F3E46] hover:text-[#1B4332] transition-colors duration-300" href="/contact">Contact Us</Link>

                        <Link className="text-[#2F3E46] hover:text-[#1B4332] transition-colors duration-300" href="/guidelines">Guidelines & Committee</Link>
                    </div>
                </div>

                {/* Contact Us Section */}
                <div className="flex flex-col space-y-5">
                    <h1 className="font-bold text-lg text-[#1B4332]">Contact Us</h1>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                            <FaPhoneAlt className="text-[#1B4332] text-lg" />
                            <p className="text-[#2F3E46]">6909988995</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaEnvelope className="text-[#1B4332] text-lg" />
                            <p className="text-[#2F3E46]">info.langolviewinstitute@gmail.com</p>
                        </div>
                        <div className="flex items-start space-x-3">
                            <FaMapMarkerAlt className="text-[#1B4332] text-lg flex-shrink-0 mt-1" />
                            <p className="text-[#2F3E46]">
                                Uripok Bachaspati Leikai, RIMS South Gate, Near Kombirei Keithel,
                                Imphal West, Manipur-795001
                            </p>
                        </div>

                        <div className="p-4  flex justify-end space-x-0">
                            <FiShield className="text-green-600 text-xl" />
                            <Link href="/sign-in" className="text-sm font-medium text-gray-700 hover:text-green-600">
                                Admin Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="w-full h-16 md:h-10 flex items-center justify-center bg-[#90C9AC] absolute bottom-0">
                <p className="text-sm text-[#1B4332] text-center px-4">
                    © {new Date().getFullYear()} Langol View Institute of Nursing and Paramedical Sciences. All rights reserved. Designed and developed by Luwang Tech.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
