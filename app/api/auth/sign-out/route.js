import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
    try {
        const supabase = createRouteHandlerClient({ cookies });
        await supabase.auth.signOut();
        return NextResponse.json({ message: "Signed out successfully" });
    } catch (error) {
        console.error("Sign-out API error:", error);
        return NextResponse.json({ error: "Failed to sign out" }, { status: 500 });
    }
}