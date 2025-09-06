"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AddNewsPage() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        file: null,
    });

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };

    const uploadFile = async (file) => {
        if (!file) return null;

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error("File upload failed.");
        }

        const data = await response.json();
        return data.url;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("");

        try {
            // Upload file to Cloudinary if it exists
            const fileUrl = await uploadFile(formData.file);

            // Prepare data for Supabase
            const dataToSave = {
                title: formData.title,
                description: formData.description,
                file_url: fileUrl,
            };

            // Save data to Supabase
            const { data, error } = await supabase
                .from("news")
                .insert([dataToSave]);

            if (error) {
                throw new Error(error.message);
            }

            console.log("Saved News to Supabase:", data);
            setMessage("News article added successfully!");

            // Reset form
            setFormData({ title: "", description: "", file: null });
        } catch (error) {
            console.error("Save Error:", error);
            setMessage(`Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold text-[#1B4332] mb-8">Add News/Event</h1>
            {message && (
                <div className={`p-4 mb-4 rounded-lg ${message.startsWith("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
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
                        placeholder="Enter news title"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>

                {/* Description (Text Area) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Enter news description"
                        rows={8}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>

                {/* File Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Image (Optional)
                    </label>
                    <input
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#1B4332] file:text-white hover:file:bg-green-800"
                    />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-[#1B4332] text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Saving..." : "Add News Article"}
                    </button>
                </div>
            </form>
        </div>
    );
}
