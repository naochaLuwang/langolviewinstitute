"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { FiX } from "react-icons/fi";


// Initialize Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function GalleryPage() {
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

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this image?")) {
            return;
        }

        try {
            const { error } = await supabase
                .from("gallery")
                .delete()
                .eq("id", id);

            if (error) {
                throw new Error(error.message);
            }

            // Remove the deleted item from the local state
            setGalleryItems(galleryItems.filter(item => item.id !== id));
        } catch (err) {
            console.error("Delete error:", err);
            alert(`Failed to delete image: ${err.message}`);
        }
    };

    useEffect(() => {
        fetchGalleryItems();
    }, []);



    return (
        <main className="max-w-6xl mx-auto px-6 pb-12">


            {/* Gallery Display */}
            <section className="mt-10">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-[#1B4332] mb-6">Gallery</h2>
                    <Link href="/dashboard/gallery/add-new" className="inline-block mb-4 bg-[#1B4332] text-white px-4 py-2 rounded hover:bg-green-800 transition">
                        Add New Image
                    </Link>
                </div>

                {isGalleryLoading ? (
                    <p className="text-gray-500 text-center">Loading gallery...</p>
                ) : galleryError ? (
                    <p className="text-red-500 text-center">{galleryError}</p>
                ) : galleryItems.length === 0 ? (
                    <p className="text-gray-500 text-center">No images in the gallery yet.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {galleryItems.map(item => (
                            <div key={item.id} className="group relative rounded-lg overflow-hidden shadow-lg border border-gray-200">
                                <img
                                    src={item.image_url}
                                    alt={item.description || "Gallery Image"}
                                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                                    >
                                        <FiX />
                                    </button>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <p className="text-sm">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
