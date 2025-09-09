"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import supabase from "../lib/supabaseClient"; // adjust the path
import { FiMenu, FiX, FiHome, FiInfo, FiBookOpen, FiImage, FiCalendar, FiMail } from "react-icons/fi";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [logoUrl, setLogoUrl] = useState("");
    const [orgName, setOrgName] = useState("");

    useEffect(() => {
        const fetchSettings = async () => {
            const { data, error } = await supabase
                .from('site_settings')
                .select('logo_url, org_name')
                .single();

            if (error) {
                console.error("Error fetching site settings:", error);
            } else {
                setLogoUrl(data.logo_url);
                setOrgName(data.org_name);
            }
        };

        fetchSettings();
    }, []);

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-sm py-3 px-4 sm:px-6 lg:px-12">
            <div className="flex items-center justify-between">
                {/* Logo Section */}
                <div className="flex items-center space-x-2">
                    {logoUrl && (
                        <img
                            src={logoUrl}
                            alt="Logo"
                            className="h-10 w-10 lg:h-16 sm:w-16 object-contain"
                        />
                    )}
                    <Link href="/">
                        <p style={{ fontFamily: 'Times New Roman, serif' }}
                            className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 max-w-[200px] sm:max-w-[300px] md:max-w-[400px] ">
                            {orgName}
                        </p>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6 text-sm sm:text-base text-gray-600">
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
                        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Slide-in Menu */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-[#A8D5BA] shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex justify-end p-4">
                    <button onClick={() => setIsOpen(false)}>
                        <FiX size={24} />
                    </button>
                </div>
                <div className="flex flex-col items-start space-y-5 px-6 text-[#1B4332] font-medium text-base">
                    <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 hover:text-blue-500">
                        <FiHome /> Home
                    </Link>
                    <Link href="/about" onClick={() => setIsOpen(false)} className="flex items-center gap-3 hover:text-blue-500">
                        <FiInfo /> About Us
                    </Link>
                    <Link href="/programs" onClick={() => setIsOpen(false)} className="flex items-center gap-3 hover:text-blue-500">
                        <FiBookOpen /> Admissions
                    </Link>
                    <Link href="/gallery" onClick={() => setIsOpen(false)} className="flex items-center gap-3 hover:text-blue-500">
                        <FiImage /> Gallery
                    </Link>
                    <Link href="/news_events" onClick={() => setIsOpen(false)} className="flex items-center gap-3 hover:text-blue-500">
                        <FiCalendar /> News & Events
                    </Link>
                    <Link href="/contact" onClick={() => setIsOpen(false)} className="flex items-center gap-3 hover:text-blue-500">
                        <FiMail /> Contact Us
                    </Link>
                </div>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-30"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </nav>
    );
};

export default Navbar;
