"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FiEdit, FiDownload } from "react-icons/fi";
import { createClient } from "@supabase/supabase-js";

const SkeletonLoader = () => (
    <div className="animate-pulse shadow-lg rounded-lg overflow-hidden flex flex-col h-[75vh]">
        <div className="overflow-y-auto flex-1">
            <table className="min-w-full bg-white table-auto">
                <thead className="bg-gray-200 sticky top-0">
                    <tr>
                        <th className="w-1/2 px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Posted Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            File
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: 10 }).map((_, index) => (
                        <tr key={index} className="border-b border-gray-200">
                            <td className="w-1/2 px-6 py-4 text-sm font-medium text-gray-900">
                                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="h-4 bg-gray-300 rounded w-20"></div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                                <div className="h-4 bg-gray-300 rounded w-24"></div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                                <div className="h-4 bg-gray-300 rounded w-16"></div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                                <div className="h-6 w-6 bg-gray-300 rounded"></div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

// Initialize Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AdminNewsPage() {
    const [newsList, setNewsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    useEffect(() => {
        async function fetchNews() {
            try {
                const { data, error } = await supabase
                    .from("news")
                    .select("id, title, created_at, file_url")
                    .order("created_at", { ascending: false });

                if (error) {
                    throw error;
                }

                setNewsList(data);
            } catch (err) {
                console.error("Error fetching news:", err);
                setError("Failed to load news articles. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        }
        fetchNews();
    }, []);

    const totalPages = Math.ceil(newsList.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentNews = newsList.slice(startIndex, endIndex);

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    return (
        <main className="p-8 max-w-7xl mx-auto">

            <h1 className="text-4xl font-bold text-[#212529] my-5 text-center">News & Events</h1>



            {isLoading ? (
                <SkeletonLoader />
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : newsList.length === 0 ? (
                <p className="text-center text-gray-500">No news articles found.</p>
            ) : (
                <div className="shadow-lg rounded-lg overflow-hidden flex flex-col h-[75vh]">
                    <div className="overflow-y-auto flex-1">
                        <table className="min-w-full bg-white table-auto">
                            <thead className="bg-gray-200 sticky top-0">
                                <tr>
                                    <th className="w-full px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Title
                                    </th>

                                    <th className="px-6  py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Posted Date
                                    </th>
                                    <th className="px-6 w-fit py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        File
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {currentNews.map((news) => (
                                    <tr
                                        key={news.id}
                                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="w-1/2 px-6 py-4 text-sm font-medium text-gray-900">
                                            <Link href={`/news_events/${news.id}`}>{news.title}</Link>
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(news.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {news.file_url ? (
                                                <a
                                                    href={news.file_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[#1B4332] hover:text-green-800 font-semibold flex items-center gap-1"
                                                >
                                                    <FiDownload />
                                                    Download
                                                </a>
                                            ) : (
                                                "-"
                                            )}
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-between items-center p-4 bg-gray-100 border-t border-gray-200">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className="px-4 py-2 text-sm font-semibold rounded-lg bg-white text-gray-700 border border-gray-300 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <span className="text-sm text-gray-700">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 text-sm font-semibold rounded-lg bg-white text-gray-700 border border-gray-300 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
