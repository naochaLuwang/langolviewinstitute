"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";

// Initialize Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

import Image from "next/image";



export default function Leadership() {
    const [facultyList, setFacultyList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFaculty = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase
                .from("faculty")
                .select("*")
                .order("created_at", { ascending: true });

            if (error) {
                throw new Error(error.message);
            }
            setFacultyList(data);
        } catch (err) {
            setError(`Failed to fetch faculty: ${err.message}`);
            console.error("Faculty fetch error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchFaculty();
    }, []);
    return (
        <main className="flex-1 bg-secondary">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                {/* Heading */}
                <div className="text-center mb-12">
                    <h1 className="font-roboto text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                        Leadership &amp; Management
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-secondary">
                        Meet the dedicated team guiding our institute towards excellence in
                        healthcare and education.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {facultyList.map((member, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col items-center text-center bg-white rounded-lg shadow-md p-6 transition-transform transform hover:-translate-y-2"
                        >
                            {/* Avatar */}
                            <div className="relative w-36 h-36 mb-4">
                                <Image
                                    src="/placeholder.jpg" // ✅ replace with real image later
                                    alt={member.name}
                                    fill
                                    className="rounded-full border-4 border-white shadow-lg object-cover"
                                    sizes="(max-width: 768px) 100vw, 200px"
                                />
                            </div>
                            <h3 className=" text-lg font-medium text-primary">
                                {member.name}
                            </h3>
                            <p className="text-base text-primary font-base">
                                {member.designation}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
