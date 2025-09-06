"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

// Initialize Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AddCoursePage() {
    const [formData, setFormData] = useState({
        course_name: "",
        duration: "",
        eligibility: "",
        regd_fees: "",
        one_time_admission_fee: "",
        total_installment_fees_per_year: "",
        first_installment_fees_per_year: "",
        second_installment_fees_per_year: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("");

        try {
            const { data, error } = await supabase.from("courses").insert([
                {
                    course_name: formData.course_name,
                    duration: formData.duration,
                    eligibility: formData.eligibility,
                    regd_fees: parseFloat(formData.regd_fees) || 0,
                    one_time_admission_fee: parseFloat(formData.one_time_admission_fee) || 0,
                    total_installment_fees_per_year:
                        parseFloat(formData.total_installment_fees_per_year) || 0,
                    first_installment_fees_per_year:
                        parseFloat(formData.first_installment_fees_per_year) || 0,
                    second_installment_fees_per_year:
                        parseFloat(formData.second_installment_fees_per_year) || 0,
                },
            ]);

            if (error) {
                throw new Error(error.message);
            }

            setMessage("Course added successfully!");
            router.push("/dashboard/courses");
        } catch (err) {
            console.error("Save error:", err);
            setMessage(`Error: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="flex items-center mb-8">
                <Link href="/dashboard/courses" className="text-gray-600 hover:text-gray-800 transition">
                    <FiArrowLeft size={24} />
                </Link>
                <h1 className="text-3xl font-bold text-[#1B4332] ml-4">Add New Course</h1>
            </div>
            {message && (
                <div
                    className={`p-4 mb-4 rounded-lg ${message.startsWith("Error")
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                        }`}
                >
                    {message}
                </div>
            )}
            <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-white p-8 rounded-xl shadow-lg border border-gray-100"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Course Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Course Name
                        </label>
                        <input
                            type="text"
                            name="course_name"
                            value={formData.course_name}
                            onChange={handleChange}
                            placeholder="Enter course name"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>

                    {/* Duration */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Duration
                        </label>
                        <input
                            type="text"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            placeholder="e.g., 4 Years"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>

                    {/* Eligibility */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Eligibility
                        </label>
                        <input
                            type="text"
                            name="eligibility"
                            value={formData.eligibility}
                            onChange={handleChange}
                            placeholder="e.g., 10+2 with Science"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>

                    {/* Fees Section */}
                    <div className="md:col-span-2">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Fees Details</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Regd. Fees
                                </label>
                                <input
                                    type="number"
                                    name="regd_fees"
                                    value={formData.regd_fees}
                                    onChange={handleChange}
                                    placeholder="e.g., 10000"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    One-time Admission Fee
                                </label>
                                <input
                                    type="number"
                                    name="one_time_admission_fee"
                                    value={formData.one_time_admission_fee}
                                    onChange={handleChange}
                                    placeholder="e.g., 20000"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Total Installment Fees per Year
                                </label>
                                <input
                                    type="number"
                                    name="total_installment_fees_per_year"
                                    value={formData.total_installment_fees_per_year}
                                    onChange={handleChange}
                                    placeholder="e.g., 50000"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    1st Installment Fees (at Admission)
                                </label>
                                <input
                                    type="number"
                                    name="first_installment_fees_per_year"
                                    value={formData.first_installment_fees_per_year}
                                    onChange={handleChange}
                                    placeholder="e.g., 25000"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    2nd Installment Fees (within 6 months)
                                </label>
                                <input
                                    type="number"
                                    name="second_installment_fees_per_year"
                                    value={formData.second_installment_fees_per_year}
                                    onChange={handleChange}
                                    placeholder="e.g., 25000"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-[#1B4332] text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Adding Course..." : "Add Course"}
                    </button>
                </div>
            </form>
        </div>
    );
}
