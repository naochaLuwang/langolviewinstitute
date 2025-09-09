"use client";
import React, { useEffect, useState } from "react";
import supabase from "../../../lib/supabaseClient";
import { useParams } from "next/navigation";
import Image from "next/image";

const DoctorProfile = () => {
    const [faculty, setFaculty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        if (!id) return; // Don't run until id is available

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
    }, [id]);


    if (loading) {
        // Skeleton Loader
        return (
            <div className="flex flex-col min-h-screen bg-gray-50">
                <main className="flex-1 py-12 md:py-20">
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                            <div className="flex flex-col space-y-4 items-center md:items-start md:col-span-1">
                                <div className="w-40 h-48 bg-gray-300 animate-pulse rounded-lg"></div>
                                <div className="w-32 h-6 bg-gray-300 animate-pulse rounded"></div>
                                <div className="w-24 h-4 bg-gray-300 animate-pulse rounded"></div>
                            </div>
                            <div className="md:col-span-2 space-y-6">
                                <div className="w-full h-6 bg-gray-300 animate-pulse rounded"></div>
                                <div className="space-y-2">
                                    <div className="w-full h-4 bg-gray-300 animate-pulse rounded"></div>
                                    <div className="w-full h-4 bg-gray-300 animate-pulse rounded"></div>
                                    <div className="w-3/4 h-4 bg-gray-300 animate-pulse rounded"></div>
                                </div>
                                <div className="flex justify-end space-y-2">
                                    <div className="w-48 h-10 bg-gray-300 animate-pulse rounded"></div>
                                    <div className="w-32 h-4 bg-gray-300 animate-pulse rounded"></div>
                                    <div className="w-64 h-4 bg-gray-300 animate-pulse rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    if (error) {
        return <p className="text-center mt-10 text-red-500">{error}</p>;
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <main className="flex-1 py-12 md:py-20">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                        {/* Doctor Photo & Info */}
                        <div className="flex flex-col space-y-2 items-center md:items-start md:col-span-1">
                            <div className="w-40 h-48 mb-4 rounded-lg overflow-hidden shadow-lg">
                                <Image
                                    src={faculty.image_url}
                                    alt={faculty.name}
                                    width={200}
                                    height={240}
                                    className="object-cover w-full h-full"
                                />
                            </div>
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
                                <p className="text-gray-600 leading-relaxed text-justify whitespace-pre-line">{faculty.message}</p>
                            </div>

                            <div className="flex flex-col items-end">
                                <Image
                                    src={faculty.signature_url}
                                    alt="Signature"
                                    width={200}
                                    height={100}
                                    className="object-contain"
                                />
                                <p>{faculty.name}</p>
                                <p>{faculty.designation}</p>
                                <p>Langol View Institute of Nursing and Paramedical Science</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DoctorProfile;
