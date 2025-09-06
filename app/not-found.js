// app/not-found.js
"use client";

import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center px-6">
            <h1 className="text-6xl font-bold text-[#1B4332]">404</h1>
            <h2 className="text-2xl font-semibold mt-4 text-gray-800">
                Page Not Found
            </h2>
            <p className="mt-2 text-gray-600">
                Sorry, the page you are looking for doesn’t exist.
            </p>

            <Link
                href="/"
                className="mt-6 inline-block bg-[#1B4332] text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition"
            >
                Go Home
            </Link>
        </div>
    );
}
