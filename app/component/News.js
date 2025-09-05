"use client";
import Image from "next/image";

const mockNews = [
    {
        id: 1,
        title: "Orientation Program for New Batch",
        date: "Sept 1, 2025",
        link: "#",
    },
    {
        id: 2,
        title: "Guest Lecture on Modern Nursing Practices",
        date: "Aug 25, 2025",
        link: "#",
    },
    {
        id: 3,
        title: "Health Awareness Camp Organized",
        date: "Aug 15, 2025",
        link: "#",
    },
    {
        id: 4,
        title: "Annual Cultural Fest Announced",
        date: "Aug 1, 2025",
        link: "#",
    },
];

const galleryImages = [
    "https://source.unsplash.com/400x400/?nurse,hospital",
    "https://source.unsplash.com/400x400/?medical,students",
    "https://source.unsplash.com/400x400/?nursing,classroom",
    "https://source.unsplash.com/400x400/?doctor,health",
];

const NewsSection = () => {
    return (
        <section className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8">
            {/* News Section */}
            <div className="h-96 overflow-y-scroll pr-3">
                <h2 className="text-2xl font-bold text-[#1B4332] mb-6">Latest News</h2>
                <div className="space-y-5">
                    {mockNews.map((news) => (
                        <div
                            key={news.id}
                            className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition"
                        >
                            <h3 className="font-semibold text-lg text-gray-800 mb-2">
                                {news.title}
                            </h3>
                            <p className="text-sm text-gray-500 mb-3">{news.date}</p>
                            <a
                                href={news.link}
                                className="inline-block bg-[#1B4332] text-white px-4 py-2 text-sm rounded hover:bg-green-800 transition"
                            >
                                Read More
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            {/* Gallery Section */}
            <div>
                <h2 className="text-2xl font-bold text-[#1B4332] mb-6">Gallery</h2>
                <div className="grid grid-cols-2 gap-4">
                    {galleryImages.map((src, index) => (
                        <div
                            key={index}
                            className="relative w-full h-40 rounded-lg overflow-hidden shadow-md"
                        >
                            <Image
                                src={src}
                                alt={`Gallery ${index + 1}`}
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
