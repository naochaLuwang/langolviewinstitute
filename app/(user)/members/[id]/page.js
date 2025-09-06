"use client";
import React, { useEffect, useState } from "react";
import supabase from "../../../lib/supabaseClient";
import { useParams } from "next/navigation";// adjust path if needed

const DoctorProfile = () => {
    const [faculty, setFaculty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        async function fetchFaculty() {
            try {
                const { data, error } = await supabase
                    .from("faculty")
                    .select("*")
                    .eq("id", id)
                    .single();

                if (error) throw error;

                setFaculty(data);
            } catch (err) {
                console.error("Error fetching faculty:", err);
                setError("Failed to load faculty data.");
            } finally {
                setLoading(false);
            }
        }

        fetchFaculty();
    }, []);

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <main className="flex-1 py-12 md:py-20">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                        {/* Doctor Photo & Info */}
                        <div className="flex flex-col space-y-2 items-center md:items-start md:col-span-1">
                            <div
                                className="bg-center bg-no-repeat aspect-square rounded-full w-40 h-40 mb-4 shadow-lg"
                                style={{ backgroundImage: `url('${faculty.image_url}')` }}
                            ></div>
                            <h1 className="text-3xl font-bold text-gray-900 text-center md:text-left">
                                {faculty.name}
                            </h1>
                            <p className="text-lg text-blue-600 font-medium text-center md:text-left">
                                {faculty.designation}
                            </p>

                        </div>

                        {/* Biography & Achievements */}
                        <div className="md:col-span-2 space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">
                                    Message from the {faculty.designation} Desk
                                </h2>
                                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{faculty.message}</p>
                            </div>


                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DoctorProfile;
