"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";


// Initialize Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Hero() {
    const [settings, setSettings] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSettings = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from("site_settings")
                .select("*")
                .limit(1)
                .single();

            if (error) {
                throw new Error(error.message);
            }
            setSettings(data);
        } catch (err) {
            setError(`Failed to fetch settings: ${err.message}`);
            console.error("Settings fetch error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const heroTitle = settings?.banner_title
    const heroSubtitle = settings?.banner_subtitle
    const heroImage = settings?.banner_url

    return (
        <section
            className="relative flex min-h-[60vh] md:min-h-[75vh] items-center justify-center bg-cover bg-center bg-no-repeat text-center"
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("${heroImage}")`,
            }}
        >
            <div className="px-6 lg:px-8 max-w-3xl">
                {isLoading ? (
                    <div className="space-y-4 animate-pulse">
                        <div className="h-10 bg-gray-300 rounded-lg w-full md:w-3/4 mx-auto"></div>
                        <div className="h-6 bg-gray-300 rounded-lg w-full"></div>
                        <div className="h-6 bg-gray-300 rounded-lg w-5/6 mx-auto"></div>
                    </div>
                ) : error ? (
                    <p className="text-red-500 text-center">{error}</p>
                ) : (
                    <>
                        <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
                            {heroTitle}
                        </h1>
                        <p className="text-white text-lg md:text-xl leading-relaxed">
                            {heroSubtitle}
                        </p>
                    </>
                )}

                <div className="mt-6 space-x-4">
                    <button className="w-auto h-auto bg-white px-4 py-2 rounded-lg cursor-pointer">Apply Now</button>
                    <button className="w-auto h-auto bg-white px-4 py-2 rounded-lg cursor-pointer">Contact Us</button>
                </div>
            </div>

        </section>
    );
}
