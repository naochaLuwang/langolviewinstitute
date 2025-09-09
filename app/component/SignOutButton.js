"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import supabase from "../lib/supabaseClient";

export default function SignOutButton() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSignOut = async () => {
        setIsLoading(true);
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
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
