"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useParams, useRouter } from "next/navigation";
import { FiDownload } from "react-icons/fi";
import { FiHome, FiBookOpen, FiChevronRight } from "react-icons/fi";
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

export default function NewsArticlePage() {
    const [news, setNews] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const router = useRouter();

    useEffect(() => {
        async function fetchNews() {
            if (!id) return;
            try {
                const { data, error } = await supabase
                    .from("news")
                    .select("title, description, created_at, file_url")
                    .eq("id", id)
                    .single();

                if (error) {
                    throw error;
                }
                if (!data) {
                    router.push("/404"); // Redirect to a 404 page if not found
                    return;
                }
                setNews(data);
            } catch (err) {
                console.error("Error fetching news:", err);
                setError("Failed to load news article. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        }
        fetchNews();
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

    if (!news) {
        return (
            <main className="p-8 max-w-4xl mx-auto">
                <p className="text-center text-gray-500">Article not found.</p>
            </main>
        );
    }

    const fileExtension = news.file_url ? news.file_url.split('.').pop().toLowerCase() : null;
    const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension);
    const isPdf = fileExtension === 'pdf';

    return (
        <main className="p-8 max-w-6xl  mx-auto">
            <nav className="text-sm text-gray-600 mb-6 flex items-center" aria-label="Breadcrumb">
                <ol className="list-reset flex items-center space-x-2">
                    <li className="flex items-center space-x-1">
                        <FiHome className="text-gray-400" />
                        <Link href="/" className="hover:text-blue-500">Home</Link>
                    </li>
                    <li>
                        <FiChevronRight className="text-gray-400" />
                    </li>
                    <li className="flex items-center space-x-1">
                        <FiBookOpen className="text-gray-400" />
                        <Link href="/news_events" className="hover:text-blue-500">News</Link>
                    </li>
                    <li>
                        <FiChevronRight className="text-gray-400" />
                    </li>
                    <li className="text-gray-500 flex items-center space-x-1">
                        <span>{news.title}</span>
                    </li>
                </ol>
            </nav>
            <div className="bg-white p-8 min-h-[80vh] rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-[#1B4332] mb-4">
                    {news.title}
                </h1>
                <p className="text-gray-500 mb-6">
                    Published on: {new Date(news.created_at).toLocaleDateString()}
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">{news.description}</p>

                {news.file_url && (
                    <div className="mt-4">
                        {isImage && (
                            <div className="mb-4 rounded-lg overflow-hidden shadow-md">
                                <img src={news.file_url} alt="News Image" className="w-full h-auto object-contain" />
                            </div>
                        )}
                        {isPdf && (
                            <div className="mb-4 rounded-lg overflow-hidden shadow-md" style={{ height: "600px" }}>
                                <iframe src={news.file_url} width="100%" height="100%" />
                            </div>
                        )}
                        <a
                            href={news.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#1B4332] text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-800 transition"
                        >
                            <FiDownload />
                            Download File
                        </a>
                    </div>
                )}
            </div>
        </main>
    );
}
