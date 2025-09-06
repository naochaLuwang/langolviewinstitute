"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";

export default function SignOutButton() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSignOut = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/auth/sign-out", {
                method: "POST",
            });

            if (!response.ok) {
                throw new Error("Failed to sign out.");
            }

            // Redirect to the sign-in page after successful sign-out
            router.push("/sign-in");
        } catch (err) {
            console.error("Sign-out error:", err);
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleSignOut}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#1B4332] rounded-lg hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <FiLogOut />
            {isLoading ? "Signing Out..." : "Sign Out"}
        </button>
    );
}
