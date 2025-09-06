"use client";
import Sidebar from "@/app/component/Sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);



export default function DashboardLayout({ children }) {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => {
            if (!user) {
                router.push("/sign-in"); // Redirect to login if not authenticated
            } else {
                setUser(user);
            }
        });
    }, [router]);

    if (!user) {
        return null; // Or show a loading spinner
    }

    return (
        <>

            <div className='flex h-96 bg-gray-50'>
                <Sidebar />

                <main className="flex-1 ml-64 p-8">
                    {children}
                </main>
            </div>


        </>

    );
}
