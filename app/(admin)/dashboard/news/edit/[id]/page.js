"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useParams, useRouter } from "next/navigation";

// Initialize Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function EditNewsPage() {
    const { id } = useParams(); // News ID from route `/dashboard/news/edit/[id]`
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        file: null,
        file_url: "",
    });

    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");

    // Fetch existing news
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const { data, error } = await supabase
                    .from("news")
                    .select("*")
                    .eq("id", id)
                    .single();

                if (error) throw error;

                setFormData({
                    title: data.title,
                    description: data.description,
                    file: null,
                    file_url: data.file_url || "",
                });
            } catch (err) {
                setMessage(`Error loading news: ${err.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) fetchNews();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };

    const uploadFile = async (file) => {
        if (!file) return null;

        const uploadData = new FormData();
        uploadData.append("file", file);

        const response = await fetch("/api/upload", {
            method: "POST",
            body: uploadData,
        });

        if (!response.ok) throw new Error("File upload failed");

        const data = await response.json();
        return data.url;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("");

        try {
            let fileUrl = formData.file_url;

            // If new file selected, upload
            if (formData.file) {
                fileUrl = await uploadFile(formData.file);
            }

            const { error } = await supabase
                .from("news")
                .update({
                    title: formData.title,
                    description: formData.description,
                    file_url: fileUrl,
                })
                .eq("id", id);

            if (error) throw error;

            setMessage("News updated successfully!");
            router.push("/dashboard/news"); // Redirect after update
        } catch (err) {
            setMessage(`Error updating news: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <p className="text-center text-gray-500">Loading news details...</p>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold text-[#1B4332] mb-8">Edit News/Event</h1>
            {message && (
                <div
                    className={`p-4 mb-4 rounded-lg ${message.startsWith("Error")
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                >
                    {message}
                </div>
            )}
            <form
                onSubmit={handleSubmit}
                className="space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100"
            >
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={8}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>

                {/* Current Image Preview */}
                {formData.file_url && (
                    <div>
                        <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                        <img
                            src={formData.file_url}
                            alt="News"
                            className="w-48 h-32 object-cover rounded-lg shadow"
                        />
                    </div>
                )}

                {/* File Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Replace Image (Optional)
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#1B4332] file:text-white hover:file:bg-green-800"
                    />
                </div>

                {/* Submit */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-[#1B4332] text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-800 transition disabled:opacity-50"
                    >
                        {isLoading ? "Saving..." : "Update News"}
                    </button>
                </div>
            </form>
        </div>
    );
}
