"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";

// Initialize Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function FacultyPage() {
    const [facultyList, setFacultyList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");

    const fetchFaculty = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase
                .from("faculty")
                .select("*")
                .order("created_at", { ascending: false });

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

    const handleDelete = async (id) => {
        const confirmDelete = confirm(
            "Are you sure you want to delete this faculty member?"
        );
        if (!confirmDelete) return;

        try {
            const { error } = await supabase.from("faculty").delete().eq("id", id);

            if (error) throw new Error(error.message);

            setMessage("Faculty member deleted successfully!");
            setFacultyList(facultyList.filter((faculty) => faculty.id !== id));
        } catch (err) {
            console.error("Delete error:", err);
            setMessage(`Error: ${err.message}`);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-[#1B4332]">Faculty Members</h1>
                <Link
                    href="/dashboard/members/add-members"
                    className="inline-flex items-center gap-2 bg-[#1B4332] text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-800 transition"
                >
                    <FiPlus />
                    Add New
                </Link>
            </div>

            {message && (
                <div
                    className={`p-4 mb-6 rounded-lg ${message.startsWith("Error")
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                        }`}
                >
                    {message}
                </div>
            )}

            {isLoading ? (
                <p className="text-gray-500 text-center">Loading faculty list...</p>
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : facultyList.length === 0 ? (
                <p className="text-gray-500 text-center">No faculty members found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {facultyList.map((faculty) => (
                        <div
                            key={faculty.id}
                            className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center relative"
                        >
                            {/* Edit button */}
                            <Link
                                href={`/dashboard/members/edit/${faculty.id}`}
                                className="absolute top-3 right-10 text-gray-500 hover:text-[#1B4332] transition"
                                title="Edit"
                            >
                                <FiEdit size={20} />
                            </Link>

                            {/* Delete button */}
                            <button
                                onClick={() => handleDelete(faculty.id)}
                                className="absolute top-3 right-3 text-gray-500 hover:text-red-600 transition"
                                title="Delete"
                            >
                                <FiTrash2 size={20} />
                            </button>

                            <img
                                src={
                                    faculty.image_url ||
                                    "https://placehold.co/150x150/E2E8F0/1A202C?text=No+Image"
                                }
                                alt={faculty.name}
                                className="w-32 h-32 rounded-full object-cover mb-4"
                            />
                            <h2 className="text-xl font-bold text-gray-800">
                                {faculty.name}
                            </h2>
                            <p className="text-sm text-gray-600 mt-1">
                                {faculty.designation}
                            </p>
                            <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                                {faculty.message}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
