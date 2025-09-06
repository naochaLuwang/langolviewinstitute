"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { FiX } from "react-icons/fi";
import Image from "next/image";

// Initialize Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function GalleryPage() {
    const [galleryItems, setGalleryItems] = useState([]);
    const [isGalleryLoading, setIsGalleryLoading] = useState(true);
    const [galleryError, setGalleryError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const fetchGalleryItems = async () => {
        setIsGalleryLoading(true);
        setGalleryError(null);
        try {
            const { data, error } = await supabase
                .from("gallery")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw new Error(error.message);
            setGalleryItems(data);
        } catch (err) {
            setGalleryError(`Failed to fetch gallery: ${err.message}`);
            console.error("Gallery fetch error:", err);
        } finally {
            setIsGalleryLoading(false);
        }
    };

    const handleImageClick = (item) => setSelectedImage(item);
    const closeModal = () => setSelectedImage(null);

    useEffect(() => {
        fetchGalleryItems();
    }, []);

    // Skeleton loader component
    const SkeletonCard = () => (
        <div className="w-full pb-[100%] bg-gray-300 rounded-lg animate-pulse" />
    );

    return (
        <main className="max-w-7xl mx-auto min-h-[86vh] px-4 sm:px-6 lg:px-8 pb-12">
            {/* Gallery Header */}
            <section className="mt-10">
                <div className="flex flex-col max-w-2xl mx-auto space-y-4 items-center mb-6 px-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#1B4332] text-center">
                        Photo Gallery
                    </h2>
                    <p className="text-sm sm:text-base tracking-wide text-center text-gray-600">
                        Explore moments from our campus, events, and community. Click on any
                        image to view it in full size.
                    </p>
                </div>

                {/* Gallery Display */}
                {isGalleryLoading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                        {Array.from({ length: 10 }).map((_, idx) => (
                            <SkeletonCard key={idx} />
                        ))}
                    </div>
                ) : galleryError ? (
                    <p className="text-red-500 text-center">{galleryError}</p>
                ) : galleryItems.length === 0 ? (
                    <p className="text-gray-500 text-center">No images in the gallery yet.</p>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                        {galleryItems.map((item) => (
                            <div
                                key={item.id}
                                className="relative rounded-lg overflow-hidden cursor-pointer group"
                                onClick={() => handleImageClick(item)}
                            >
                                <div className="w-full pb-[100%] relative">
                                    <Image
                                        src={item.image_url}
                                        alt={item.description || "Gallery Image"}
                                        fill
                                        className="object-cover rounded-lg transform transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Modal for full-size image */}
            {selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
                    <div className="relative w-full max-w-5xl mx-auto">
                        <button
                            onClick={closeModal}
                            className="absolute top-3 right-3 text-white hover:text-gray-300 transition"
                        >
                            <FiX size={32} />
                        </button>
                        <div className="relative w-full h-[80vh]">
                            <Image
                                src={selectedImage.image_url}
                                alt={selectedImage.description || "Full size image"}
                                fill
                                className="object-contain rounded-lg shadow-xl"
                            />
                        </div>
                        {selectedImage.description && (
                            <div className="mt-4 text-white text-center px-2">
                                <p className="text-sm sm:text-base">{selectedImage.description}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </main>
    );
}
