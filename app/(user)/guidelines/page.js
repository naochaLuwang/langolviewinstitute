// app/guidelines/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import {
    MdSchedule,
    MdRuleFolder,
    MdVerifiedUser,
    MdHandshake,
    MdSupportAgent,
    MdExpandMore,
} from "react-icons/md";

export default function GuidelinesPage() {
    const policies = [
        {
            icon: <MdSchedule className="text-[#3498db] text-2xl" />,
            title: "Attendance Policy",
            desc: "Students are expected to maintain a minimum attendance of 75% in all courses. Absences due to medical reasons must be supported by a valid medical certificate.",
        },
        {
            icon: <MdRuleFolder className="text-[#3498db] text-2xl" />,
            title: "Code of Conduct",
            desc: "All members of the institute are expected to adhere to the highest standards of professional and personal conduct, fostering a respectful and inclusive environment.",
        },
        {
            icon: <MdVerifiedUser className="text-[#3498db] text-2xl" />,
            title: "Academic Integrity",
            desc: "Plagiarism, cheating, and any form of academic dishonesty are strictly prohibited and will result in disciplinary action.",
        },
        {
            icon: <MdHandshake className="text-[#3498db] text-2xl" />,
            title: "Respectful Workplace",
            desc: "The institute is committed to providing a work environment free from discrimination, harassment, and bullying.",
        },
        {
            icon: <MdSupportAgent className="text-[#3498db] text-2xl" />,
            title: "Grievance Redressal",
            desc: "A formal process is in place for students and staff to address any grievances. Contact details for the committees are provided below.",
        },
    ];

    const committees = [
        {
            committee: "Anti-Ragging Committee",
            members: "",
            email: "",
        },
        {
            committee: "Student Welfare Committee",
            members: "",
            email: "",
        },
        {
            committee: "Grievance Redressal Committee",
            members: "",
            email: "",
        },
    ];

    return (
        <div
            className="relative flex min-h-screen flex-col bg-gray-50 overflow-x-hidden"
            style={{
                fontFamily: '"Roboto", "Lato", "Open Sans", sans-serif',
            }}
        >
            {/* Main */}
            <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-gray-800 text-4xl font-bold text-center tracking-tight mb-12">
                        Guidelines &amp; Policies
                    </h1>

                    {/* Policies */}
                    <div className="space-y-4">
                        {policies.map(({ icon, title, desc }) => (
                            <details
                                key={title}
                                className="group rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-[#3498db]"
                            >
                                <summary className="flex cursor-pointer items-center justify-between gap-6 p-6">
                                    <div className="flex items-center gap-4">
                                        {icon}
                                        <p className="text-gray-800 text-lg font-medium">{title}</p>
                                    </div>
                                    <MdExpandMore className="text-gray-500 text-2xl transition-transform duration-300 group-open:rotate-180" />
                                </summary>
                                <div className="border-t border-gray-200 px-6 pb-6 pt-4">
                                    <p className="text-gray-600 text-base">{desc}</p>
                                </div>
                            </details>
                        ))}
                    </div>

                    {/* Committees */}
                    <h2 className="text-gray-800 text-3xl font-bold tracking-tight mt-16 mb-8">
                        Committees
                    </h2>
                    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-gray-600 font-bold text-sm uppercase">
                                        Committee
                                    </th>
                                    <th className="px-6 py-4 text-gray-600 font-bold text-sm uppercase">
                                        Members
                                    </th>
                                    <th className="px-6 py-4 text-gray-600 font-bold text-sm uppercase">
                                        Contact for Grievance Support
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {committees.map(({ committee, members, email }) => (
                                    <tr key={committee}>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
                                            {committee}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{members}</td>
                                        <td className="px-6 py-4">
                                            <a
                                                href={`mailto:${email}`}
                                                className="text-[#3498db] hover:text-[#2980b9] hover:underline"
                                            >
                                                {email}
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
