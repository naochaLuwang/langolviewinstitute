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
    const [selectedImage, setSelectedImage] = useState(null);

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

    const handleImageClick = (item) => {
        setSelectedImage(item);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    useEffect(() => {
        fetchGalleryItems();
    }, []);



    return (
        <main className="max-w-6xl mx-auto min-h-[86vh] px-6 pb-12">


            {/* Gallery Display */}
            <section className="mt-10">
                <div className="flex flex-col max-w-3xl mx-auto space-y-2 items-center mb-6">
                    <h2 className="text-3xl font-bold text-[#1B4332] mb-6">Photo Gallery</h2>
                    <p className="text-sm w-[500px] tracking-wider text-center">Explore moments from our campus, events, community. Click on any image to view it in full size</p>

                </div>

                {isGalleryLoading ? (
                    <p className="text-gray-500 text-center">Loading gallery...</p>
                ) : galleryError ? (
                    <p className="text-red-500 text-center">{galleryError}</p>
                ) : galleryItems.length === 0 ? (
                    <p className="text-gray-500 text-center">No images in the gallery yet.</p>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {galleryItems.map(item => (
                            <div key={item.id} className="relative rounded-lg overflow-hidden cursor-pointer" onClick={() => handleImageClick(item)}>
                                <div className="w-full pb-[100%] relative">
                                    <img
                                        src={item.image_url}
                                        alt={item.description || "Gallery Image"}
                                        className="absolute h-full w-full object-cover rounded-lg"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Modal for full-size image */}
            {selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
                    <div className="relative max-w-4xl max-h-full">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200"
                        >
                            <FiX size={32} />
                        </button>
                        <img
                            src={selectedImage.image_url}
                            alt={selectedImage.description || "Full size image"}
                            className="max-w-full max-h-[80vh] rounded-lg shadow-xl"
                        />
                        {selectedImage.description && (
                            <div className="mt-4 text-white text-center">
                                <p>{selectedImage.description}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </main>
    );
}
