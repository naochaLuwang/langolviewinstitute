import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        const supabase = createRouteHandlerClient({ cookies });

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 401 });
        }

        return NextResponse.json({ message: "Signed in successfully" });
    } catch (error) {
        console.error("Sign-in API error:", error);
        return NextResponse.json({ error: "Failed to sign in" }, { status: 500 });
    }
}
