"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

import { FiEdit, FiDownload } from "react-icons/fi";
import { createClient } from "@supabase/supabase-js";

const Programs = () => {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    const [programs, setPrograms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        async function fetchPrograms() {
            try {
                const { data, error } = await supabase
                    .from("courses")
                    .select("*")
                    .order("created_at", { ascending: true });

                if (error) {
                    throw error;
                }

                setPrograms(data);
            } catch (err) {
                console.error("Error fetching news:", err);
                setError("Failed to load news articles. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        }
        fetchPrograms();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-10 text-[#1B4332] text-center">
                Programs We Offer
            </h1>

            {isLoading ? (
                <div className="text-center text-gray-500">Loading programs...</div>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : programs.length === 0 ? (
                <p className="text-center text-gray-500">No news articles found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">


                    {programs.map((program, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl transition-shadow"
                        >
                            <div>
                                <h2 className="text-lg md:text-xl font-semibold mb-3 text-gray-800">
                                    {program.course_name}
                                </h2>
                                <p className="text-gray-600 text-sm md:text-base">
                                    <span className="font-medium">Duration:</span> {program.duration}
                                </p>
                                <p className="text-gray-600 mt-1 text-sm md:text-base">
                                    <span className="font-medium">Eligibility:</span>{" "}
                                    {program.eligibility}
                                </p>
                            </div>
                            <Link href={`programs/${program.id}`} passHref>
                                <button className="mt-6 w-full bg-[#1B4332] text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-800 transition-colors">
                                    Learn More
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>)}
        </div>
    );
};

export default Programs;
