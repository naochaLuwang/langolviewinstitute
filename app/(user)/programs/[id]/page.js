"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useParams, useRouter } from "next/navigation";

import Link from "next/link";

// Initialize Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Skeleton loader component
const SkeletonLoader = () => (
    <div className="animate-pulse flex flex-col items-center">
        <div className="h-10 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-6 bg-gray-300 rounded w-1/4 mb-6"></div>
        <div className="space-y-4 w-full">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-11/12"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
    </div>
);

export default function ProgramPage() {
    const [programs, setPrograms] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const router = useRouter();

    useEffect(() => {
        async function fetchProgram() {
            if (!id) return;
            try {
                const { data, error } = await supabase
                    .from("courses")
                    .select("*")
                    .eq("id", id)
                    .single();

                if (error) {
                    throw error;
                }
                if (!data) {
                    router.push("/404"); // Redirect to a 404 page if not found
                    return;
                }
                setPrograms(data);
            } catch (err) {
                console.error("Error fetching news:", err);
                setError("Failed to load news article. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        }
        fetchProgram();
    }, [id, router]);

    if (isLoading) {
        return (
            <main className="p-8 max-w-4xl mx-auto">
                <SkeletonLoader />
            </main>
        );
    }

    if (error) {
        return (
            <main className="p-8 max-w-4xl mx-auto">
                <p className="text-center text-red-500">{error}</p>
            </main>
        );
    }

    if (!programs) {
        return (
            <main className="p-8 max-w-4xl mx-auto">
                <p className="text-center text-gray-500">Program not found.</p>
            </main>
        );
    }



    return (
        <main className="p-8 max-w-6xl  mx-auto">
            <div className="flex space-x-2"><Link href="/">Home</Link><span>/</span><Link href="/news_events">News & Events</Link></div>
            <div className="bg-white p-8 min-h-[80vh] rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-[#1B4332] mb-4">
                    {programs.course_name}
                </h1>

                <p className="text-gray-700 leading-relaxed mb-6">Duration: {programs.duration}</p>
                <p className="text-gray-700 leading-relaxed mb-6">Eligibility: {programs.eligibility}</p>
                <p className="text-gray-700 leading-relaxed mb-6">{programs.description}</p>


                <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">Fees Structure</h3>
                    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-[#A8D5BA]">
                                <tr>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-[#1B4332]  tracking-wider">Regd. Fees (Non-Reundable)</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-[#1B4332]  tracking-wider">One Time Admission Fee per Year</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-[#1B4332]  tracking-wider">Total Installment Fees per Year</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-[#1B4332]  tracking-wider">1st Installment Fees per Year (At the time of Admission)</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-[#1B4332]  tracking-wider">2nd Installment Fees per Year (Within 6 months)</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-4 py-4 whitespace-nowrap text-end text-sm text-gray-900">Rs.{programs.regd_fees}/-</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-end text-gray-900">Rs.{programs.one_time_admission_fee}/-</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-end text-gray-900">Rs.{programs.total_installment_fees_per_year}/-</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-end text-gray-900">Rs.{programs.first_installment_fees_per_year}/-</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-end text-gray-900">Rs.{programs.second_installment_fees_per_year}/-</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>


            </div>
        </main>
    );
}
