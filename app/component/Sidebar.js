import Link from "next/link";
import {
    FiHome,
    FiSettings,
    FiImage,
    FiFileText,
    FiUsers,
    FiBookOpen,
} from "react-icons/fi";

import SignOutButton from "./SignOutButton";



const navLinks = [
    { name: "Dashboard", href: "/dashboard", icon: <FiHome size={20} /> },
    { name: "Gallery", href: "/dashboard/gallery", icon: <FiImage size={20} /> },
    { name: "News", href: "/dashboard/news", icon: <FiFileText size={20} /> },
    { name: "Members", href: "/dashboard/members", icon: <FiUsers size={20} /> },
    { name: "Courses", href: "/dashboard/courses", icon: <FiBookOpen size={20} /> },
    { name: "Settings", href: "/dashboard/settings", icon: <FiSettings size={20} /> },
];

export default function Sidebar() {
    return (
        <aside className="fixed top-0 left-0 w-64 h-full bg-[#1B4332] text-white p-6 flex flex-col">
            {/* Organization Name */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold">Your Org Name</h2>
            </div>

            {/* Navigation Links */}
            <nav className="flex-grow">
                <ul className="space-y-4">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                className="flex items-center space-x-3 text-lg font-medium hover:bg-green-700 p-2 rounded-lg transition-colors duration-200"
                            >
                                <span>{link.icon}</span>
                                <span>{link.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>


            <SignOutButton></SignOutButton>
        </aside>
    );
}