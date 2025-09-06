"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { FiEdit, FiPlus } from "react-icons/fi";


// Initialize Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function CoursesPage() {
    const [courseItems, setCourseItems] = useState([]);
    const [isCoursesLoading, setIsCoursesLoading] = useState(true);
    const [coursesError, setCoursesError] = useState(null);

    const fetchCourses = async () => {
        setIsCoursesLoading(true);
        setCoursesError(null);
        try {
            const { data, error } = await supabase
                .from("courses")
                .select("*")
                .order("course_name", { ascending: true });

            if (error) {
                throw new Error(error.message);
            }
            setCourseItems(data);
        } catch (err) {
            setCoursesError(`Failed to fetch courses: ${err.message}`);
            console.error("Courses fetch error:", err);
        } finally {
            setIsCoursesLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <main className="max-w-7xl mx-auto min-h-[86vh] px-6 pb-12">
            {/* Courses Display */}
            <section className="mt-10">

                <h2 className="text-5xl font-bold text-center mb-10 text-[#1B4332]">Courses</h2>



                {isCoursesLoading ? (
                    <p className="text-gray-500 text-center">Loading courses...</p>
                ) : coursesError ? (
                    <p className="text-red-500 text-center">{coursesError}</p>
                ) : courseItems.length === 0 ? (
                    <p className="text-gray-500 text-center">No courses found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courseItems.map(course => (
                            <div key={course.id} className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl transition-shadow">
                                <div>
                                    <h3 className="text-xl font-semibold mb-3 text-gray-800">
                                        {course.course_name}
                                    </h3>
                                    <p className="text-gray-600">
                                        <span className="font-medium">Duration:</span> {course.duration}
                                    </p>
                                    <p className="text-gray-600 mt-1">
                                        <span className="font-medium">Eligibility:</span>{" "}
                                        {course.eligibility}
                                    </p>

                                </div>
                                <div className="mt-6">
                                    <Link href={`/programs/${course.id}`} className="w-full inline-flex items-center justify-center gap-2 bg-[#1B4332] text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-800 transition-colors">
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
