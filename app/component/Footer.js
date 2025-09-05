import Link from "next/link";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="w-full bg-[#A8D5BA] h-96 pt-10 relative">
            <div className="max-w-7xl grid grid-cols-4  mx-auto px-4">
                <div className="col-span-2 flex flex-col space-y-5">
                    <h1 className="font-bold text-lg text-[#1B4332">
                        Langol View Institute of Nursing and Paramedical Sciences
                    </h1>
                    <p className="text-[#2F3E46] line-clamp-4 w-[400px]" >Langol View Institute of Nursing and Paramedical Sciences was established under the banner of Langol View Hospital and Research Institute Pvt. Ltd., a trusted name in healthcare known for its commitment to patient care, clinical excellence, and community service. Built on this strong legacy, the institute aims to bridge the gap between classroom learning and real-world healthcare needs.</p>
                </div>
                <div className="flex flex-col space-y-5">
                    <h1 className="font-bold text-lg text-[#1B4332">Quick Links</h1>
                    <div className="flex flex-col">
                        <Link className="text-[#2F3E46]" href="/">Home</Link>
                        <Link className="text-[#2F3E46]" href="/about">About Us</Link>
                        <Link className="text-[#2F3E46]" href="/admissions">Admissions</Link>
                        <Link className="text-[#2F3E46]" href="/gallery">Gallery</Link>
                        <Link className="text-[#2F3E46]" href="/news">News & Events</Link>
                        <Link className="text-[#2F3E46]" href="/contact">Contact Us</Link>
                    </div>
                </div>

                <div className="flex flex-col space-y-5">
                    <h1 className="font-bold text-lg text-[#1B4332]">Contact Us</h1>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                            <FaPhoneAlt className="text-[#1B4332] text-lg" />
                            <p>6909988995</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaEnvelope className="text-[#1B4332] text-lg" />
                            <p>info.langolviewinstitute@gmail.com</p>
                        </div>
                        <div className="flex items-start space-x-3 ">
                            <FaMapMarkerAlt className="text-[#1B4332] text-lg flex-shrink-0 " />
                            <p>
                                Uripok Bachaspati Leikai, RIMS South Gate, Near Kombirei Keithel,
                                Imphal West, Manipur-795001
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="absolute bottom-0 left-0 w-full h-10 flex items-center justify-center bg-[#90C9AC]">
                <p className="text-sm text-[#1B4332]text-center">
                    © {new Date().getFullYear()} Langol View Institute of Nursing and Paramedical Sciences. All rights reserved. Designed and developed by Luwang Tech.
                </p>
            </div>

        </footer>
    );
};

export default Footer;
