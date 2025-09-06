"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter, useParams } from "next/navigation";
import { FiUpload } from "react-icons/fi";

// Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function EditFacultyPage() {
    const { id } = useParams(); // get faculty id from route /dashboard/faculty/edit/[id]
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        designation: "",
        message: "",
        image: null,
    });
    const [preview, setPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Fetch faculty data by id
    useEffect(() => {
        const fetchFaculty = async () => {
            const { data, error } = await supabase
                .from("faculty")
                .select("*")
                .eq("id", id)
                .single();

            if (error) {
                setMessage("Error fetching faculty details.");
                return;
            }

            setFormData({
                name: data.name,
                designation: data.designation,
                message: data.message || "",
                image: null, // keep null, only change if user uploads a new one
            });
            setPreview(data.image_url);
        };

        if (id) fetchFaculty();
    }, [id]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const uploadFile = async (file) => {
        if (!file) return null;

        const formDataData = new FormData();
        formDataData.append("file", file);

        const response = await fetch("/api/upload", {
            method: "POST",
            body: formDataData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "File upload failed.");
        }

        const data = await response.json();
        return data.url;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("");

        try {
            let imageUrl = preview; // keep existing image
            if (formData.image) {
                imageUrl = await uploadFile(formData.image);
            }

            const { error } = await supabase
                .from("faculty")
                .update({
                    name: formData.name,
                    designation: formData.designation,
                    message: formData.message,
                    image_url: imageUrl,
                })
                .eq("id", id);

            if (error) throw new Error(error.message);

            setMessage("Faculty member updated successfully!");
            router.push("/dashboard/members");
        } catch (err) {
            setMessage(`Error: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold text-[#1B4332] mb-8">Edit Faculty Member</h1>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Designation
                            </label>
                            <input
                                type="text"
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Message
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                                rows={4}
                            />
                        </div>
                    </div>

                    {/* Right Column - Image Upload */}
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 space-y-4">
                        {preview ? (
                            <img
                                src={preview}
                                alt="Image Preview"
                                className="rounded-lg max-h-48 object-cover"
                            />
                        ) : (
                            <div className="text-center text-gray-500">
                                <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                                <p className="mt-2 text-sm">Upload an image</p>
                            </div>
                        )}
                        <label className="block w-full text-center">
                            <span className="cursor-pointer inline-block bg-[#1B4332] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-800 transition">
                                Select File
                            </span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="sr-only"
                            />
                        </label>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#1B4332] text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Updating..." : "Update Faculty Member"}
                    </button>
                </div>
            </form>
        </div>
    );
}
