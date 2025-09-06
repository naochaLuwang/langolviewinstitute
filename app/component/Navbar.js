"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FiHome, FiInfo, FiBookOpen, FiImage, FiCalendar, FiMail } from "react-icons/fi";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-sm py-4 px-6 md:px-12">
            <div className="flex items-center justify-between">
                {/* Logo Section */}
                <div className="flex items-center space-x-2">
                    <span className="text-blue-500 text-2xl">💙</span>
                    <Link href="/">
                        <p className="text-lg w-[280px] md:w-[400px] font-semibold text-gray-800">
                            Langol View Institute of Nursing and Paramedical Sciences
                        </p>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8 text-lg text-gray-600">
                    <Link href="/" className="hover:text-blue-500 transition-colors duration-300">Home</Link>
                    <Link href="/about" className="hover:text-blue-500 transition-colors duration-300">About Us</Link>
                    <Link href="/programs" className="hover:text-blue-500 transition-colors duration-300">Admissions</Link>
                    <Link href="/gallery" className="hover:text-blue-500 transition-colors duration-300">Gallery</Link>
                    <Link href="/news_events" className="hover:text-blue-500 transition-colors duration-300">News & Events</Link>
                    <Link href="/contact" className="hover:text-blue-500 transition-colors duration-300">Contact Us</Link>
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Slide-in Menu */}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-[#A8D5BA] shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Close button inside */}
                <div className="flex justify-end p-4">
                    <button onClick={() => setIsOpen(false)}>
                        <FiX size={28} />
                    </button>
                </div>

                {/* Links */}
                <div className="flex flex-col items-start space-y-6 px-6 text-[#1B4332] font-medium text-lg">
                    <Link
                        href="/"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 hover:text-blue-500"
                    >
                        <FiHome /> Home
                    </Link>

                    <Link
                        href="/about"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 hover:text-blue-500"
                    >
                        <FiInfo /> About Us
                    </Link>

                    <Link
                        href="/programs"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 hover:text-blue-500"
                    >
                        <FiBookOpen /> Admissions
                    </Link>

                    <Link
                        href="/gallery"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 hover:text-blue-500"
                    >
                        <FiImage /> Gallery
                    </Link>

                    <Link
                        href="/news_events"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 hover:text-blue-500"
                    >
                        <FiCalendar /> News & Events
                    </Link>

                    <Link
                        href="/contact"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 hover:text-blue-500"
                    >
                        <FiMail /> Contact Us
                    </Link>
                </div>
            </div>

            {/* Dark Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 bg-opacity-10 z-30"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </nav>
    );
};

export default Navbar;
