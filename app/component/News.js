"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);





const NewsSection = () => {
    const [newsList, setNewsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [galleryItems, setGalleryItems] = useState([]);
    const [isGalleryLoading, setIsGalleryLoading] = useState(true);
    const [galleryError, setGalleryError] = useState(null);


    const fetchGalleryItems = async () => {
        setIsGalleryLoading(true);
        setGalleryError(null);
        try {
            const { data, error } = await supabase
                .from("gallery")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) {
                throw new Error(error.message);
            }
            setGalleryItems(data);
        } catch (err) {
            setGalleryError(`Failed to fetch gallery: ${err.message}`);
            console.error("Gallery fetch error:", err);
        } finally {
            setIsGalleryLoading(false);
        }
    };


    useEffect(() => {
        fetchGalleryItems();
    }, []);


    useEffect(() => {
        async function fetchNews() {
            try {
                const { data, error } = await supabase
                    .from("news")
                    .select("id, title, created_at, description")
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
    return (
        <section className="max-w-7xl mx-auto px-6 pb-12 grid md:grid-cols-2 gap-0">

            {/* News Section */}
            <div className="h-96 overflow-y-scroll pr-2">

                {isLoading ? (
                    <p className="text-center text-gray-500">Loading news...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : newsList.length === 0 ? (
                    <p className="text-center text-gray-500">No news articles found.</p>
                ) : (
                    <div className="space-y-5">
                        {newsList.map((news) => (
                            <div
                                key={news.id}
                                className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition"
                            >
                                <p className="text-xs text-gray-500 font-medium mb-3">
                                    {new Date(news.created_at).toLocaleDateString()}
                                </p>
                                <h3 className="font-semibold text-xl text-gray-800 mb-2">
                                    {news.title}
                                </h3>
                                <p className="text-xs text-gray-500 mb-3">
                                    {news.description || "No description available."}
                                </p>

                                <a
                                    href={`/news_events/${news.id}`} // Link to the full article page
                                    className="inline-block bg-[#1B4332] text-white px-4 py-2 text-sm rounded hover:bg-green-800 transition"
                                >
                                    Read More
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Gallery Section */}
            <div>

                <div className="grid grid-cols-2 gap-4">
                    {galleryItems.map((items, index) => (
                        <div
                            key={index}
                            className="relative w-full h-40 rounded-lg overflow-hidden shadow-md"
                        >
                            <Image
                                src={items.image_url}
                                alt={items.description || "Gallery Image"}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NewsSection;
