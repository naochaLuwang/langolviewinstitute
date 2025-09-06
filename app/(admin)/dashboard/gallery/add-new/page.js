"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { FiUpload, FiX } from "react-icons/fi";

// Initialize Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AddGalleryPage() {
    const [files, setFiles] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Clean up object URLs when the component unmounts
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview));
        };
    }, [files]);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files).map(file => ({
            file,
            preview: URL.createObjectURL(file),
            id: file.name + file.size + Math.random(),
        }));
        setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
    };

    const handleRemoveFile = (id) => {
        setFiles(files.filter(f => f.id !== id));
    };

    const uploadFile = async (uploadFile) => {
        if (!uploadFile) return null;

        const formData = new FormData();
        formData.append('file', uploadFile);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "File upload failed.");
            }
            return data.url;
        } catch (error) {
            console.error("File upload error:", error);
            setMessage(`Error: ${error.message}`);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("");

        try {
            if (files.length === 0) {
                throw new Error("Please select at least one image to upload.");
            }

            const uploadPromises = files.map(item => uploadFile(item.file));
            const imageUrls = await Promise.all(uploadPromises);

            const validImageUrls = imageUrls.filter(url => url !== null);
            if (validImageUrls.length === 0) {
                throw new Error("No images were successfully uploaded.");
            }

            const imagesToSave = validImageUrls.map(url => ({
                image_url: url,

            }));

            const { data, error } = await supabase
                .from("gallery")
                .insert(imagesToSave);

            if (error) {
                throw new Error(error.message);
            }

            setMessage("Images uploaded successfully!");
            setFiles([]);

            document.getElementById('file-input').value = null;
            console.log("Saved to Supabase:", data);
        } catch (error) {
            console.error("Save error:", error);
            setMessage(`Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="max-w-6xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold text-[#1B4332] mb-8">
                Upload to Gallery
            </h1>
            {message && (
                <div className={`p-4 mb-4 rounded-lg ${message.startsWith("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                    {message}
                </div>
            )}
            <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-white p-8 rounded-xl shadow-lg border border-gray-100"
            >
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Image(s)
                    </label>
                    <input
                        id="file-input"
                        type="file"
                        name="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#1B4332] file:text-white hover:file:bg-green-800"
                    />
                </div>

                {files.length > 0 && (
                    <div className="flex flex-wrap gap-4 mt-4">
                        {files.map(item => (
                            <div key={item.id} className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-300">
                                <img src={item.preview} alt="Preview" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveFile(item.id)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                                >
                                    <FiX size={12} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}



                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isLoading || files.length === 0}
                        className="inline-flex items-center gap-2 bg-[#1B4332] text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Uploading...
                            </>
                        ) : (
                            <>
                                <FiUpload />
                                Upload Image(s)
                            </>
                        )}
                    </button>
                </div>
            </form>
        </main>
    );
}
