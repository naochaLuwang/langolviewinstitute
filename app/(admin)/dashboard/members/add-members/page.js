"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { FiUpload } from "react-icons/fi";

// Initialize Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AddFacultyPage() {
    const [formData, setFormData] = useState({
        name: "",
        designation: "",
        image: null,
        signature: null,
        message: "",
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [signaturePreview, setSignaturePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    const router = useRouter();

    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, [field]: file });

            if (field === "image") {
                setImagePreview(URL.createObjectURL(file));
            } else if (field === "signature") {
                setSignaturePreview(URL.createObjectURL(file));
            }
        } else {
            setFormData({ ...formData, [field]: null });

            if (field === "image") {
                setImagePreview(null);
            } else if (field === "signature") {
                setSignaturePreview(null);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const uploadFile = async (file) => {
        if (!file) return null;

        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
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
            const imageUrl = await uploadFile(formData.image);
            const signatureUrl = await uploadFile(formData.signature);

            const dataToSave = {
                name: formData.name,
                designation: formData.designation,
                message: formData.message,
                image_url: imageUrl,
                signature_url: signatureUrl,
            };

            const { error } = await supabase.from("faculty").insert([dataToSave]);

            if (error) {
                throw new Error(error.message);
            }

            setMessage("Faculty member added successfully!");
            setFormData({
                name: "",
                designation: "",
                image: null,
                signature: null,
                message: "",
            });
            setImagePreview(null);
            setSignaturePreview(null);
            router.push("/dashboard/members");
        } catch (err) {
            console.error("Save Error:", err);
            setMessage(`Error: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold text-[#1B4332] mb-8">Add New Faculty Member</h1>

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
                {/* General Information */}
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
                            placeholder="Enter full name"
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
                            placeholder="e.g., Associate Professor"
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
                            placeholder="Enter a message or biography"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                            rows={4}
                        />
                    </div>
                </div>

                {/* Image Upload Section */}
                {/* Image Upload Section */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-[#1B4332] mb-4 flex items-center space-x-2">
                        <FiUpload className="h-5 w-5 text-[#1B4332]" />
                        <span>Upload Faculty Image</span>
                    </h2>
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 space-y-4 bg-gray-50">
                        {imagePreview ? (
                            <img src={imagePreview} alt="Image Preview" className="rounded-lg max-h-48 object-cover" />
                        ) : (
                            <div className="text-center text-gray-500">
                                <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                                <p className="mt-2 text-sm">Upload faculty image</p>
                            </div>
                        )}
                        <label className="block w-full text-center">
                            <span className="cursor-pointer inline-block bg-[#1B4332] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-800 transition">
                                Select Image
                            </span>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, "image")}
                                className="sr-only"
                            />
                        </label>
                    </div>
                </div>

                {/* Signature Upload Section */}
                <div>
                    <h2 className="text-lg font-semibold text-[#1B4332] mb-4 flex items-center space-x-2">
                        <FiUpload className="h-5 w-5 text-[#1B4332]" />
                        <span>Upload Faculty Signature</span>
                    </h2>
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 space-y-4 bg-gray-50">
                        {signaturePreview ? (
                            <img src={signaturePreview} alt="Signature Preview" className="rounded-lg max-h-48 object-cover" />
                        ) : (
                            <div className="text-center text-gray-500">
                                <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                                <p className="mt-2 text-sm">Upload faculty signature</p>
                            </div>
                        )}
                        <label className="block w-full text-center">
                            <span className="cursor-pointer inline-block bg-[#1B4332] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-800 transition">
                                Select Signature
                            </span>
                            <input
                                type="file"
                                name="signature"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, "signature")}
                                className="sr-only"
                            />
                        </label>
                    </div>
                </div>


                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#1B4332] text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Saving..." : "Add Faculty Member"}
                    </button>
                </div>
            </form>
        </div>
    );
}
