"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";

// Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function NewsPage() {
    const [newsList, setNewsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchNews = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase
                .from("news")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setNewsList(data);
        } catch (err) {
            setError(`Failed to fetch news: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this news article?")) return;

        try {
            const { error } = await supabase.from("news").delete().eq("id", id);
            if (error) throw error;

            // Refresh list
            setNewsList(newsList.filter((item) => item.id !== id));
        } catch (err) {
            alert(`Error deleting: ${err.message}`);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-[#1B4332]">News & Events</h1>
                <Link
                    href="/dashboard/news/add"
                    className="inline-flex items-center gap-2 bg-[#1B4332] text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-800 transition"
                >
                    <FiPlus />
                    Add News
                </Link>
            </div>

            {/* Loading / Error / Empty States */}
            {isLoading ? (
                <p className="text-gray-500 text-center">Loading news...</p>
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : newsList.length === 0 ? (
                <p className="text-gray-500 text-center">No news found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {newsList.map((news) => (
                        <div
                            key={news.id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
                        >
                            {/* Image */}
                            {news.file_url ? (
                                <img
                                    src={news.file_url}
                                    alt={news.title}
                                    className="w-full h-40 object-cover"
                                />
                            ) : (
                                <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500">
                                    No Image
                                </div>
                            )}

                            {/* Content */}
                            <div className="p-4 flex-1 flex flex-col">
                                <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                                    {news.title}
                                </h2>
                                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                                    {news.description}
                                </p>

                                {/* Footer */}
                                <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                                    <span>
                                        {new Date(news.created_at).toLocaleDateString("en-IN")}
                                    </span>
                                    <div className="flex gap-3">
                                        {/* Edit */}
                                        <Link
                                            href={`/dashboard/news/edit/${news.id}`}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <FiEdit />
                                        </Link>
                                        {/* Delete */}
                                        <button
                                            onClick={() => handleDelete(news.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
