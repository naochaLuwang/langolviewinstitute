"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiSettings, FiImage, FiBookOpen, FiEdit } from "react-icons/fi";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AdminHomePage() {
    const [news, setNews] = useState([]);
    const [faculty, setFaculty] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchNews() {
            try {
                const { data, error } = await supabase
                    .from("news")
                    .select("*")
                    .order("created_at", { ascending: false });

                if (error) throw error;
                setNews(data);
            } catch (err) {
                console.error("Error fetching news:", err);
                setError("Failed to load news articles.");
            } finally {
                setIsLoading(false);
            }
        }
        fetchNews();
    }, []);

    useEffect(() => {
        async function fetchFaculty() {
            try {
                const { data, error } = await supabase
                    .from("faculty")
                    .select("*")
                    .order("created_at", { ascending: false });

                if (error) throw error;
                setFaculty(data);
            } catch (err) {
                console.error("Error fetching faculty:", err);
                setError("Failed to load faculty members.");
            } finally {
                setIsLoading(false);
            }
        }
        fetchFaculty();
    }, []);

    if (isLoading) {
        return <p className="text-center text-gray-500">Loading ...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    const cards = [
        {
            title: "Settings",
            description: "Manage site settings and preferences.",
            href: "/dashboard/settings",
            icon: <FiSettings className="text-3xl text-[#005A9C]" />,
        },
        {
            title: "Gallery",
            description: "Upload and manage images for the website.",
            href: "/dashboard/gallery",
            icon: <FiImage className="text-3xl text-[#2E8540]" />,
        },
        {
            title: "News & Events",
            description: "Publish and update the latest news and events.",
            href: "/Dashboard/news",
            icon: <FiBookOpen className="text-3xl text-[#495057]" />,
        },
    ];

    return (
        <main className="bg-[#F7F9FC] p-8">
            <h1 className="mb-8 text-3xl font-bold text-[#212529]">Admin Dashboard</h1>

            {/* Top Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {cards.map((card) => (
                    <Link
                        key={card.title}
                        href={card.href}
                        className="group block rounded-xl bg-white p-6 shadow-md transition hover:shadow-lg"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E1E5EA]">
                                {card.icon}
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-[#212529] group-hover:text-[#005A9C]">
                                    {card.title}
                                </h2>
                                <p className="mt-1 text-sm text-[#495057]">{card.description}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* News + Faculty Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
                {/* News Section (takes 2/3) */}
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-medium mb-5 text-[#212529]">News Articles</h2>
                    {news.length === 0 ? (
                        <p className="text-center text-gray-500">
                            No news articles found. Add one to get started!
                        </p>
                    ) : (
                        <div className="overflow-x-auto rounded-xl shadow-md">
                            <table className="min-w-full bg-white border-collapse">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/2">
                                            Title
                                        </th>
                                        <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/6">
                                            Posted Date
                                        </th>
                                        <th className="py-3 px-6 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/6">
                                            Status
                                        </th>
                                        <th className="py-3 px-6 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/12">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {news.map((item) => (
                                        <tr key={item.id} className="border-b last:border-0 hover:bg-gray-50">
                                            <td className="py-4 px-6 text-sm font-medium text-gray-900 w-1/2">
                                                {item.title}
                                            </td>
                                            <td className="py-4 px-6 text-sm text-gray-500 w-1/6">
                                                {new Date(item.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="py-4 px-6 text-sm font-medium text-center w-1/6">
                                                {item.status ? (
                                                    <span className="inline-block rounded-full bg-[#A8D5BA] text-[#1B4332] px-3 py-1 text-xs font-semibold">
                                                        ACTIVE
                                                    </span>
                                                ) : (
                                                    <span className="inline-block rounded-full bg-red-100 text-red-700 px-3 py-1 text-xs font-semibold">
                                                        INACTIVE
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-4 px-6 text-sm text-center w-1/12">
                                                <Link
                                                    href={`/dashboard/news/edit/${item.id}`}
                                                    className="text-gray-500 hover:text-[#005A9C] transition-colors inline-flex items-center justify-center"
                                                >
                                                    <FiEdit size={20} />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Faculty Section (takes 1/3) */}
                <div>
                    <h2 className="text-xl font-medium mb-5 text-[#212529]">Faculty Members</h2>
                    {faculty.length === 0 ? (
                        <p className="text-center text-gray-500">
                            No faculty members found. Add one to get started!
                        </p>
                    ) : (
                        <div className="overflow-x-auto rounded-xl shadow-md">
                            <table className="min-w-full bg-white border-collapse">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/2">
                                            Name
                                        </th>
                                        <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/2">
                                            Designation
                                        </th>
                                        <th className="py-3 px-6 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {faculty.map((item) => (
                                        <tr key={item.id} className="border-b last:border-0 hover:bg-gray-50">
                                            <td className="py-4 px-6 text-sm font-medium text-gray-900">{item.name}</td>
                                            <td className="py-4 px-6 text-sm text-gray-500">{item.designation}</td>
                                            <td className="py-4 px-6 text-sm text-center">
                                                <Link
                                                    href={`/dashboard/faculty/${item.id}`}
                                                    className="text-gray-500 hover:text-[#005A9C] transition-colors inline-flex items-center justify-center"
                                                >
                                                    <FiEdit size={20} />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
